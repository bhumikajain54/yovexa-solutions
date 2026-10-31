import { api, extractData } from './api';

const IMAGEKIT_UPLOAD_ENDPOINT = 'https://upload.imagekit.io/api/v1/files/upload';
const DEFAULT_MAX_SIZE_BYTES = 5 * 1024 * 1024; // 5MB
const ALLOWED_MIME_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
const ALLOWED_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.webp'];

/**
 * Checks whether a URL is an ImageKit media asset
 */
export function isImageKitUrl(url) {
  if (!url || typeof url !== 'string') return false;
  return url.includes('ik.imagekit.io');
}

/**
 * Apply ImageKit transformation query parameters for compression, resizing, and responsive delivery
 * @param {string} url - Original image URL
 * @param {Object} options - Transformation options: width, height, quality, format, cropMode, focus, blur, rawTransform
 * @returns {string} Optimized URL with ImageKit transformations (or original URL if not ImageKit)
 */
export function transformUrl(url, options = {}) {
  if (!isImageKitUrl(url)) return url || '';

  const {
    width,
    w,
    height,
    h,
    quality = 80,
    q,
    format = 'auto',
    f,
    cropMode,
    c,
    focus,
    fo,
    blur,
    bl,
    rawTransform,
  } = options;

  const parts = [];
  const targetWidth = width || w;
  if (targetWidth) parts.push(`w-${targetWidth}`);

  const targetHeight = height || h;
  if (targetHeight) parts.push(`h-${targetHeight}`);

  const targetQuality = q !== undefined ? q : quality;
  if (targetQuality) parts.push(`q-${targetQuality}`);

  const targetFormat = f || format;
  if (targetFormat) parts.push(`f-${targetFormat}`);

  const targetCrop = c || cropMode;
  if (targetCrop) parts.push(`c-${targetCrop}`);

  const targetFocus = fo || focus;
  if (targetFocus) parts.push(`fo-${targetFocus}`);

  const targetBlur = bl || blur;
  if (targetBlur) parts.push(`bl-${targetBlur}`);

  if (rawTransform) parts.push(rawTransform);

  if (parts.length === 0) return url;

  const transformString = parts.join(',');

  const [baseUrl, query] = url.split('?');
  if (!query) {
    return `${baseUrl}?tr=${transformString}`;
  }

  const searchParams = new URLSearchParams(query);
  searchParams.set('tr', transformString);
  const queryString = searchParams.toString().replace(/%2C/g, ',');
  return `${baseUrl}?${queryString}`;
}

/**
 * Common ImageKit Transformation Presets
 */
export function getThumbnailUrl(url, width = 160, height = 160) {
  return transformUrl(url, {
    width,
    height,
    cropMode: 'maintain_ratio',
    focus: 'auto',
    quality: 80,
    format: 'auto',
  });
}

export function getCardUrl(url, width = 800) {
  return transformUrl(url, {
    width,
    quality: 80,
    format: 'auto',
  });
}

export function getDetailUrl(url, width = 1400) {
  return transformUrl(url, {
    width,
    quality: 85,
    format: 'auto',
  });
}

export function getLqipUrl(url) {
  return transformUrl(url, {
    width: 30,
    blur: 6,
    quality: 20,
    format: 'auto',
  });
}

export function getResponsiveSrcSet(url, widths = [400, 800, 1200, 1600]) {
  if (!isImageKitUrl(url)) return '';
  return widths
    .map((w) => `${transformUrl(url, { width: w, quality: 80, format: 'auto' })} ${w}w`)
    .join(', ');
}

export const imageKitService = {
  isImageKitUrl,
  transformUrl,
  getThumbnailUrl,
  getCardUrl,
  getDetailUrl,
  getLqipUrl,
  getResponsiveSrcSet,

  /**
   * Fetch secure upload authentication parameters from backend
   * Endpoint: GET /api/imagekit/auth
   * Requires: Valid admin JWT token (handled automatically by api client)
   */
  async getAuthParameters() {
    try {
      const res = await api.get('/imagekit/auth');
      const data = extractData(res);
      // Handles both direct response and wrapped payload { data: { token, ... } }
      const auth = (data && data.token) ? data : (data?.data || res);

      if (!auth || !auth.token || !auth.signature) {
        throw new Error('Invalid authentication parameters received from server.');
      }
      return {
        token: auth.token,
        expire: auth.expire,
        signature: auth.signature,
        publicKey: auth.publicKey || '',
      };
    } catch (err) {
      console.error('Failed to retrieve ImageKit auth parameters:', err);
      throw new Error(err.message || 'Failed to authenticate with ImageKit backend.');
    }
  },

  /**
   * Validate file format and size
   */
  validateFile(file, { maxSizeBytes = DEFAULT_MAX_SIZE_BYTES } = {}) {
    if (!file) {
      return { valid: false, error: 'Please select a file to upload.' };
    }

    const fileName = (file.name || '').toLowerCase();
    const hasValidExt = ALLOWED_EXTENSIONS.some((ext) => fileName.endsWith(ext));
    const hasValidType = file.type ? ALLOWED_MIME_TYPES.includes(file.type.toLowerCase()) : hasValidExt;

    if (!hasValidType && !hasValidExt) {
      return {
        valid: false,
        error: 'Invalid image type. Please select a JPG, PNG, or WEBP image.',
      };
    }

    if (file.size > maxSizeBytes) {
      const maxMb = Math.round(maxSizeBytes / (1024 * 1024));
      return {
        valid: false,
        error: `Image size exceeds ${maxMb}MB limit. Please select a smaller file.`,
      };
    }

    return { valid: true };
  },

  /**
   * Upload file directly to ImageKit using client-side signed upload
   * @param {File} file - Browser File object
   * @param {Object} options - upload options: folder, fileName, onProgress
   */
  async uploadImage(file, { folder = '/portfolio', fileName = null, onProgress = null } = {}) {
    // 1. Client-side validation
    const validation = this.validateFile(file);
    if (!validation.valid) {
      throw new Error(validation.error);
    }

    // Helper to perform the actual XHR upload
    const doUpload = async (auth) => {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('fileName', fileName || file.name || `asset-${Date.now()}`);
      formData.append('publicKey', auth.publicKey);
      formData.append('signature', auth.signature);
      formData.append('expire', String(auth.expire));
      formData.append('token', auth.token);
      if (folder) {
        formData.append('folder', folder);
      }
      formData.append('useUniqueFileName', 'true');

      return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open('POST', IMAGEKIT_UPLOAD_ENDPOINT);

        if (onProgress && xhr.upload) {
          xhr.upload.onprogress = (event) => {
            if (event.lengthComputable) {
              const percent = Math.round((event.loaded * 100) / event.total);
              onProgress(percent);
            }
          };
        }

        xhr.onload = () => {
          let responseJson;
          try {
            responseJson = JSON.parse(xhr.responseText);
          } catch {
            responseJson = { message: xhr.responseText };
          }

          if (xhr.status >= 200 && xhr.status < 300) {
            resolve(responseJson);
          } else {
            const err = new Error(
              responseJson.message || `ImageKit upload failed with HTTP status ${xhr.status}`
            );
            err.status = xhr.status;
            err.response = responseJson;
            reject(err);
          }
        };

        xhr.onerror = () => {
          reject(new Error('Network error during ImageKit upload. Please check your internet connection.'));
        };

        xhr.onabort = () => {
          reject(new Error('ImageKit upload was aborted.'));
        };

        xhr.send(formData);
      });
    };

    // 2. Fetch fresh auth parameters from backend
    let auth = await this.getAuthParameters();

    try {
      const result = await doUpload(auth);
      return result;
    } catch (uploadErr) {
      // If error might be due to expired auth token or signature mismatch, retry once with fresh auth
      const isAuthError =
        uploadErr.status === 401 ||
        uploadErr.status === 403 ||
        (uploadErr.message && /token|expire|signature|auth/i.test(uploadErr.message));

      if (isAuthError) {
        console.warn('ImageKit auth error detected, requesting fresh parameters and retrying upload...');
        auth = await this.getAuthParameters();
        return await doUpload(auth);
      }
      throw uploadErr;
    }
  },
};

export default imageKitService;
