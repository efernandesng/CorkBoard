module.exports = () => {

    /* eslint-disable */
    const fs = require('fs')
    const path = require('path')
    const withLess = require('@zeit/next-less')
    const lessToJS = require('less-vars-to-js')

    const themeVariables = lessToJS(
        fs.readFileSync(path.resolve(__dirname, './view/assets/ant-theme.less'), 'utf8')
    )

    // fix: prevents error when .less files are required by node
    if (typeof require !== 'undefined') {
        require.extensions['.less'] = file => { }
    }

    return withLess({
        webpack: (config, options) => {
            return config
        },
        lessLoaderOptions: {
            javascriptEnabled: true,
            modifyVars: themeVariables
        }
    })
}