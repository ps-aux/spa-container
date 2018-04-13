const { execSync } = require('child_process')

const run = env => execSync('src/bin/gen-json-config.sh', { env }).toString()

const runAndParse = env => JSON.parse(run(env))

describe('gent-json-config.sh', () => {

    it('config env vars with default prefix renders properly', () => {
        const parsedCfg = runAndParse({
            SPA_A: "1",
            SPA_B: "2"
        })
        expect(parsedCfg).toMatchObject({
            A: '1',
            B: '2'
        })
    })

    it('config env vars with custom prefix renders properly', () => {
        const parsedCfg = runAndParse({
            ABC_A: "1",
            ABC_B: "2",
            _SPA_PREFIX: "ABC"
        })
        expect(parsedCfg).toMatchObject({
            A: '1',
            B: '2'
        })
    })
})