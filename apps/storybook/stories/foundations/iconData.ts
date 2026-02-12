/**
 * Flattened icon list from design tokens for the Icon Picker story.
 * Paths are converted to Storybook static URL format: /icons/<filename>
 */
import mapped from '@sip-design-system/tokens/mapped.json';

type IconFiles = { 16: string; 20: string; 24: string; 36: string };

function toUrl(assetPath: string): string {
  const filename = assetPath.replace(/^assets\/icons\//, '');
  return `/icons/${filename}`;
}

function formatLabel(key: string): string {
  return key
    .replace(/([A-Z])/g, ' $1')
    .replace(/^./, (s) => s.toUpperCase())
    .replace(/_/g, ' ')
    .trim();
}

export interface IconEntry {
  id: string;
  label: string;
  files: { 16: string; 20: string; 24: string; 36: string };
}

const iconCategories = ['social', 'navigation', 'arrows', 'ui', 'forms', 'actions', 'data'] as const;

export function getIconList(): IconEntry[] {
  const list: IconEntry[] = [];
  const icons = (mapped as { icons?: Record<string, Record<string, { files?: IconFiles }>> }).icons;
  if (!icons) return list;

  for (const category of iconCategories) {
    const categoryData = icons[category];
    if (!categoryData || typeof categoryData !== 'object') continue;
    for (const [name, data] of Object.entries(categoryData)) {
      if (name.startsWith('$') || !data?.files) continue;
      const files = data.files as IconFiles;
      list.push({
        id: `${category}.${name}`,
        label: formatLabel(name),
        files: {
          16: toUrl(files['16']),
          20: toUrl(files['20']),
          24: toUrl(files['24']),
          36: toUrl(files['36']),
        },
      });
    }
  }
  return list;
}

export const ICON_SIZES = [16, 20, 24, 36] as const;
export type IconSize = (typeof ICON_SIZES)[number];
