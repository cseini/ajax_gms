"use strict"
var ui = {
	div : x=>{return $('<div/>').attr(x);},
	span:x=>{return $('<span/>').attr(x);},
	anchor:x=>{ // ui.anchor({id:'',txt:'text'});
		return $("<a/>").attr({id:x.id,href:"#"}).html(x.txt);},
	ul:x=>{ 
		let y = $('<ul/>');
		for(var i=0;i<x.len;i++){
			$('<li/>').attr({id:x.id+'-'+i}).appendTo(y);
		}
			return y;
	},
	input : x=>{ // id,val
		let y = ui.div({}).addClass("input-group mb-3");
		(ui.div({id:'input-group-prepend'})
				.addClass("input-group-prepend"))
				.html('<span class="input-group-text" id="basic-addon1">'
						+ x.txt
						+'</span>'
						+'<input id="'+x.id+'" type="text" placeholder="입금액" class="form-control" aria-label="Username" aria-describedby="basic-addon1"></input>').appendTo(y);
		/*$("<input/>").attr({
			id : x.id,
			type: 'text',
			placeholder:"입금액" ,
			"aria-label":"Username", 
			"aria-describedby":"basic-addon1"
		}).addClass("form-control").appendTo(y);*/
		return y;
	},
	label : x=>{
		return $('<label/>').attr('for',x.id).text(x.txt);
	},
	button : x =>{
		/*default(outline), primary(blue), success(green), info(light blue), warning(yellow), danger(red), dark(blakc), light(white), link(trans)*/
		return $('<button/>').attr('type','button').addClass('btn btn-'+x.clazz).html(x.txt);
	}
}