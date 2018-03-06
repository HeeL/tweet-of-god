module.exports = {
    extends: "airbnb",
    rules: {
        "comma-dangle": 0,
        "arrow-parens": 0,
        indent: ["error", 4],
        "react/jsx-indent": ["error", 4],
        "react/jsx-indent-props": ["error", 4],
        "react/prop-types": 0
    },
    "globals": {
        "it": true,
        "describe": true,
        "jest": true,
        "expect": true,
        "window": true
    }
};