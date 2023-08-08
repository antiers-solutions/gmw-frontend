module.exports = {
    transform: {
        "\\.tsx?$": "babel-jest",
        "\\.jsx?$": "babel-jest",
        "\\.scss$": "jest-css-modules-transform",
        "\\.(png)$": "jest-transform-stub",
        ".+\\.svg?.+$": "jest-transform-stub"
    },
    testEnvironment: "jsdom",
    moduleNameMapper: {
        "\\.scss$": "identity-obj-proxy",
        "^.+\\.svg$": "jest-transform-stub",
        uuid: require.resolve("uuid")
    },
    testTimeout: 1000 * 8,
    testPathIgnorePatterns: ["./src/api/api",
        "./src/pages/public/Home", "./src/pages/public/Login", "./src/components/ui/Dropdowns/FilterDropdown"
    ],
};