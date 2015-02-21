/**
 * Indicator UI module
 *
 * @module Indicator
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

    var defaultOptions = {
        textures: {
            disabled: 'indicator-disabled.png',
            enabled: 'indicator-enabled.png',
        },
        position: {
            x: 0,
            y: 0,
        },
        width: 0,
        height: 0,
    };

    /**
     * @param {Object} [o] Options
     * @param {Object} [o.textures]
     * @param {String} [o.textures.disabled='indicator-disabled.png']
     * @param {String} [o.textures.enabled='indicator-enabled.g']
     * @param {Object} [o.position]
     * @param {Number} [o.position.x=0]
     * @param {Number} [o.position.y=0]
     * @param {Number} [o.width=0]
     * @param {Number} [o.height=0]
     * @constructor
     * @alias module:Indicator
     */
    var Indicator = function (o) {
        o = _.defaults(o || {}, defaultOptions);

        this._position = o.position;
        this._width = o.width;
        this._height = o.height;

        this._textures = o.textures;
        this._textureEnabled = null;
        this._textureDisabled = null;
        this._shape = null;

        this._isEnabled = false;

        this._initialize();
    };

    Indicator.prototype = {
        /**
         * Initialize
         *
         * @private
         */
        _initialize: function () {
            console.info('Indicator initialize');

            var textures = this._textures;
            this._textureDisabled = PIXI.Texture.fromImage(textures.disabled);
            this._textureEnabled = PIXI.Texture.fromImage(textures.enabled);

            this._draw();
        },

        /**
         * Drawing indicator shape
         *
         * @private
         */
        _draw: function () {
            var shape = new PIXI.Sprite(this._textureDisabled);
            shape.x = this._position.x;
            shape.y = this._position.y;

            this._shape = shape;
        },

        /**
         * Returns indicator shape
         *
         * @return {PIXI.Sprite} shape
         */
        getShape: function () {
            return this._shape;
        },

        /**
         * Switch on indicator
         */
        enable: function () {
            this._isEnabled = true;
            this._shape.setTexture(this._textureEnabled);
        },

        /**
         * Switch off indicator
         */
        disable: function () {
            this._isEnabled = false;
            this._shape.setTexture(this._textureDisabled);
        },
    };

    return Indicator;

});
