/**
 * @author VovanR <mail@vovanr.com>
 */

define([
], function (
) {

    /**
     * Button
     */
    var Button = function (o) {
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
        },
    };

    return Button;

});
