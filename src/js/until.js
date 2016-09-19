/**
 * 公共js
 * @author tianxiaobao
 */
define(function(require, exports, module){
    "use strict";
    var $ = require('jquery');
    function Until() {
        this.init();
    }
    /**
     * 初始化页面
     */
    Until.prototype.init = function() {
        var _self = this;
        _self.windowScroll();  
    }; 
    /**
     * 页面滚动事件
     */ 
    Until.prototype.windowScroll = function() {
        // 判断返回顶部按钮是否显示
        $(window).scroll(function(){
            if($(window).scrollTop()>$(window).height()){
                $(".rightBar .back2top").fadeIn();
            }else{
                $(".rightBar .back2top").fadeOut();
            }
        });
        // 返回顶部事件
        $(".rightBar .back2top").on("click",function () {
            $('body,html').animate({ scrollTop: 0 }, 200);
            return false;
        });
    };
    /**
     * 分页加载数据
     */
    Until.prototype.load = function() {
        var zxPage = 1;
        //底部执行方法  下拉
        $(window).bind('scroll', function() {
            show();
        });
        function show() {
            if ($(window).scrollTop() + $(window).height()+500 >= $(document).height()) {
                loadshots();
            }
        }
        function loadshots() {
            // 线上的加载
            // $.ajax({
            //     type: "post",
            //     dataType: "json",
            //     url: weburl + '/?m=special&s=index&ajax=ajax&type=' + type + '&orderby='+orderby+'&firstRow=' + zxPage,
            //     cache: false,
            //     success: function(json) {
            //         if (json.data.length > 0) {
            //             var items = [];
            //             $.each(json.data, function(i, product) {
            //                 if ((i+1)%5==0 && i!==0) {
            //                 items.push('<div class="product mr-0">');
            //                 }else{
            //                 items.push('<div class="product">');
            //                 }
            //                 items.push('<div class="product-wrap"><a href="'+product.url+'" class="productImg" target="_blank"><img src="'+product.pic+'"></a><p class="national"><img src="'+product.national_pic+'">'+product.national_name+'<span>海外直采</span></p><p class="productTitle"><a href="'+product.url+'" target="_blank">'+product.pname+'</a></p><p class="productPrice"><span class="price-name">店头价</span>¥<span class="price-num">'+product.price+'</span></p></div>');
            //                 items.push('</div>');
            //             });
            //             var newEls = items.join(''), tmpcontent = $(newEls);
            //             $('.grid').append(tmpcontent);
            //         } else {
            //         //解除事件绑定
            //         $(window).unbind("scroll");
            //         return;
            //         }
            //     },
            //     error: function() { alert('error'); }
            // });
            // zxPage++;
            var items = [];
            for(var i=1;i<=10;i++){
                if (i%5==0) {
                    items.push('<div class="product mr-0">');
                }else{
                    items.push('<div class="product">');
                }
                items.push('<div class="product-wrap"><a href="" class="productImg"><img src="img/tem18.jpg"></a><p class="national"><img src="img/tem19.jpg">日本<span>海外直采</span></p><p class="productTitle"><a href="">专柜belulu日本直邮代购纳米喷雾器补水保湿美容仪家用美露露七夕</a></p><p class="productPrice"><span class="price-name">店头价</span>¥<span class="price-num">136.00</span></p></div>');
                items.push('</div>');

            }
            var newEls = items.join(''), tmpcontent = $(newEls);
            $('.grid').append(tmpcontent);
        }
    };
    // 部分选，全选
    Until.prototype.checkBox =function(){
        $("#checkAll").click(function() {
            $('input[name="subBox"]').prop("checked",this.checked);
        });
        var $subBox = $("input[name='subBox']");
        $subBox.click(function(){
            $("#checkAll").prop("checked",$subBox.length == $("input[name='subBox']:checked").length ? true : false);
        });
    };
    // 弹框提示信息
    Until.prototype.tipsWarn =function(s){
        var str = '<div class="tipsWarn">'+s+'</div>'
        $("body").append(str);
        $(".tipsWarn").css({"min-width":"100px","position":"fixed","background":"rgba(0,0,0,.6)","color":"#fff","text-align":"center","padding":"10px","border-radius":"2px"});
        var left = Math.floor(($(window).width()-$(".tipsWarn").width())/2);
        var top = Math.floor(($(window).height()-$(".tipsWarn").height())/2);
        $(".tipsWarn").css("left",left).css("top",top);
        setTimeout(function(){$(".tipsWarn").remove()},3000);
    };
    module.exports = new Until();
});