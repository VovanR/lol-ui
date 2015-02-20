define([
    'chai',
    'pixi',
    'resemble',
    'controlPanel',
], function (
    chai,
    PIXI,
    resemble,
    ControlPanel
) {

    'use strict';

    mocha.setup('bdd');
    var assert = chai.assert;

    describe('ControlPanel module', function () {
        /**
         */
        var module = function (o) {
            var m = new ControlPanel(o);

            return m;
        };

        // create an new instance of a pixi stage
        var stage = new PIXI.Stage(0x66FF99);
        // create a renderer instance
        var renderer = PIXI.autoDetectRenderer(400, 300);
        console.log('Is PIXI.WebGLRenderer', (renderer instanceof PIXI.WebGLRenderer));
        // add the renderer view element to the DOM
        document.getElementById('fixtures').appendChild(renderer.view);

        /**
         */
        window.animate = function () {
            window.requestAnimFrame(window.animate);
            // render the stage
            renderer.render(stage);
        };

        window.requestAnimFrame(window.animate);

        beforeEach(function () {
            stage.stage.children.forEach(function (item) {
                stage.removeChild(item);
            });
        });

        describe('constructor', function () {
            it('should initialize', function () {
                var m = module();
                assert.isDefined(m);
            });

            it('should be initialized without options', function () {
                assert.doesNotThrow(function () {
                    var panel = new ControlPanel();
                });
            });

            it('should be `ControlPanel` constructor', function () {
                var m = module();
                assert.instanceOf(m, ControlPanel);
            });
        });

        /**
         */
        var getStr = function (m) {
            stage.addChild(m._shape);
            renderer.render(stage);
            var str = renderer.view.toDataURL('image/png');

            return str;
        };

        /**
         */
        var compareDrawing = function (o) {
            resemble(getStr(o.instance))
                .compareTo(o.spec)
                .onComplete(function (data) {
                    assert.isObject(data);
                    assert.isTrue(data.isSameDimensions);
                    console.log(data.misMatchPercentage);
                    assert.ok(data.misMatchPercentage < o.misMatchPercentage);
                    o.done();
                });
        };

        describe('drawing box', function () {
            describe('_draw', function () {
                it('should be fired on initialize', function () {
                    var m = module();
                    assert.instanceOf(m._shape, PIXI.TilingSprite);
                });

                it('should draw panel', function (done) {
                    var m = module({
                        position: {
                            x: 0,
                            y: 80,
                        },
                        width: 400,
                        height: 220,
                    });
                    compareDrawing({
                        instance: m,
                        spec: './base_1.png',
                        misMatchPercentage: 10,
                        done: done,
                    });
                });
            });
        });
    });

    if (window.mochaPhantomJS) {
        mochaPhantomJS.run();
    } else {
        mocha.run();
    }

});
