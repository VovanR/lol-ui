define([
    'chai',
    'pixi',
    'resemble',
    'uiProgressbar',
], function (
    chai,
    PIXI,
    resemble,
    UIProgressbar
) {

    'use strict';

    mocha.setup('bdd');
    var assert = chai.assert;

    describe('UIProgressbar module', function () {
        /**
         */
        var module = function (o) {
            var m = new UIProgressbar(o || {});

            return m;
        };

        var stage;
        var renderer;
        var initStage = function () {
            // create an new instance of a pixi stage
            stage = new PIXI.Stage(0x66FF99);
            // create a renderer instance
            renderer = PIXI.autoDetectRenderer(220, 40);
            console.log('Is PIXI.WebGLRenderer', (renderer instanceof PIXI.WebGLRenderer));
            // add the renderer view element to the DOM
            document.getElementById('fixtures').appendChild(renderer.view);
        };
        initStage();

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

            describe('`value` option', function () {
                it('should be Number', function () {
                    var m = module();
                    assert.isNumber(m._value);
                });

                it('should init value', function () {
                    var m = module({
                        value: 100,
                    });
                    assert.equal(m._value, 100);
                });

                it('should have default value', function () {
                    var m = module();
                    assert.equal(m._value, 0);
                });
            });

            describe('`position` option', function () {
                it('should be Object', function () {
                    var m = module();
                    assert.isObject(m._position);
                });

                it('should init values', function () {
                    var m = module({
                        position: {
                            x: 2,
                            y: 3,
                        },
                    });
                    assert.equal(m._position.x, 2);
                    assert.equal(m._position.y, 3);
                });

                it('should have default values', function () {
                    var m = module();
                    assert.equal(m._position.x, 0);
                    assert.equal(m._position.y, 0);
                });
            });

            describe('size options', function () {
                it('should have `width`', function () {
                    var m = module();
                    assert.equal(m._width, 100);
                });

                it('should have `height`', function () {
                    var m = module();
                    assert.equal(m._height, 10);
                });
            });

            describe('progress background color option', function () {
                it('should be Number', function () {
                    var m = module();
                    assert.isNumber(m._bgColor);
                });

                it('should have default value', function () {
                    var m = module();
                    assert.equal(m._bgColor, 0x24383C);
                });
            });

            describe('progress colors option', function () {
                it('should be Array', function () {
                    var m = module();
                    assert.isArray(m._progressColors);
                });

                it('should have default values', function () {
                    var m = module();
                    assert.equal(m._progressColors[0], 0x006600);
                    assert.equal(m._progressColors[1], 0xCAAA15);
                    assert.equal(m._progressColors[2], 0xFF5300);
                });
            });
        });

        describe('drawing box', function () {
            describe('_draw', function () {
                it('should draw progressbar', function (done) {
                    var m = module();
                    m._draw();
                    stage.addChild(m._graphics);
                    renderer.render(stage);
                    var str = renderer.view.toDataURL('image/png');
                    resemble(str)
                        .compareTo('./src/scripts/progressbar/base_1.png')
                        .onComplete(function (data) {
                            assert.isObject(data);
                            assert.isTrue(data.isSameDimensions);
                            assert.ok(data.misMatchPercentage < 0.1);
                            done();
                        });
                });

                it('should draw progressbar progress', function (done) {
                    var m = module({
                        value: 100,
                    });
                    m._draw();
                    stage.addChild(m._graphics);
                    renderer.render(stage);
                    var str = renderer.view.toDataURL('image/png');
                    resemble(str)
                        .compareTo('./src/scripts/progressbar/base_2.png')
                        .onComplete(function (data) {
                            assert.isObject(data);
                            assert.isTrue(data.isSameDimensions);
                            assert.ok(data.misMatchPercentage < 0.1);
                            done();
                        });
                });

                it('should draw progressbar progress lt 100%', function (done) {
                    var m = module({
                        value: 90,
                    });
                    m._draw();
                    stage.addChild(m._graphics);
                    renderer.render(stage);
                    var str = renderer.view.toDataURL('image/png');
                    resemble(str)
                        .compareTo('./src/scripts/progressbar/base_3.png')
                        .onComplete(function (data) {
                            assert.isObject(data);
                            assert.isTrue(data.isSameDimensions);
                            assert.ok(data.misMatchPercentage < 0.1);
                            done();
                        });
                });

                it('should draw progressbar progress lt 50%', function (done) {
                    var m = module({
                        value: 40,
                    });
                    m._draw();
                    stage.addChild(m._graphics);
                    renderer.render(stage);
                    var str = renderer.view.toDataURL('image/png');
                    resemble(str)
                        .compareTo('./src/scripts/progressbar/base_4.png')
                        .onComplete(function (data) {
                            assert.isObject(data);
                            assert.isTrue(data.isSameDimensions);
                            assert.ok(data.misMatchPercentage < 0.1);
                            done();
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
