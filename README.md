# 2026 Sip Design System

2026 Design System brought in from Figma.

## Documentation (Storybook)

Foundations and components are documented in Storybook. Use it locally, or publish it so other projects can reference the live design system.

### Run locally

```bash
npm run storybook
```

### Publish Storybook (for use in future projects)

**Option 1: Chromatic (recommended)**  
[Chromatic](https://www.chromatic.com/) hosts Storybook and gives you a permanent URL. Free tier for open source and small teams.

1. Install dependencies (includes Chromatic): `npm install`
2. Create a project at [chromatic.com](https://www.chromatic.com/) and copy the project token.
3. Build and publish:
   ```bash
   npm run build-storybook
   npx chromatic --project-token=<YOUR_TOKEN> --storybook-build-dir=apps/storybook/storybook-static
   ```
   Or set `CHROMATIC_PROJECT_TOKEN` and run:
   ```bash
   npm run build-storybook && npm run publish-storybook
   ```
4. Add the Chromatic URL to this README and share it with your team.

**Option 2: Static deploy**  
Deploy the built folder to any static host (Netlify, Vercel, GitHub Pages, S3, etc.):

```bash
npm run build-storybook
```

Then deploy the contents of `apps/storybook/storybook-static/` to your host. No server or build step required on the host.

After you deploy, add the live URL here:

- **Storybook:** *(e.g. https://your-project.chromatic.com)*

## Install tokens package

To use design tokens (CSS variables and JSON) in another app:

```bash
npm install @sip-design-system/tokens
```

Then import the stylesheet: `import '@sip-design-system/tokens/design-tokens.css'`. See [packages/tokens/README.md](packages/tokens/README.md).

## Design system sources (Figma)

- **Components (source of truth):** [2026 - SIP Design System](https://www.figma.com/design/OhvdRjc8MDdIYteTWMIU2k/2026---SIP-Design-System)  
  All UI components (buttons, etc.) are defined here. Use this file when building or checking components.

- **Foundations / tokens:** [2026 - SIP_DS_Foundations](https://www.figma.com/design/5abNQShIsPh4oFUoOHSQte/2026---SIP_DS_Foundations)  
  Design tokens (colors, typography, spacing, grid, elevation) in this repo were extracted from this file. Token and grid documentation (e.g. `DESIGN_TOKENS.md`, `documentation/GRID_SYSTEM_FEEDBACK.md`) reference it.

For more detail, see [SOURCES.md](SOURCES.md).
