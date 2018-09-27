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
			$('#logo_btn').click(e=>{
				e.preventDefault();
				app.router.home();
			})
			$('#login_btn').addClass('btn btn-danger').click(e=>{
				e.preventDefault();
				app.permision.login();
			});
			$('#board').addClass('btn btn-danger').click(e=>{
				e.preventDefault();
				app.board.init();
			})
			$('#add_btn').addClass('btn btn-danger').click(e=>{
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
		$('#header').remove();
		$('#content').empty();
		$.getJSON(ctx+'/boards/1',d=>{
			$.getScript($.script()+'/compo.js',()=>{
				let x = {
						type : 'default',
						id : 'table',
						head :'게시판',
						body : '오픈게시판...',
						list : ['No.','제목','내용','작성자','작성일','조회수'],
						clazz : 'table table-bordered'
				}
				ui.tbl(x).appendTo($('#content'));
				$.each(d,(i,j)=>{
					$('<tr/>').append(
					$('<td/>').attr('width','5%').html(j.bno),
					$('<td/>').attr('width','10%').html(j.title),
					$('<td/>').attr('width','50%').html(j.content),
					$('<td/>').attr('width','10%').html(j.writer),
					$('<td/>').attr('width','5%').html(j.regdate),
					$('<td/>').attr('width','10%').html(j.viewcnt)
					).appendTo($('tbody'));
				})
			})
		})
	};
	return {init:init};
})();
app.permision = (()=>{
	var login = ()=>{
		$('#header').remove();
		$.getScript($.script()+'/compo.js',()=>{
			$.getScript($.script()+'/loginBox.js',()=>{
				$('#content').html(loginBoxUI());
				ui.anchor({id:'login_form_btn',txt:'로그인'})
				.css({'width':'300px'})
				.addClass('btn btn-danger btn-lg')
				.appendTo($('#content-box')).click(e=>{
						$.ajax({
						url:$.ctx()+'/member/login',
						method:'post',
						contentType:'application/json',
						data:JSON.stringify({userid:$('#userid').val(),password:$('#password').val()}),
						success:d=>{
							let validate ="";
							if(d.ID==='WRONG'){
								validate ="아이디가 없습니다.";
							}else if(d.PW==='WRONG'){
								validate ="비밀번호가 틀렸습니다.";	
							}else{
								$.getScript($.script()+'/header.js',()=>{
									$('#content').html(headerUI());	
								});
								$.getScript($.script()+'/content.js',()=>{
									$('#content').append(contentUI());	
								});
								$('#logo_btn').click(e=>{
									e.preventDefault();
									app.router.home();
								})
								$('#board').remove();
								ui.anchor({id:'board',txt:'게시판'})
								.addClass('btn btn-info btn-lg')
								.appendTo($('#nav_right')).click(e=>{
									app.router.home();
								});
								$('#board').addClass('btn btn-info');
								$('#login_btn').remove();
								ui.anchor({id:'logout_btn',txt:'로그아웃'})
								.addClass('btn btn-danger btn-lg')
								.appendTo($('#nav_right')).click(e=>{
									app.router.home();
								});
								$('#add_btn').remove();
								ui.anchor({id:'retireve_btn',txt:'마이페이지'})
								.addClass('btn btn-danger btn-lg')
								.appendTo($('#nav_right')).click(e=>{
									$.getScript($.script()+'/retrieve.js',()=>{
										$('#content').html(retrieveUI(d));
									});
								});
							}
							$('#validate').html(validate);
						},
						error:(m1,m2,m3)=>{
							alert('에러발생'+m3);
						}
					})
				})
			});
		})
		
	}
	var join =()=>{
		$('#header').remove();
		$.getScript($.script()+'/compo.js',()=>{
			$.getScript($.script()+'/join.js',()=>{
				$('#content').html(joinUI());
				$('#join_form_textbox').css({'text-align':'center'});
				/*$('[name="subject"]')
				.change(function(){
					alert($(this).val());
				}); 변화되는 부분값만 가지고오는 소스 */ 
				ui.anchor({id:'join_form_btn',txt:'가입하기'})
				.addClass('btn btn-danger btn-lg')
				.appendTo($('#join_form_otherbox'))
				.click(e=>{
					e.preventDefault();
					var arr=[];
					var a='';
					let i;
					for(i of $("[name=subject]")){
						if(i.checked){
							alert('선택된 과목'+i.value);
							arr.push(i.value);
							a+=i.value+','
						}
					}
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
							teamid:$('[name=teamid]:checked').val(),
							roll:$('#roll').val(),
							subject:a
							}),
						success:d=>{
							login();
						},
						error:(m1,m2,m3)=>{alert(m3);}
					});
				})
			})
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
	home :()=>{
		$.when(
			$.getScript($.script()+'/nav.js'),
			$.getScript($.script()+'/header.js'),
			$.getScript($.script()+'/content.js'),
			$.getScript($.script()+'/footer.js'),
			$.Deferred(y=>{$(y.resolve);})
		).done(()=>{
			$('#wrapper').html(navUI()
					+headerUI()
					+contentUI()
					+footerUI());
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