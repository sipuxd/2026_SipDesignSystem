# Alias Tokens (Semantic Tokens) Guide

## Overview

The `alias.json` file contains **semantic tokens** that bridge between your **Brand** tokens (raw design values) and **Mapped** tokens (component-specific implementations). Semantic tokens provide meaning-based names that describe *how* colors and values are used, not just *what* they are.

## Why Semantic Tokens?

### Current Architecture (Without Alias)

```
Brand Token: palette.primary.sipGreen (#008540)
  ↓
Component uses brand directly: color={brand.palette.primary.sipGreen}
```

**Problem:** Components are tightly coupled to brand structure. If you change brand colors, you must update every component.

### With Semantic Tokens

```
Brand Token: palette.primary.sipGreen (#008540)
  ↓
Alias Token: interactive.primary (references brand.palette.primary.sipGreen)
  ↓
Component uses semantic name: color={alias.interactive.primary}
```

**Benefit:** Components use semantic meaning. Change brand colors once, and all components update automatically.

## When to Use Semantic Tokens

### ✅ Use Semantic Tokens For:

1. **Component Libraries** - Components should use semantic names, not brand structure
2. **Theme Support** - Easy to swap entire color schemes (light/dark mode)
3. **Maintainability** - Change brand values without touching component code
4. **Clarity** - Developers understand "text.primary" better than "black.solidBlack"

### ❌ You Don't Need Them For:

- Simple projects with single theme
- When mapped tokens already provide enough semantic meaning
- Prototypes or one-off projects

## Structure for Your Component Library

### Recommended Semantic Token Categories

Based on your current design system, here's how you could structure semantic tokens:

```json
{
  "alias": {
    "text": {
      "primary": { "$value": "{brand.palette.black.solidBlack}" },
      "secondary": { "$value": "{brand.palette.gray.solidGrey}" },
      "hint": { "$value": "{brand.palette.gray.hintGrey}" },
      "inverse": { "$value": "{brand.palette.white.solidWhite}" },
      "link": { "$value": "{brand.palette.linkBlue.linkBlue}" },
      "linkHover": { "$value": "{brand.palette.linkBlue.linkDarkBlue}" }
    },
    "background": {
      "default": { "$value": "{brand.palette.white.solidWhite}" },
      "elevated": { "$value": "{brand.palette.white.softWhite}" },
      "subtle": { "$value": "{brand.palette.primary.softGreen}" },
      "paper": { "$value": "{brand.palette.background.paper}" }
    },
    "interactive": {
      "primary": { "$value": "{brand.palette.primary.sipGreen}" },
      "primaryHover": { "$value": "{brand.palette.primary.darkGreen}" },
      "primaryLight": { "$value": "{brand.palette.primary.lightGreen}" },
      "link": { "$value": "{brand.palette.linkBlue.linkBlue}" },
      "linkHover": { "$value": "{brand.palette.linkBlue.linkDarkBlue}" }
    },
    "border": {
      "default": { "$value": "{brand.palette.gray.softGray}" },
      "subtle": { "$value": "{brand.palette.gray.lightGray}" },
      "focus": { "$value": "{brand.palette.primary.sipGreen}" }
    },
    "status": {
      "success": { "$value": "{brand.palette.utility.success}" },
      "warning": { "$value": "{brand.palette.utility.warning}" },
      "error": { "$value": "{brand.palette.utility.danger}" }
    },
    "accent": {
      "yellow": { "$value": "{brand.palette.accent.softYellow}" },
      "gold": { "$value": "{brand.palette.accent.metallicGold}" },
      "cream": { "$value": "{brand.palette.accent.cream}" }
    }
  }
}
```

## Component Library Usage Examples

### Example 1: Button Component

**Without Semantic Tokens:**
```jsx
// ❌ Component knows too much about brand structure
<Button 
  backgroundColor={brand.palette.primary.sipGreen}
  textColor={brand.palette.white.solidWhite}
  hoverColor={brand.palette.primary.darkGreen}
/>
```

**With Semantic Tokens:**
```jsx
// ✅ Component uses semantic meaning
<Button 
  variant="primary"
  // Internally uses: alias.interactive.primary
  // Internally uses: alias.text.inverse
  // Internally uses: alias.interactive.primaryHover
/>
```

### Example 2: Text Component

**Without Semantic Tokens:**
```jsx
// ❌ Direct brand reference
<Text color={brand.palette.black.solidBlack}>
  Primary text
</Text>
```

**With Semantic Tokens:**
```jsx
// ✅ Semantic meaning
<Text variant="primary">
  Primary text
</Text>

// Or with explicit semantic token
<Text color={alias.text.primary}>
  Primary text
</Text>
```

### Example 3: Card Component

**Without Semantic Tokens:**
```jsx
// ❌ Brand structure in component
<Card 
  backgroundColor={brand.palette.white.softWhite}
  borderColor={brand.palette.gray.softGray}
/>
```

**With Semantic Tokens:**
```jsx
// ✅ Semantic meaning
<Card 
  elevation="1"
  // Internally uses: alias.background.elevated
  // Internally uses: alias.border.default
/>
```

### Example 4: Alert Component

**Without Semantic Tokens:**
```jsx
// ❌ Direct utility color reference
<Alert 
  type="success"
  backgroundColor={brand.palette.utility.success}
  textColor={brand.palette.white.solidWhite}
/>
```

**With Semantic Tokens:**
```jsx
// ✅ Semantic status
<Alert 
  type="success"
  // Internally uses: alias.status.success
  // Internally uses: alias.text.inverse
/>
```

## Theme Support Example

One of the biggest benefits of semantic tokens is easy theme switching:

### Light Theme (Current)
```json
{
  "alias": {
    "text": {
      "primary": { "$value": "{brand.palette.black.solidBlack}" }
    },
    "background": {
      "default": { "$value": "{brand.palette.white.solidWhite}" }
    }
  }
}
```

### Dark Theme (Future)
```json
{
  "alias": {
    "text": {
      "primary": { "$value": "{brand.palette.white.solidWhite}" }
    },
    "background": {
      "default": { "$value": "{brand.palette.black.solidBlack}" }
    }
  }
}
```

**Result:** Your components don't change! They still use `alias.text.primary` and `alias.background.default`, but the values swap automatically.

## Implementation Strategy

### Phase 1: Start Building Components
- Build your first components using brand tokens directly
- Identify common patterns (e.g., "primary button always uses SIP green")

### Phase 2: Create Semantic Tokens
- As you build components, create semantic tokens for repeated patterns
- Start with the most common use cases (text, background, interactive)

### Phase 3: Refactor Components
- Update components to use semantic tokens
- Keep brand tokens as the source of truth

### Phase 4: Expand Semantic Layer
- Add more semantic tokens as needed
- Consider theme support if required

## Best Practices

### ✅ Do:

1. **Use semantic names** - `text.primary` not `black.solidBlack`
2. **Group by purpose** - `interactive`, `text`, `background`, not by color
3. **Reference brand tokens** - Always use `{brand.path.to.token}` syntax
4. **Document usage** - Add descriptions explaining when to use each token
5. **Keep it simple** - Don't create semantic tokens for one-off use cases

### ❌ Don't:

1. **Don't duplicate brand values** - Always reference, never copy
2. **Don't create too many layers** - Brand → Alias → Mapped is enough
3. **Don't mix concerns** - Keep semantic meaning separate from brand structure
4. **Don't over-engineer** - Only create semantic tokens you actually use

## Current Status

Your `alias.json` file is currently a placeholder. It will be populated as you:

1. **Build your component library** - Identify common patterns
2. **Extract from Figma** - If you have alias variables defined in Figma
3. **Define semantic needs** - As you build components, create semantic tokens

## Next Steps

1. **Start building components** using brand tokens directly
2. **Identify patterns** - Notice when you use the same brand token repeatedly
3. **Create semantic tokens** - Add them to `alias.json` as patterns emerge
4. **Refactor components** - Update to use semantic tokens for better maintainability

## Example: Complete Component with Semantic Tokens

```jsx
// Button.jsx
import { alias } from '../tokens/alias.json';

const Button = ({ variant = 'primary', children }) => {
  const styles = {
    primary: {
      backgroundColor: alias.interactive.primary,
      color: alias.text.inverse,
      '&:hover': {
        backgroundColor: alias.interactive.primaryHover
      }
    },
    secondary: {
      backgroundColor: alias.background.default,
      color: alias.text.primary,
      borderColor: alias.border.default
    }
  };

  return (
    <button style={styles[variant]}>
      {children}
    </button>
  );
};
```

## Resources

- [Design Tokens Community Group](https://www.designtokens.org/)
- [Style Dictionary Documentation](https://amzn.github.io/style-dictionary/)
- [W3C Design Tokens Format](https://tr.designtokens.org/format/)

---

**Remember:** Semantic tokens are a tool for maintainability and clarity. Start simple, add them as you need them, and don't over-engineer your token system.
