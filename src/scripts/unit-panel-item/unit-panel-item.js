/**
 * Unit Panel Item UI module
 *
 * @module UnitPanelItem
 * @see {@link https://github.com/VovanR/lol-ui|GitHub}
 * @author VovanR <mail@vovanr.com>
 * @version 0.0.0
 */

define([
    'lodash',
    'pixi',
    'button',
    'progressbar',
], function (
    _,
    PIXI,
    Button,
    Progressbar
) {

    'use strict';

    var defaultOptions = {
        width: 0,
        height: 0,
        background: './unit-panel-item-bgr.png',
        helth: 0,
        strength: 0,
    };

    /**
     * @param {Object} [o] Options
     * @param {Number} [o.width=0] width of item block
     * @param {Number} [o.height=0] height of item block
     * @param {String} [o.background='./unit-panel-item-bgr.png'] background of item block
     * @param {Number} [o.helth=0] unit helth value
     * @param {Number} [o.strength=0] unit strength value
     * @constructor
     * @alias module:UnitPanelItem
     */
    var UnitPanelItem = function (o) {
        o = _.defaults(o || {}, defaultOptions);

        this._width = o.width;
        this._height = o.height;
        this._background = o.background;
        this._helth = o.helth;
        this._strength = o.strength;

        this._index = 0;
        this._shape = null;

        this._initialize();
    };

    UnitPanelItem.prototype = {
        /**
         * Initialize
         *
         * @private
         */
        _initialize: function () {
            console.info('UnitPanelItem initialize');

            this._draw();
        },

        /**
         * Draw item shape
         *
         * @private
         */
        _draw: function () {
            var shape = new Button({
                textures: {
                    normal: '../../i/button.png',
                    hovered: '../../i/button-hovered.png',
                    pressed: '../../i/button-pressed.png',
                },
                position: {
                    x: 10,
                    y: 10,
                },
                width: 200,
                height: 200,
                /**
                 */
                onClick: function () {
                    alert('Click!');
                },
                /**
                 */
                onTap: function () {
                    alert('Tap!');
                },
            });

            var helth = new Progressbar({
                position: {
                    x: 10,
                    y: 125,
                },
                width: 180,
                height: 30,
                value: this._helth,
            });

            var strength = new Progressbar({
                position: {
                    x: 10,
                    y: 160,
                },
                width: 180,
                height: 30,
                value: this._strength,
            });

            var index = new PIXI.Text('1', {
                font: '64px normal monospaced',
                fill: '#ffffff',
                align: 'center',
            });
            index.anchor.x = 0.5;
            index.anchor.y = 0.5;
            index.position = {
                x: 100,
                y: 70,
            };

            shape.getShape().addChild(index);
            shape.getShape().addChild(helth.getShape());
            shape.getShape().addChild(strength.getShape());

            this._shape = shape.getShape();
        },

        /**
         * @private
         */
        _redraw: function () {
        },

        /**
         * Returns item shape
         *
         * @return {PIXI.Graphics} shape
         */
        getShape: function () {
            return this._shape;
        },

        /**
         * @param {Number} index
         */
        setIndex: function (index) {
            this._index = index;

            this._redraw();
        },

        /**
         * @param {Number} helth
         */
        setHelth: function (helth) {
            this._helth = helth;

            this._redraw();
        },

        /**
         * @param {Number} strength
         */
        setStrength: function (strength) {
            this._strength = strength;

            this._redraw();
        },
    };

    return UnitPanelItem;

});
