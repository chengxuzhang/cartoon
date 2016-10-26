$(function(){
	$(document).on('mousedown','.min-slider-handle',function(ev){
		var _this = $(this);
		var selection = _this.prev();
		var toolMain = _this.parent().next();
		var input = _this.parent().parent().find("input");
		var inputMin = parseInt(input.attr("data-slider-min"));
		var inputMax = parseInt(input.attr("data-slider-max"));
		var inputStep = parseInt(input.attr("data-slider-step"));
		var inputValue = parseInt(input.attr("data-slider-value"));
		var inputLength = inputMax - inputMin;
		var m_old_left = ev.pageX;
		var box_old_left = _this.position().left;
		toolMain.css({"opacity":1});
		document.onmousemove = function(ev){
			var m_new_left = ev.pageX;
			var xdiff = m_new_left - m_old_left;
			var box_new_left = box_old_left + xdiff;
			var max_left = 200;
			if(box_new_left<0){
				box_new_left=0;
			}
			if(box_new_left>max_left){
				box_new_left = max_left;
			}
			var inputX = Math.round((inputLength*box_new_left)/max_left)+inputMin;
			var val = Math.floor(inputX / inputStep)*inputStep;
			_this.css({"left":(box_new_left/max_left)*100+'%'});
			selection.css({"width":(box_new_left/max_left)*100+'%'});
			toolMain.css({"left":(box_new_left/max_left)*100+'%'});
			input.val(val);
			toolMain.find(".tooltip-inner").html("Current value: "+val);
			attr.changeAttr(input);
		};
		document.onmouseup = function(){
			document.onmousemove = null;
			toolMain.css({"opacity":0});
		}
	});
})