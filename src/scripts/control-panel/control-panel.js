/**
 * Control Panel UI module
 *
 * @module ControlPanel
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
     * @param {Number} [o.width=0] width of panel content
     * @param {Number} [o.height=0] height of panel content
     * @param {String} [o.background='./control-panel-bgr.png'] background of panel
     * @constructor
     * @alias module:ControlPanel
     */
    var ControlPanel = function (o) {
        Panel.call(this, o || {});

        this._initialize();
    };

    // constructor
    ControlPanel.prototype = Object.create(Panel.prototype);
    ControlPanel.prototype.constructor = ControlPanel;

    /**
     * Initialize
     *
     * @private
     */
    ControlPanel.prototype._initialize = function () {
        console.info('ControlPanel initialize');

        this._draw();
        this._resize();

        this._bindControls();
    };

    /**
     * Bind controls
     *
     * @private
     */
    ControlPanel.prototype._bindControls = function () {
        window.addEventListener('orientationchange', this._resize.bind(this), false);
        window.addEventListener('resize', this._resize.bind(this), false);
    };

    /**
     * @private
     */
    ControlPanel.prototype._resize = function () {
        var width = window.innerWidth;

        this._shape.width = width;
        this._shape.y = window.innerHeight - this._height;
        this._content.x = (width - this._width) / 2;
    };

    return ControlPanel;

});
