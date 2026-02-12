# Should You Use Alias Tokens? Decision Guide

## Your Valid Concern

You're absolutely right to question this! Your button components **already have semantic meaning** through component properties:

```jsx
<Button 
  type="primary"        // ← Semantic meaning built-in
  interaction="hover"    // ← Semantic meaning built-in
/>
```

The component itself maps:
- `type="primary"` → `brand.palette.primary.sipGreen`
- `type="secondary"` → `brand.palette.primary.darkGreen`
- `interaction="hover"` → Different brand color

**So why would you need `alias.button.primary.background` if the component already knows what "primary" means?**

---

## When Alias Tokens ARE Useful

### 1. **Theme Support (Light/Dark Mode)** ✅

**The Problem:**
```jsx
// Component code
if (type === 'primary') {
  backgroundColor = brand.palette.primary.sipGreen  // Always green
}
```

**With Alias Tokens:**
```json
// Light theme
{
  "alias": {
    "button": {
      "primary": {
        "background": { "$value": "{brand.palette.primary.sipGreen}" }
      }
    }
  }
}

// Dark theme
{
  "alias": {
    "button": {
      "primary": {
        "background": { "$value": "{brand.palette.primary.lightGreen}" }  // Lighter for dark mode
      }
    }
  }
}
```

**Component code stays the same:**
```jsx
// Component doesn't change!
backgroundColor = alias.button.primary.background  // Swaps automatically
```

**Verdict:** ✅ **Use alias tokens if you plan to support themes**

---

### 2. **Context-Agnostic Colors** ✅

**Colors used across many components, not tied to specific components:**

```json
{
  "alias": {
    "text": {
      "primary": { "$value": "{brand.palette.black.solidBlack}" },
      "secondary": { "$value": "{brand.palette.gray.solidGrey}" }
    },
    "background": {
      "surface": { "$value": "{brand.palette.white.solidWhite}" },
      "elevated": { "$value": "{brand.palette.white.softWhite}" }
    }
  }
}
```

**Used in:**
- Text components: `<Text color={alias.text.primary}>`
- Card components: `<Card background={alias.background.surface}>`
- Input components: `<Input textColor={alias.text.primary}>`
- Many other components

**Verdict:** ✅ **Use alias tokens for colors used across multiple components**

---

### 3. **Changing Brand Colors Without Component Changes** ✅

**Scenario:** You decide to change your primary color from green to blue.

**Without Alias:**
```jsx
// Must update every component
if (type === 'primary') {
  backgroundColor = brand.palette.primary.sipGreen  // Change here
}
// Also update in Card, Badge, Alert, etc.
```

**With Alias:**
```json
// Change once in alias.json
{
  "alias": {
    "interactive": {
      "primary": { "$value": "{brand.palette.primary.newBlue}" }  // Change here
    }
  }
}
```

**Verdict:** ✅ **Use alias tokens if you want to change brand colors without touching component code**

---

## When Alias Tokens Are NOT Needed

### 1. **Component-Specific Semantics** ❌

**Your buttons already have this:**
```jsx
<Button type="primary" />  // Component knows what "primary" means
```

**Alias tokens would be redundant:**
```json
// This is unnecessary if component already has type="primary"
{
  "alias": {
    "button": {
      "primary": { "$value": "{brand.palette.primary.sipGreen}" }
    }
  }
}
```

**Component can map directly:**
```jsx
// Component code
const colors = {
  primary: brand.palette.primary.sipGreen,
  secondary: brand.palette.primary.darkGreen,
  tertiary: 'transparent'
};

backgroundColor = colors[type];  // Direct mapping, no alias needed
```

**Verdict:** ❌ **Don't use alias tokens for component-specific semantics**

---

### 2. **Single Theme, No Plans for Multiple Themes** ❌

If you're only ever going to have one theme (light mode), alias tokens add complexity without benefit.

**Verdict:** ❌ **Skip alias tokens if single theme is permanent**

---

### 3. **Brand Colors Won't Change** ❌

If your brand colors are locked in and won't change, alias tokens don't provide value.

**Verdict:** ❌ **Skip alias tokens if brand colors are permanent**

---

## Recommendation for Your System

### ✅ **Use Alias Tokens For:**

1. **Text Colors** (used across many components)
   ```json
   {
     "alias": {
       "text": {
         "primary": { "$value": "{brand.palette.black.solidBlack}" },
         "secondary": { "$value": "{brand.palette.gray.solidGrey}" },
         "hint": { "$value": "{brand.palette.gray.hintGrey}" },
         "inverse": { "$value": "{brand.palette.white.solidWhite}" }
       }
     }
   }
   ```

2. **Background Colors** (used across many components)
   ```json
   {
     "alias": {
       "background": {
         "default": { "$value": "{brand.palette.white.solidWhite}" },
         "elevated": { "$value": "{brand.palette.white.softWhite}" },
         "subtle": { "$value": "{brand.palette.primary.softGreen}" }
       }
     }
   }
   ```

3. **Border Colors** (used across many components)
   ```json
   {
     "alias": {
       "border": {
         "default": { "$value": "{brand.palette.gray.softGray}" },
         "focus": { "$value": "{brand.palette.primary.sipGreen}" }
       }
     }
   }
   ```

### ❌ **Don't Use Alias Tokens For:**

1. **Button-specific colors** - Component already has `type="primary"`
2. **Component-specific variants** - Component props handle this
3. **One-off use cases** - Use brand tokens directly

---

## Hybrid Approach (Recommended)

### Minimal Alias Tokens

Only create alias tokens for colors that are:
- Used across **multiple components**
- **Context-agnostic** (not tied to specific components)
- Might need to **change for themes**

```json
{
  "alias": {
    "text": {
      "primary": { "$value": "{brand.palette.black.solidBlack}" },
      "secondary": { "$value": "{brand.palette.gray.solidGrey}" },
      "hint": { "$value": "{brand.palette.gray.hintGrey}" },
      "inverse": { "$value": "{brand.palette.white.solidWhite}" },
      "link": { "$value": "{brand.palette.linkBlue.linkBlue}" }
    },
    "background": {
      "default": { "$value": "{brand.palette.white.solidWhite}" },
      "elevated": { "$value": "{brand.palette.white.softWhite}" },
      "subtle": { "$value": "{brand.palette.primary.softGreen}" }
    },
    "border": {
      "default": { "$value": "{brand.palette.gray.softGray}" },
      "focus": { "$value": "{brand.palette.primary.sipGreen}" }
    },
    "status": {
      "success": { "$value": "{brand.palette.utility.success}" },
      "warning": { "$value": "{brand.palette.utility.warning}" },
      "error": { "$value": "{brand.palette.utility.danger}" }
    }
  }
}
```

**That's it!** No button-specific alias tokens because buttons handle their own semantics.

---

## Component Implementation Examples

### Button Component (No Alias Needed)

```jsx
// Button.tsx - Direct brand token mapping
const Button = ({ type = 'primary', interaction = 'default' }) => {
  const colorMap = {
    primary: {
      default: brand.palette.primary.sipGreen,
      hover: brand.palette.primary.darkGreen,
      press: brand.palette.primary.darkGreen
    },
    secondary: {
      default: 'transparent',
      hover: brand.palette.primary.softGreen,
      press: brand.palette.primary.softGreen
    },
    tertiary: {
      default: 'transparent',
      hover: brand.palette.primary.hintGreen,
      press: brand.palette.primary.hintGreen
    }
  };

  return (
    <button style={{
      backgroundColor: colorMap[type][interaction]
    }}>
      {/* ... */}
    </button>
  );
};
```

**No alias tokens needed** - Component handles its own semantics.

---

### Text Component (Uses Alias)

```jsx
// Text.tsx - Uses alias tokens
const Text = ({ variant = 'primary' }) => {
  const colorMap = {
    primary: alias.text.primary,
    secondary: alias.text.secondary,
    hint: alias.text.hint,
    inverse: alias.text.inverse,
    link: alias.text.link
  };

  return (
    <p style={{ color: colorMap[variant] }}>
      {/* ... */}
    </p>
  );
};
```

**Uses alias tokens** - Text colors are context-agnostic and used across many components.

---

### Card Component (Uses Alias)

```jsx
// Card.tsx - Uses alias tokens
const Card = ({ elevation = 0 }) => {
  return (
    <div style={{
      backgroundColor: alias.background.elevated,
      borderColor: alias.border.default,
      boxShadow: mapped.elevation[elevation]
    }}>
      {/* ... */}
    </div>
  );
};
```

**Uses alias tokens** - Background and border colors are context-agnostic.

---

## Decision Matrix

| Use Case | Alias Tokens? | Why |
|----------|---------------|-----|
| Button `type="primary"` | ❌ No | Component already has semantic meaning |
| Text colors across components | ✅ Yes | Context-agnostic, used everywhere |
| Background colors | ✅ Yes | Context-agnostic, used everywhere |
| Border colors | ✅ Yes | Context-agnostic, used everywhere |
| Status colors (success/error) | ✅ Yes | Used across Alert, Badge, Toast, etc. |
| Component-specific variants | ❌ No | Component props handle this |
| Single theme, no theme plans | ❌ Maybe | Only if colors used across many components |
| Multiple themes planned | ✅ Yes | Essential for theme switching |

---

## Final Recommendation

### ✅ **Keep Alias Tokens, But Minimize Them**

**Create alias tokens for:**
- Text colors (primary, secondary, hint, inverse, link)
- Background colors (default, elevated, subtle)
- Border colors (default, focus)
- Status colors (success, warning, error)

**Don't create alias tokens for:**
- Button-specific colors (component handles this)
- Component-specific variants (component props handle this)
- One-off use cases (use brand tokens directly)

### Simplified `alias.json`:

```json
{
  "$schema": "https://schemas.tokens.studio/token-transformer/schema",
  "$description": "Alias collection - semantic tokens for context-agnostic colors",
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
    "border": {
      "default": { "$value": "{brand.palette.gray.softGray}" },
      "subtle": { "$value": "{brand.palette.gray.lightGray}" },
      "focus": { "$value": "{brand.palette.primary.sipGreen}" }
    },
    "status": {
      "success": { "$value": "{brand.palette.utility.success}" },
      "warning": { "$value": "{brand.palette.utility.warning}" },
      "error": { "$value": "{brand.palette.utility.danger}" }
    }
  }
}
```

**That's it!** Keep it simple and only for colors that are truly context-agnostic.

---

## Summary

**Your instinct is correct:** Alias tokens for button-specific colors are redundant because your component already has semantic meaning through props.

**But alias tokens ARE useful for:**
- Colors used across multiple components (text, background, border)
- Theme support (if you plan to add dark mode)
- Status colors (used in Alert, Badge, Toast, etc.)

**Recommendation:** Keep a minimal `alias.json` with only context-agnostic colors. Let components handle their own component-specific semantics.
