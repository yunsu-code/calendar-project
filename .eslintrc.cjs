module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  settings: {
    react: {
      version: "detect",
    },
  },
  extends: [
    "next/core-web-vitals",
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/recommended-requiring-type-checking",
    "prettier",
  ],
  ignorePatterns: ["dist", ".eslintrc.cjs"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: "module",
    project: "./tsconfig.json",
  },
  plugins: [
    "react",
    "@typescript-eslint",
    "prettier",
    "simple-import-sort",
    "react-refresh",
  ],
  rules: {
    semi: "error",
    "comma-dangle": ["error", "never"],
    quotes: ["error", "double"],
    "no-trailing-spaces": "error",
    "no-duplicate-imports": "error",
    "no-console": ["warn", { allow: ["warn", "error", "info"] }],
    "react-hooks/exhaustive-deps": "warn",
    "no-multiple-empty-lines": "error",
    "react/react-in-jsx-scope": "off", // import React from 'react' 안해도 되게 만들어줌.
    "react/no-unknown-property": ["error", { ignore: ["css"] }],
    "simple-import-sort/imports": "error", // import 구문 순서 엉망이면 에러 냄.
    "simple-import-sort/exports": "error", // export 구문도 순서 엉망이면 에러 냄.
    "@typescript-eslint/no-unused-vars": "error", // 안 쓰는 변수 그대로 두면 에러 냄.
    "@typescript-eslint/no-explicit-any": "error", // any 쓰면 에러 냄.
    "@typescript-eslint/no-unsafe-call": "warn", // any 타입값에 대한 함수호출 경고
    "@typescript-eslint/no-unsafe-member-access": "warn", // any 타입의 객체에 대한 경고
    "@typescript-eslint/no-unsafe-assignment": "warn", // any 타입의 값을 다른 타입의 값에 대입하면 경고
    "react-refresh/only-export-components": [
      "warn",
      { allowConstantExport: true },
    ],
  },
};
