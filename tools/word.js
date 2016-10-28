var word = {
	params : {
		html : '默认文字',
		color:'#000000',
		fontSize:'12px',
		height:'20px',
		width:'300px',
		fontFamily:'SimHei',
	},
	menu : [
		{a:'showAttr',b:'显示属性板'},
		{a:'close',b:'关闭'},
	],
	run : function(params){
		this.params.color = params.color || this.params.color;
		this.params.fontSize = params.fontSize || this.params.fontSize;
		this.params.html = params.html || this.params.html;
		this.params.width = params.width || this.params.width;
		this.params.height = params.height || this.params.height;
		this.params.fontFamily = params.fontFamily || this.params.fontFamily;
		this.createWordEditor();
	},
	createWordEditor : function(){
		var _this = this;
		var wordEditorDiv = document.body.appendChild(document.createElement("textarea"));
		wordEditorDiv.className = 'word';
		wordEditorDiv.style.left = "300px";
		wordEditorDiv.style.top = "300px";
		wordEditorDiv.style.color = this.params.color;
		wordEditorDiv.style.fontSize = this.params.fontSize;
		wordEditorDiv.style.width = this.params.width;
		wordEditorDiv.style.height = this.params.height;
		wordEditorDiv.style.fontFamily = this.params.fontFamily;
		wordEditorDiv.setAttribute("readOnly",'true');
		wordEditorDiv.innerHTML = this.params.html;
		wordEditorDiv.oncontextmenu = function(ev){
			right.run(_this,ev);return false;
		}

		wordEditorDiv.addEventListener('dblclick', function(e){
			wordEditorDiv.removeAttribute("readOnly");
			wordEditorDiv.style.border = '1px solid #eee';
			wordEditorDiv.style.cursor = 'text';
			$(".resizeDiv").remove();
			var oBox = document.getElementById("outBox");
			oBox.onmousedown = null;
		},false);

		document.onclick = function(event){
			var event = event || window.event;
	    	var target = event.target || event.srcElement;
	    	if($(target).hasClass("word")){
	    		return false;
	    	}
			wordEditorDiv.style.border = 'none';
			wordEditorDiv.setAttribute("readOnly",'true');
			wordEditorDiv.style.cursor = 'default';
		}
		resize.run(wordEditorDiv,wordResize);
	},
};