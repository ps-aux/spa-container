const { execFileSync, } = require('child_process')

describe('calc-env.sh', () => {
    it('default', () => {
        const o = execFileSync('src/bin/calc-env.sh',
            {
                env: {
                    PREFIX: 'XX',
                    XX_A: '123',
                    XX_B: '456'
                }
            }
        ).toString()

        expect(o).toBe(
            'A=123\n' +
            'B=456\n' +
            'SERVER_PORT=80\n'
        )
    })
    it('takes server port from env config', () => {
        const o = execFileSync('src/bin/calc-env.sh',
          {
              env: {
                  SERVER_PORT: '9999',
              }
          }
        ).toString()

        expect(o).toBe(
          'SERVER_PORT=9999\n'
        )
    })
})
