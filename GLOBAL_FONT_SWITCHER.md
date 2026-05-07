# Global Font Switcher Implementation

## Overview
A global font switcher has been implemented that allows users to dynamically change the application font across all pages instantly. Changes are persisted in localStorage.

## How It Works

### 1. **GlobalFontProvider** (`src/components/common/GlobalFontProvider.tsx`)
- Creates a React Context to manage global font state
- Manages 3 fonts: `geist`, `inter`, `mono`
- Loads saved font preference from localStorage on mount
- Applies font changes to:
  - CSS custom property (`--global-font-family`)
  - HTML element style
  - Body element style
  - All elements with font classes

### 2. **GlobalFontSwitcher** (`src/components/common/GlobalFontSwitcher.tsx`)
- Dropdown button with `Aa` icon (CaseSensitive)
- Shows 3 font options with visual indication of current selection
- Handles click-outside to close dropdown
- Includes hydration safety check (only renders on client)

### 3. **Integration Points**

#### CSS Foundation (`src/app/globals.css`)
```css
:root {
  --global-font-family: var(--font-geist-sans), system-ui, -apple-system, sans-serif;
}

html {
  font-family: var(--global-font-family);
}

body {
  font-family: var(--global-font-family);
}
```

#### Layout (`src/app/layout.tsx`)
- Imports `Inter` and `JetBrains_Mono` fonts from Next.js Google Fonts
- Applies font variables to HTML `<body>` class

#### Providers (`src/components/layout/Providers.tsx`)
- Wraps app with `GlobalFontProvider`
- Positioned inside `ThemeProvider` for proper context hierarchy

#### Header (`src/components/layout/Header.tsx`)
- Imports `GlobalFontSwitcher`
- Added to desktop navbar (after nav items, before theme toggle)
- Added to mobile bottom nav
- Separated by visual dividers

## Font Options

| Font | CSS Variable | Type | Use Case |
|------|--------------|------|----------|
| Geist Sans | `--font-geist-sans` | Default | General purpose, clean, modern |
| Inter | `--font-inter` | Clean | Optimal for reading, professional |
| JetBrains | `--font-jetbrains` | Monospace | Code-like, distinctive |

## Application Mechanism

### Direct DOM Manipulation
When a font is selected, the provider:

1. Updates CSS custom property:
   ```javascript
   html.style.setProperty("--global-font-family", FONT_FAMILIES[font]);
   ```

2. Applies directly to elements:
   ```javascript
   html.style.fontFamily = FONT_FAMILIES[font];
   body.style.fontFamily = FONT_FAMILIES[font];
   ```

3. Forces update on all font-related elements:
   ```javascript
   for (const el of document.querySelectorAll("[class*='font-']")) {
     el.style.fontFamily = FONT_FAMILIES[font];
   }
   ```

### Persistence
- Font preference saved to localStorage as `global-font`
- Loads on page refresh automatically
- Works across all pages and navigation

## Components That Apply Fonts

The font change applies to:
- ✅ All headings (h1-h6)
- ✅ Paragraph text
- ✅ Navigation items
- ✅ Buttons
- ✅ Form inputs
- ✅ Blog posts and articles
- ✅ All UI components
- ✅ Tables and lists

**Exceptions:**
- Code blocks maintain monospace font (intentional)
- Specific styled text may override

## User Experience

1. **Click** the `Aa` icon in navbar
2. **Select** a font from dropdown
3. **Entire app updates instantly**
4. Selection is **remembered** on page refresh
5. Works **on all pages** of the application

## Technical Details

### State Management
- Uses React Context for global state
- localStorage for persistence
- Hydration-safe with mounted check

### Performance
- Minimal re-renders
- Direct DOM manipulation for instant feedback
- No unnecessary context updates

### Browser Compatibility
- Works on all modern browsers with CSS variables support
- localStorage support required for persistence
- Graceful fallback to default font if localStorage unavailable

## Testing

To verify font switching:

1. Open the application
2. Click the `Aa` icon in the top navigation
3. Select "Inter" - notice all text changes to Inter font
4. Select "JetBrains" - notice all text changes to monospace
5. Refresh the page - font preference should persist
6. Navigate to different pages - font remains consistent

## Files Modified

- `src/app/globals.css` - Added CSS variables and root font-family
- `src/app/layout.tsx` - Added font imports
- `src/components/layout/Providers.tsx` - Wrapped with GlobalFontProvider
- `src/components/layout/Header.tsx` - Added GlobalFontSwitcher button

## Files Created

- `src/components/common/GlobalFontProvider.tsx` - Context provider
- `src/components/common/GlobalFontSwitcher.tsx` - UI component

## Future Enhancements

- Add font size presets along with font selection
- Font preview in dropdown
- Combine with theme switcher for preset font+theme combinations
- Accessibility: WCAG AA compliance for font sizes
