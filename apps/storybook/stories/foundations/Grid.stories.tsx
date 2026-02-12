import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta = {
  title: 'Foundations/Grid',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Responsive grid: 6 breakpoints (mobile → desktop-xxl). Use .grid and .container classes.',
      },
    },
  },
};

export default meta;

type Story = StoryObj;

export const Breakpoints: Story = {
  render: () => (
    <div style={{ fontFamily: 'var(--font-family-source-sans-3)', padding: 24 }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
        <thead>
          <tr style={{ borderBottom: '2px solid var(--color-gray-soft-gray)' }}>
            <th style={{ textAlign: 'left', padding: 8 }}>Breakpoint</th>
            <th style={{ textAlign: 'left', padding: 8 }}>Min</th>
            <th style={{ textAlign: 'left', padding: 8 }}>Columns</th>
            <th style={{ textAlign: 'left', padding: 8 }}>Gutter</th>
            <th style={{ textAlign: 'left', padding: 8 }}>Margin</th>
            <th style={{ textAlign: 'left', padding: 8 }}>Container</th>
          </tr>
        </thead>
        <tbody>
          {['mobile', 'tablet', 'desktop', 'desktop-l', 'desktop-xl', 'desktop-xxl'].map((bp) => (
            <tr key={bp} style={{ borderBottom: '1px solid var(--color-gray-soft-gray)' }}>
              <td style={{ padding: 8 }}>{bp}</td>
              <td style={{ padding: 8 }}>{bp === 'mobile' ? '320px' : bp === 'tablet' ? '480px' : bp === 'desktop' ? '640px' : bp === 'desktop-l' ? '1024px' : bp === 'desktop-xl' ? '1366px' : '1920px'}</td>
              <td style={{ padding: 8 }}>{bp === 'mobile' ? 4 : bp === 'tablet' || bp === 'desktop' ? 8 : 12}</td>
              <td style={{ padding: 8 }}>{bp === 'mobile' || bp === 'tablet' ? '16px' : '24px'}</td>
              <td style={{ padding: 8 }}>{bp === 'mobile' || bp === 'tablet' ? '16px' : bp === 'desktop' ? '24px' : bp === 'desktop-l' ? '32px' : bp === 'desktop-xl' ? '48px' : '80px'}</td>
              <td style={{ padding: 8 }}>{bp === 'mobile' ? '320px' : bp === 'tablet' ? '480px' : bp === 'desktop' ? '640px' : bp === 'desktop-l' ? '1024px' : bp === 'desktop-xl' ? '1366px' : '1920px'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  ),
};

export const ContainerDemo: Story = {
  render: () => (
    <div className="container" style={{ fontFamily: 'var(--font-family-source-sans-3)', paddingTop: 24, paddingBottom: 24 }}>
      <div className="grid" style={{ gap: 'var(--grid-gutter-mobile)' }}>
        {[1, 2, 3, 4].map((i) => (
          <div key={i} style={{ background: 'var(--color-primary-soft-green)', padding: 16, borderRadius: 8, minHeight: 60 }}>
            Column {i}
          </div>
        ))}
      </div>
    </div>
  ),
};
