/**
 * 申请开店
 * @author tianxiaobao
 */
define(function(require, exports, module){
    "use strict";
    var $ = require('jquery');
    function SApply() {}
    /**
     * 步骤二
     */ 
    SApply.prototype.step2 =function(){
    	var copy = $(".scan-copy");
    	$(".ui-radio").each(function(i){
			$(this).click(function(){
                if(i){
                    copy.hide();
                }
                else{
                    copy.show();
                }
			});
        });
    }
    module.exports = new SApply();
});