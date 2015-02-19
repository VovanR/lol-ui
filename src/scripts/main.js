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

    var panel = new PIXI.DisplayObjectContainer();
    panel.position.x = 0;
    panel.position.y = renderer.height - 220;
    stage.addChild(panel);

    var panelBgr = new PIXI.Sprite(PIXI.Texture.fromImage('./i/panel-bgr.png'));
    panelBgr.width = renderer.width;
    panel.addChild(panelBgr);

    var button = new UIButton({
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
    panel.addChild(button.getShape());

    var helth = new UIProgressbar({
        position: {
            x: 10,
            y: 125,
        },
        width: 180,
        height: 30,
        value: 50,
    });
    button.getShape().addChild(helth.getShape());

    var strength = new UIProgressbar({
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
    console.log(index);
    button.getShape().addChild(index);

});
