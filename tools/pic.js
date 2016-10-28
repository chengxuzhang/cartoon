var pic = {
	params : {
		height:'300px',
		width:'300px',
		src:'',
		html:'',
	},
	menu : [
		{a:'showAttr',b:'显示属性板'},
		{a:'close',b:'关闭'},
	],
	run : function(params){
		this.params.width = params.width || this.params.width;
		this.params.height = params.height || this.params.height;
		this.params.src = params.src || this.params.src;
		this.params.html = '<img src="'+this.params.src+'" style="width:100%;height:100%;">';
		this.createPicEditor();
	},
	createPicEditor : function(){
		var _this = this;
		var picEditorDiv = document.body.appendChild(document.createElement("div"));
		picEditorDiv.className = 'pic';
		picEditorDiv.style.left = "300px";
		picEditorDiv.style.top = "300px";
		picEditorDiv.style.width = this.params.width;
		picEditorDiv.style.height = this.params.height;
		picEditorDiv.innerHTML = this.params.html;
		picEditorDiv.oncontextmenu = function(ev){
			right.run(_this,ev);return false;
		}
		resize.run(picEditorDiv,picResize);
	},
};