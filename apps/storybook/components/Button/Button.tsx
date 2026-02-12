import React, { useState, useEffect } from 'react';

export type ButtonType = 'primary' | 'secondary' | 'tertiary';
export type ButtonSize = 'large' | 'medium';
export type ButtonInteraction = 'default' | 'hover' | 'press';

export interface ButtonProps {
  type?: ButtonType;
  size?: ButtonSize;
  interaction?: ButtonInteraction;
  disabled?: boolean;
  buttonText?: string;
  showIconFront?: boolean;
  showIconBack?: boolean;
  /** Optional 20px icon URL for front (right) position. When not set, chevron right is used. */
  iconFrontSrc?: string;
  /** Optional 20px icon URL for back (left) position. When not set, chevron left is used. */
  iconBackSrc?: string;
  className?: string;
}

const heightBySize: Record<ButtonSize, string> = { large: 'var(--spacing-40)', medium: 'var(--spacing-32)' };

function ChevronIcon({ direction }: { direction: 'left' | 'right' }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden style={{ width: 'var(--icon-size-20)', height: 'var(--icon-size-20)', flexShrink: 0 }}>
      {direction === 'left' ? (
        <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
      ) : (
        <path d="M8.59 16.59L10 18l6-6-6-6-1.41 1.41L13.17 12z" />
      )}
    </svg>
  );
}

const iconWrapStyle: React.CSSProperties = {
  width: 'var(--icon-size-20)',
  height: 'var(--icon-size-20)',
  flexShrink: 0,
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
};

/** Fetches SVG and renders it inline with fill/stroke set to currentColor so it matches text. */
function IconFromSrc({ src }: { src: string }) {
  const [svgMarkup, setSvgMarkup] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetch(src)
      .then((r) => r.text())
      .then((text) => {
        if (cancelled) return;
        let forced = text
          .replace(/\sfill="[^"]*"/g, ' fill="currentColor"')
          .replace(/\sstroke="[^"]*"/g, ' stroke="currentColor"')
          .replace(/\bfill:\s*[^;]+/g, 'fill:currentColor')
          .replace(/\bstroke:\s*[^;]+/g, 'stroke:currentColor');
        forced = forced.replace(/<svg/, '<svg width="100%" height="100%" style="display:block"');
        setSvgMarkup(forced);
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, [src]);

  if (!svgMarkup) return <span style={iconWrapStyle} aria-hidden />;

  return (
    <span
      style={iconWrapStyle}
      aria-hidden
      dangerouslySetInnerHTML={{
        __html: svgMarkup,
      }}
    />
  );
}

export function Button({
  type = 'primary',
  size = 'medium',
  interaction = 'default',
  disabled = false,
  buttonText = 'Button',
  showIconFront = false,
  showIconBack = false,
  iconFrontSrc,
  iconBackSrc,
  className = '',
}: ButtonProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);

  const height = heightBySize[size];
  const effectiveInteraction: ButtonInteraction =
    interaction !== 'default' ? interaction : isPressed ? 'press' : isHovered ? 'hover' : 'default';
  const isHover = effectiveInteraction === 'hover';
  const isPress = effectiveInteraction === 'press';
  const isPrimary = type === 'primary';

  const handlePointerEnter = () => { if (!disabled) setIsHovered(true); };
  const handlePointerLeave = () => { setIsHovered(false); setIsPressed(false); };
  const handlePointerDown = () => { if (!disabled) setIsPressed(true); };
  const handlePointerUp = () => setIsPressed(false);

  // Typography from foundation tokens: Source Sans 3; weight by type and state (disabled → regular 400)
  const typographyPrefix = disabled
    ? 'desktop-body-regular'
    : isPrimary
      ? 'desktop-body-bold'
      : 'desktop-body-medium';

  const baseStyle: React.CSSProperties = {
    fontFamily: `var(--${typographyPrefix}-font-family)`,
    fontSize: `var(--${typographyPrefix}-font-size)`,
    fontWeight: `var(--${typographyPrefix}-font-weight)`,
    lineHeight: `var(--${typographyPrefix}-line-height)`,
    letterSpacing: `var(--${typographyPrefix}-letter-spacing)`,
    paddingLeft: 'var(--spacing-12)',
    paddingRight: 'var(--spacing-12)',
    height,
    minHeight: height,
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 'var(--spacing-4)',
    borderRadius: 'var(--spacing-4)',
    cursor: disabled ? 'not-allowed' : 'pointer',
    transition: 'background-color 0.2s, border-color 0.2s, color 0.2s',
    boxSizing: 'border-box',
  };

  let bg: string;
  let color: string;
  let borderColor: string;
  let borderWidth: number = 1;
  let boxShadow: string | undefined;

  if (disabled) {
    bg = 'var(--color-gray-soft-gray)';
    color = 'var(--color-gray-hint-grey)';
    borderColor = 'transparent';
  } else if (type === 'primary') {
    if (isPress) {
      bg = 'var(--color-primary-dark-green)';
      color = 'var(--color-white-solid-white)';
      borderColor = 'transparent';
      boxShadow = `0 0 0 var(--spacing-2) var(--color-accent-soft-yellow)`;
    } else if (isHover) {
      bg = 'var(--color-primary-sip-green)';
      color = 'var(--color-white-solid-white)';
      borderColor = 'transparent';
    } else {
      bg = 'var(--color-primary-dark-green)';
      color = 'var(--color-white-solid-white)';
      borderColor = 'transparent';
    }
  } else if (type === 'secondary') {
    color = 'var(--color-primary-dark-green)';
    if (isPress) {
      bg = 'var(--color-primary-hint-green)';
      borderColor = 'transparent';
      boxShadow = `0 0 0 var(--spacing-2) var(--color-accent-soft-yellow)`;
    } else if (isHover) {
      bg = 'var(--color-primary-soft-green)';
      borderColor = 'var(--color-primary-dark-green)';
    } else {
      bg = 'transparent';
      borderColor = 'var(--color-primary-dark-green)';
    }
  } else {
    color = 'var(--color-primary-dark-green)';
    if (isPress) {
      bg = 'var(--color-primary-hint-green)';
      borderColor = 'transparent';
      boxShadow = `0 0 0 var(--spacing-2) var(--color-accent-soft-yellow)`;
    } else if (isHover) {
      bg = 'var(--color-primary-hint-green)';
      borderColor = 'transparent';
    } else {
      bg = 'transparent';
      borderColor = 'transparent';
    }
  }

  const style: React.CSSProperties = {
    ...baseStyle,
    backgroundColor: bg,
    color,
    border: `${borderWidth}px solid ${borderColor}`,
    ...(boxShadow !== undefined && { boxShadow }),
  };

  return (
    <button
      type="button"
      style={style}
      className={className}
      disabled={disabled}
      aria-disabled={disabled}
      onMouseEnter={handlePointerEnter}
      onMouseLeave={handlePointerLeave}
      onMouseDown={handlePointerDown}
      onMouseUp={handlePointerUp}
      onPointerLeave={handlePointerLeave}
    >
      {showIconBack && (iconBackSrc ? <IconFromSrc src={iconBackSrc} /> : <ChevronIcon direction="left" />)}
      <span style={{ fontFamily: 'inherit', fontSize: 'inherit', fontWeight: 'inherit', lineHeight: 'inherit', letterSpacing: 'inherit' }}>{buttonText}</span>
      {showIconFront && (iconFrontSrc ? <IconFromSrc src={iconFrontSrc} /> : <ChevronIcon direction="right" />)}
    </button>
  );
}
