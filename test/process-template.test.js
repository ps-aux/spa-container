const { execFileSync, } = require('child_process')

describe('process-template.sh', () => {
    it('works', () => {
        const o = execFileSync('src/bin/process-template.sh',
            ['test/vars.txt'],
            { input: 'blabla ${A}\n${B}' }
        ).toString()

        expect(o).toBe('blabla 123\n456')
    })
})