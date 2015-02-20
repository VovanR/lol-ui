define([
    'pixi',
    'panel',
    'unitPanel',
    'button',
    'progressbar',
], function (
    PIXI,
    Panel,
    UnitPanel,
    Button,
    Progressbar
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

    var panel = new Panel({
        width: 430,
        height: 220,
        background: './i/panel-bgr.png',
    });
    stage.addChild(panel.getShape());

    var unitPanel = new UnitPanel({
        width: 430,
        height: 220,
        background: './i/unit-panel-bgr.png',
    });
    panel.addChild(unitPanel.getShape());

    var button = new Button({
        textures: {
            normal: './i/button.png',
            hovered: './i/button-hovered.png',
            pressed: './i/button-pressed.png',
        },
        position: {
            x: 10,
            y: 10,
        },
        width: 200,
        height: 200,
        /**
         */
        onClick: function () {
            alert('Click!');
        },
        /**
         */
        onTap: function () {
            alert('Tap!');
        },
    });
    unitPanel.addChild(button.getShape());

    var helth = new Progressbar({
        position: {
            x: 10,
            y: 125,
        },
        width: 180,
        height: 30,
        value: 50,
    });
    button.getShape().addChild(helth.getShape());

    var strength = new Progressbar({
        position: {
            x: 10,
            y: 160,
        },
        width: 180,
        height: 30,
        value: 90,
    });
    button.getShape().addChild(strength.getShape());

    var index = new PIXI.Text('1', {
        font: '64px normal monospaced',
        fill: '#ffffff',
        align: 'center',
    });
    index.anchor.x = 0.5;
    index.anchor.y = 0.5;
    index.position = {
        x: 100,
        y: 70,
    };
    button.getShape().addChild(index);

    var resize = function () {
        renderer.resize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('orientationchange', resize, false);
    window.addEventListener('resize', resize, false);

});
