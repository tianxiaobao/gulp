/**
 * 首页交互控制
 * @author tianxiaobao
 */
define(function(require, exports, module){
    "use strict";
    var $ = require('jquery'),
        slider = require ('slider');
    function IndexJs() {
        this.init();
    }
    /**
     * 初始化页面
     */
    IndexJs.prototype.init = function() {
        var _self = this;
        _self.htSlide("#ban_slider", false, "leftLoop", true, 3500);
        var num,width;
        var curPro = 0;
        function resize(){
            num = $(".limit-slide.show a").length;
            width = num*216+(num-1)*30;
            $(".limit-slide.show").css("width",width);
            curPro = 0;
        }
        function change(num){ 
            var goLeft = -num * 246;
            $(".limit-slide.show").animate({marginLeft:goLeft});
        }
        //左箭头点击处理
        $("#limit-prev").click(function(){ 
            curPro = (curPro > 0) ? (--curPro) : (num - 5);
            change(curPro);
        });
        //右箭头点击处理
        $("#limit-next").click(function(){ 
            curPro = (curPro < num - 5) ? (++curPro) : 0;
            change(curPro);
        });
        $(".limit-tab").find("a").each(function(item){
            $(this).click(function(){
                // 切换本期与下期
                $(this).addClass("cur").siblings().removeClass("cur");
                // 切换本期与下期滚动部分
                $(".limit-slide").removeClass("show");
                $($(".limit-slide")[$(this).index()]).addClass("show");
                // 切换倒计时
                $(".limit-time").removeClass("show");
                $($(".limit-time")[$(this).index()]).addClass("show");
                // 重置切换宽度与移动距离
                resize();
            });
            // 重置切换宽度与移动距离
            resize();
        });
        // 设置倒计时
       IndexJs.prototype.showCountDown=function(year,month,day,flag) 
        { 
            var now = new Date(); 
            var endDate = new Date(year, month-1, day); 
            var leftTime=endDate.getTime()-now.getTime(); 
            var leftsecond = parseInt(leftTime/1000); 
            var hour=Math.floor(leftsecond/3600); 
            var minute=Math.floor((leftsecond-hour*3600)/60); 
            var second=Math.floor(leftsecond-hour*3600-minute*60); 
            if(flag){
                $(".limit-tab p")[0].innerHTML = "本期将于<span>"+hour+"</span>小时<span>"+minute+"</span>分<span>"+second+"</span>秒后结束";
            }else{
                $(".limit-tab p")[1].innerHTML = "下期将于<span>"+hour+"</span>小时<span>"+minute+"</span>分<span>"+second+"</span>秒后开始";  
            } 
        }
        // 启动计时器：本期与下期时间
        // window.setInterval(function(){ShowCountDown(2016,8,9,true);}, 1000);
        // window.setInterval(function(){ShowCountDown(2016,8,9,false);}, 1000);
        // 每个模块底部切换功能
        $(".sec-tab").find("li").each(function(item){ 
            $(this).hover(function(){ 
                $(this).parents(".sec-tab").find(".tab-pannel").hide();
                $(this).parent().find("li").removeClass("cur");
                $($(this).parents(".sec-tab").find(".tab-pannel")[$(this).index()]).show();
                $($(this).parent().find("li")[$(this).index()]).addClass("cur")
            });
        });
        // 监听窗口滚动事件
        $(window).scroll(function(){
            // 页面左侧固定导航
            var scrollTop = $(window).scrollTop();
            if(scrollTop>1300){
                var height=scrollTop-1300+85;
                $(".pos-tab").css("top",height+"px");
                resetClass("mz");
                // 显示母婴专区
                if (scrollTop>1750) {
                    resetClass("my");
                }
                // 显示日用百货
                if (scrollTop>2470) {
                    resetClass("ry");
                }
                // 显示食品保健
                if (scrollTop>3100) {
                    resetClass("sp");
                }
                // 超过模块部分固定到底部
                if(scrollTop>3564){
                $(".pos-tab").css("top","2347px");
                }
            }else{
                $(".pos-tab").css("top","85px");
            }
            // 根据展现给左侧导航添加颜色
            function resetClass(name){
                $(".pos-tab a").removeClass("hover");
                $(".pos-tab .pos-tab-"+name).addClass("hover");
            }
        });
        // 左侧固定导航点击与hover事件
        $(".pos-tab").find("a").each(function(item){
            var curTab;
            // 点击事件
            $(this).click(function(){ 
                curTab =$(this).index();
                switch(curTab){
                case 0:
                    $('body,html').animate({ scrollTop: 1301 }, 200);
                    break;
                case 1:
                    $('body,html').animate({ scrollTop: 1984 }, 200);
                    break;
                case 2:
                    $('body,html').animate({ scrollTop: 2668 }, 200);
                    break;
                case 3:
                    $('body,html').animate({ scrollTop: 3349 }, 200);
                    break;
                }
            });
            // hover事件
            $(this).hover(function(){ 
                curTab = $(".pos-tab a.hover").index();
                $(this).addClass("hover");
            },function(){
                if (curTab !==$(this).index()){
                $(this).removeClass("hover");}
            });
        });
    }; 
        /**
         * 轮播效果
         * @param  {String} slideBox  DOM选择
         * @param  {Boolean} moverStop 鼠标经过是否停止
         * 
         * @param  {String} effect    SuperSlider 轮播效果
         * [v1.0] fade：渐显； || top：上滚动；|| left：左滚动；|| topLoop：上循环滚动；|| leftLoop：左循环滚动；|| topMarquee：上无缝循环滚动；|| leftMarquee：左无缝循环滚动；
         [v2.0] fold：淡入淡出  [v2.1] slideDown：下拉效果
         *
         * @param  {Boolean} autoPlay  是否自动滚动
         * @param  {Number} time      轮播间隔时间
         * @return {[type]}           [description]
         */
    IndexJs.prototype.htSlide = function(slideBox, moverStop, effect, autoPlay, time) {
        $(slideBox).slide({
            mainCell: ".slide_box",
            titCell: ".guide li",
            mouseOverStop: moverStop,
            effect: effect,
            vis: 1,
            autoPlay: autoPlay,
            interTime: time
        });
    };
    module.exports = new IndexJs();
});