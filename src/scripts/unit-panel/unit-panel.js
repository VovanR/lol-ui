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
], function (
    _,
    PIXI,
    Panel
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
     */
    UnitPanel.prototype.addChild = function (child) {
        var childWidth = child.width;
        var childX = 0;
        var childLength = this._content.children.length;
        childX = childLength * (childWidth + child.x) + child.x;
        child.x = childX;
        this._content.addChild(child);
    };

    return UnitPanel;

});
