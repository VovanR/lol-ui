define([
    'pixi',
    'controlPanel',
    'unitPanel',
], function (
    PIXI,
    ControlPanel,
    UnitPanel
) {

    'use strict';

    console.log('PIXI', PIXI);
    // create an new instance of a pixi stage
    var stage = new PIXI.Stage(0x66FF99);
    console.log('stage', stage);

    // create a renderer instance.
    var renderer = PIXI.autoDetectRenderer(window.innerWidth, window.innerHeight);
    console.log('renderer', renderer);

    // add the renderer view element to the DOM
    document.body.appendChild(renderer.view);
    renderer.view.style.position = 'absolute';
    renderer.view.style.top = '0px';
    renderer.view.style.left = '0px';

    /**
     */
    window.animate = function () {
        window.requestAnimFrame(window.animate);
        // render the stage
        renderer.render(stage);
    };
    window.requestAnimFrame(window.animate);

    var controlPanel = new ControlPanel({
        width: 430,
        height: 220,
        background: './i/panel-bgr.png',
    });
    stage.addChild(controlPanel.getShape());

    var unitPanel = new UnitPanel({
        width: 430,
        height: 220,
        background: './i/unit-panel-bgr.png',
    });
    controlPanel.addChild(unitPanel.getShape());

    unitPanel.addUnit({
        id: '01',
        helth: 100,
        strength: 30,
    });
    unitPanel.addUnit({
        id: '02',
        helth: 60,
        strength: 90,
    });

    /**
     */
    var resize = function () {
        renderer.resize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('orientationchange', resize, false);
    window.addEventListener('resize', resize, false);

});
