define([
    'chai',
    'uiProgressbar',
], function (
    chai,
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
                    assert.equal(m._width, 512);
                });

                it('should have `height`', function () {
                    var m = module();
                    assert.equal(m._height, 32);
                });
            });

            describe('fill colors option', function () {
                it('should be Array', function () {
                    var m = module();
                    assert.isArray(m._fillColors);
                });

                it('should have default values', function () {
                    var m = module();
                    assert.equal(m._fillColors[0], '#006600');
                    assert.equal(m._fillColors[1], '#CAAA15');
                    assert.equal(m._fillColors[2], '#FF5300');
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
