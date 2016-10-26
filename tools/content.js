var content = {
	word : '<div class="list-group">\
		<a class="list-group-item" data-params="{fontSize:\'12px\',html:\'小号文字\',color:\'#000000\',height:\'20px\'}">小号文字</a>\
		<a class="list-group-item" data-params="{fontSize:\'24px\',html:\'中号文字\',color:\'#000000\',height:\'40px\'}">中号文字</a>\
		<a class="list-group-item" data-params="{fontSize:\'48px\',html:\'大号文字\',color:\'#000000\',height:\'64px\'}">大号文字</a>\
	</div>',
	pic : '<div id="upload"></div>',
	canvas : '222',
};

$(function(){
	var params;
	$(document).on('click','.list-group-item',function(){
		params = $(this).attr("data-params");
		var new_params = eval('(' + params + ')');
		word.run(new_params);
	})
})