define([
    'chai',
    'uiButton',
], function (
    chai,
    UIButton
) {

    'use strict';

    mocha.setup('bdd');
    var assert = chai.assert;

    describe('UIButton module', function () {
        /**
         */
        var module = function () {
            var m = new UIButton();

            return m;
        };

        describe('constructor', function () {
            it('should initialize', function () {
                var m = module();
                assert.isDefined(m);
            });
        });
    });

    if (window.mochaPhantomJS) {
        mochaPhantomJS.run();
    } else {
        mocha.run();
    }

});
