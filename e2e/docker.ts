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


const run = (port: number, env?: Env) => {
    const envStr = Object.entries(env || {})
        .map(([key, val]) => `-e ${key}='${val}'`)
        .join(' ')

    cmd(`docker run -i -d -p ${port}:90 ${envStr} --rm --name ${imgName} ${imgName}`)
}

type Env = { [key: string]: string }

const buildAndRun = (env?: Env) => {
    const dir = __dirname


    const port = 9999

    // Build base
    cmd(`docker build . -t spa-container-e2e-base`)

    // Build test image
    cmd(`docker build ${dir} -t ${imgName}`)
    run(port, env)
    return port
}

export const dockerRun = (env?: Env): DockerTestRun => {

    return {
        start: () =>  buildAndRun(env),
        clear: () => {
            cmd(`docker rm -f ${imgName}`)
        }
    }
}



