requirejs.config({
    paths: {
        lodash: '../../bower_components/lodash/lodash',
        pixi: '../../bower_components/pixi.js/bin/pixi',

        // For testing
        chai: '../../bower_components/chai/chai',
        resemble: '../../bower_components/resemblejs/resemble',

        // UI Components
        button: '../../scripts/button/button',
        progressbar: '../../scripts/progressbar/progressbar',
        indicator: '../../scripts/indicator/indicator',
        panel: '../../scripts/panel/panel',
        controlPanel: '../../scripts/control-panel/control-panel',
        unitPanel: '../../scripts/unit-panel/unit-panel',
        unitPanelItem: '../../scripts/unit-panel-item/unit-panel-item',
    },
    shim: {
        resemble: {
            exports: 'resemble',
        },
    },
});
