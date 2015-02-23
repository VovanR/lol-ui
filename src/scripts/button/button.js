/**
 * Button UI module
 *
 * @module Button
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
            normal: 'button.png',
            hovered: 'button-hovered.png',
            pressed: 'button-pressed.png',
        },
        position: {
            x: 0,
            y: 0,
        },
        width: 0,
        height: 0,
        text: null,
        textColor: '#ffffff',
        fontSize: '12px',
        fontStyle: 'normal',
        fontFamily: 'monospace',
        onClick: null,
        onTap: null,
    };

    /**
     * @param {Object} [o] Options
     * @param {Object} [o.textures]
     * @param {Object} [o.textures.normal='button.png']
     * @param {Object} [o.textures.hovered='button-hovered.png']
     * @param {Object} [o.textures.pressed='button-pressed.png']
     * @param {Object} [o.position]
     * @param {Number} [o.position.x=0]
     * @param {Number} [o.position.y=0]
     * @param {Number} [o.width=0]
     * @param {Number} [o.height=0]
     * @param {String} [o.text]
     * @param {String} [o.textColor='#ffffff']
     * @param {String} [o.fontSize='12px']
     * @param {String} [o.fontStyle='normal']
     * @param {String} [o.fontFamily='monospace']
     * @param {Function} [o.onClick]
     * @param {Function} [o.onTap]
     * @constructor
     * @alias module:Button
     */
    var Button = function (o) {
        o = _.defaults(o || {}, defaultOptions);

        this._position = o.position;
        this._width = o.width;
        this._height = o.height;
        this._text = o.text;
        this._textColor = o.textColor;
        this._fontSize = o.fontSize;
        this._fontStyle = o.fontStyle;
        this._fontFamily = o.fontFamily;
        this._onClickCallback = o.onClick;
        this._onTapCallback = o.onTap;

        this._textures = o.textures;
        this._textureButton = null;
        this._textureButtonHovered = null;
        this._textureButtonPressed = null;
        this._shape = null;

        this._isHovered = false;
        this._isPressed = false;

        this._initialize();
    };

    Button.prototype = {
        /**
         * Initialize
         *
         * @private
         */
        _initialize: function () {
            console.info('Button initialize');

            var textures = this._textures;
            this._textureButton = PIXI.Texture.fromImage(textures.normal);
            this._textureButtonHovered = PIXI.Texture.fromImage(textures.hovered);
            this._textureButtonPressed = PIXI.Texture.fromImage(textures.pressed);

            this._draw();
        },

        /**
         * Drawing button shape
         *
         * @private
         */
        _draw: function () {
            var shape = new PIXI.Sprite(this._textureButton);
            shape.buttonMode = true;
            shape.interactive = true;
            shape.x = this._position.x;
            shape.y = this._position.y;

            if (this._text) {
                var text = new PIXI.Text(this._text, {
                    font: this._fontSize + ' ' + this._fontStyle + ' ' + this._fontFamily,
                    fill: this._textColor,
                    align: 'center',
                });
                text.anchor.set(0.5, 0.5);
                text.position.set(shape.width / 2, shape.height / 2);
                shape.addChild(text);
            }

            this._shape = shape;

            this._bindControls();
        },

        /**
         * Sets hovered state
         *
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
         * Unsets hovered state
         *
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
         * Sets pressed state
         *
         * @private
         */
        _onDown: function () {
            this._isPressed = true;
            this._shape.setTexture(this._textureButtonPressed);
        },

        /**
         * Unsets pressed state
         *
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
         * Bind controls
         *
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
