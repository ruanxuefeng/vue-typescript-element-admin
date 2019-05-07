const path = require('path');

function resolve(dir) {
    return path.join(__dirname, dir)
}
module.exports = {
    chainWebpack(config) {
        const cdn = {
            // inject tinymce into index.html
            // why use this cdn, detail see https://github.com/PanJiaChen/tinymce-all-in-one
            js: ['https://cdn.jsdelivr.net/npm/tinymce-all-in-one@4.9.2/tinymce.min.js']
        }
        config.plugin('html')
            .tap(args => {
                args[0].cdn = cdn
                return args
            })
        config.plugins.delete('preload') // TODO: need test
        config.plugins.delete('prefetch') // TODO: need test

        // set svg-sprite-loader
        config.module
            .rule('svg')
            .exclude.add(resolve('src/icons'))
            .end();
        config.module
            .rule('icons')
            .test(/\.svg$/)
            .include.add(resolve('src/icons'))
            .end()
            .use('svg-sprite-loader')
            .loader('svg-sprite-loader')
            .options({
                symbolId: 'icon-[name]'
            })
            .end();
    }
};
