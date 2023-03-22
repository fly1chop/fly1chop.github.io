module.exports = {
  // Type check TS files & Lint & Prettify files
  '**/*.(ts|tsx)': filenames => {
    return [
      'npx tsc --noEmit',
      `npx eslint --fix ${filenames.join(' ')}`,
      `npx prettier --write ${filenames.join(' ')}`
    ];
  },

  // Prettify only Markdown and JSON files
  '**/*.(md|json)': filenames => `npx prettier --write ${filenames.join(' ')}`
};
