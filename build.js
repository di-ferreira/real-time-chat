const exe = require('@angablue/exe')

const build = exe({
    entry: './dist/server.js',
    out: './build/ChatApp.exe',
    pkg: ['-C', 'GZip'],
    productVersion: '1.0',
    fileVersion: '1.0',
    target: 'latest-win-x64',
    // icon: './src/assets/astro-burguer.ico',
    properties: {
        FileDescription: 'ChatApp',
        ProductName: 'ChatApp',
        LegalCopyright: 'DiFerreira https://di-ferreira.github.io/',
        OriginalFilename: 'ChatApp.exe'
    }
});

build.then(() => console.log('Build Completed!'))