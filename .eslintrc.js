module.exports = {
  "extends": "airbnb-base",
  "plugins": [
    "import",
    "html",
  ],
  "globals": {
    "window": true,
    "document": true
  },
  rules: {
    "prefer-destructuring": ["off"],
    "max-len": ["error", 1000, 2, {
      ignoreUrls: true,
      ignoreComments: false,
      ignoreRegExpLiterals: true,
      ignoreStrings: true,
      ignoreTemplateLiterals: true,
    }],
    "comma-dangle": ["error", {
      arrays: "always-multiline",
      objects: "always-multiline",
      imports: "always-multiline",
      exports: "always-multiline",
      functions: "never",
    }],
  },
};
