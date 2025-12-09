#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Convert hex color to RGB components (0.0-1.0 range)
function hexToRgb(hex) {
  // Remove # and handle alpha channel
  const cleanHex = hex.replace('#', '');

  const r = parseInt(cleanHex.slice(0, 2), 16) / 255;
  const g = parseInt(cleanHex.slice(2, 4), 16) / 255;
  const b = parseInt(cleanHex.slice(4, 6), 16) / 255;
  const a = cleanHex.length > 6 ? parseInt(cleanHex.slice(6, 8), 16) / 255 : 1.0;

  return { r, g, b, a };
}

// Generate iTerm color dict XML structure
function generateColorDict(red, green, blue, alpha = 1.0) {
  return `\t<dict>
\t\t<key>Alpha Component</key>
\t\t<real>${alpha}</real>
\t\t<key>Blue Component</key>
\t\t<real>${blue}</real>
\t\t<key>Color Space</key>
\t\t<string>sRGB</string>
\t\t<key>Green Component</key>
\t\t<real>${green}</real>
\t\t<key>Red Component</key>
\t\t<real>${red}</real>
\t</dict>`;
}

// Generate complete iTerm theme from VS Code theme
function generateItermTheme(vscodeTheme) {
  const colors = vscodeTheme.colors;
  const colorEntries = [];

  // Helper to add a color entry
  const addColor = (itermKey, vscodeKey, fallback = '#FFFFFF') => {
    const hexColor = colors[vscodeKey] || fallback;
    const rgb = hexToRgb(hexColor);
    colorEntries.push(`\t<key>${itermKey}</key>\n${generateColorDict(rgb.r, rgb.g, rgb.b, rgb.a)}`);
  };

  // ANSI Colors (0-15)
  addColor('Ansi 0 Color', 'terminal.ansiBlack');
  addColor('Ansi 1 Color', 'terminal.ansiRed');
  addColor('Ansi 2 Color', 'terminal.ansiGreen');
  addColor('Ansi 3 Color', 'terminal.ansiYellow');
  addColor('Ansi 4 Color', 'terminal.ansiBlue');
  addColor('Ansi 5 Color', 'terminal.ansiMagenta');
  addColor('Ansi 6 Color', 'terminal.ansiCyan');
  addColor('Ansi 7 Color', 'terminal.ansiWhite');
  addColor('Ansi 8 Color', 'terminal.ansiBrightBlack');
  addColor('Ansi 9 Color', 'terminal.ansiBrightRed');
  addColor('Ansi 10 Color', 'terminal.ansiBrightGreen');
  addColor('Ansi 11 Color', 'terminal.ansiBrightYellow');
  addColor('Ansi 12 Color', 'terminal.ansiBrightBlue');
  addColor('Ansi 13 Color', 'terminal.ansiBrightMagenta');
  addColor('Ansi 14 Color', 'terminal.ansiBrightCyan');
  addColor('Ansi 15 Color', 'terminal.ansiBrightWhite');

  // UI Colors
  addColor('Background Color', 'terminal.background');
  addColor('Foreground Color', 'terminal.foreground');
  addColor('Bold Color', 'terminal.foreground'); // iTerm applies bold styling
  addColor('Cursor Color', 'editorCursor.foreground');
  addColor('Cursor Text Color', 'terminal.background'); // Inverse of background
  addColor('Selection Color', 'terminal.selectionBackground');
  addColor('Selected Text Color', 'terminal.foreground');
  addColor('Link Color', 'textLink.foreground');
  addColor('Badge Color', 'badge.background');

  // Build complete plist
  const plist = `<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
${colorEntries.join('\n')}
</dict>
</plist>
`;

  return plist;
}

// Main execution
function main() {
  const themesDir = path.join(__dirname, '..', 'themes');
  const outputDir = path.join(__dirname, '..', 'iterm');

  // Ensure output directory exists
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  // Read all theme files
  const themeFiles = fs.readdirSync(themesDir)
    .filter(file => file.endsWith('.json'));

  console.log(`Converting ${themeFiles.length} VS Code themes to iTerm format...\n`);

  themeFiles.forEach(file => {
    const themePath = path.join(themesDir, file);
    const themeData = JSON.parse(fs.readFileSync(themePath, 'utf8'));

    // Generate iTerm theme
    const itermTheme = generateItermTheme(themeData);

    // Use theme name from JSON, fallback to filename
    const themeName = themeData.name || path.basename(file, '.json');
    const outputPath = path.join(outputDir, `${themeName}.itermcolors`);

    // Write iTerm theme file
    fs.writeFileSync(outputPath, itermTheme, 'utf8');
    console.log(`✓ Generated: ${themeName}.itermcolors`);
  });

  console.log(`\n✅ Successfully generated ${themeFiles.length} iTerm themes in ${outputDir}`);
}

// Run the script
main();
