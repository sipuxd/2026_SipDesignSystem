import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

const colorGroups: Record<string, string[]> = {
  Black: ['--color-black-medium-black', '--color-black-solid-black', '--color-black-light-black'],
  White: ['--color-white-soft-white', '--color-white-grayish-white', '--color-white-solid-white'],
  Gray: ['--color-gray-solid-grey', '--color-gray-hint-grey', '--color-gray-light-gray', '--color-gray-soft-gray'],
  Primary: ['--color-primary-dark-green', '--color-primary-sip-green', '--color-primary-light-green', '--color-primary-hint-green', '--color-primary-soft-green'],
  'Link Blue': ['--color-link-blue-link-blue', '--color-link-blue-link-dark-blue'],
  Accent: ['--color-accent-soft-yellow', '--color-accent-metallic-gold', '--color-accent-accent-grey', '--color-accent-cream'],
  Utility: ['--color-utility-success', '--color-utility-warning', '--color-utility-danger'],
  Background: ['--palette-background-paper'],
};

function ColorSwatch({ variable }: { variable: string }) {
  const name = variable.replace(/^--color-|^--palette-/, '').replace(/-/g, ' ');
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
      <div
        style={{
          width: 48,
          height: 48,
          borderRadius: 8,
          backgroundColor: `var(${variable})`,
          border: '1px solid rgba(0,0,0,0.1)',
          flexShrink: 0,
        }}
      />
      <div>
        <div style={{ fontFamily: 'var(--font-family-source-sans-3)', fontWeight: 600, fontSize: 14 }}>{name}</div>
        <code style={{ fontSize: 12, color: '#666' }}>{variable}</code>
      </div>
    </div>
  );
}

const meta: Meta = {
  title: 'Foundations/Colors',
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Design system color palette. Use CSS variables in your styles.',
      },
    },
  },
};

export default meta;

type Story = StoryObj;

export const Palette: Story = {
  render: () => (
    <div style={{ fontFamily: 'var(--font-family-source-sans-3)' }}>
      {Object.entries(colorGroups).map(([group, vars]) => (
        <section key={group} style={{ marginBottom: 32 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 16 }}>{group}</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 8 }}>
            {vars.map((v) => (
              <ColorSwatch key={v} variable={v} />
            ))}
          </div>
        </section>
      ))}
    </div>
  ),
};
