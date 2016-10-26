var cartoon;
var levelId = 0; // 每个元素都有一个id
var objects = []; // 用来存储所有的对象 创建的元件
var divs = [];
var currentObj = null;
function initCartoon(){
	cartoon = {
		toolList : [
			{name:'pic',text:'图片',type:'show-pop-large','content':content.pic,'width':680,'showType':'click'},
			{name:'word',text:'文字',type:'show-pop-large','content':content.word,'width':350,'showType':'hover'},
			{name:'canvas',text:'画布',type:'show-pop-large','content':content.canvas,'width':350,'showType':'click'},
		],
		pluginsList : ['right'],
		toolSign : 'word',
		box      : null,

		//得到点击的坐标   
		getEventPosition : function(ev,cli){   
		    var x, y;
		    if(cli){
				x = ev.clientX;
				y = ev.clientY;
		    }else{
		    	if (ev.layerX || ev.layerX == 0) {
			        x = ev.layerX;
			        y = ev.layerY;
			    }else if (ev.offsetX || ev.offsetX == 0) { // Opera   
			        x = ev.offsetX;
			        y = ev.offsetY;
			    }
		    }
		    return {x: x, y: y};
		},

		identifier : function(obj,div){
			levelId ++;
			obj.levelId = levelId;
			divs[levelId] = div; // 关联元件与resize
			objects.push(obj);
		},

		setFocus : function(obj){
			currentObj = obj;
		},

		createToolList : function(list){
			var _this = this;
		    var toolListDiv = document.createElement("div");
		    toolListDiv.id = 'toolListDiv';
		    $('#car-head').append(toolListDiv);
		    for (var i = 0; i < list.length; i++) {
		    	var button = document.createElement("button");
		    	button.className = 'btn btn-primary btn-sm '+list[i].type;
		    	button.setAttribute("type","button");
		    	button.setAttribute("data-animation","fade");
		    	button.setAttribute("data-name",list[i].name);
		    	button.innerHTML = list[i].text+' <span class="caret"></span>';
		    	// ss += '<button class="btn btn-primary btn-sm '+list[i].type+'" type="button" data-animation="fade" data-name="'+list[i].name+'">'+list[i].text+' <span class="caret"></span></button>';
		    	var largeContent = list[i].content,
					largeSettings = {
						trigger:list[i].showType,
						title:false,				
						multi:false,						
						closeable:false,
						style:'',
						padding:true,
						content:largeContent,
						width:list[i].width,
						animation:'pop',
					};
				$(button).webuiPopover('destroy').webuiPopover($.extend({},largeSettings));
		    	$('#toolListDiv').append(button);
		    }
		    var jq_toolListDiv = $(toolListDiv);
		    jq_toolListDiv.find("span").click(function(){
		    	_this.toolSign = $(this).attr("data-id");
		    })
		},

		createAttr : function(attr){
			var _this = this;
		    var toolAttrDiv = document.createElement("div");
		    toolAttrDiv.id = 'toolAttrDiv';
		    toolAttrDiv.innerHTML = attr;
		    $('#car-attr').html(toolAttrDiv);
		},

		run : function(obj){
			var _this = this;
			this.box = document.getElementById(obj.box);
			this.box.style.width = window.innerWidth + 'px';
			this.box.style.height = window.innerHeight + 'px';
			this.toolList = obj.toolList || this.toolList;
			this.createToolList(this.toolList); // 创建头部菜单
		},
	};
}

$(function(){
	if(document.all){
    	document.onselectstart= function(){return false;}; //for ie
	}else{
	    document.onmousedown= function(){return false;};
	    document.onmouseup= function(){return true;};
	}
	document.onselectstart = new Function('event.returnValue=false;');

	var jsTools = [
		'tools/canvas.js',
		'tools/word.js',
		'tools/content.js',
		'tools/attr.js',
		'plugins/right.js',
		'plugins/resize.js',
		'plugins/slider.js',
	];
	var oHead = document.getElementsByTagName('HEAD').item(0);
	var oScript;
	var loading = 0;
	for (var i = 0; i < jsTools.length; i++) {
		oScript= document.createElement("script");
		oScript.type = "text/javascript";
	    oScript.src=jsTools[i];
	    // console.log(oScript.src);
	    oHead.appendChild(oScript);
	    loading++;
	}

	// 设置属性tab
	$(document).on('click','.nav-tabs li a',function(){
		tab_active = $(this).attr("data-tab");
	})

	var timer = setInterval(function(){
		// console.log(loading+','+jsTools.length);
		if(loading >= jsTools.length){
			initCartoon();
			cartoon.run({
			    box : "outBox",
			    // cartoon初始化
			});
			clearInterval(timer);
		}
	},30);
})