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
        width: 0,
        height: 0,
        background: './panel-bgr.png',
    };

    /**
     * @param {Object} [o] Options
     * @param {Object} [o.position]
     * @param {Number} [o.position.x=0]
     * @param {Number} [o.position.y=0]
     * @param {Number} [o.width=0] width of panel
     * @param {Number} [o.height=0] height of panel
     * @param {String} [o.background='./panel-bgr.png'] background of panel
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
        this._content = null;
    };

    Panel.prototype = {
        /**
         * Draw panel shape and fire resize
         *
         * @private
         */
        _draw: function () {
            var texture = PIXI.Texture.fromImage(this._background);
            var shape = new PIXI.TilingSprite(texture, this._width, this._height);
            var position = this._position;
            shape.position.set(position.x, position.y);
            var content = new PIXI.Graphics();

            shape.addChild(content);

            this._shape = shape;
            this._content = content;
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
         * Added child to panel content
         *
         * @param {PIXI.Graphics} child
         */
        addChild: function (child) {
            this._content.addChild(child);
        },
    };

    return Panel;

});
