import React, { useState, useRef, useEffect } from 'react';
import { getIconList, ICON_SIZES, type IconEntry, type IconSize } from './iconData';

const iconList = getIconList();

const styles: Record<string, React.CSSProperties | ((size: number) => React.CSSProperties)> = {
  wrap: {
    fontFamily: 'var(--font-family-source-sans-3)',
    fontSize: 14,
    width: '100%',
    minHeight: '60vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  row: {
    display: 'flex',
    alignItems: 'center',
    gap: 24,
    justifyContent: 'center',
  },
  preview: (size: number) => ({
    width: size,
    height: size,
    minWidth: size,
    minHeight: size,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    border: '1px solid var(--color-gray-soft-gray)',
    borderRadius: 8,
    background: 'var(--palette-background-paper)',
  }),
  dropdownTrigger: {
    padding: '8px 12px',
    minWidth: 200,
    textAlign: 'left',
    border: '1px solid var(--color-gray-soft-gray)',
    borderRadius: 8,
    background: 'var(--palette-background-paper)',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: 8,
  },
  dropdownMenu: {
    position: 'absolute' as const,
    top: '100%',
    left: 0,
    marginTop: 4,
    maxHeight: 280,
    overflowY: 'auto',
    border: '1px solid var(--color-gray-soft-gray)',
    borderRadius: 8,
    background: 'var(--palette-background-paper)',
    boxShadow: 'var(--elevation-6)',
    zIndex: 10,
    minWidth: 220,
  },
  dropdownItem: {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
    padding: '8px 12px',
    cursor: 'pointer',
    border: 'none',
    width: '100%',
    textAlign: 'left',
    background: 'none',
    fontFamily: 'inherit',
    fontSize: 14,
  },
  sizeSelect: {
    padding: '8px 12px',
    minWidth: 120,
    border: '1px solid var(--color-gray-soft-gray)',
    borderRadius: 8,
    background: 'var(--palette-background-paper)',
    fontFamily: 'inherit',
    fontSize: 14,
    cursor: 'pointer',
  },
  dropdownWrapper: {
    position: 'relative' as const,
  },
};

export function IconPicker() {
  const [selectedIcon, setSelectedIcon] = useState<IconEntry | null>(iconList[0] ?? null);
  const [selectedSize, setSelectedSize] = useState<IconSize>(24);
  const [iconDropdownOpen, setIconDropdownOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIconDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const previewUrl = selectedIcon
    ? selectedIcon.files[selectedSize]
    : null;

  return (
    <div style={styles.wrap}>
      <div style={styles.row}>
        <div style={styles.preview(selectedSize)}>
          {previewUrl ? (
            <img
              src={previewUrl}
              alt={selectedIcon?.label ?? ''}
              width={selectedSize}
              height={selectedSize}
              style={{ maxWidth: selectedSize, maxHeight: selectedSize }}
            />
          ) : (
            <span style={{ color: 'var(--color-gray-hint-grey)', fontSize: 12 }}>—</span>
          )}
        </div>
        <div style={styles.dropdownWrapper} ref={menuRef}>
          <button
            type="button"
            style={styles.dropdownTrigger}
            onClick={() => setIconDropdownOpen((o) => !o)}
            aria-expanded={iconDropdownOpen}
            aria-haspopup="listbox"
          >
            {selectedIcon ? (
              <>
                <img
                  src={selectedIcon.files[16]}
                  alt=""
                  width={16}
                  height={16}
                  style={{ flexShrink: 0 }}
                />
                <span>{selectedIcon.label}</span>
              </>
            ) : (
              <span style={{ color: 'var(--color-gray-hint-grey)' }}>Select icon</span>
            )}
          </button>
          {iconDropdownOpen && (
            <div style={styles.dropdownMenu} role="listbox">
              {iconList.map((icon) => (
                <button
                  key={icon.id}
                  type="button"
                  role="option"
                  aria-selected={selectedIcon?.id === icon.id}
                  style={{
                    ...styles.dropdownItem,
                    background: selectedIcon?.id === icon.id ? 'var(--color-primary-soft-green)' : undefined,
                  }}
                  onClick={() => {
                    setSelectedIcon(icon);
                    setIconDropdownOpen(false);
                  }}
                >
                  <img src={icon.files[16]} alt="" width={16} height={16} style={{ flexShrink: 0 }} />
                  <span>{icon.label}</span>
                </button>
              ))}
            </div>
          )}
        </div>
        <select
          id="icon-size-select"
          style={styles.sizeSelect}
          value={selectedSize}
          onChange={(e) => setSelectedSize(Number(e.target.value) as IconSize)}
          aria-label="Icon size"
        >
          {ICON_SIZES.map((size) => (
            <option key={size} value={size}>
              {size}px
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
