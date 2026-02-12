# @sip-design-system/tokens

Design tokens (CSS variables and JSON) for the 2026 Sip Design System.

## Install

```bash
npm install @sip-design-system/tokens
```

## Usage

### CSS variables

Import the stylesheet to use design tokens as CSS custom properties:

```css
@import '@sip-design-system/tokens/design-tokens.css';
```

Or in JavaScript/React:

```js
import '@sip-design-system/tokens/design-tokens.css';
```

Then use the variables in your CSS:

```css
.my-button {
  background-color: var(--color-primary-sip-green);
  padding: var(--spacing-8) var(--spacing-16);
  box-shadow: var(--elevation-2);
}
```

### Token JSON

For build tools or style dictionaries:

```js
import brand from '@sip-design-system/tokens/brand.json';
import mapped from '@sip-design-system/tokens/mapped.json';
```

## Documentation

Full design system documentation (foundations, tokens, and components): **[Storybook](#)**  
*(Replace with your deployed Storybook URL after deployment.)*

Source of truth: **Foundations** from Figma [2026 - SIP_DS_Foundations](https://www.figma.com/design/5abNQShIsPh4oFUoOHSQte/2026---SIP_DS_Foundations). **Components** from [2026 - SIP Design System](https://www.figma.com/design/OhvdRjc8MDdIYteTWMIU2k/2026---SIP-Design-System).
