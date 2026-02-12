import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { IconPicker } from './IconPicker';

const sampleIcons = [
  { name: 'add', size: 16 },
  { name: 'edit', size: 16 },
  { name: 'delete', size: 16 },
  { name: 'search', size: 16 },
  { name: 'home', size: 24 },
  { name: 'instagram', size: 36 },
];

function iconPath(name: string, size: number): string {
  const fileName = name === 'X_(formerly Twitter)' ? 'X_(formerly Twitter)' : name;
  return `/icons/Icon - ${size}px - ${fileName}.svg`;
}

const meta: Meta = {
  title: 'Foundations/Icons',
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Icon set in 16px, 20px, 24px, 36px. SVGs live in assets/icons. Categories: social, navigation, arrows, ui, forms, actions, data.',
      },
    },
  },
};

export default meta;

type Story = StoryObj;

export const Sizes: Story = {
  render: () => (
    <div style={{ fontFamily: 'var(--font-family-source-sans-3)' }}>
      <p style={{ marginBottom: 16, fontSize: 14, color: '#666' }}>
        Icon sizes: 16px, 20px, 24px, 36px. Use <code>--icon-size-16</code>, <code>--icon-size-20</code>, <code>--icon-size-24</code>, <code>--icon-size-36</code>.
      </p>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 24, alignItems: 'flex-end' }}>
        {[16, 20, 24, 36].map((size) => (
          <div key={size} style={{ textAlign: 'center' }}>
            <img
              src={`/icons/Icon - ${size}px - add.svg`}
              alt={`add ${size}px`}
              width={size}
              height={size}
              style={{ display: 'block', marginBottom: 8 }}
            />
            <span style={{ fontSize: 12 }}>{size}px</span>
          </div>
        ))}
      </div>
    </div>
  ),
};

export const SampleIcons: Story = {
  render: () => (
    <div style={{ fontFamily: 'var(--font-family-source-sans-3)', display: 'flex', flexWrap: 'wrap', gap: 24 }}>
      {sampleIcons.map(({ name, size }) => (
        <div key={`${name}-${size}`} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
          <img
            src={iconPath(name, size)}
            alt={name}
            width={size}
            height={size}
          />
          <span style={{ fontSize: 12 }}>{name}</span>
        </div>
      ))}
    </div>
  ),
};

export const IconPickerDemo: Story = {
  render: () => <IconPicker />,
  parameters: {
    docs: {
      description: {
        story: 'Select an icon from the dropdown (each option shows the icon at 16px with its label). The selected icon appears to the left. Use the size dropdown below to change the display size (16, 20, 24, or 36px).',
      },
    },
  },
};
