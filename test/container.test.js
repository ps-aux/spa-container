const { execSync, exec } = require('child_process')
const fetch = require('isomorphic-fetch')

const name = 'spa-server-test-build'

const o = { stdio: 'inherit' }

let num = 1

describe('spa-server container', () => {

    let proc
    const startContainer = env => {

        const e = Object.entries(env)
            .map(([k, v]) => `-e ${k}=${v}`)
            .join(' ')

        proc = exec(`docker run --rm -p 4444:80 ${e} --name ${name}-${++num} ${name}`,
            { env }, err => {
                if (err && !err.killed) {
                    console.log('err is', err)
                    throw err
                }
            })
    }

    beforeAll(() => {
        execSync(`docker build . -t ${name}`, o)
    })

    afterAll(() => {
        execSync(`docker ps -q -f name=${name} | xargs docker rm -f`, o)
        execSync(`docker image rm -f ${name}`, o)
    })

    afterEach(() => {
        if (proc) {
            proc.kill()
            proc = null
        }
    })

    it('gen-config.sh inside container works', () => {
        const r = execSync(
            `docker run --rm --name ${name}-${++num}  -e SPA_A=1 --entrypoint /usr/bin/gen-config.sh  ${name}`)
            .toString()

        expect(JSON.parse(r)).toMatchObject({
            A: '1'
        })

    })

    // TODO split to separate code /test (possible with one execution)
    it('index.html and conf is properly served', async done => {

        startContainer({
            SPA_A: "1",
            SPA_B: "2",

        })

        const t = async () => {

            let page = await fetch('http://localhost:4444')
                .then(r => r.text())

            expect(page).toEqual(
                expect.stringMatching(/<!doctype html>(.|\n)*SPA server/m))

            page = await fetch('http://localhost:4444/conf')
                .then(r => {
                    expect(r.status).toBe(200)
                    return r
                })
                .then(r => r.json())

            expect(page).toMatchObject({
                A: "1",
                B: "2"
            })

            done()
        }

        setTimeout(t, 2000)

    }, 10000)
})