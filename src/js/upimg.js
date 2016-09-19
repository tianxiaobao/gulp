/**
 * 上传图片js
 * @author tianxiaobao
 */
define(function(require, exports, module){
    "use strict";
    var $ = require('jquery');
    function Upimg() {
        this.init();
    }
    /**
    * 初始化
    */
    Upimg.prototype.init =function(){
        /**
        * 移除功能
        */ 
        $(".show-image i").each(function(i){
            $(this).click(function(){
                $(this).parents(".ui-form-item").find("input").val("");
                $(this).parent().remove();
            });
        });
        var a;
        // 绑定事件
        $('.a-upload input').bind('change', function (e) {
            a = e.target;
            var fs = e.target.files || e.dataTransfer && e.dataTransfer.files;
            handleFiles(fs);
        });
        // 头像上传
        function sendFile (f) {
            var uploadUrl = '/ajaxupload.php';
            $.ajax({
                url: uploadUrl,
                type: 'POST',
                contentType: false,
                processData: false,
                cache: false,
                data: f,
                success: function (e) {
                    var msg = JSON.parse(e);
                    $("input[data-id="+a+"]").attr("value",msg.key);
                    $("input[data-id="+a+"]").next().attr("src", '../'+msg.key);
                },
                error: function (e) {
                }
            });
        }
        // 读取文件
        function handleFiles (files) {
            var tim = new Date();
            var day = tim.getDate();
            var year = tim.getFullYear();
            var month = tim.getMonth()+1;
            month = month < 10 ? '0' + month : month;
            for (var i = 0; i < files.length; i++) {
                var fd = new FormData();
                if (files[i].type.match('image.*')) {
                    fd.append('file', files[i])
                    fd.append('fileurl', "uploadfile/member/"+year+month+day + "/")
                    sendFile(fd);
                    break;
                }
            }
        }
    }
    module.exports = new Upimg();
});