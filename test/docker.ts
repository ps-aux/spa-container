const { execSync } = require('child_process')

const cmd = (cmd: string) =>
    execSync(cmd, {
        stdio: 'inherit'
    })

const imgName = 'foo-tes-test'

export const run = () =>
    cmd(`docker run ${imgName}`)

export const buildAndRun = ({ port = 9000 }: { port?: number }) => {
    cmd(`docker build . -t ${imgName}`)
    run()
}
