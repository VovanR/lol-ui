define([
    'chai',
    'pixi',
    'resemble',
    'indicator',
], function (
    chai,
    PIXI,
    resemble,
    Indicator
) {

    'use strict';

    mocha.setup('bdd');
    var assert = chai.assert;

    describe('Indicator module', function () {
        /**
         */
        var module = function (o) {
            var m = new Indicator(o || null);

            return m;
        };

        // create an new instance of a pixi stage
        var stage = new PIXI.Stage(0x66FF99);
        stage.interactive = true;
        // create a renderer instance
        var renderer = PIXI.autoDetectRenderer(72, 74);
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
                    var indicator = new Indicator();
                });
            });

            describe('`textures` option', function () {
                it('should be `Object`', function () {
                    var m = module();
                    assert.isObject(m._textures);
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

                it('should set indicator shape position', function () {
                    var m = module({
                        position: {
                            x: 2,
                            y: 3,
                        },
                    });
                    assert.equal(m._shape.x, 2);
                    assert.equal(m._shape.y, 3);
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
                        assert.equal(m._width, 0);
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
                        assert.equal(m._height, 0);
                    });
                });
            });

            describe('indicator textures', function () {
                describe('disabled texture', function () {
                    it('should be Texture', function () {
                        var m = module();
                        assert.instanceOf(m._textureDisabled, PIXI.Texture);
                    });
                });

                describe('enabled texture', function () {
                    it('should be Texture', function () {
                        var m = module();
                        assert.instanceOf(m._textureEnabled, PIXI.Texture);
                    });
                });
            });

            describe('indicator statuses flags', function () {
                describe('`_isEnabled` flag', function () {
                    it('should be `false` on default', function () {
                        var m = module();
                        assert.isFalse(m._isEnabled);
                    });
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

        /**
         */
        var isDisabled = function (m, done) {
            compareDrawing({
                instance: m,
                spec: './test_1.png',
                misMatchPercentage: 0.1,
                done: done,
            });
        };

        /**
         */
        var isEnabled = function (m, done) {
            compareDrawing({
                instance: m,
                spec: './test_2.png',
                misMatchPercentage: 0.1,
                done: done,
            });
        };

        describe('_draw', function () {
            it('should be fired on initialize', function () {
                var m = module();
                assert.instanceOf(m._shape, PIXI.Sprite);
            });

            it('should draw indicator', function (done) {
                var m = module();
                assert.equal(m._shape.texture, m._textureDisabled);
                isDisabled(m, done);
            });
        });

        describe('#getShape', function () {
            it('should return indicator shape', function () {
                var m = module();
                assert.instanceOf(m.getShape(), PIXI.Sprite);
            });
        });

        describe('#enable', function () {
            it('should set `_isEnabled` flag to `true`', function () {
                var m = module();
                m._isEnabled = false;
                m.enable();
                assert.isTrue(m._isEnabled);
            });

            it('should set enablet texture', function (done) {
                var m = module();
                m.enable();
                isEnabled(m, done);
            });
        });

        describe('#disable', function () {
            it('should set `_isEnabled` flag to `false`', function () {
                var m = module();
                m._isEnabled = true;
                m.disable();
                assert.isFalse(m._isEnabled);
            });

            it('should set disabled texture', function (done) {
                var m = module();
                m._shape.setTexture('');
                m.disable();
                isDisabled(m, done);
            });
        });
    });

    if (window.mochaPhantomJS) {
        mochaPhantomJS.run();
    } else {
        mocha.run();
    }

});
