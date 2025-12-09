# No Pixie iTerm2 Color Schemes

iTerm2 color schemes based on the No Pixie VS Code themes. These themes provide consistent terminal colors across VS Code and iTerm2.

## Available Color Schemes

This directory contains 8 iTerm2 color schemes:

### Purple (Original)
- **No Pixie Dark** - Dark theme with purple accents
- **No Pixie Dark High Contrast** - High contrast dark variant
- **No Pixie Light** - Light theme with purple accents
- **No Pixie Light High Contrast** - High contrast light variant

### Blue
- **No Pixie Blue Dark** - Dark theme with blue accents
- **No Pixie Blue Light** - Light theme with blue accents

### Yellow
- **No Pixie Yellow Dark** - Dark theme with yellow/golden accents
- **No Pixie Yellow Light** - Light theme with yellow/golden accents

## Installation

### Method 1: Double-Click Import (Recommended)

1. Download your desired `.itermcolors` file from this directory
2. Double-click the downloaded file
3. iTerm2 will automatically import the color scheme

### Method 2: Manual Import

1. Open iTerm2
2. Go to **Preferences** (⌘+,)
3. Navigate to **Profiles** → **Colors**
4. Click the **Color Presets** dropdown (bottom right)
5. Select **Import...**
6. Choose your desired `.itermcolors` file
7. The theme will appear in the Color Presets dropdown
8. Select it to apply

## Activation

After importing, activate the theme:

1. Open iTerm2 Preferences (⌘+,)
2. Go to **Profiles** → **Colors**
3. Click the **Color Presets** dropdown
4. Select your imported "No Pixie" theme

## Color Mapping

These iTerm themes are automatically generated from the VS Code theme files and include:

- **ANSI Colors (0-15)** - All 16 terminal colors (normal + bright variants)
- **Background/Foreground** - Terminal text and background colors
- **Cursor Colors** - Cursor and cursor text colors
- **Selection Colors** - Selected text highlighting
- **Link Colors** - Clickable URL colors
- **Badge Colors** - Status badge colors

## Relationship to VS Code Themes

The iTerm themes are generated from the same color definitions as the VS Code themes, ensuring visual consistency when using both editors. The conversion script maps:

- Terminal ANSI colors directly from VS Code terminal color definitions
- UI colors from relevant VS Code theme elements (cursor, selection, etc.)

## Building from Source

If you want to regenerate the iTerm themes from the VS Code source files:

```bash
npm run build:iterm
```

This will read all theme files from the `themes/` directory and generate corresponding `.itermcolors` files.

## License

MIT - Same as the No Pixie VS Code theme

## Related

- [No Pixie VS Code Theme](https://github.com/nopixie/nopixie-theme) - The original VS Code theme
- [VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=no-pixie.nopixie-theme) - Install the VS Code theme
