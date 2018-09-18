"use strict";
var app = app || {};
app =(()=>{
	var init =x=>{
		console.log('Step 1'+x);
		app.router.init(x);
	};
	return {init : init};
})();
app.main =(()=>{
	var w, nav, header, content, footer, ctx, script, style,img,loginBox;
	var init =()=>{
		ctx = $.ctx();
		script = $.script();
		style = $.style();
		img = $.img();
		w=$('#wrapper');
		nav=script+'/nav.js';
		header=script+'/header.js';
		content=script+'/content.js';
		footer=script+'/footer.js';
		loginBox=script+'/loginBox.js';
		onCreate();
	};
	var onCreate =()=>{
		setContentView();
	};
	var setContentView =()=>{
		$.when(
			$.getScript(nav),
			$.getScript(header),
			$.getScript(content),
			$.getScript(footer),
			$.Deferred(x=>{
				$(x.resolve);
			})
		).done(()=>{
			w.html(navUI()
					+headerUI()
					+contentUI()
					+footerUI()
					);
			$('#login_btn').click(e=>{
				e.preventDefault();
				app.permision.login();
			});
			$('#board').click(e=>{
				e.preventDefault();
				app.board.init();
			})
		})
		.fail(x=>{
			
		});
	};
	return {init:init};
})();
app.board =(()=>{
	var init =()=>{
		onCreate();
	};
	var onCreate =()=>{
		setContentView();
	};
	var setContentView =()=>{
		alert('Board');
		$('#header').remove();
		$('#content').empty();
	};
	return {init:init};
})();
app.permision = (()=>{
	var login = ()=>{
		$('#header').remove();
		$('#content').empty();
		$.getScript($.script()+'/loginBox.js',()=>{
			$('#content').html(loginBoxUI());
		});
	}
	return {login : login}
})();
app.router = {
	init :x=>{
		$.getScript(x+'/resources/js/router.js',
			()=>{
				$.extend(new Session(x));
				$.getScript($.ctx()+'/resources/js/util.js')
					.done(x=>{console.log('실행');})
					.fail(x=>{console.log('실패')});
				app.main.init();
			}
		);
	}
};