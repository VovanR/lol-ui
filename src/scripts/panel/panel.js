/**
 * Panel UI module
 *
 * @module Panel
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
        position: {
            x: 0,
            y: 0,
        },
        width: 100,
        height: 10,
        background: './panel-bgr.png',
    };

    /**
     * @param {Object} [o] Options
     * @param {Object} [o.position]
     * @param {Number} [o.position.x=0]
     * @param {Number} [o.position.y=0]
     * @param {Number} [o.width=100]
     * @param {Number} [o.height=10]
     * @constructor
     * @alias module:Panel
     */
    var Panel = function (o) {
        o = _.defaults(o || {}, defaultOptions);

        this._position = o.position;
        this._width = o.width;
        this._height = o.height;
        this._background = o.background;

        this._shape = null;

        this._initialize();
    };

    Panel.prototype = {
        /**
         * Initialize
         *
         * @private
         */
        _initialize: function () {
            console.info('Panel initialize');

            this._draw();
        },

        /**
         * Initislize Panel shape and fire drawing
         *
         * @private
         */
        _draw: function () {
            var texture = PIXI.Texture.fromImage(this._background);
            var shape = new PIXI.TilingSprite(texture, this._width, this._height);
            var position = this._position;
            shape.x = position.x;
            shape.y = position.y;

            this._shape = shape;
        },

        /**
         * Returns panel shape
         *
         * @return {PIXI.Graphics} shape
         */
        getShape: function () {
            return this._shape;
        },
    };

    return Panel;

});
