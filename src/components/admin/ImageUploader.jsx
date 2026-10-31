import React, { useState, useEffect, useRef } from 'react';
import { Upload, Link as LinkIcon, X, Loader2 } from 'lucide-react';
import { useToast } from '../../context/ToastContext';
import { imageKitService } from '../../services/imageKitService';

export default function ImageUploader({ value, onChange, folder = '/portfolio' }) {
  const { addToast } = useToast();
  const [tab, setTab] = useState('url'); // 'file' or 'url'
  const [urlInput, setUrlInput] = useState(value || '');
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const fileInputRef = useRef(null);

  // Synchronize internal URL input state when incoming value changes
  useEffect(() => {
    setUrlInput(value || '');
  }, [value]);

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate type and size before initiating upload
    const validation = imageKitService.validateFile(file);
    if (!validation.valid) {
      addToast(validation.error, 'error');
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
      return;
    }

    try {
      setUploading(true);
      setUploadProgress(0);

      const result = await imageKitService.uploadImage(file, {
        folder,
        onProgress: (percent) => setUploadProgress(percent),
      });

      const uploadedUrl = result?.url;
      if (!uploadedUrl) {
        throw new Error('ImageKit upload did not return a valid image URL.');
      }

      // Automatically populate URL input, form state, and preview
      setUrlInput(uploadedUrl);
      onChange(uploadedUrl);
      addToast('Image uploaded successfully to ImageKit.', 'success');
    } catch (err) {
      console.error('ImageKit upload failed:', err);
      addToast(err.message || 'Failed to upload image to ImageKit.', 'error');
      // If upload fails, do not overwrite the existing featuredImage URL
    } finally {
      setUploading(false);
      setUploadProgress(0);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleApplyUrl = () => {
    if (!urlInput.trim()) {
      addToast('Please enter an image URL', 'error');
      return;
    }
    onChange(urlInput.trim());
    addToast('Image URL applied', 'success');
  };

  const handleRemove = () => {
    onChange('');
    setUrlInput('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="space-y-3">
      {/* Tab Switcher */}
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => !uploading && setTab('url')}
          disabled={uploading}
          className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors ${
            tab === 'url'
              ? 'bg-[#0B1B3A] text-white'
              : 'bg-[#F1F5F9] text-[#334155] hover:bg-[#E2E8F0]'
          } ${uploading ? 'opacity-60 cursor-not-allowed' : ''}`}
        >
          <LinkIcon className="w-3.5 h-3.5" />
          <span>Image URL</span>
        </button>

        <button
          type="button"
          onClick={() => !uploading && setTab('file')}
          disabled={uploading}
          className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors ${
            tab === 'file'
              ? 'bg-[#0B1B3A] text-white'
              : 'bg-[#F1F5F9] text-[#334155] hover:bg-[#E2E8F0]'
          } ${uploading ? 'opacity-60 cursor-not-allowed' : ''}`}
        >
          <Upload className="w-3.5 h-3.5" />
          <span>Upload File</span>
        </button>
      </div>

      {/* Input depending on tab */}
      {tab === 'url' ? (
        <div className="flex items-center gap-2">
          <input
            type="url"
            value={urlInput}
            onChange={(e) => setUrlInput(e.target.value)}
            placeholder="https://images.unsplash.com/... or image link"
            className="flex-1 px-4 py-2.5 rounded-xl border border-[#CBD5E1] text-sm text-[#0F172A] placeholder-[#64748B] focus:outline-none focus:ring-2 focus:ring-[#0EA5E9]"
          />
          <button
            type="button"
            onClick={handleApplyUrl}
            className="px-4 py-2.5 rounded-xl bg-[#0EA5E9] hover:bg-[#0284C7] text-white text-xs font-bold transition-colors"
          >
            Apply
          </button>
        </div>
      ) : (
        <label
          className={`flex flex-col items-center justify-center p-6 border-2 border-dashed border-[#CBD5E1] rounded-xl transition-colors ${
            uploading
              ? 'bg-[#F1F5F9] cursor-not-allowed opacity-90'
              : 'hover:border-[#0EA5E9] cursor-pointer bg-[#F8FAFC]'
          }`}
        >
          {uploading ? (
            <>
              <Loader2 className="w-8 h-8 text-[#0EA5E9] animate-spin mb-2" />
              <span className="text-xs font-bold text-[#0B1B3A]">
                {uploadProgress > 0 ? `Uploading to ImageKit (${uploadProgress}%)...` : 'Uploading to ImageKit...'}
              </span>
              <span className="text-[11px] text-[#64748B] mt-1">Please wait while the image is being processed</span>
              {uploadProgress > 0 && (
                <div className="w-48 bg-slate-200 rounded-full h-1.5 mt-2.5 overflow-hidden">
                  <div
                    className="bg-[#0EA5E9] h-1.5 rounded-full transition-all duration-300"
                    style={{ width: `${uploadProgress}%` }}
                  />
                </div>
              )}
            </>
          ) : (
            <>
              <Upload className="w-8 h-8 text-[#64748B] mb-2" />
              <span className="text-xs font-bold text-[#0B1B3A]">Click to upload featured image</span>
              <span className="text-[11px] text-[#64748B] mt-1">Supports JPG, PNG, WEBP (Max 5MB)</span>
            </>
          )}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp,image/jpg"
            onChange={handleFileChange}
            disabled={uploading}
            className="hidden"
          />
        </label>
      )}

      {/* Image Preview Box */}
      {value && (
        <div className="relative mt-3 rounded-xl overflow-hidden border border-[#CBD5E1] bg-[#F1F5F9] max-h-56 flex items-center justify-center">
          <img
            src={imageKitService.transformUrl(value, { width: 800, quality: 80, format: 'auto' })}
            alt="Featured Preview"
            loading="lazy"
            decoding="async"
            className="w-full h-48 object-cover"
            onError={(e) => {
              e.currentTarget.style.display = 'none';
            }}
          />
          <button
            type="button"
            onClick={handleRemove}
            className="absolute top-2 right-2 p-1.5 rounded-full bg-[#081A33]/80 hover:bg-rose-600 text-white transition-colors"
            title="Remove Image"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
}
