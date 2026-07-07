// @ts-check

const eslint = require('@eslint/js');
const { defineConfig } = require('eslint/config');
const tseslint = require('typescript-eslint');
const angular = require('angular-eslint');

module.exports = defineConfig([
  {
    files: ['**/*.ts'],
    extends: [
      eslint.configs.recommended,
      tseslint.configs.recommended,
      angular.configs.tsRecommended,
    ],
    processor: angular.processInlineTemplates,
    rules: {
      'no-console': [
        'warn',
        {
          allow: ['warn', 'error'],
        },
      ],

      'padded-blocks': [
        'error',
        {
          classes: 'always',
        },
      ],

      quotes: [
        'warn',
        'single',
        {
          avoidEscape: true,
          allowTemplateLiterals: true,
        },
      ],

      'object-curly-spacing': [
        'warn',
        'always',
      ],

      'template-curly-spacing': [
        'warn',
        'always',
      ],

      semi: [
        'warn',
        'always',
      ],

      'lines-between-class-members': [
        'error',
        'always',
        {
          exceptAfterSingleLine: true,
        },
      ],

      '@typescript-eslint/explicit-member-accessibility': [
        'error',
        {
          accessibility: 'no-public',
        },
      ],

      '@typescript-eslint/naming-convention': [
        'error',

        {
          selector: 'enumMember',
          format: ['UPPER_CASE'],
          leadingUnderscore: 'forbid',
        },

        {
          selector: 'interface',
          format: ['PascalCase'],
          custom: {
            regex: '^I[A-Z]',
            match: true,
          },
        },

        {
          selector: 'default',
          format: null,
        },
      ],
    },
  },

  {
    files: ['**/*.html'],
    extends: [
      angular.configs.templateRecommended,
      angular.configs.templateAccessibility,
    ],

    rules: {
      '@angular-eslint/template/banana-in-box': 'error',
      '@angular-eslint/template/eqeqeq': 'warn',
    },
  },
]);
