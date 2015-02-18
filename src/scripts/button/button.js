/**
 * @author VovanR <mail@vovanr.com>
 */

define([
    'lodash',
    'pixi',
], function (
    _,
    PIXI
) {

    var defaultOptions = {
        position: {
            x: 0,
            y: 0,
        },
        width: 100,
        height: 100,
    };

    /**
     * Button
     *
     * @param {Object} [o] Options
     * @param {Object} [o.position]
     * @param {Number} [o.position.x=0]
     * @param {Number} [o.position.y=0]
     * @param {Number} [o.width=100]
     * @param {Number} [o.height=10]
     */
    var Button = function (o) {
        _.defaults(o || {}, defaultOptions);

        this._position = o.position;
        this._width = o.width;
        this._height = o.height;

        this._init();
    };

    Button.prototype = {
        /**
         * Initialize
         *
         * @private
         */
        _init: function () {
            console.info('Button init');
        },
    };

    return Button;

});
