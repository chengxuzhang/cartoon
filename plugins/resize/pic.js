var picResize = {
	changeResizeDiv : function(div,obj){
		var _this = this;
	    var state = 'default';
	    $(".handle").mousedown(function(){
	    	state = $(this).attr("resize-dir");
	    });
	    div.onmousedown = function(e){
	    	resize.resizeOriginal(div,e,state,obj);
	    }
	    obj.onmousedown = function(e){
	    	resize.moveOriginal(obj,e,div);
	    }
	    obj.onclick = function(){
		    $(".resizeDiv").remove();
		    resize.run(obj,_this);
		    cartoon.setFocus(obj);
		    cartoon.createAttr(attr.create(obj.style)); // 创建属性面板
	    }
	},
}