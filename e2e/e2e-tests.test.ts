import { dockerRun } from 'e2e/docker'
import http from 'axios'
import { JSDOM } from 'jsdom'

describe('e2e tests', () => {

    const run = dockerRun()

    let port
    let url

    beforeAll(() => {
        port = run.start()
        url = `http://localhost:${port}`
    })

    it('index html', async () => {
        const res = await http.get(url)

        expect(res.status).toBe(200)
        const { window: { document: doc } } = new JSDOM(res.data)

        const body = doc.querySelector('body').textContent.trim()
        expect(body).toBe('Hello!')

        expect(
            doc.querySelector('meta[name=foo]')
                .getAttribute('content'))
            .toBe('foo')
    })

    it('info json', async () => {
        const res = await http.get(url + '/_info')

        expect(res.status).toBe(200)
        expect(res.headers['content-type']).toBe('application/json')

        expect(res.data).toEqual({
            a: 'b'
        })
    })

    it('conf json', async () => {
        const res = await http.get(url + '/_conf')

        expect(res.status).toBe(200)
        expect(res.headers['content-type']).toBe('application/json')

        expect(res.data).toEqual({
            FOO: 'foo'
        })
    })

    afterAll(() => {
        run.clear()
    })

})