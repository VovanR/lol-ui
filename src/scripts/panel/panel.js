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
        width: 100,
        height: 10,
        background: './panel-bgr.png',
    };

    /**
     * @param {Object} [o] Options
     * @param {Number} [o.width=100] width of panel content
     * @param {Number} [o.height=10] height of panel content
     * @param {String} [o.background='./panel-bgr.png'] background of panel
     * @constructor
     * @alias module:Panel
     */
    var Panel = function (o) {
        o = _.defaults(o || {}, defaultOptions);

        this._width = o.width;
        this._height = o.height;
        this._background = o.background;

        this._shape = null;
        this._content = null;

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

            this._bindControls();
        },

        /**
         * Bind controls
         *
         * @private
         */
        _bindControls: function () {
            window.addEventListener('orientationchange', this._resize.bind(this), false);
            window.addEventListener('resize', this._resize.bind(this), false);
        },

        /**
         * Draw panel shape and fire resize
         *
         * @private
         */
        _draw: function () {
            var texture = PIXI.Texture.fromImage(this._background);
            var shape = new PIXI.TilingSprite(texture, window.innerWidth, this._height);
            var content = new PIXI.Graphics();

            shape.addChild(content);

            this._shape = shape;
            this._content = content;

            this._resize();
        },

        /**
         * @private
         */
        _resize: function () {
            var width = window.innerWidth;

            this._shape.width = width;
            this._shape.y = window.innerHeight - this._height;
            this._content.x = (width - this._width) / 2;
        },

        /**
         * Returns panel shape
         *
         * @return {PIXI.Graphics} shape
         */
        getShape: function () {
            return this._shape;
        },

        /**
         * @param {PIXI.Graphics} child
         */
        addChild: function (child) {
            this._content.addChild(child);
        },
    };

    return Panel;

});
