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
        textures: {
            normal: 'button.png',
            hovered: 'button-hovered.png',
            pressed: 'button-pressed.png',
        },
        position: {
            x: 0,
            y: 0,
        },
        width: 100,
        height: 100,
        onClick: null,
        onTap: null,
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
     * @param {Function} [o.onClick]
     * @param {Function} [o.onTap]
     */
    var Button = function (o) {
        o = _.defaults(o || {}, defaultOptions);

        this._position = o.position;
        this._width = o.width;
        this._height = o.height;
        this._onClickCallback = o.onClick;
        this._onTapCallback = o.onTap;

        this._textures = o.textures;
        this._textureButton = null;
        this._textureButtonHovered = null;
        this._textureButtonPressed = null;
        this._shape = null;

        this._isHovered = false;
        this._isPressed = false;

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

            var textures = this._textures;
            this._textureButton = PIXI.Texture.fromImage(textures.normal);
            this._textureButtonHovered = PIXI.Texture.fromImage(textures.hovered);
            this._textureButtonPressed = PIXI.Texture.fromImage(textures.pressed);

            this._draw();
        },

        /**
         * @private
         */
        _draw: function () {
            var shape = new PIXI.Sprite(this._textureButton);
            shape.buttonMode = true;
            shape.interactive = true;
            shape.x = this._position.x;
            shape.y = this._position.y;

            this._shape = shape;

            this._bindControls();
        },

        /**
         * @private
         */
        _onOver: function () {
            this._isHovered = true;

            if (this._isPressed) {
                return;
            }

            this._shape.setTexture(this._textureButtonHovered);
        },

        /**
         * @private
         */
        _onOut: function () {
            this._isHovered = false;

            if (this._isPressed) {
                return;
            }

            this._shape.setTexture(this._textureButton);
        },

        /**
         * @private
         */
        _onDown: function () {
            this._isPressed = true;
            this._shape.setTexture(this._textureButtonPressed);
        },

        /**
         * @private
         */
        _onUp: function () {
            this._isPressed = false;

            if (this._isHovered) {
                this._shape.setTexture(this._textureButtonHovered);
            } else {
                this._shape.setTexture(this._textureButton);
            }
        },

        /**
         * @private
         */
        _bindControls: function () {
            var _this = this;
            var button = this._shape;

            /**
             * Over
             */
            button.mouseover = function () {
                _this._onOver();
            };

            /**
             * Out
             */
            button.mouseout = function () {
                _this._onOut();
            };

            /**
             * Down
             */
            button.mousedown = function () {
                _this._onDown();
            };
            /**
             * Down
             */
            button.touchstart = function () {
                _this._onDown();
            };

            /**
             * Up
             */
            button.mouseup = function () {
                _this._onUp();
            };
            /**
             * Up
             */
            button.touchend = function () {
                _this._onUp();
            };
            /**
             * Up
             */
            button.mouseupoutside = function () {
                _this._onUp();
            };
            /**
             * Up
             */
            button.touchendoutside = function () {
                _this._onUp();
            };

            // Callbacks
            if (this._onClickCallback) {
                button.click = this._onClickCallback;
            }

            if (this._onTapCallback) {
                button.tap = this._onTapCallback;
            }
        },

        /**
         * Returns button shape
         *
         * @return {PIXI.Sprite} shape
         */
        getShape: function () {
            return this._shape;
        },
    };

    return Button;

});
