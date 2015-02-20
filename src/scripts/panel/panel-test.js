define([
    'chai',
    'pixi',
    'resemble',
    'panel',
], function (
    chai,
    PIXI,
    resemble,
    Panel
) {

    'use strict';

    mocha.setup('bdd');
    var assert = chai.assert;

    describe('Panel module', function () {
        /**
         */
        var module = function (o) {
            var m = new Panel(o);

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
                    var panel = new Panel();
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

                it('should set panel shape position', function () {
                    var m = module({
                        position: {
                            x: 2,
                            y: 3,
                        },
                    });
                    m._draw();
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
                it('should not be fired on initialize', function () {
                    var m = module();
                    assert.isNull(m._shape);
                    assert.isNull(m._content);
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
                    m._draw();
                    compareDrawing({
                        instance: m,
                        spec: './base_1.png',
                        misMatchPercentage: 10,
                        done: done,
                    });
                });
            });
        });

        describe('#getShape', function () {
            it('should return panel graphics', function () {
                var m = module();
                m._draw();
                assert.instanceOf(m.getShape(), PIXI.TilingSprite);
            });
        });

        describe('#addChild', function () {
            it('should add child to panel content', function () {
                var m = module();
                var child = new PIXI.Rectangle(0, 0, 10, 10);
                m._draw();
                m.addChild(child);
                assert.equal(m._content.children[0], child);
            });
        });
    });

    if (window.mochaPhantomJS) {
        mochaPhantomJS.run();
    } else {
        mocha.run();
    }

});
