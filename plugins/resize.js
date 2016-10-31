var resize = {
	run : function(obj){
		this.createResizeDiv(obj);
	},
	createResizeDiv : function(obj){
		var resizeDiv= document.body.appendChild(document.createElement("div"));
		resizeDiv.className = 'resizeDiv';
		resizeDiv.setAttribute("tabindex","1");
		resizeDiv.style.left = parseInt(obj.style.left) + 'px';
		resizeDiv.style.top = parseInt(obj.style.top) + 'px';
		resizeDiv.style.width = parseInt(obj.offsetWidth) + 'px';
		resizeDiv.style.height = parseInt(obj.offsetHeight) + 'px';
		var html = '\
			<div class="handle nw" resize-dir="nw"></div>\
			<div class="handle n" resize-dir="n"></div>\
			<div class="handle ne" resize-dir="ne"></div>\
			<div class="handle e" resize-dir="e"></div>\
			<div class="handle se" resize-dir="se"></div>\
			<div class="handle s" resize-dir="s"></div>\
			<div class="handle sw" resize-dir="sw"></div>\
			<div class="handle w" resize-dir="w"></div>';
		resizeDiv.innerHTML = html;
		cartoon.identifier(obj,resizeDiv);// 为元素编号 此编号为它的终身编号
		this.changeResizeDiv(resizeDiv,obj);
	},
	changeResizeDiv : function(div,obj){
		var _this = this;
	    var state = 'default';
	    $(".handle").mousedown(function(){
	    	state = $(this).attr("resize-dir");
	    });
	    div.onmousedown = function(e){
	    	_this.resizeOriginal(div,e,state,obj);
	    }
	    obj.onmousedown = function(e){
	    	if(obj.readOnly){
	    		_this.moveOriginal(obj,e,div);
	    	}
	    }
	    // 临时解决方案
	    div.onblur = function(){
	    	div.style.display = 'none';
	    	obj.setAttribute("readOnly",'true');
	    	obj.style.cursor = 'default';
	    }
	    obj.onfocus = function(){
	    	$(".resizeDiv").css("display","none");
	    	$(".word").attr({"readOnly":"true"}).css({"cursor":"default"});
	    	div.style.display = 'block';
	    	// console.log(obj.style);
	    	cartoon.setFocus(obj);
	    	cartoon.createAttr(attr.create(obj.style)); // 创建属性面板
	    }
	},
	resizeOriginal : function(obj,ev,state,div){
		var box_old_left = parseInt(obj.style.left);
		var box_old_top = parseInt(obj.style.top);
		var box_width = obj.offsetWidth;
		var box_height = obj.offsetHeight;
		var box_circle_x = 0,box_circle_y = 0;
		switch(state){
			case 'se':
			box_circle_x = box_old_left,box_circle_y = box_old_top;
			break;
			case 'sw':
			box_circle_x = box_old_left+box_width,box_circle_y = box_old_top;
			break;
			case 'ne':
			box_circle_x = box_old_left,box_circle_y = box_old_top+box_height;
			break;
			case 'nw':
			box_circle_x = box_old_left+box_width,box_circle_y = box_old_top+box_height;
			break;
			case 'n':
			box_circle_x = box_old_left,box_circle_y = box_old_top+box_height;
			break;
			case 'e':
			box_circle_x = box_old_left,box_circle_y = box_old_top;
			break;
			case 's':
			box_circle_x = box_old_left,box_circle_y = box_old_top;
			break;
			case 'w':
			box_circle_x = box_old_left + box_width,box_circle_y = box_old_top+box_height;
			break;
		}

		document.onmousemove = function(ev){
			var p = cartoon.getEventPosition(ev,true);
			box_new_width = Math.abs(box_circle_x - p.x);
			box_new_height = Math.abs(box_circle_y - p.y);
			var box_new_left,box_new_top;
			if(state == 'nw'){
				box_new_left = p.x;
				box_new_top = p.y;
			}else if(state == 'ne'){
				box_new_left = p.x - box_new_width;
				box_new_top = p.y;
			}else if(state == 'sw'){
				box_new_left = p.x;
				box_new_top = p.y - box_new_height;
			}else if(state == 'se'){
				box_new_left = p.x - box_new_width;
				box_new_top = p.y - box_new_height;
			}else if(state == 'n'){
				box_new_width = box_width;
				box_new_left = box_old_left;
				box_new_top = p.y;
			}else if(state == 'e'){
				box_new_height = box_height;
				box_new_left = box_old_left;
				box_new_top = box_old_top;
			}else if(state == 's'){
				box_new_width = box_width;
				box_new_height = p.y - box_old_top;
				box_new_left = box_old_left;
				box_new_top = box_old_top;
			}else if(state == 'w'){
				box_new_height = box_height;
				box_new_left = p.x;
				box_new_top = box_old_top;
			}else{
				return false;
			}
			obj.style.width = div.style.width = box_new_width + 'px';
			obj.style.height = div.style.height = box_new_height + 'px';
			obj.style.left = div.style.left = box_new_left+'px';
			obj.style.top = div.style.top = box_new_top+'px';
			cartoon.createAttr(attr.create(div.style)); // 更新属性面板
		}

		document.onmouseup = function(){
			document.onmousemove = null;
		}
	},
	moveOriginal : function(obj,ev,div){
			// 获得鼠标初始位置
			var m_old_left = ev.pageX;
			var m_old_top = ev.pageY;
			// 获得div初始的位置
			var box_old_left = parseInt(obj.style.left);
			var box_old_top = parseInt(obj.style.top);
			var box_width = obj.offsetWidth;
			var box_height = obj.offsetHeight;
			// 给document加鼠标移动事件
			document.onmousemove = function(ev){
				// 获得鼠标最新的位置
				var m_new_left = ev.pageX;
				var m_new_top = ev.pageY;
				// 计算鼠标移动的距离
				var xdiff = m_new_left - m_old_left;
				var ydiff = m_new_top - m_old_top;
				// 计算div最新的位置
				var box_new_left = box_old_left + xdiff;
				var box_new_top = box_old_top + ydiff;
				// 计算元素最大left和top值
				var max_left = $(window).width() - obj.offsetWidth;
				var max_top = $(window).height() - obj.offsetHeight;
				if(box_new_left<0){
					box_new_left=0;
				}
				if(box_new_left>max_left){
					box_new_left = max_left;
				}
				if(box_new_top<0){
					box_new_top=0;
				}
				if(box_new_top>max_top){
					box_new_top = max_top;
				}
				// 赋值回去
				obj.style.left = box_new_left+'px';
				obj.style.top = box_new_top+'px';

				div.style.left = box_new_left + 'px';
				div.style.top = box_new_top + 'px';

				cartoon.createAttr(attr.create(obj.style)); // 创建属性面板
			};
			document.onmouseup = function(){
				document.onmousemove = null;
			}
	},
}