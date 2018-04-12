const {execSync} = require('child_process')

const imgName = 'spa-server-test-build'

describe('spa-server container', () => {

    beforeAll(() => {
        execSync(`docker build . -t ${imgName}`, {stdio: 'inherit'})
    })

    afterAll(() => {
        execSync(`docker image rm -f ${imgName}`, {stdio: 'inherit'})
    })

    it('gen-config.sh inside container works', () => {
        const r = execSync(`docker run --rm  -e SPA_A=1 --entrypoint /usr/bin/gen-config.sh  ${imgName}`).toString()

        expect(JSON.parse(r)).toMatchObject({
            A: '1'
        })

    })
})