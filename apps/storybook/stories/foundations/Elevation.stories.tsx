import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

const levels = Array.from({ length: 24 }, (_, i) => i + 1);

const meta: Meta = {
  title: 'Foundations/Elevation',
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Elevation shadows 1–24 plus focused field. Use var(--elevation-n) or .elevation-n class.',
      },
    },
  },
};

export default meta;

type Story = StoryObj;

export const Levels: Story = {
  render: () => (
    <div style={{ fontFamily: 'var(--font-family-source-sans-3)', display: 'flex', flexWrap: 'wrap', gap: 24 }}>
      {levels.map((n) => (
        <div
          key={n}
          className={`elevation-${n}`}
          style={{
            width: 120,
            height: 80,
            borderRadius: 8,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 14,
            fontWeight: 600,
          }}
        >
          Elevation {n}
        </div>
      ))}
    </div>
  ),
};

export const FocusedField: Story = {
  render: () => (
    <div
      className="elevation-focused-field"
      style={{
        width: 200,
        height: 48,
        borderRadius: 8,
        background: 'var(--palette-background-paper)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'var(--font-family-source-sans-3)',
        fontSize: 14,
      }}
    >
      Focused field shadow
    </div>
  ),
};
