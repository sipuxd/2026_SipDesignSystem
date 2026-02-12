import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta = {
  title: 'Foundations/Typography',
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Desktop and mobile type scale. Use the typography CSS variables or utility classes.',
      },
    },
  },
};

export default meta;

type Story = StoryObj;

export const DesktopScale: Story = {
  render: () => (
    <div style={{ fontFamily: 'var(--font-family-source-sans-3)' }}>
      <h1 style={{ fontFamily: 'var(--desktop-h1-bold-font-family)', fontSize: 'var(--desktop-h1-bold-font-size)', fontWeight: 'var(--desktop-h1-bold-font-weight)', lineHeight: 'var(--desktop-h1-bold-line-height)', margin: '0 0 16px' }}>Heading 1 Bold</h1>
      <h2 style={{ fontFamily: 'var(--desktop-h2-bold-font-family)', fontSize: 'var(--desktop-h2-bold-font-size)', fontWeight: 'var(--desktop-h2-bold-font-weight)', lineHeight: 'var(--desktop-h2-bold-line-height)', margin: '0 0 16px' }}>Heading 2 Bold</h2>
      <h3 style={{ fontFamily: 'var(--desktop-h3-bold-font-family)', fontSize: 'var(--desktop-h3-bold-font-size)', fontWeight: 'var(--desktop-h3-bold-font-weight)', lineHeight: 'var(--desktop-h3-bold-line-height)', margin: '0 0 16px' }}>Heading 3 Bold</h3>
      <h4 style={{ fontFamily: 'var(--desktop-h4-bold-font-family)', fontSize: 'var(--desktop-h4-bold-font-size)', fontWeight: 'var(--desktop-h4-bold-font-weight)', lineHeight: 'var(--desktop-h4-bold-line-height)', margin: '0 0 16px' }}>Heading 4 Bold</h4>
      <h5 style={{ fontFamily: 'var(--desktop-h5-bold-font-family)', fontSize: 'var(--desktop-h5-bold-font-size)', fontWeight: 'var(--desktop-h5-bold-font-weight)', lineHeight: 'var(--desktop-h5-bold-line-height)', margin: '0 0 16px' }}>Heading 5 Bold</h5>
      <h6 style={{ fontFamily: 'var(--desktop-h6-bold-font-family)', fontSize: 'var(--desktop-h6-bold-font-size)', fontWeight: 'var(--desktop-h6-bold-font-weight)', lineHeight: 'var(--desktop-h6-bold-line-height)', margin: '0 0 16px' }}>Heading 6 Bold</h6>
      <p style={{ fontFamily: 'var(--desktop-body-regular-font-family)', fontSize: 'var(--desktop-body-regular-font-size)', fontWeight: 'var(--desktop-body-regular-font-weight)', lineHeight: 'var(--desktop-body-regular-line-height)', margin: '0 0 8px' }}>Body regular — 16px</p>
      <p className="desktop-small-regular" style={{ margin: 0 }}>Small regular — 14px</p>
    </div>
  ),
};

export const MobileScale: Story = {
  render: () => (
    <div style={{ fontFamily: 'var(--font-family-source-sans-3)' }}>
      <p style={{ fontFamily: 'var(--mobile-body-regular-font-family)', fontSize: 'var(--mobile-body-regular-font-size)', lineHeight: 'var(--mobile-body-regular-line-height)' }}>Mobile Body — 18px</p>
      <p style={{ fontFamily: 'var(--mobile-small-regular-font-family)', fontSize: 'var(--mobile-small-regular-font-size)', lineHeight: 'var(--mobile-small-regular-line-height)' }}>Mobile Small — 16px</p>
    </div>
  ),
};
