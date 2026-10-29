import React from 'react';

/**
 * Official Brand Logo Component for Yovexa Solutions
 * - Variant 'light': Dark text & navy/cyan branding on light backgrounds (Navbar, light pages)
 * - Variant 'dark': Crisp white text & glowing cyan branding on dark backgrounds (Footer, Login, Register, Admin)
 * - Supports `iconOnly={true}` for collapsed sidebars or compact avatars.
 */
export default function Logo({ 
  variant = 'light', 
  size = 'default', 
  showText = false, 
  iconOnly = false,
  className = '' 
}) {
  const isDarkBg = variant === 'dark' || variant === 'dark-bg' || variant === 'white-text';

  // Responsive size presets for the horizontal brandmark lockup
  const brandmarkSizes = {
    sm: 'h-7 sm:h-8',
    default: 'h-9 sm:h-10',
    md: 'h-10 sm:h-11',
    lg: 'h-11 sm:h-12 md:h-14',
    xl: 'h-14 sm:h-16 md:h-18',
    '2xl': 'h-18 sm:h-22',
  };

  // Preset sizes for icon-only mode (symbol)
  const symbolSizes = {
    sm: 'h-7 w-7',
    default: 'h-9 w-9',
    md: 'h-10 w-10',
    lg: 'h-12 w-12',
    xl: 'h-16 w-16',
    '2xl': 'h-20 w-20',
  };

  // If icon-only is requested (e.g. collapsed admin sidebar)
  if (iconOnly || (!showText && size === 'sm' && className.includes('collapsed'))) {
    const symbolClass = symbolSizes[size] || size;
    return (
      <div className={`relative flex items-center justify-center shrink-0 select-none ${className}`}>
        <img
          src="/yovexa-symbol.webp"
          alt="Yovexa Solutions Symbol"
          className={`${symbolClass} object-contain rounded-lg shadow-sm transition-transform duration-300 hover:scale-105`}
          loading="eager"
        />
      </div>
    );
  }

  // Standard official corporate brandmark lockup (Icon + Typography)
  const sizeClass = brandmarkSizes[size] || size;
  const logoSrc = isDarkBg ? '/yovexa-logo-dark.webp' : '/yovexa-logo-transparent.webp';

  return (
    <div className={`flex items-center select-none ${className}`}>
      <img
        src={logoSrc}
        alt="Yovexa Solutions"
        className={`${sizeClass} w-auto max-w-full object-contain rounded-md transition-all duration-300 hover:brightness-105 hover:scale-[1.02]`}
        loading="eager"
      />
    </div>
  );
}
