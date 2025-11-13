module.exports = {
        apps: [
                {
                        name: 'Production',
                        port: '3000',
                        exec_mode: 'cluster',
                        instances: '4',
                        script: './node_modules/nuxt/bin/nuxt.js',
                        args: 'start'
                }
        ]
}
