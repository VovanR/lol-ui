define([
    'lodash',
    'chai',
    'pixi',
    'resemble',
    'unitPanelItem',
], function (
    _,
    chai,
    PIXI,
    resemble,
    UnitPanelItem
) {

    'use strict';

    mocha.setup('bdd');
    var assert = chai.assert;

    describe('UnitPanelItem module', function () {
        /**
         */
        var module = function (o) {
            var m = new UnitPanelItem(_.defaults(o || {}, {
                id: '01',
                index: 1,
                helth: 0,
                strength: 0,
                position: {
                    x: 0,
                    y: 0,
                },
            }));

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

            it('should throw if initialized without options', function () {
                assert.throw(function () {
                    var instance = new UnitPanelItem();
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
                it('should be fired on initialize', function () {
                    var m = module();
                    assert.instanceOf(m._shape, PIXI.Sprite);
                });

                it('should draw panel item', function (done) {
                    var m = module({
                        helth: 0,
                        strength: 0,
                    });
                    compareDrawing({
                        instance: m,
                        spec: './test_1.png',
                        misMatchPercentage: 10,
                        done: done,
                    });
                });
            });

            describe('_redraw', function () {
                it('should redraw block', function () {
                    var m = module();
                    assert.isTrue(false);
                });
            });
        });

        describe('#setIndex', function () {
            it('should sets new index', function () {
                var m = module({
                    index: 5,
                });
                assert.equal(m._index, 5);
                m.setIndex(6);
                assert.equal(m._index, 6);
            });

            it('should fire block redrawing', function () {
                var m = module();
                assert.isTrue(false);
            });
        });

        describe('#setHelth', function () {
            it('should sets new helth value', function () {
                var m = module({
                    helth: 10,
                });
                assert.equal(m._helth, 10);
                m.setHelth(90);
                assert.equal(m._helth, 90);
            });

            it('should fire block redrawing', function () {
                var m = module();
                assert.isTrue(false);
            });
        });

        describe('#setStrength', function () {
            it('should sets new strength value', function () {
                var m = module({
                    strength: 10,
                });
                assert.equal(m._strength, 10);
                m.setStrength(90);
                assert.equal(m._strength, 90);
            });

            it('should fire block redrawing', function () {
                var m = module();
                assert.isTrue(false);
            });
        });
    });

    if (window.mochaPhantomJS) {
        mochaPhantomJS.run();
    } else {
        mocha.run();
    }

});
