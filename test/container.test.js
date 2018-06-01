const { execSync, exec } = require('child_process')
const id = require('uuid/v1');
const fetch = require('isomorphic-fetch')
const { JSDOM } = require('jsdom')

const name = 'spa-server-test-build'

const o = { stdio: 'inherit' }

let num = 1

describe('spa-server container', () => {

    let proc
    const startContainer = env => {

        const e = Object.entries(env)
            .map(([k, v]) => `-e ${k}=${v}`)
            .join(' ')

        proc = exec(`docker run --rm -p 4444:80 ${e} --name ${name}-${id()} ${name}`,
            { env }, err => {
                // TODO throwing err with information
                // But not upon foricbly stoping container
            })
    }

    beforeAll(() => {
        execSync(`docker build . -t ${name}`, o)
    })

    afterAll(() => {
        execSync(`docker ps -q -f name=${name} | xargs docker rm -f`, o)
        execSync(`docker image rm -f ${name}`, o)
    })

    // TODO split to separate code /test (possible with one execution)
    it('index.html and conf is properly served', async done => {

        startContainer({
            SPA_ABC: "123",
            SPA_XYZ: "456",

        })

        const t = async () => {

            let page = await fetch('http://localhost:4444')
                .then(r => r.text())

            const { window: { document: doc } } = new JSDOM(page)

            const header = doc.querySelector('body h1').textContent

            expect(header).toBe('SPA server')

            expect(
                doc.querySelector('meta[name=abc]').getAttribute('content'))
                .toBe('123')

            expect(
                doc.querySelector('meta[name=xyz]').getAttribute('content'))
                .toBe('456')



            page = await fetch('http://localhost:4444/conf')
                .then(r => {
                    expect(r.status).toBe(200)
                    return r
                })
                .then(r => r.json())

            expect(page).toMatchObject({
                ABC: "123",
                XYZ: "456"
            })

            done()
        }

        setTimeout(t, 2000)

    }, 10000)
})