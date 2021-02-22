module.exports = {
    testRegex: '.*(test|spec)\\.(local\\.)?([tj]sx?)$',
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
    testPathIgnorePatterns: ['node_modules', 'lib'],
    moduleDirectories: ['node_modules', '.'],
    // testRunner: 'jest-circus/runner',
    testEnvironment: 'node',
    verbose: true
}
