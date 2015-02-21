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

    /**
     * @param {Object} o Options
     * @param {String} o.id unit id
     * @param {Number} o.index
     * @param {Number} o.helth unit helth value
     * @param {Number} o.strength unit strength value
     * @param {Object} o.position
     * @param {Number} o.position.x
     * @param {Number} o.position.y
     * @constructor
     * @alias module:UnitPanelItem
     */
    var UnitPanelItem = function (o) {
        this._id = o.id;
        this._index = o.index;
        this._helth = o.helth;
        this._strength = o.strength;
        this._position = o.position;

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
                position: this._position,
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

            var index = new PIXI.Text(String(this._index), {
                font: '64px normal monospace',
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
