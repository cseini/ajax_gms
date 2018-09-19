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
					+contentUI(img)
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
			$('#add_btn').click(e=>{
				e.preventDefault();
				app.permision.join();
			})
		})
		.fail(x=>{
			console.log('화면 구성 실패');
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
		$.getScript($.script()+'/loginBox.js',()=>{
			$('#content').html(loginBoxUI());
			$('#login_form_btn').click(e=>{
					$.ajax({
					url:$.ctx()+'/member/login',
					method:'post',
					contentType:'application/json',
					data:JSON.stringify({userid:$('#userid').val(),password:$('#password').val()}),
					success:d=>{
						var validate ="";
						if(d.ID==='CORRECT'){
							if(d.PW==='CORRECT'){
								app.router.home();
								$('#login_btn').html('로그아웃').click(e=>{
									app.router.home();
								});
								$('#add_btn').html('마이페이지').click(e=>{
									$('#header').remove();
									$.getScript($.script()+'/retrieve.js',()=>{
										$('#content').html(retrieveUI(d));
									});
								});
							}else{
								validate ="비밀번호가 틀렸습니다.";
							}
						}else{
							validate ="아이디가 없습니다.";
						}
						$('#validate').text(validate);
					},
					error:(m1,m2,m3)=>{
						alert('에러발생'+m3);
					}
				})
			})
			
		});
	}
	var join =()=>{
		$('#header').remove();
		$.getScript($.script()+'/join.js',()=>{
			$('#content').html(joinUI());
			$('#join_form_btn').click(e=>{
				$.ajax({
					url:$.ctx()+'/member/join',
					method:'post',
					contentType:'application/json',
					data:JSON.stringify({userid:$('#userid').val(),
						password:$('#password').val(),
						name:$('#name').val(),
						ssn:$('#ssn').val(),
						email:$('#email').val(),
						phone:$('#phone').val(),
						teamid:$('#teamid').val(),
						roll:$('#roll').val(),
						subject:$('#subject').val()
						}),
					success:d=>{
						login();
					},
					error:(m1,m2,m3)=>{alert(m3);}
				});
			});
		})
	}
	return {login : login,
			join : join}
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
	},
	home :x=>{
		$.when(
			$.getScript($.script()+'/nav.js'),
			$.getScript($.script()+'/header.js'),
			$.getScript($.script()+'/content.js'),
			$.getScript($.script()+'/footer.js'),
			$.Deferred(y=>{
				$(y.resolve);
			})
		).done(()=>{
			$('#wrapper').html(navUI()
					+headerUI()
					+contentUI($.img())
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
			$('#add_btn').click(e=>{
				e.preventDefault();
				app.permision.join();
			})
		})
		.fail(()=>{
			console.log('화면 구성 실패');
		});
	}
};