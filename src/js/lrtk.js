/**
 * 退款申请验证js
 * @author tianxiaobao
 */
define(function(require, exports, module){
    "use strict";
    var $ = require('jquery');
    function Lrtk() {
        this.init();
    }
    /**
     * 初始化页面
     */
    Lrtk.prototype.init = function() {
        $('body').prepend("<div class='lrtk'><div class='page1-1'><img src='img/page1-bg.png' class='bgimg'><div class='w link'><div class='left'><a>商家入驻</a><div><p>•1秒轻松开店</p><p>•入驻成大咖</p></div></div><div class='right'><a>0元开店</a><div><p>•1秒轻松赚钱</p><p>•开店做小咖</p></div></div></div></div><div class='page1-2'><img src='img/page1-top.png' class='smimg'><a class='button left'></a><a class='button right'></a></div></div>");
		$('.lrtk').slideDown(1500,function(){
			$('.lrtk').append("<a href='javascript:;' class='up'></a>");									  
		});	
		$('.lrtk .link').show(1000,"linear");
		//设置延时函数
		function adsUp(){
			$('.lrtk .link').hide(1000,"linear");
			$('.lrtk .up').animate({
				top:'88px'
			},2000);
			$('.lrtk').animate({
				height:'100px'
			},2000,function(){
				$(this).find('.up').addClass('down').removeClass('up');	
				$(".page1-1").hide();
				$(".page1-2").show();
			});	
		}
		//五秒钟后自动收起
		var t = setTimeout(adsUp,5000);
		//点击收起
		$('.lrtk').on('click','a.up',function(){
			clearTimeout(t);
			$('.lrtk .link').hide(1000,"linear");
			$('.lrtk .up').animate({
				top:'88px'
			},2000);
			$('.lrtk').animate({
				height:'100px'						 
			},2000,function(){
				$(this).find('.up').addClass('down').removeClass('up');	
				$(".page1-1").hide();
				$(".page1-2").show();
			});	 
		});	
		//点击下拉
		$('.lrtk').on('click','a.down',function(){
			$(".page1-1").show();
			$(".page1-2").hide();
			$(this).css({
				opacity:'0'	,
				filter:'alpha(opacity=0)'
			});
			$('.lrtk .link').show(1000,"linear");
			$('.lrtk .down').animate({
				top:'1068px'
			},2000);
			$('.lrtk').animate({
				height:'1080px'
			},2000,function(){
				$(this).find('.down').addClass('up').removeClass('down').css({opacity:'1',filter:'alpha(opacity=100)'});
			});	 
		}); 
    };
    module.exports = new Lrtk();
});