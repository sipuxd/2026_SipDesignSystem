# Button Component Structure Analysis

## Overview

Your button components are well-structured using a **variant-based system** with clear separation of concerns. The buttons use your design system foundations (colors, typography, spacing, elevation) consistently.

## Component Architecture

### Main Button Structure

Your buttons use a **3-dimensional variant system**:

```
Button Variants = Type × Size × Interaction
```

#### 1. **Type** (Visual Style)
- **Primary** - Main action button (uses SIP Green background)
- **Secondary** - Secondary action button (outlined style)
- **Tertiary** - Tertiary action button (text style)
- *Note: There's a typo in Figma naming: "Tirtiary" should be "Tertiary"*

#### 2. **Size**
- **Large** - 40px height
- **Medium** - 32px height

#### 3. **Interaction States**
- **Default** - Initial state
- **Hover** - Hover state
- **Press** - Active/pressed state

### Total Variants: 3 types × 2 sizes × 3 states = **18 standard button variants**

## Design Token Usage

### Primary Button
```json
{
  "backgroundColor": "Color/Primary/Sip Green" (#008540),
  "textColor": "Color/White/Solid White" (#ffffff),
  "typography": "Body/Bold" (16px, bold, 1.5 line-height),
  "spacing": "Spacing/8px, Spacing/12px, Spacing/4px"
}
```

### Secondary Button
```json
{
  "backgroundColor": "transparent" (or soft green background),
  "textColor": "Color/Primary/Dark Green" (#026335),
  "borderColor": "Color/Primary/Dark Green",
  "typography": "Body/Medium" (16px, medium, 1.5 line-height),
  "spacing": "Spacing/8px, Spacing/12px, Spacing/4px"
}
```

### Typography Tokens Used
- `Body/Bold` - For Primary buttons
- `Body/Medium` - For Secondary buttons
- Font size: `16px` (Desktop Body size)
- Line height: `1.5` (150%)

### Spacing Tokens Used
- `Spacing/4px` - Internal padding
- `Spacing/8px` - Internal spacing
- `Spacing/12px` - Internal spacing

## Button Categories

### 1. Standard Buttons
**Location:** Main "Button" frame
- Primary, Secondary, Tertiary variants
- Large and Medium sizes
- Default, Hover, Press states

**Structure:**
```
Type=Primary, Size=Large, Interaction=Default
Type=Primary, Size=Large, Interaction=Hover
Type=Primary, Size=Large, Interaction=Press
... (repeated for all combinations)
```

### 2. Icon Buttons (Small)
**Location:** "Button-icon-small" frame
- Size: 40px × 40px
- Types: delete, export, dragHandle, expanded, collapsed, edit, view
- States: default, hover

**Structure:**
```
Type=edit, State=default
Type=edit, State=hover
Type=delete, State=default
... (repeated for all icon types)
```

### 3. Icon Buttons (Large)
**Location:** "Button-icon-large" frame
- Size: 52px × 52px
- Types: edit, delete, export, collapsed, dragHandle, expanded
- States: default, hover

### 4. Expansion Buttons
**Location:** "Button-expansion" frame
- States: expanded, collapse
- Interactions: default, hover

**Structure:**
```
state=expanded, interaction=default
state=expanded, interaction=hover
state=collapse, interaction=default
state=collapse, interaction=hover
```

### 5. Navigation Buttons
**Location:** "Button-nav" frame
- States: active, inactive, hover
- Used for navigation/tab interfaces

## Strengths of Your Structure

### ✅ **Well-Organized**
- Clear separation between button types
- Logical grouping (standard, icon, expansion, nav)
- Consistent naming convention

### ✅ **Uses Design Tokens**
- Colors reference your brand tokens
- Typography uses your typography system
- Spacing uses your spacing scale
- Consistent with your design system foundations

### ✅ **Comprehensive States**
- All interaction states defined (default, hover, press)
- Different states for different button types
- Clear visual feedback

### ✅ **Flexible Icon Support**
- Optional front/back icons
- Icon buttons in multiple sizes
- Icons adapt to button state

## Recommendations for Component Library

### 1. **Component API Structure**

Based on your Figma structure, here's how your component API should look:

```typescript
interface ButtonProps {
  // Variant props
  type?: 'primary' | 'secondary' | 'tertiary';
  size?: 'large' | 'medium';
  
  // Content
  children: React.ReactNode;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right' | 'both';
  
  // States
  disabled?: boolean;
  loading?: boolean;
  
  // Interaction
  onClick?: () => void;
  
  // Styling
  className?: string;
}
```

### 2. **Semantic Token Mapping**

Your buttons would benefit from semantic tokens in `alias.json`:

```json
{
  "alias": {
    "button": {
      "primary": {
        "background": { "$value": "{brand.palette.primary.sipGreen}" },
        "text": { "$value": "{brand.palette.white.solidWhite}" },
        "hover": { "$value": "{brand.palette.primary.darkGreen}" }
      },
      "secondary": {
        "background": { "$value": "transparent" },
        "text": { "$value": "{brand.palette.primary.darkGreen}" },
        "border": { "$value": "{brand.palette.primary.darkGreen}" }
      }
    }
  }
}
```

### 3. **Component Implementation Example**

```jsx
// Button.tsx
import { alias } from '../tokens/alias.json';

const Button = ({ 
  type = 'primary', 
  size = 'medium',
  children,
  icon,
  iconPosition = 'right',
  disabled = false,
  onClick 
}) => {
  const baseStyles = {
    padding: size === 'large' ? '12px 16px' : '8px 12px',
    height: size === 'large' ? '40px' : '32px',
    borderRadius: '4px',
    fontFamily: 'var(--font-family-source-sans-3)',
    fontSize: 'var(--font-size-desktop-body)',
    lineHeight: '1.5',
    cursor: disabled ? 'not-allowed' : 'pointer',
    transition: 'all 0.2s ease',
  };

  const variantStyles = {
    primary: {
      backgroundColor: alias.button.primary.background,
      color: alias.button.primary.text,
      '&:hover': {
        backgroundColor: alias.button.primary.hover,
      },
      fontWeight: 'bold', // Body/Bold
    },
    secondary: {
      backgroundColor: alias.button.secondary.background,
      color: alias.button.secondary.text,
      border: `1px solid ${alias.button.secondary.border}`,
      fontWeight: 'medium', // Body/Medium
    },
    tertiary: {
      backgroundColor: 'transparent',
      color: alias.button.secondary.text,
      fontWeight: 'medium',
    }
  };

  return (
    <button
      style={{ ...baseStyles, ...variantStyles[type] }}
      disabled={disabled}
      onClick={onClick}
    >
      {iconPosition === 'left' && icon}
      {children}
      {iconPosition === 'right' && icon}
    </button>
  );
};
```

## Areas for Improvement

### 1. **Naming Consistency**
- Fix typo: "Tirtiary" → "Tertiary"
- Consider consistent naming: "Type" vs "Variant" (use one consistently)

### 2. **Missing States**
- **Disabled state** - Not visible in current structure
- **Loading state** - Not visible in current structure
- **Focus state** - Important for accessibility

### 3. **Size Variants**
- Consider adding **Small** size variant
- Consider adding **XLarge** for hero CTAs

### 4. **Icon Button Organization**
- Consider grouping icon buttons by size rather than type
- Or create a separate "IconButton" component category

### 5. **Documentation**
- Document when to use each button type
- Document spacing/padding values
- Document elevation (if buttons have elevation)

## Suggested Component Structure

```
components/
  Button/
    Button.tsx          # Main button component
    Button.stories.tsx  # Storybook stories
    Button.test.tsx     # Tests
    types.ts            # TypeScript types
    styles.ts           # Style definitions
  IconButton/
    IconButton.tsx      # Icon-only button
  ButtonGroup/
    ButtonGroup.tsx     # Button groups/segments
```

## Design Token Recommendations

### Add to `alias.json`:

```json
{
  "alias": {
    "button": {
      "primary": {
        "background": { "$value": "{brand.palette.primary.sipGreen}" },
        "backgroundHover": { "$value": "{brand.palette.primary.darkGreen}" },
        "text": { "$value": "{brand.palette.white.solidWhite}" }
      },
      "secondary": {
        "background": { "$value": "transparent" },
        "text": { "$value": "{brand.palette.primary.darkGreen}" },
        "border": { "$value": "{brand.palette.primary.darkGreen}" }
      },
      "tertiary": {
        "background": { "$value": "transparent" },
        "text": { "$value": "{brand.palette.primary.darkGreen}" }
      }
    },
    "iconButton": {
      "size": {
        "small": { "$value": "40px" },
        "large": { "$value": "52px" }
      }
    }
  }
}
```

## Summary

Your button structure is **well-designed** and follows design system best practices:

✅ **Strengths:**
- Clear variant system (Type × Size × State)
- Uses design tokens consistently
- Comprehensive state coverage
- Good organization

🔧 **Improvements:**
- Fix naming typo
- Add disabled/loading states
- Consider semantic tokens for better maintainability
- Document usage guidelines

The structure is ready for component library implementation and would work well with semantic tokens from your `alias.json` file!
