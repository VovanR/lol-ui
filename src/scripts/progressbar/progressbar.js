/**
 * @author VovanR <mail@vovanr.com>
 */

define([
    'lodash',
], function (
    _
) {

    var defaultOptions = {
        value: 0,
        position: {
            x: 0,
            y: 0,
        },
    };

    /**
     * Progressbar
     *
     * @param {Object} [o] Options
     * @param {Number} [o.value=0]
     * @param {Object} [o.position]
     * @param {Number} [o.position.x=0]
     * @param {Number} [o.position.y=0]
     */
    var Progressbar = function (o) {
        _.defaults(o || {}, defaultOptions);

        this._value = o.value;
        this._position = o.position;

        this._width = 512;
        this._height = 32;
        this._fillColors = ['#006600', '#CAAA15', '#FF5300'];

        this._init();
    };

    Progressbar.prototype = {
        /**
         * Initialize
         *
         * @private
         */
        _init: function () {
            console.info('Progressbar init');
        },
    };

    return Progressbar;

});
