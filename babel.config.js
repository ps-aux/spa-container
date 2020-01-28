module.exports = {
    presets: [
        [
            '@babel/preset-env',
            {
                targets: {
                    node: true
                }
            }
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
