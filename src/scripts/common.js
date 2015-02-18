requirejs.config({
    paths: {
        lodash: '../../bower_components/lodash/lodash',
        chai: '../../bower_components/chai/chai',
        resemble: '../../bower_components/resemblejs/resemble',
        pixi: '../../bower_components/pixi.js/bin/pixi',
        uiButton: '../../scripts/button/button',
        uiProgressbar: '../../scripts/progressbar/progressbar',
    },
    shim: {
        resemble: {
            exports: 'resemble',
        },
    },
});
