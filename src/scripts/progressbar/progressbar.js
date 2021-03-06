/**
 * Progressbar UI module
 *
 * @module Progressbar
 * @see {@link https://github.com/VovanR/lol-ui|GitHub}
 * @author VovanR <mail@vovanr.com>
 * @version 0.0.0
 */

define([
    'lodash',
    'pixi',
], function (
    _,
    PIXI
) {

    'use strict';

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
     * @param {Object} [o] Options
     * @param {Number} [o.value=0] 0..100
     * @param {Object} [o.position]
     * @param {Number} [o.position.x=0]
     * @param {Number} [o.position.y=0]
     * @param {Number} [o.width=100]
     * @param {Number} [o.height=10]
     * @constructor
     * @alias module:Progressbar
     */
    var Progressbar = function (o) {
        o = _.defaults(o || {}, defaultOptions);

        this._value = o.value;
        this._position = o.position;
        this._width = o.width;
        this._height = o.height;

        this._bgColor = 0x24383C;
        this._progressColors = [0x006600, 0xCAAA15, 0xFF5300];
        this._shape = null;

        this._initialize();
    };

    Progressbar.prototype = {
        /**
         * Initialize
         *
         * @private
         */
        _initialize: function () {
            console.info('Progressbar initialize');

            this._draw();
        },

        /**
         * Initislize progressbar shape and fire drawing
         *
         * @private
         */
        _draw: function () {
            this._shape = new PIXI.Graphics();
            var position = this._position;
            this._shape.x = position.x;
            this._shape.y = position.y;

            this._redraw();
        },

        /**
         * Draw progressbar
         *
         * @private
         */
        _redraw: function () {
            var graphics = this._shape;
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
        },

        /**
         * Set progressbar value
         *
         * @param {Number} value 0..100
         */
        setValue: function (value) {
            if (value < 0) {
                value = 0;
            } else if (value > 100) {
                value = 100;
            }
            this._value = value;
            this._redraw();
        },

        /**
         * Returns progressbar shape
         *
         * @return {PIXI.Graphics} shape
         */
        getShape: function () {
            return this._shape;
        },
    };

    return Progressbar;

});
