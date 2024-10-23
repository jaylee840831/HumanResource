import globals from "globals"
import pluginJs from "@eslint/js"
import tseslint from "typescript-eslint"
import pluginVue from "eslint-plugin-vue"
import fs from 'node:fs'
import { fileURLToPath, URL } from 'node:url'

const autoImportPath =
fileURLToPath(new URL('./.eslintrc-auto-import.json', import.meta.url))
const eslintrcAutoImport = JSON.parse(fs.readFileSync(autoImportPath, 'utf8'))

export default [
  {files: ["**/*.{js,mjs,cjs,ts,vue}"]},
  {
    rules: {
      // 限制最大空白行數
      'no-multiple-empty-lines': ['error', { max: 1 }],
      // 限制每行字數
      'max-len': ['error', 150],
      // 禁止行尾空白
      'no-trailing-spaces': 'error',
      // 禁止多餘的空格
      'no-multi-spaces': 'error',
      // 不要分號
      semi: ['error', 'never'],
      // 最後一行不要逗號
      'comma-dangle': ['error', 'never'],
      // 縮排
      indent: ['error', 2],
      // vue的html縮排
      'vue/html-indent': ['error', 2],
      // 禁止未使用的變數
      'no-unused-vars': 'error',
      // 禁止使用未宣告的變數
      'no-undef': 'error'
    },
    languageOptions: {
      parserOptions: {
        ecmaFeatures: {
          jsx: true
        }
      },
      ...eslintrcAutoImport
    }
  },
  {languageOptions: { globals: {...globals.browser, ...globals.node} }},
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  ...pluginVue.configs["flat/essential"],
  {files: ["**/*.vue"], languageOptions: {parserOptions: {parser: tseslint.parser}}}
]