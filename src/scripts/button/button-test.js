define([
    'chai',
    'pixi',
    'resemble',
    'uiButton',
], function (
    chai,
    PIXI,
    resemble,
    UIButton
) {

    'use strict';

    mocha.setup('bdd');
    var assert = chai.assert;

    describe('UIButton module', function () {
        /**
         */
        var module = function (o) {
            var m = new UIButton(o || {});

            return m;
        };

        // create an new instance of a pixi stage
        var stage = new PIXI.Stage(0x66FF99);
        stage.interactive = true;
        // create a renderer instance
        var renderer = PIXI.autoDetectRenderer(220, 220);
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
                        assert.equal(m._height, 100);
                    });
                });
            });

            describe('button textures', function () {
                describe('normal texture', function () {
                    it('should be Texture', function () {
                        var m = module();
                        assert.instanceOf(this._textureButton, PIXI.Texture);
                    });
                });

                describe('hovered texture', function () {
                    it('should be Texture', function () {
                        var m = module();
                        assert.instanceOf(this._textureButton, PIXI.Texture);
                    });
                });

                describe('pressed texture', function () {
                    it('should be Texture', function () {
                        var m = module();
                        assert.instanceOf(this._textureButton, PIXI.Texture);
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
