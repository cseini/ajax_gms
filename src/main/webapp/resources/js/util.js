"use strict"
$.prototype.nullChecker=x=>{
	var flag = false;
	var i = 0;
	for (i in x){
		if(x[i]===''){
			flag = true;
		}
	}
	return flag;
}
$.prototype.zeroChecker=x=>{
	var flag = false;
	var i = 0;
	for (i in x){
		if(x[i]==0){
			flag = true;
		}
	}
	return flag;
}
$.prototype.label=x=>{
	return $('<'+'label'+'/>').html(x.label).appendTo($('#'+x.ap));
}
$.prototype.input=x=>{
	return $('<'+'input'+'/>').attr({id:x.id,type:x.type}).appendTo($('#'+x.ap));
}
$.prototype.br=x=>{
	return $('<'+'br'+'/>').appendTo($('#'+x.ap));
}
