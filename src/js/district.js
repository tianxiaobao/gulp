/*
*省市区三级联动
*author:tianxiaobao
*/
define(function(require, exports, module){
    "use strict";
    var $ = require('jquery');
    function District() {
        this.init();
    }
    /*
	*初始化
	*/
    District.prototype.init = function(){
    	var _self = this;
    	$("[id^='select_']").each(function(){
    		$(this).change(function(){
				if(!this.value)
				{
					var valarray = this.id.split('_');
					$('#'+this.id).nextAll('select').empty().addClass('hidden');
					$('#t').val('');
					$('#id_'+valarray[1]).nextAll("input'").val('');
					$('#id_'+valarray[1]).val('');
					return false;	
				}
				_self.change_district(this.value);
    		});
    	});
	}
	District.prototype.change_district =function(value){
		var _self = this;
		var valarray = value.split('|');
		var weburl;
		var thisURL = document.URL;
		if(thisURL.indexOf('admin/')>0)
		weburl='../';
		else
		weburl='';
		var url = weburl + 'ajax_back_end.php';
		var sj = new Date();
		var pars = 'shuiji=' + sj+'&d_id='+valarray[0];
		// $.post(url, pars,showResponse);
		var str="{'1':{'0':'37','1':'东城区'},'2':{'0':'38','1':'西城区'},'3':{'0':'39','1':'崇文区'},'4':{'0':'40','1':'宣武区'},'5':{'0':'41','1':'朝阳区'},'6':{'0':'42','1':'丰台区'},'7':{'0':'43','1':'石景山区'},'8':{'0':'44','1':'海淀区'},'9':{'0':'45','1':'门头沟区'},'10':{'0':'46','1':'房山区'},'11':{'0':'47','1':'通州区'},'12':{'0':'48','1':'顺义区'},'13':{'0':'49','1':'昌平区'},'14':{'0':'50','1':'大兴区'},'15':{'0':'51','1':'怀柔区'},'16':{'0':'52','1':'平谷区'},'17':{'0':'53','1':'密云县'},'18':{'0':'54','1':'延庆县'}};"
		// 数据处理函数
		function showResponse(originalRequest){
			var valarray = value.split('|');
			if(originalRequest == "")
			{
				for(var i= parseInt(valarray[1]); i<4; i++){
				$('#select_'+(i+1)).empty().addClass('hidden');
			}
			var str="";
			$('#id_'+valarray[1]).val(valarray[0]);
			$.each($("option[value='"+value+"']"),function(i){
				$(this).attr('class','classClick');
			});
			$.each($('option[class="classClick"]'),function(i){
				str+=$(this).text()+" ";
			});
			str=str.substring(0,str.length-1);
				$('#t').val(str);
			}
			var MyMe;
			var tempStr = 'MyMe = ' + originalRequest;
			eval(tempStr);
			var a='<option value="">--请选择--</option>';
			var class_div_id = parseInt(valarray[1])+1;
			for(var k in MyMe)
			{
				var Id=MyMe[k][0];
				var Name=MyMe[k][1];
				a+='<option value="'+Id+'|'+class_div_id+'">'+Name+'</option>';
			}

			$('#select_'+class_div_id).removeClass('hidden');
			$('#id_'+valarray[1]).val(valarray[0]);
			for (var j=class_div_id; j<=4; j++) {
				$('#select_'+(j+1)).addClass('hidden');
				$('#id_'+j).val('');
			}
			$('#select_'+class_div_id).empty();
			$('#select_'+class_div_id).append(a);
			$('#select_'+class_div_id).nextAll('select').empty();
			var str="";
			$.each($("option[value='"+value+"']"),function(i){
				$(this).attr('class','classClick');
			});
			$.each($('option[class="classClick"]'),function(i){
				str+=$(this).text()+" ";
			});
			str=str.substring(0,str.length-1);
			$('#t').val(str);
		}
	}
	module.exports = new District();
});
