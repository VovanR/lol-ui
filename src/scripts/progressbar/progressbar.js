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
        value: 0,
        position: {
            x: 0,
            y: 0,
        },
        width: 100,
        height: 10,
    };

    /**
     * Progressbar
     *
     * @param {Object} [o] Options
     * @param {Number} [o.value=0]
     * @param {Object} [o.position]
     * @param {Number} [o.position.x=0]
     * @param {Number} [o.position.y=0]
     * @param {Number} [o.width=100]
     * @param {Number} [o.height=10]
     */
    var Progressbar = function (o) {
        _.defaults(o || {}, defaultOptions);

        this._value = o.value;
        this._position = o.position;
        this._width = o.width;
        this._height = o.height;

        this._bgColor = 0x24383C;
        this._progressColors = [0x006600, 0xCAAA15, 0xFF5300];

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

        /**
         * @private
         */
        _draw: function () {
            var graphics = new PIXI.Graphics();
            var width = this._width;
            var height = this._height;

            // Draw background
            graphics.lineStyle(0);
            graphics.beginFill(this._bgColor);
            graphics.drawRect(0, 0, width, height);
            graphics.endFill();

            // Draw progress
            var progressColor;
            var value = this._value;
            if (value === 100) {
                progressColor = this._progressColors[0];
            } else if (value > 50) {
                progressColor = this._progressColors[1];
            } else {
                progressColor = this._progressColors[2];
            }
            graphics.beginFill(progressColor);
            var progressWidth = Math.round((width * value) / 100);
            graphics.drawRect(0, 0, progressWidth, height);
            graphics.endFill();

            var position = this._position;
            graphics.x = position.x;
            graphics.y = position.y;

            this._graphics = graphics;
        },

        /**
         * @param {Number} value
         */
        setValue: function (value) {
            this._value = value;
        },
    };

    return Progressbar;

});
