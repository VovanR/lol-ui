/**
 * Unit Panel UI module
 *
 * @module UnitPanel
 * @extends Panel
 * @see module:Panel
 * @see {@link https://github.com/VovanR/lol-ui|GitHub}
 * @author VovanR <mail@vovanr.com>
 * @version 0.0.0
 */

define([
    'lodash',
    'pixi',
    'panel',
    'unitPanelItem',
], function (
    _,
    PIXI,
    Panel,
    UnitPanelItem
) {

    'use strict';

    var defaultOptions = {
    };

    /**
     * @param {Object} [o] Options
     * @param {Object} [o.position]
     * @param {Number} [o.position.x=0]
     * @param {Number} [o.position.y=0]
     * @param {Number} [o.width=0] width of panel
     * @param {Number} [o.height=0] height of panel
     * @param {String} [o.background='./unit-panel-bgr.png'] background of panel
     * @constructor
     * @alias module:UnitPanel
     */
    var UnitPanel = function (o) {
        Panel.call(this, o || {});

        this._itemMargin = 10;
        this._itemWidth = 200;
        this._childrens = [];

        this._initialize();
    };

    // constructor
    UnitPanel.prototype = Object.create(Panel.prototype);
    UnitPanel.prototype.constructor = UnitPanel;

    /**
     * Initialize
     *
     * @private
     */
    UnitPanel.prototype._initialize = function () {
        console.info('UnitPanel initialize');

        this._draw();
    };

    /**
     * Added child to panel content
     *
     * @param {PIXI.Graphics} child
     * @private
     */
    UnitPanel.prototype._addChild = function (child) {
        this._content.addChild(child);
    };

    /**
     * Returns next item index number
     *
     * @return {Number} nextIndex
     * @private
     */
    UnitPanel.prototype._getNextIndex = function () {
        var nextIndex = this._childrens.length + 1;

        return nextIndex;
    };

    /**
     * Returns next item position
     *
     * @return {Object} nextPosition { x: {Number}, y: {Number} }
     * @private
     */
    UnitPanel.prototype._getNextPosition = function () {
        var margin = this._itemMargin;
        var x = (margin + this._itemWidth) * this._childrens.length + margin;
        var nextPosition = {
            x: x,
            y: margin,
        };

        return nextPosition;
    };

    /**
     * Adds unit panel item
     *
     * @param {Object} o Options
     * @param {String} o.id
     * @param {Number} o.helth
     * @param {Number} o.strength
     */
    UnitPanel.prototype.addUnit = function (o) {
        var item = new UnitPanelItem({
            id: o.id,
            index: this._getNextIndex(),
            position: this._getNextPosition(),
            helth: o.helth,
            strength: o.strength,
        });

        this._childrens.push(item);
        this._addChild(item.getShape());
    };

    return UnitPanel;

});
