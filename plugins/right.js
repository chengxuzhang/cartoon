var right = {
	run : function(obj,ev){
		this.createMenu(obj,ev);
	},
	createMenu : function(obj,ev){
		var menu = document.body.appendChild(document.createElement("div"));
		var html = '<ul>';
		for (var i = 0; i < obj.menu.length; i++) {
			html += '<li><a href="#">'+obj.menu[i].b+'</a></li>';
		}
		html += '</ul>';
		menu.className = 'skin';
		menu.innerHTML = html;
	    var oEvent=ev||event;
	    //一定要加px，要不然chrom不认
	    menu.style.top=oEvent.clientY+'px';
	    menu.style.left=oEvent.clientX+'px';
	    menu.style.display='block';
        document.onclick=function(){
          	menu.remove();
        }
	}
}