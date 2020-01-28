const { execSync } = require('child_process')

const cmd = (cmd: string) =>
    execSync(cmd, {
        stdio: 'inherit'
    })

const imgName = 'foo-test-test'


export type DockerTestRun = {
    start: () => number
    clear: () => void
}


const run = (port:number) =>
    cmd(`docker run -i -d -p ${port}:90 -e SPA_SERVER_PORT=90 --rm --name ${imgName} ${imgName}`)

const buildAndRun = () => {
    const dir = __dirname

    const port = 9999

    // Build base
    cmd(`docker build . -t spa-container-e2e-base`)

    // Build test image
    cmd(`docker build ${dir} -t ${imgName}`)
    run(port)
    return port
}

export const dockerRun = (): DockerTestRun => {
    return {
        start: buildAndRun,
        clear: () => {
            cmd(`docker rm -f ${imgName}`)
        }
    }
}



