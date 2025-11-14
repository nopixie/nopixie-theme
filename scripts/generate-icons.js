#!/usr/bin/env node

/**
 * No Pixie Icon Theme Generator
 *
 * This script generates comprehensive icon themes for each color variant.
 * It creates SVG icons for folders, files, and language-specific file types.
 */

const fs = require('fs');
const path = require('path');

// Color palettes extracted from theme files
const colorPalettes = {
  purple: {
    name: 'No Pixie Purple',
    primary: '#A06BA0',
    secondary: '#FFE050',
    tertiary: '#A0B8D8',
    folder: '#7B5A78',
    folderOpen: '#A06BA0',
    file: '#8A8F98',
    fileAccent: '#7BD1CF',
  },
  blue: {
    name: 'No Pixie Blue',
    primary: '#5A9FD8',
    secondary: '#50D8FF',
    tertiary: '#5AC8C8',
    folder: '#4A7FB8',
    folderOpen: '#5A9FD8',
    file: '#8A95A0',
    fileAccent: '#5AE8E5',
  },
  yellow: {
    name: 'No Pixie Yellow',
    primary: '#D4A844',
    secondary: '#FFE680',
    tertiary: '#E8C870',
    folder: '#735E7A',
    folderOpen: '#D4A844',
    file: '#9A8F78',
    fileAccent: '#A8D8D0',
  }
};

// File type definitions with specific colors
const fileTypes = {
  // Programming languages
  javascript: { icon: 'js', color: 'secondary', label: 'JavaScript' },
  typescript: { icon: 'ts', color: 'primary', label: 'TypeScript' },
  python: { icon: 'py', color: 'tertiary', label: 'Python' },
  java: { icon: 'java', color: 'fileAccent', label: 'Java' },
  cpp: { icon: 'cpp', color: 'primary', label: 'C++' },
  c: { icon: 'c', color: 'fileAccent', label: 'C' },
  csharp: { icon: 'cs', color: 'primary', label: 'C#' },
  go: { icon: 'go', color: 'tertiary', label: 'Go' },
  rust: { icon: 'rs', color: 'fileAccent', label: 'Rust' },
  php: { icon: 'php', color: 'primary', label: 'PHP' },
  ruby: { icon: 'rb', color: 'fileAccent', label: 'Ruby' },
  swift: { icon: 'swift', color: 'fileAccent', label: 'Swift' },
  kotlin: { icon: 'kt', color: 'primary', label: 'Kotlin' },
  dart: { icon: 'dart', color: 'tertiary', label: 'Dart' },

  // Web technologies
  html: { icon: 'html', color: 'fileAccent', label: 'HTML' },
  css: { icon: 'css', color: 'tertiary', label: 'CSS' },
  scss: { icon: 'scss', color: 'tertiary', label: 'SCSS' },
  sass: { icon: 'sass', color: 'tertiary', label: 'Sass' },
  less: { icon: 'less', color: 'tertiary', label: 'Less' },
  vue: { icon: 'vue', color: 'tertiary', label: 'Vue' },
  react: { icon: 'jsx', color: 'tertiary', label: 'React' },
  angular: { icon: 'ng', color: 'fileAccent', label: 'Angular' },
  svelte: { icon: 'svelte', color: 'fileAccent', label: 'Svelte' },

  // Config and data files
  json: { icon: 'json', color: 'secondary', label: 'JSON' },
  yaml: { icon: 'yaml', color: 'fileAccent', label: 'YAML' },
  xml: { icon: 'xml', color: 'fileAccent', label: 'XML' },
  toml: { icon: 'toml', color: 'file', label: 'TOML' },
  ini: { icon: 'ini', color: 'file', label: 'INI' },

  // Documentation
  markdown: { icon: 'md', color: 'file', label: 'Markdown' },
  txt: { icon: 'txt', color: 'file', label: 'Text' },
  pdf: { icon: 'pdf', color: 'fileAccent', label: 'PDF' },

  // Build and package management
  npm: { icon: 'npm', color: 'fileAccent', label: 'npm' },
  webpack: { icon: 'webpack', color: 'tertiary', label: 'Webpack' },
  vite: { icon: 'vite', color: 'primary', label: 'Vite' },
  docker: { icon: 'docker', color: 'tertiary', label: 'Docker' },

  // Version control
  git: { icon: 'git', color: 'fileAccent', label: 'Git' },

  // Shell scripts
  shell: { icon: 'sh', color: 'file', label: 'Shell' },
  powershell: { icon: 'ps1', color: 'tertiary', label: 'PowerShell' },

  // Databases
  sql: { icon: 'sql', color: 'tertiary', label: 'SQL' },

  // Image files
  image: { icon: 'image', color: 'fileAccent', label: 'Image' },

  // Archive files
  archive: { icon: 'zip', color: 'file', label: 'Archive' },
};

// SVG icon templates
const icons = {
  folder: (color) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none">
  <path d="M10 4H4C2.89543 4 2 4.89543 2 6V18C2 19.1046 2.89543 20 4 20H20C21.1046 20 22 19.1046 22 18V8C22 6.89543 21.1046 6 20 6H12L10 4Z" fill="${color}" opacity="0.3"/>
  <path d="M10 4H4C2.89543 4 2 4.89543 2 6V18C2 19.1046 2.89543 20 4 20H20C21.1046 20 22 19.1046 22 18V8C22 6.89543 21.1046 6 20 6H12L10 4Z" stroke="${color}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`,

  folderOpen: (color) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none">
  <path d="M22 19C22 19.5304 21.7893 20.0391 21.4142 20.4142C21.0391 20.7893 20.5304 21 20 21H4C3.46957 21 2.96086 20.7893 2.58579 20.4142C2.21071 20.0391 2 19.5304 2 19V5C2 4.46957 2.21071 3.96086 2.58579 3.58579C2.96086 3.21071 3.46957 3 4 3H9L11 6H20C20.5304 6 21.0391 6.21071 21.4142 6.58579C21.7893 6.96086 22 7.46957 22 8V19Z" fill="${color}" opacity="0.3"/>
  <path d="M2 19C2 19.5304 2.21071 20.0391 2.58579 20.4142C2.96086 20.7893 3.46957 21 4 21H20C20.5304 21 21.0391 20.7893 21.4142 20.4142C21.7893 20.0391 22 19.5304 22 19V12H2V19Z" fill="${color}" opacity="0.5"/>
  <path d="M22 19C22 19.5304 21.7893 20.0391 21.4142 20.4142C21.0391 20.7893 20.5304 21 20 21H4C3.46957 21 2.96086 20.7893 2.58579 20.4142C2.21071 20.0391 2 19.5304 2 19V5C2 4.46957 2.21071 3.96086 2.58579 3.58579C2.96086 3.21071 3.46957 3 4 3H9L11 6H20C20.5304 6 21.0391 6.21071 21.4142 6.58579C21.7893 6.96086 22 7.46957 22 8V19Z" stroke="${color}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`,

  file: (color) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none">
  <path d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z" fill="${color}" opacity="0.3"/>
  <path d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z" stroke="${color}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M14 2V8H20" stroke="${color}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`,

  fileCode: (color) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none">
  <path d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z" fill="${color}" opacity="0.3"/>
  <path d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z" stroke="${color}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M14 2V8H20" stroke="${color}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M9.5 13L7 15.5L9.5 18" stroke="${color}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M14.5 13L17 15.5L14.5 18" stroke="${color}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`,

  fileText: (color, text) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none">
  <path d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z" fill="${color}" opacity="0.3"/>
  <path d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z" stroke="${color}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M14 2V8H20" stroke="${color}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
  <text x="12" y="17" text-anchor="middle" fill="${color}" font-family="Arial, sans-serif" font-size="5" font-weight="bold">${text}</text>
</svg>`,
};

// Generate SVG files for a specific color palette
function generateIcons(variant, palette) {
  const variantDir = path.join(__dirname, '..', 'icons', variant);

  // Ensure directory exists
  if (!fs.existsSync(variantDir)) {
    fs.mkdirSync(variantDir, { recursive: true });
  }

  // Generate folder icons
  fs.writeFileSync(
    path.join(variantDir, 'folder.svg'),
    icons.folder(palette.folder)
  );

  fs.writeFileSync(
    path.join(variantDir, 'folder-open.svg'),
    icons.folderOpen(palette.folderOpen)
  );

  // Generate special folder variants
  const specialFolders = {
    'folder-src': palette.primary,
    'folder-dist': palette.secondary,
    'folder-node': palette.tertiary,
    'folder-git': palette.fileAccent,
    'folder-test': palette.tertiary,
    'folder-docs': palette.fileAccent,
    'folder-config': palette.file,
    'folder-public': palette.secondary,
    'folder-components': palette.primary,
    'folder-utils': palette.tertiary,
  };

  Object.entries(specialFolders).forEach(([name, color]) => {
    fs.writeFileSync(
      path.join(variantDir, `${name}.svg`),
      icons.folder(color)
    );
    fs.writeFileSync(
      path.join(variantDir, `${name}-open.svg`),
      icons.folderOpen(color)
    );
  });

  // Generate default file icon
  fs.writeFileSync(
    path.join(variantDir, 'file.svg'),
    icons.file(palette.file)
  );

  // Generate file type icons
  Object.entries(fileTypes).forEach(([type, config]) => {
    const color = palette[config.color];
    const iconName = `file-${config.icon}`;

    // Determine which icon template to use
    let svgContent;
    if (['js', 'ts', 'py', 'java', 'cpp', 'c', 'cs', 'go', 'rs', 'php', 'rb'].includes(config.icon)) {
      svgContent = icons.fileCode(color);
    } else if (config.icon.length <= 4) {
      svgContent = icons.fileText(color, config.icon.toUpperCase());
    } else {
      svgContent = icons.file(color);
    }

    fs.writeFileSync(
      path.join(variantDir, `${iconName}.svg`),
      svgContent
    );
  });

  console.log(`✓ Generated ${variant} icons`);
}

// Generate icon theme JSON definition
function generateIconThemeDefinition(variant, palette) {
  const iconPath = `../icons/${variant}`;

  const definition = {
    name: palette.name,
    type: 'icon-theme',
    iconDefinitions: {
      '_folder': {
        iconPath: `${iconPath}/folder.svg`
      },
      '_folder_open': {
        iconPath: `${iconPath}/folder-open.svg`
      },
      '_file': {
        iconPath: `${iconPath}/file.svg`
      },
    },
    folder: '_folder',
    folderExpanded: '_folder_open',
    file: '_file',
    folderNames: {},
    folderNamesExpanded: {},
    fileExtensions: {},
    fileNames: {},
    languageIds: {},
  };

  // Add special folder mappings
  const specialFolderNames = [
    'src', 'source', 'sources',
    'dist', 'build', 'out', 'output',
    'node_modules', '.npm',
    '.git', '.github', '.gitlab',
    'test', 'tests', '__tests__', 'spec', 'specs',
    'docs', 'doc', 'documentation',
    'config', 'configuration', '.vscode', '.config',
    'public', 'static', 'assets',
    'components', 'views', 'pages',
    'utils', 'helpers', 'lib', 'libraries',
  ];

  const folderMapping = {
    'src': 'src', 'source': 'src', 'sources': 'src',
    'dist': 'dist', 'build': 'dist', 'out': 'dist', 'output': 'dist',
    'node_modules': 'node', '.npm': 'node',
    '.git': 'git', '.github': 'git', '.gitlab': 'git',
    'test': 'test', 'tests': 'test', '__tests__': 'test', 'spec': 'test', 'specs': 'test',
    'docs': 'docs', 'doc': 'docs', 'documentation': 'docs',
    'config': 'config', 'configuration': 'config', '.vscode': 'config', '.config': 'config',
    'public': 'public', 'static': 'public', 'assets': 'public',
    'components': 'components', 'views': 'components', 'pages': 'components',
    'utils': 'utils', 'helpers': 'utils', 'lib': 'utils', 'libraries': 'utils',
  };

  Object.entries(folderMapping).forEach(([folderName, iconName]) => {
    const defName = `_folder_${iconName}`;
    const defNameOpen = `_folder_${iconName}_open`;

    if (!definition.iconDefinitions[defName]) {
      definition.iconDefinitions[defName] = {
        iconPath: `${iconPath}/folder-${iconName}.svg`
      };
      definition.iconDefinitions[defNameOpen] = {
        iconPath: `${iconPath}/folder-${iconName}-open.svg`
      };
    }

    definition.folderNames[folderName] = defName;
    definition.folderNamesExpanded[folderName] = defNameOpen;
  });

  // Add file extension mappings
  const extensionMapping = {
    // JavaScript
    'js': 'js', 'mjs': 'js', 'cjs': 'js',
    'jsx': 'jsx',

    // TypeScript
    'ts': 'ts', 'mts': 'ts', 'cts': 'ts',
    'tsx': 'jsx',

    // Python
    'py': 'py', 'pyw': 'py', 'pyx': 'py',

    // Java
    'java': 'java', 'class': 'java', 'jar': 'java',

    // C/C++
    'cpp': 'cpp', 'cc': 'cpp', 'cxx': 'cpp', 'c++': 'cpp',
    'c': 'c', 'h': 'c', 'hpp': 'cpp',

    // C#
    'cs': 'cs', 'csx': 'cs',

    // Go
    'go': 'go',

    // Rust
    'rs': 'rs',

    // PHP
    'php': 'php', 'phtml': 'php',

    // Ruby
    'rb': 'rb', 'erb': 'rb',

    // Swift
    'swift': 'swift',

    // Kotlin
    'kt': 'kt', 'kts': 'kt',

    // Dart
    'dart': 'dart',

    // Web
    'html': 'html', 'htm': 'html',
    'css': 'css',
    'scss': 'scss',
    'sass': 'sass',
    'less': 'less',
    'vue': 'vue',

    // Config
    'json': 'json', 'jsonc': 'json', 'json5': 'json',
    'yaml': 'yaml', 'yml': 'yaml',
    'xml': 'xml',
    'toml': 'toml',
    'ini': 'ini',

    // Documentation
    'md': 'md', 'markdown': 'md',
    'txt': 'txt',
    'pdf': 'pdf',

    // Shell
    'sh': 'sh', 'bash': 'sh', 'zsh': 'sh',
    'ps1': 'ps1',

    // Database
    'sql': 'sql',

    // Images
    'png': 'image', 'jpg': 'image', 'jpeg': 'image', 'gif': 'image',
    'svg': 'image', 'webp': 'image', 'ico': 'image',

    // Archives
    'zip': 'zip', 'tar': 'zip', 'gz': 'zip', 'rar': 'zip', '7z': 'zip',
  };

  Object.entries(extensionMapping).forEach(([ext, iconName]) => {
    const defName = `_file_${iconName}`;

    if (!definition.iconDefinitions[defName]) {
      definition.iconDefinitions[defName] = {
        iconPath: `${iconPath}/file-${iconName}.svg`
      };
    }

    definition.fileExtensions[ext] = defName;
  });

  // Add file name mappings
  const fileNameMapping = {
    'package.json': 'npm',
    'package-lock.json': 'npm',
    'webpack.config.js': 'webpack',
    'vite.config.js': 'vite',
    'vite.config.ts': 'vite',
    'Dockerfile': 'docker',
    '.gitignore': 'git',
    '.gitattributes': 'git',
    '.dockerignore': 'docker',
  };

  Object.entries(fileNameMapping).forEach(([fileName, iconName]) => {
    const defName = `_file_${iconName}`;

    if (!definition.iconDefinitions[defName]) {
      definition.iconDefinitions[defName] = {
        iconPath: `${iconPath}/file-${iconName}.svg`
      };
    }

    definition.fileNames[fileName] = defName;
  });

  // Add language ID mappings
  const languageMapping = {
    'javascript': '_file_js',
    'typescript': '_file_ts',
    'python': '_file_py',
    'java': '_file_java',
    'cpp': '_file_cpp',
    'c': '_file_c',
    'csharp': '_file_cs',
    'go': '_file_go',
    'rust': '_file_rs',
    'php': '_file_php',
    'ruby': '_file_rb',
    'html': '_file_html',
    'css': '_file_css',
    'scss': '_file_scss',
    'vue': '_file_vue',
    'json': '_file_json',
    'yaml': '_file_yaml',
    'markdown': '_file_md',
    'shellscript': '_file_sh',
    'sql': '_file_sql',
  };

  Object.entries(languageMapping).forEach(([langId, defName]) => {
    definition.languageIds[langId] = defName;
  });

  return definition;
}

// Main execution
function main() {
  console.log('Generating No Pixie Icon Themes...\n');

  // Create themes directory if it doesn't exist
  const themesDir = path.join(__dirname, '..', 'themes');
  if (!fs.existsSync(themesDir)) {
    fs.mkdirSync(themesDir, { recursive: true });
  }

  // Generate icons and definitions for each variant
  Object.entries(colorPalettes).forEach(([variant, palette]) => {
    // Generate SVG icons
    generateIcons(variant, palette);

    // Generate icon theme JSON
    const definition = generateIconThemeDefinition(variant, palette);
    const jsonPath = path.join(themesDir, `no-pixie-${variant}-icon-theme.json`);
    fs.writeFileSync(jsonPath, JSON.stringify(definition, null, 2));

    console.log(`✓ Generated ${variant} icon theme definition`);
  });

  console.log('\n✅ All icon themes generated successfully!');
  console.log('\nNext steps:');
  console.log('1. Update package.json to register the icon themes');
  console.log('2. Test the icons in VS Code');
  console.log('3. Update documentation');
}

main();
