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

        this._width = 100;
        this._height = 10;
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

        _draw: function () {
            var graphics = new PIXI.Graphics();
            graphics.lineStyle(0);
            graphics.beginFill(this._bgColor);
            graphics.drawRect(10, 10, 100, 10);
            graphics.endFill();

            var progressColor;
            if (this._value === 100) {
                progressColor = this._progressColors[0];
            } else if (this._value > 50) {
                progressColor = this._progressColors[1];
            } else {
                progressColor = this._progressColors[2];
            }
            graphics.beginFill(progressColor);
            graphics.drawRect(10, 10, this._value, 10);
            graphics.endFill();

            this._graphics = graphics;
        },
    };

    return Progressbar;

});
