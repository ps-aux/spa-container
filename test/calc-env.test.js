const { execFileSync, } = require('child_process')

describe('calc-env.sh', () => {
    it('works', () => {
        const o = execFileSync('src/bin/calc-env.sh',
            ['test/vars.txt'],
            {
                env: {
                    PREFIX: 'XX',
                    XX_A: '123',
                    XX_B: '456'
                }
            }
        ).toString()

        expect(o).toBe(
            'A=123\n' +
            'B=456\n'
        )
    })
})