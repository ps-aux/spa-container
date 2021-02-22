import { dockerRun } from 'e2e/docker'
import Axios, { AxiosInstance, AxiosResponse } from 'axios'
import { JSDOM } from 'jsdom'

describe('e2e tests', () => {
    const run = dockerRun({
        SPA_SERVER_PORT: '90',
        SPA_PROXY_any1: '/foo/:http://localhost/foo',
        SPA_PROXY_any2: '/bar/:http://localhost/bar',
        SPA_CACHE_EXPIRATION: '1'
    })

    let port
    let http: AxiosInstance

    beforeAll(() => {
        port = run.start()
        const url = `http://localhost:${port}`
        http = Axios.create({
            baseURL: url,
            validateStatus: () => true
        })
    })

    it('Returns index.html for both existing and not-existening files without suffix', async () => {
        const expectIndexHtmlResponse = (res: AxiosResponse) => {
            expect(res.status).toBe(200)
            const {
                window: { document: doc }
            } = new JSDOM(res.data)

            const body = doc.querySelector('body').textContent.trim()
            expect(body).toBe('Hello!')

            expect(
                doc.querySelector('meta[name=foo]').getAttribute('content')
            ).toBe('foo')
        }

        const paths = ['/', '/i-dont-exist', '/path/with/query?q=a.b']

        for (const p of paths) {
            const r = await http.get(p)
            expectIndexHtmlResponse(r)
            const caching = r.headers['cache-control']
            expect(caching).toBe('public, no-cache')
        }
    })

    it('Does NOT return index.html for not not-existing suffixed paths', async () => {
        const paths = [
            '/non-existing-script.js',
            '/not-existing.css',
            '/not-existing.fooooooooo'
        ]

        for (const p of paths) {
            const r = await http.get(p)
            expect(r.status).toBe(404)
        }
    })

    it('Returns existing files for suffixed paths', async () => {
        const paths = ['/script.js', '/style.css']

        for (const p of paths) {
            const r = await http.get(p)
            expect(r.status).toBe(200)
            const caching = r.headers['cache-control']
            expect(caching).toBe('max-age=3600, public, immutable')
        }
    })

    it('/_info returns the info json', async () => {
        const res = await http.get('/_info')

        expect(res.status).toBe(200)
        expect(res.headers['content-type']).toBe('application/json')

        expect(res.data).toEqual({
            a: 'b'
        })
    })

    it('/_conf return s the conf json', async () => {
        const res = await http.get('/_conf')

        expect(res.status).toBe(200)
        expect(res.headers['content-type']).toBe('application/json')

        expect(res.data).toEqual({
            FOO: 'foo'
        })
    })

    it('/_proxy returns proxy json', async () => {
        const res = await http.get('/_proxy')

        expect(res.status).toBe(200)
        expect(res.headers['content-type']).toBe('application/json')

        expect(res.data).toEqual({
            '/bar/': 'http://localhost/bar',
            '/foo/': 'http://localhost/foo'
        })
    })

    afterAll(() => {
        run.clear()
    })
})
