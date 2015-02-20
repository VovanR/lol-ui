/**
 * Unit Panel UI module
 *
 * @module UnitPanel
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
        background: './unit-panel-bgr.png',
    };

    /**
     * @param {Object} [o] Options
     * @param {Number} [o.width=100] width of panel
     * @param {Number} [o.height=10] height of panel
     * @param {String} [o.background='./unit-panel-bgr.png'] background of panel
     * @constructor
     * @alias module:UnitPanel
     */
    var UnitPanel = function (o) {
        o = _.defaults(o || {}, defaultOptions);

        this._width = o.width;
        this._height = o.height;
        this._background = o.background;

        this._shape = null;
        this._content = null;

        this._initialize();
    };

    UnitPanel.prototype = {
        /**
         * Initialize
         *
         * @private
         */
        _initialize: function () {
            console.info('UnitPanel initialize');

            this._draw();
        },

        /**
         * Draw panel shape and fire resize
         *
         * @private
         */
        _draw: function () {
            var texture = PIXI.Texture.fromImage(this._background);
            var shape = new PIXI.TilingSprite(texture, this._width, this._height);
            shape.position.set(0, 0);
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
         * @param {PIXI.Graphics} child
         */
        addChild: function (child) {
            this._content.addChild(child);
        },
    };

    return UnitPanel;

});
