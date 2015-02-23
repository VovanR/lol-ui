define([
    'chai',
    'pixi',
    'resemble',
    'button',
], function (
    chai,
    PIXI,
    resemble,
    Button
) {

    'use strict';

    mocha.setup('bdd');
    var assert = chai.assert;

    describe('Button module', function () {
        /**
         */
        var module = function (o) {
            var m = new Button(o || null);

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
                    var button = new Button();
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

                it('should set button shape position', function () {
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

            describe('button textures', function () {
                describe('normal texture', function () {
                    it('should be Texture', function () {
                        var m = module();
                        assert.instanceOf(m._textureButton, PIXI.Texture);
                    });
                });

                describe('hovered texture', function () {
                    it('should be Texture', function () {
                        var m = module();
                        assert.instanceOf(m._textureButton, PIXI.Texture);
                    });
                });

                describe('pressed texture', function () {
                    it('should be Texture', function () {
                        var m = module();
                        assert.instanceOf(m._textureButton, PIXI.Texture);
                    });
                });
            });

            describe('button statuses flags', function () {
                describe('`_isHovered` flag', function () {
                    it('should be `false` on default', function () {
                        var m = module();
                        assert.isFalse(m._isHovered);
                    });
                });

                describe('`_isPressed` flag', function () {
                    it('should be `false` on default', function () {
                        var m = module();
                        assert.isFalse(m._isPressed);
                    });
                });
            });

            describe('text', function () {
                describe('`text` option', function () {
                    it('should be `Null` on default', function () {
                        var m = module();
                        assert.isNull(m._text);
                    });

                    it('should display text', function () {
                        var text = 'Hello World!';
                        var m = module({
                            text: text,
                        });
                        assert.equal(m._text, text);
                        assert.instanceOf(m._shape.children[0], PIXI.Text);
                    });
                });

                describe('`textColor` option', function () {
                    it('should be `#ffffff` on default', function () {
                        var m = module();
                        assert.equal(m._textColor, '#ffffff');
                    });

                    it('should set text color', function () {
                        var value = '#777777';
                        var m = module({
                            text: 'Hello World!',
                            textColor: value,
                        });
                        assert.equal(m._textColor, value);
                        assert.equal(m._shape.children[0].style.fill, value);
                    });
                });

                describe('`fontSize` option', function () {
                    it('should be `12px` on default', function () {
                        var m = module();
                        assert.equal(m._fontSize, '12px');
                    });

                    it('should set font size', function () {
                        var value = '17px';
                        var m = module({
                            text: 'Hello World!',
                            fontSize: value,
                        });
                        assert.equal(m._fontSize, value);
                        assert.equal(m._shape.children[0].style.font.split(' ')[0], value);
                    });
                });

                describe('`fontStyle` option', function () {
                    it('should be `normal` on default', function () {
                        var m = module();
                        assert.equal(m._fontStyle, 'normal');
                    });

                    it('should set font style', function () {
                        var value = 'normal';
                        var m = module({
                            text: 'Hello World!',
                            fontStyle: value,
                        });
                        assert.equal(m._fontStyle, value);
                        assert.equal(m._shape.children[0].style.font.split(' ')[1], value);
                    });
                });

                describe('`fontFamily` option', function () {
                    it('should be `monospace` on default', function () {
                        var m = module();
                        assert.equal(m._fontFamily, 'monospace');
                    });

                    it('should set font style', function () {
                        var value = 'arial';
                        var m = module({
                            text: 'Hello World!',
                            fontFamily: value,
                        });
                        assert.equal(m._fontFamily, value);
                        assert.equal(m._shape.children[0].style.font.split(' ')[2], value);
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
        var isNormal = function (m, done) {
            compareDrawing({
                instance: m,
                spec: './test_1.png',
                misMatchPercentage: 0.1,
                done: done,
            });
        };

        /**
         */
        var isHovered = function (m, done) {
            compareDrawing({
                instance: m,
                spec: './test_2.png',
                misMatchPercentage: 0.1,
                done: done,
            });
        };

        /**
         */
        var isPressed = function (m, done) {
            compareDrawing({
                instance: m,
                spec: './test_3.png',
                misMatchPercentage: 0.1,
                done: done,
            });
        };

        describe('_draw', function () {
            it('should be fired on initialize', function () {
                var m = module();
                assert.instanceOf(m._shape, PIXI.Sprite);
            });

            it('should draw button', function (done) {
                var m = module();
                assert.equal(m._shape.texture, m._textureButton);
                isNormal(m, done);
            });

            it('should enable `buttonMode`', function () {
                var m = module();
                assert.isTrue(m._shape.buttonMode);
            });

            it('should enable `interactive`', function () {
                var m = module();
                assert.isTrue(m._shape.interactive);
            });
        });

        describe('_onOver', function () {
            it('should change button texture', function (done) {
                var m = module();
                m._onOver();
                assert.equal(m._shape.texture, m._textureButtonHovered);
                isHovered(m, done);
            });

            it('should set `_isHovered` flag to `true`', function () {
                var m = module();
                m._onOver();
                assert.isTrue(m._isHovered);
            });

            describe('disable collision if mouse pressed', function () {
                it('should do nothing', function (done) {
                    var m = module();
                    m._isPressed = true;
                    m._shape.setTexture(m._textureButtonPressed);
                    m._onOver();
                    isPressed(m, done);
                });
            });
        });

        describe('_onOut', function () {
            it('should change button texture', function (done) {
                var m = module();
                m._shape.setTexture('');
                m._onOut();
                assert.equal(m._shape.texture, m._textureButton);
                isNormal(m, done);
            });

            it('should set `_isHovered` flag to `false`', function () {
                var m = module();
                m._isHovered = true;
                m._onOut();
                assert.isFalse(m._isHovered);
            });

            describe('do not change texture if mouse pressed', function () {
                it('should do nothing', function (done) {
                    var m = module();
                    m._isPressed = true;
                    m._shape.setTexture(m._textureButtonPressed);
                    m._onOut();
                    isPressed(m, done);
                });
            });
        });

        describe('_onDown', function () {
            it('should change button texture', function (done) {
                var m = module();
                m._onDown();
                assert.equal(m._shape.texture, m._textureButtonPressed);
                isPressed(m, done);
            });

            it('should set `_isPressed` flag to `true`', function () {
                var m = module();
                m._onDown();
                assert.isTrue(m._isPressed);
            });
        });

        describe('_onUp', function () {
            it('should change button texture', function (done) {
                var m = module();
                m._shape.setTexture('');
                m._onUp();
                assert.equal(m._shape.texture, m._textureButton);
                isNormal(m, done);
            });

            it('should set `_isPressed` flag to `false`', function () {
                var m = module();
                m._isPressed = true;
                m._onUp();
                assert.isFalse(m._isPressed);
            });

            describe('disable blinking if mouse pointer over button', function () {
                it('should set hovered state', function (done) {
                    var m = module();
                    m._isHovered = true;
                    m._onUp();
                    isHovered(m, done);
                });
            });
        });

        describe('_bindControls', function () {
            describe('mouse', function () {
                it('should bind `mouseover`', function () {
                    var m = module();
                    assert.isFunction(m._shape.mouseover);
                });

                it('should bind `mousedown`', function () {
                    var m = module();
                    assert.isFunction(m._shape.mousedown);
                });

                it('should bind `mouseup`', function () {
                    var m = module();
                    assert.isFunction(m._shape.mouseup);
                });

                it('should bind `mouseupoutside`', function () {
                    var m = module();
                    assert.isFunction(m._shape.mouseupoutside);
                });
            });

            describe('touch', function () {
                it('should bind `touchstart`', function () {
                    var m = module();
                    assert.isFunction(m._shape.touchstart);
                });

                it('should bind `touchend`', function () {
                    var m = module();
                    assert.isFunction(m._shape.touchend);
                });

                it('should bind `touchendoutside`', function () {
                    var m = module();
                    assert.isFunction(m._shape.touchendoutside);
                });
            });
        });

        describe('callbacks', function () {
            describe('onClick', function () {
                it('should be `Null` if not defined', function () {
                    var m = module();
                    assert.isNull(m._onClickCallback);
                });

                it('should be fired on click', function () {
                    var isFired = false;
                    var m = module({
                        /**
                         */
                        onClick: function () {
                            isFired = true;
                        },
                    });
                    m._shape.click();
                    assert.isTrue(isFired);
                });
            });

            describe('onTap', function () {
                it('should be `Null` if not defined', function () {
                    var m = module();
                    assert.isNull(m._onTapCallback);
                });

                it('should be fired on tap', function () {
                    var isFired = false;
                    var m = module({
                        /**
                         */
                        onTap: function () {
                            isFired = true;
                        },
                    });
                    m._shape.tap();
                    assert.isTrue(isFired);
                });
            });
        });

        describe('#getShape', function () {
            it('should return button shape', function () {
                var m = module();
                assert.instanceOf(m.getShape(), PIXI.Sprite);
            });
        });
    });

    if (window.mochaPhantomJS) {
        mochaPhantomJS.run();
    } else {
        mocha.run();
    }

});
