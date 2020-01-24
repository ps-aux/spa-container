module.exports = {
    presets: [
        [
            '@babel/preset-env',
        ],
        '@babel/typescript'
    ],
    plugins: [
        [
            'module-resolver',
            {
                extensions: ['.js', '.ts'],
                root: ['.']
            }
        ]
    ]
}
