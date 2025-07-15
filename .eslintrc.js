module.exports = {
    "env": {
        "browser": true,
        "es2021": true,
        "node": true,
        "jest": true
    },
    "extends": [
        "eslint:recommended"
    ],
    "parserOptions": {
        "ecmaVersion": 12,
        "sourceType": "module"
    },
    "rules": {
        // Hata seviyesi kurallar
        "no-unused-vars": "warn",
        "no-console": "off",
        "no-debugger": "error",
        
        // Kod kalitesi
        "prefer-const": "error",
        "no-var": "error",
        "no-undef": "error",
        
        // Format
        "indent": ["error", 2],
        "quotes": ["error", "single"],
        "semi": ["error", "always"],
        "comma-dangle": ["error", "never"],
        
        // JavaScript best practices
        "eqeqeq": ["error", "always"],
        "curly": ["error", "all"],
        "no-eval": "error",
        "no-implied-eval": "error",
        
        // The Equals Game özel kuralları
        "camelcase": ["error", { "properties": "never" }],
        "max-len": ["warn", { "code": 120 }],
        "no-multiple-empty-lines": ["error", { "max": 2 }]
    },
    "globals": {
        "gameState": "readonly",
        "storyData": "readonly",
        "currentNode": "writable",
        "musicSystem": "readonly",
        "metricsSystem": "readonly",
        "newsSystem": "readonly",
        "emotionalSystem": "readonly"
    }
}; 