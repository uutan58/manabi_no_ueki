const esbuild = require('esbuild');
const sassPlugin = require('esbuild-sass-plugin').sassPlugin;

esbuild.build({
    entryPoints: ['app/javascript/application.js'],
    bundle: true,
    outdir: 'app/assets/builds',
    sourcemap: true,
    format: 'esm',
    publicPath: '/assets',
    plugins: [sassPlugin()],
}).then(() => {
    console.log('Build succeeded');
}).catch((error) => {
    console.error('Build failed:', error);
    process.exit(1);
});