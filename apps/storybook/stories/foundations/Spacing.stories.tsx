import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

const spacingTokens = [2, 4, 8, 12, 16, 20, 24, 28, 32, 40, 48, 56, 64, 80, 96, 128];

const meta: Meta = {
  title: 'Foundations/Spacing',
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Spacing scale (2px–184px). Use var(--spacing-n) in CSS.',
      },
    },
  },
};

export default meta;

type Story = StoryObj;

export const Scale: Story = {
  render: () => (
    <div style={{ fontFamily: 'var(--font-family-source-sans-3)' }}>
      <p style={{ marginBottom: 16, fontSize: 14, color: '#666' }}>Selected spacing values. Full scale: 2, 4, 8, 12, 16, 20, 24, 28, 32, 36, 40, 44, 48, … 184</p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {spacingTokens.map((n) => (
          <div key={n} style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <div
              style={{
                width: `var(--spacing-${n})`,
                minWidth: `var(--spacing-${n})`,
                height: 24,
                backgroundColor: 'var(--color-primary-hint-green)',
                borderRadius: 4,
              }}
            />
            <code style={{ fontSize: 12 }}>--spacing-{n}</code>
          </div>
        ))}
      </div>
    </div>
  ),
};
