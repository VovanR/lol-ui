define([
    'chai',
    'pixi',
    'resemble',
    'progressbar',
], function (
    chai,
    PIXI,
    resemble,
    Progressbar
) {

    'use strict';

    mocha.setup('bdd');
    var assert = chai.assert;

    describe('Progressbar module', function () {
        /**
         */
        var module = function (o) {
            var m = new Progressbar(o || {});

            return m;
        };

        // create an new instance of a pixi stage
        var stage = new PIXI.Stage(0x66FF99);
        // create a renderer instance
        var renderer = PIXI.autoDetectRenderer(220, 40);
        console.log('Is PIXI.WebGLRenderer', (renderer instanceof PIXI.WebGLRenderer));
        // add the renderer view element to the DOM
        document.getElementById('fixtures').appendChild(renderer.view);

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
                    var progressbar = new Progressbar();
                });
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
                describe('`width` option', function () {
                    it('should be Number', function () {
                        var m = module();
                        assert.isNumber(m._width);
                    });

                    it('should init value', function () {
                        var m = module({
                            width: 150,
                        });
                        assert.equal(m._width, 150);
                    });

                    it('should have default values', function () {
                        var m = module();
                        assert.equal(m._width, 100);
                    });
                });

                describe('`height` option', function () {
                    it('should be Number', function () {
                        var m = module();
                        assert.isNumber(m._height);
                    });

                    it('should init value', function () {
                        var m = module({
                            height: 20,
                        });
                        assert.equal(m._height, 20);
                    });

                    it('should have default values', function () {
                        var m = module();
                        assert.equal(m._height, 10);
                    });
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
                    assert.ok(data.misMatchPercentage < o.misMatchPercentage);
                    o.done();
                });
        };

        describe('drawing box', function () {
            describe('_draw', function () {
                it('should be fired on initialize', function () {
                    var m = module();
                    assert.instanceOf(m._shape, PIXI.Graphics);
                });

                it('should draw progressbar', function (done) {
                    var m = module({
                        position: {
                            x: 10,
                            y: 10,
                        },
                    });
                    compareDrawing({
                        instance: m,
                        spec: './test_1.png',
                        misMatchPercentage: 0.1,
                        done: done,
                    });
                });

                it('should draw progressbar progress', function (done) {
                    var m = module({
                        value: 100,
                        position: {
                            x: 10,
                            y: 10,
                        },
                    });
                    compareDrawing({
                        instance: m,
                        spec: './test_2.png',
                        misMatchPercentage: 0.1,
                        done: done,
                    });
                });

                it('should draw progressbar progress lt 100%', function (done) {
                    var m = module({
                        value: 90,
                        position: {
                            x: 10,
                            y: 10,
                        },
                    });
                    compareDrawing({
                        instance: m,
                        spec: './test_3.png',
                        misMatchPercentage: 0.1,
                        done: done,
                    });
                });

                it('should draw progressbar progress lt 50%', function (done) {
                    var m = module({
                        value: 40,
                        position: {
                            x: 10,
                            y: 10,
                        },
                    });
                    compareDrawing({
                        instance: m,
                        spec: './test_4.png',
                        misMatchPercentage: 0.1,
                        done: done,
                    });
                });

                it('should be responsible', function (done) {
                    var m = module({
                        width: 150,
                        height: 20,
                        value: 75,
                        position: {
                            x: 10,
                            y: 10,
                        },
                    });
                    compareDrawing({
                        instance: m,
                        spec: './test_5.png',
                        misMatchPercentage: 0.3,
                        done: done,
                    });
                });
            });
        });

        describe('_redraw', function () {
            it('should update progressbar shape', function (done) {
                var m = module({
                    position: {
                        x: 10,
                        y: 10,
                    },
                });
                m._value = 90;
                m._redraw();
                compareDrawing({
                    instance: m,
                    spec: './test_3.png',
                    misMatchPercentage: 0.1,
                    done: done,
                });
            });
        });

        describe('#setValue', function () {
            it('should set progressbar value', function () {
                var m = module();
                m.setValue(10);
                assert.equal(m._value, 10);
            });

            it('should filter input value lt 0', function () {
                var m = module();
                m.setValue(-10);
                assert.equal(m._value, 0);
            });

            it('should filter input value gt 100', function () {
                var m = module();
                m.setValue(1000);
                assert.equal(m._value, 100);
            });
        });

        describe('#getShape', function () {
            it('should return progressbar graphics', function () {
                var m = module();
                assert.instanceOf(m.getShape(), PIXI.Graphics);
            });
        });
    });

    if (window.mochaPhantomJS) {
        mochaPhantomJS.run();
    } else {
        mocha.run();
    }

});
