import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Button, type ButtonType, type ButtonSize, type ButtonInteraction } from '@sip-design-system/components';
import { getIconList, type IconEntry } from '../foundations/iconData';

const iconList = getIconList();

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Button from the 2026 SIP Design System. Use the controls to change type, size, state (Default / Hover / Pressed), disabled, button text, and icon visibility. Icons match text color.',
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof Button>;

const controlStackStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: 24,
  minWidth: 220,
};

const labelStyle: React.CSSProperties = {
  display: 'block',
  fontFamily: 'var(--font-family-source-sans-3)',
  fontSize: 12,
  color: 'var(--color-gray-solid-grey)',
  marginBottom: 4,
};

const selectStyle: React.CSSProperties = {
  width: '100%',
  padding: '8px 12px',
  border: '1px solid var(--color-gray-soft-gray)',
  borderRadius: 8,
  background: 'var(--palette-background-paper)',
  fontFamily: 'var(--font-family-source-sans-3)',
  fontSize: 14,
  cursor: 'pointer',
};

const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '8px 12px',
  border: '1px solid var(--color-gray-soft-gray)',
  borderRadius: 8,
  background: 'var(--palette-background-paper)',
  fontFamily: 'var(--font-family-source-sans-3)',
  fontSize: 14,
  boxSizing: 'border-box',
};

const toggleWrapStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: 12,
};

const toggleBlockStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: 'var(--spacing-4)',
};

const toggleTrackStyle: (on: boolean) => React.CSSProperties = (on) => ({
  width: 40,
  height: 22,
  borderRadius: 11,
  background: on ? 'var(--color-primary-sip-green)' : 'var(--color-gray-soft-gray)',
  position: 'relative' as const,
  cursor: 'pointer',
  transition: 'background 0.2s',
});

const toggleThumbStyle: (on: boolean) => React.CSSProperties = (on) => ({
  position: 'absolute' as const,
  top: 2,
  left: on ? 20 : 2,
  width: 18,
  height: 18,
  borderRadius: '50%',
  background: 'var(--color-white-solid-white)',
  boxShadow: 'var(--elevation-2)',
  transition: 'left 0.2s',
});

function ButtonWithControls() {
  const [type, setType] = useState<ButtonType>('primary');
  const [size, setSize] = useState<ButtonSize>('medium');
  const [interaction, setInteraction] = useState<ButtonInteraction>('default');
  const [disabled, setDisabled] = useState(false);
  const [buttonText, setButtonText] = useState('Button');
  const [showIconBack, setShowIconBack] = useState(false);
  const [showIconFront, setShowIconFront] = useState(false);
  const [iconFront, setIconFront] = useState<IconEntry | null>(null);
  const [iconBack, setIconBack] = useState<IconEntry | null>(null);

  const handleSetShowIconFront = (next: boolean) => {
    setShowIconFront(next);
    if (next && iconList.length > 0 && !iconFront) setIconFront(iconList[0]);
  };
  const handleSetShowIconBack = (next: boolean) => {
    setShowIconBack(next);
    if (next && iconList.length > 0 && !iconBack) setIconBack(iconList[0]);
  };

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 24,
        flexWrap: 'wrap',
        padding: 24,
        fontFamily: 'var(--font-family-source-sans-3)',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', minHeight: 80 }}>
        <Button
          type={type}
          size={size}
          interaction={interaction}
          disabled={disabled}
          buttonText={buttonText}
          showIconBack={showIconBack}
          showIconFront={showIconFront}
          iconFrontSrc={iconFront?.files[20]}
          iconBackSrc={iconBack?.files[20]}
        />
      </div>
      <div style={controlStackStyle}>
        <div>
          <label style={labelStyle}>Type</label>
          <select
            style={selectStyle}
            value={type}
            onChange={(e) => setType(e.target.value as ButtonType)}
          >
            <option value="primary">Primary</option>
            <option value="secondary">Secondary</option>
            <option value="tertiary">Tertiary</option>
          </select>
        </div>
        <div>
          <label style={labelStyle}>Size</label>
          <select
            style={selectStyle}
            value={size}
            onChange={(e) => setSize(e.target.value as ButtonSize)}
          >
            <option value="medium">Medium</option>
            <option value="large">Large</option>
          </select>
        </div>
        <div>
          <label style={labelStyle}>State</label>
          <select
            style={selectStyle}
            value={interaction}
            onChange={(e) => setInteraction(e.target.value as ButtonInteraction)}
            aria-label="Button state"
          >
            <option value="default">Default</option>
            <option value="hover">Hover</option>
            <option value="press">Pressed</option>
          </select>
        </div>
        <div style={toggleWrapStyle}>
          <label style={{ ...labelStyle, marginBottom: 0 }}>Disabled</label>
          <button
            type="button"
            role="switch"
            aria-checked={disabled}
            style={toggleTrackStyle(disabled)}
            onClick={() => setDisabled((v) => !v)}
          >
            <span style={toggleThumbStyle(disabled)} />
          </button>
        </div>
        <div>
          <label style={labelStyle}>Button text</label>
          <input
            type="text"
            style={inputStyle}
            value={buttonText}
            onChange={(e) => setButtonText(e.target.value)}
            placeholder="Button"
          />
        </div>
        <div style={toggleBlockStyle}>
          <div style={toggleWrapStyle}>
            <label style={{ ...labelStyle, marginBottom: 0 }}>Show Icon front</label>
            <button
              type="button"
              role="switch"
              aria-checked={showIconFront}
              style={toggleTrackStyle(showIconFront)}
              onClick={() => handleSetShowIconFront(!showIconFront)}
            >
              <span style={toggleThumbStyle(showIconFront)} />
            </button>
          </div>
          {showIconFront && (
            <div>
              <label style={labelStyle}>Icon (front)</label>
              <select
                style={selectStyle}
                value={iconFront?.id ?? ''}
                onChange={(e) => setIconFront(iconList.find((i) => i.id === e.target.value) ?? null)}
                aria-label="Choose icon for front"
              >
                {iconList.map((icon) => (
                  <option key={icon.id} value={icon.id}>
                    {icon.label}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>
        <div style={toggleBlockStyle}>
          <div style={toggleWrapStyle}>
            <label style={{ ...labelStyle, marginBottom: 0 }}>Show Icon back</label>
            <button
              type="button"
              role="switch"
              aria-checked={showIconBack}
              style={toggleTrackStyle(showIconBack)}
              onClick={() => handleSetShowIconBack(!showIconBack)}
            >
              <span style={toggleThumbStyle(showIconBack)} />
            </button>
          </div>
          {showIconBack && (
            <div>
              <label style={labelStyle}>Icon (back)</label>
              <select
                style={selectStyle}
                value={iconBack?.id ?? ''}
                onChange={(e) => setIconBack(iconList.find((i) => i.id === e.target.value) ?? null)}
                aria-label="Choose icon for back"
              >
                {iconList.map((icon) => (
                  <option key={icon.id} value={icon.id}>
                    {icon.label}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export const Default: Story = {
  render: () => <ButtonWithControls />,
  parameters: {
    docs: {
      description: {
        story: 'Use the controls to the right to change type (Primary, Secondary, Tertiary), size (Medium, Large), state (Default, Hover, Pressed), disabled, button text, and whether to show front or back icons. Pressed state shows the accent border; disabled uses grey styling.',
      },
    },
  },
};

export const PrimaryMedium: Story = {
  args: {
    type: 'primary',
    size: 'medium',
    interaction: 'default',
    buttonText: 'Button',
  },
};

export const SecondaryLarge: Story = {
  args: {
    type: 'secondary',
    size: 'large',
    interaction: 'default',
    buttonText: 'Button',
  },
};

export const SecondaryLargePressed: Story = {
  args: {
    type: 'secondary',
    size: 'large',
    interaction: 'press',
    buttonText: 'Button',
    showIconFront: true,
    showIconBack: true,
  },
};

export const Disabled: Story = {
  args: {
    type: 'primary',
    size: 'medium',
    interaction: 'default',
    disabled: true,
    buttonText: 'Button',
  },
};
