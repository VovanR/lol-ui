define([
    'pixi',
    'uiButton',
    'uiProgressbar',
], function (
    PIXI,
    UIButton,
    UIProgressbar
) {

    'use strict';

    console.log('PIXI', PIXI);
    // create an new instance of a pixi stage
    var stage = new PIXI.Stage(0x66FF99);
    console.log('stage', stage);

    // create a renderer instance.
    var renderer = PIXI.autoDetectRenderer(400, 300);
    console.log('renderer', renderer);

    // add the renderer view element to the DOM
    document.body.appendChild(renderer.view);

    /**
     */
    window.animate = function () {
        window.requestAnimFrame(window.animate);
        // render the stage
        renderer.render(stage);
    };

    window.requestAnimFrame(window.animate);

    var button = new UIButton();
    var progressbar = new UIProgressbar({
        position: {
            x: 10,
            y: 10,
            width: 200,
            height: 30,
            value: 100,
        },
    });
    console.log('progressbar', progressbar);
    stage.addChild(progressbar.getShape());

    var lshift = 10;
    var lspeed = 100;
    var ltop = 99;
    var lbottom = 1;
    var loop = function (dir) {
        if (dir === undefined) {
            dir = lshift;
        }

        progressbar.setValue(progressbar._value + dir);

        if (progressbar._value > ltop) {
            dir = -lshift;
        } else if (progressbar._value < lbottom) {
            dir = lshift;
        }

        setTimeout(function () {
            loop(dir);
        }, lspeed);
    };
    loop();

});
