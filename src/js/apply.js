/**
 * 退款申请验证js
 * @author tianxiaobao
 */
define(function(require, exports, module){
    "use strict";
    var $ = require('jquery');
    var until = require('Until');
    function Apply() {
        this.init();
    }
    /**
     * 初始化页面
     */
    Apply.prototype.init = function() {
        var _self = this;
        $("input[type='submit']").on("click",function(){
            if($(".tipsWarn")){
                $(".tipsWarn").remove();
            }
            return _self.check();
        }) 
    };
    Apply.prototype.check = function() { 
        var num = 0;
        if($("select[name='reason_type']").val()==0){
            until.tipsWarn("请选择退款原因!");
            return false;
        }
        if($("textarea[name='reason']").val() ==""){
            until.tipsWarn("请填写退款说明!");
            return false;
        }
        $("input[name='pic[]']").each(function () {
            if ($(this).val() !== "") {
                num = num+1;
            }
        })
        if(num == 0){
            until.tipsWarn("请上传凭证!");
            return false;
        }
        return true;
    }; 
    module.exports = new Apply();
});