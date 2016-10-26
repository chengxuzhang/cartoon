var tab_active = 'editor';
var attr = {
	radio    : function(data){
		var options = '';
		for (var i = 0; i < data.data.length; i++) {
			var inputDefault = data.data[i][3] ? data.data[i][3] : data.default;
			var code = data.data[i][2] ? data.data[i][2] : data.code;
			options += (inputDefault == data.data[i][0]) ? '<a class="form-radio btn btn-default active" href="#" role="button" name="'+code+'" value="'+data.data[i][0]+'">'+data.data[i][1]+'</a>' : '<a class="form-radio btn btn-default" href="#" role="button" name="'+code+'" value="'+data.data[i][0]+'">'+data.data[i][1]+'</a>';
		}
		return '<div class="group-radio btn-group">'+options+'</div>';
	},
	checkbox : function(data){
		var options = '';
		for (var i = 0; i < data.data.length; i++) {
			var inputDefault = data.data[i][3] ? data.data[i][3] : data.default;
			var code = data.data[i][2] ? data.data[i][2] : data.code;
			options += (inputDefault == data.data[i][0]) ? '<a class="form-checkbox btn btn-default active" href="#" role="button" name="'+code+'" value="'+data.data[i][0]+'" _value="'+data.data[i][0]+'">'+data.data[i][1]+'</a>' : '<a class="form-checkbox btn btn-default" href="#" role="button" name="'+code+'" value="'+data.data[i][0]+'" _value="'+data.data[i][0]+'">'+data.data[i][1]+'</a>';
		}
		return '<div class="group-checkbox btn-group">'+options+'</div>';
	},
	select : function(data){
		var _this = this;
		var options = '';
		for (var i = 0; i < data.data.length; i++) {
			options += data.default == data.data[i][0] ? '<option value="'+data.data[i][0]+'" selected>'+data.data[i][1]+'</option>' : '<option value="'+data.data[i][0]+'">'+data.data[i][1]+'</option>';
		}
		return '<div class="form-group">\
		    <div class="input-group">\
		      <div class="input-group-addon">'+data.name+'</div>\
		      <select class="form-select form-control" name="'+data.code+'" dataType="'+data.dataType+'">'+options+'</select>\
		    </div>\
		</div>';
	},
	color : function(data){
		
	},
	slider : function(data){
		var width = ((parseInt(data.default)-data.min) / (data.max-data.min)) * 100;
		var inputDefault = data.default ? parseInt(data.default) : data.min;
		return '<div class="slider slider-horizontal">\
			<div class="slider-track">\
				<div class="slider-selection" style="left: 0%; width: '+width+'%;"></div>\
				<div class="slider-handle min-slider-handle round" tabindex="0" style="left: '+width+'%;"></div>\
				<div class="slider-handle max-slider-handle round hide" tabindex="0" style="left: 0%;"></div>\
			</div>\
			<div class="tooltip tooltip-main top" style="left: '+width+'%; margin-left: -55px;">\
				<div class="tooltip-arrow"></div>\
				<div class="tooltip-inner">Current value: '+parseInt(data.default)+'</div>\
			</div>\
			<input type="hidden" name="'+data.code+'" value="" data-slider-min="'+data.min+'" data-slider-max="'+data.max+'" data-slider-step="'+data.step+'" data-slider-value="'+parseInt(data.default)+'">\
		</div>';
	},
	input : function(data){
		var _this = this;
		var inputDefault = (data.dataType == 'int') ? parseInt(data.default) : data.default;
		var inputType = (data.dataType == 'int') ? "number" : "text";
		return '<div class="form-group">\
		    <div class="input-group">\
		      <div class="input-group-addon">'+data.name+'</div>\
		      <input class="form-input form-control" name="'+data.code+'" dataType="'+data.dataType+'" type="'+inputType+'" value="'+inputDefault+'">\
		    </div>\
		</div>';
	},
	pic : function(data){
		
	},

	editor : function(myData){
		var str = '';
		var params = [
			{name:'格式',list:[
				{type:'select',dataType:'string',code:'fontSize',name:'大小',default:myData.fontSize,data:[['2px','2px'],['4px','4px'],['6px','6px'],['8px','8px'],['10px','10px'],['12px','12px'],['14px','14px'],['16px','16px'],['18px','18px'],['20px','20px'],['22px','22px'],['24px','24px'],['36px','36px'],['48px','48px'],['72px','72px']]},
				{type:'select',dataType:'string',code:'fontFamily',name:'字体',default:myData.fontFamily,data:[['PMingLiU','新細明體'],['MingLiU','細明體'],['DFKai-SB','標楷體'],['SimHei','黑体'],['SimSun','宋体'],['NSimSun','新宋体'],['FangSong','仿宋'],['KaiTi','楷体'],['FangSong_GB2312','仿宋_GB2312'],['KaiTi_GB2312','楷体_GB2312'],['Microsoft JhengHei','微軟正黑體'],['Microsoft YaHei','微软雅黑体'],['LiSu','隶书'],['YouYuan','幼圆'],['STXihei','华文细黑'],['STKaiti','华文楷体'],['STSong','华文宋体'],['STZhongsong','华文中宋'],['STFangsong','华文仿宋'],['FZShuTi','方正舒体'],['FZYaoti','方正姚体'],['STCaiyun','华文彩云'],['STHupo','华文琥珀'],['STLiti','华文隶书'],['STXingkai','华文行楷'],['STXinwei','华文新魏']]},
				{type:'checkbox',dataType:'string',data:[['bold','<i class="icon-bold"></i>','fontWeight',myData.fontWeight],['italic','<i class="icon-italic"></i>','fontStyle',myData.fontStyle],['underline','<i class="icon-underline"></i>','textDecoration',myData.textDecoration]]},
			]},
			{name:'对齐',list:[
				{type:'radio',dataType:'string',code:'textAlign',default:myData.textAlign,data:[['left','<i class="glyphicon glyphicon-align-left"></i>'],['center','<i class="glyphicon glyphicon-align-center"></i>'],['right','<i class="glyphicon glyphicon-align-right"></i>']]},
			]},
			{name:'间距',list:[
				{type:'slider',dataType:'int',min:10,max:100,step:1,code:'lineHeight',default:myData.lineHeight},
			]},
		];
		var str = this.formType(params);
		var body = '<div class="form-group-out-box">'+str+'</div>';
  		return body;
	},

	view : function(myData){
		var params = [
			{name:'位置和尺寸',list:[
				// {type:'select',code:'fontSize',name:'字体',default:myData.fontSize,data:[['2px','2px'],['4px','4px'],['6px','6px'],['8px','8px'],['10px','10px'],['12px','12px'],['14px','14px'],['16px','16px'],['18px','18px'],['20px','20px'],['22px','22px'],['24px','24px'],['36px','36px'],['48px','48px'],['72px','72px']]},
				{type:'input',code:'left',name:'X坐标',default:myData.left,dataType:'int'},
				{type:'input',code:'top',name:'Y坐标',default:myData.top,dataType:'int'},
				{type:'input',code:'width',name:'宽度',default:myData.width,dataType:'int'},
				{type:'input',code:'height',name:'高度',default:myData.height,dataType:'int'},
			]},
		];
		var str = this.formType(params);
		var body = '<div class="form-group-out-box">'+str+'</div>';
  		return body;
	},

	formType : function(params){
		var str = '';
		for (var i = 0; i < params.length; i++) {
			str += '<div>'+params[i].name+'</div>';
			for (var j = 0; j < params[i].list.length; j++) {
				switch (params[i].list[j].type){
					case 'select':
					str += this.select(params[i].list[j]);
					break;
					case 'input':
					str += this.input(params[i].list[j]);
					break;
					case 'radio':
					str += this.radio(params[i].list[j]);
					break;
					case 'checkbox':
					str += this.checkbox(params[i].list[j]);
					break;
					case 'slider':
					str += this.slider(params[i].list[j]);
					break;
				}
			}
			str += '<hr>';
		}
		return str;
	},

	create : function(myData){
		var tab1 = (tab_active == 'editor') ? 'active' : '';
		var tab2 = (tab_active == 'view') ? 'active' : '';
		return '<!-- Nav tabs -->\
			<ul class="nav nav-tabs" role="tablist">\
			  <li role="presentation" class="'+tab1+'"><a href="#editor" data-tab="editor" role="tab" data-toggle="tab">编辑</a></li>\
			  <li role="presentation" class="'+tab2+'"><a href="#view" data-tab="view" role="tab" data-toggle="tab">外观</a></li>\
			</ul>\
			<!-- Tab panes -->\
			<div class="tab-content">\
			  <div role="tabpanel" class="tab-pane '+tab1+'" id="editor">'+this.editor(myData)+'</div>\
			  <div role="tabpanel" class="tab-pane '+tab2+'" id="view">'+this.view(myData)+'</div>\
		</div>'
	},

	changeAttr:function(obj){
		var name = obj.attr("name");
		var dataType = obj.attr("dataType");
		switch(name){
			case 'left':
			currentObj.style.left = obj.val()+'px';
			divs[currentObj.levelId].style.left = obj.val()+'px';
			break;
			case 'top':
			currentObj.style.top = obj.val()+'px';
			divs[currentObj.levelId].style.top = obj.val()+'px';
			break;
			case 'width':
			currentObj.style.width = obj.val()+'px';
			divs[currentObj.levelId].style.width = obj.val()+'px';
			break;
			case 'height':
			currentObj.style.height = obj.val()+'px';
			divs[currentObj.levelId].style.height = obj.val()+'px';
			break;
			case 'fontSize':
			currentObj.style.fontSize = obj.val();
			break;
			case 'fontFamily':
			currentObj.style.fontFamily = obj.val();
			break;
			case 'textAlign':
			currentObj.style.textAlign = obj.attr("value");
			break;
			case 'fontStyle':
			currentObj.style.fontStyle = obj.attr("value");
			break;
			case 'fontWeight':
			currentObj.style.fontWeight = obj.attr("value");
			break;
			case 'textDecoration':
			currentObj.style.textDecoration = obj.attr("value");
			break;
			case 'lineHeight':
			currentObj.style.lineHeight = obj.val() + 'px';
			break;
		}
	},
}

$(function(){
	$(document).on('change','.form-select',function(){
		attr.changeAttr($(this));
	});
	$(document).on('input propertychange','.form-input',function(){
		attr.changeAttr($(this));
	});
	$(document).on('click','.form-radio',function(){
		$(this).addClass("active");
		$(this).siblings().removeClass("active");
		attr.changeAttr($(this));
	});
	$(document).on('click','.form-checkbox',function(){
		if($(this).hasClass("active")){
			$(this).removeClass("active");
			$(this).attr("value","");
		}else{
			$(this).addClass("active");
			$(this).attr("value",$(this).attr("_value"));
		}
		attr.changeAttr($(this));
	});
})