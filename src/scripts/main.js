define([
    'pixi',
    'uiButton',
], function (
    PIXI,
    UIButton
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

    requestAnimFrame(animate);

    // var animate = function () {
    function animate () {
        requestAnimFrame(animate);
        // render the stage
        renderer.render(stage);
    };

    var button = new UIButton();

});
