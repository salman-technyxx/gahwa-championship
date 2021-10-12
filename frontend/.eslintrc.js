module.exports = {
    "extends": "airbnb-base",
    "env": {
        "browser": true,
        "node": true,
        "es6": true,
        "jquery": true
    },
    "globals": {
    },
    "parser": "babel-eslint",
    "parserOptions": {
        "ecmaVersion": 6,
        "sourceType": "module",
        "allowImportExportEverywhere": true
    },
    "rules": {
        "allowImportExportEverywhere": true,
        "indent": ["error", "tab", { "SwitchCase": 1 }],
        "no-tabs": 0,
        "linebreak-style": 0,
        "global-require": 0,
        "eslint linebreak-style": [0, "error", "windows"],
        "comma-dangle": 0,
        "no-unused-vars": 1,
        "class-methods-use-this": 0,
        "import/no-named-default": 0,
        "max-len": 0,
        "no-param-reassign": ["error", { "props": false }],
        "import/named": 0
    }
};