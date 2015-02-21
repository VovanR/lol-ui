define([
    'chai',
    'pixi',
    'resemble',
    'unitPanel',
], function (
    chai,
    PIXI,
    resemble,
    UnitPanel
) {

    'use strict';

    mocha.setup('bdd');
    var assert = chai.assert;

    describe('UnitPanel module', function () {
        /**
         */
        var module = function (o) {
            var m = new UnitPanel(o);

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
                    var panel = new UnitPanel();
                });
            });

            it('should be `UnitPanel` constructor', function () {
                var m = module();
                assert.instanceOf(m, UnitPanel);
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
                        spec: './test_1.png',
                        misMatchPercentage: 10,
                        done: done,
                    });
                });
            });
        });

        describe('_addChild', function () {
            it('should add child to collection', function () {
                var m = module();
                assert.isTrue(false);
            });
        });

        describe('_getNextIndex', function () {
            it('should return next index number', function () {
                var m = module();
                assert.equal(m._getNextIndex(), 1);
                m._childrens.push(0);
                assert.equal(m._getNextIndex(), 2);
            });
        });

        describe('_getNextPosition', function () {
            it('should return next unit panel item position', function () {
                var m = module();
                var margin = m._itemMargin;
                var width = m._itemWidth;
                assert.deepEqual(m._getNextPosition(), {
                    x: margin,
                    y: margin,
                });
                m._childrens.push(0);
                assert.deepEqual(m._getNextPosition(), {
                    x: margin + width + margin,
                    y: margin,
                });
                m._childrens.push(0);
                assert.deepEqual(m._getNextPosition(), {
                    x: margin + width + margin + margin + width,
                    y: margin,
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
