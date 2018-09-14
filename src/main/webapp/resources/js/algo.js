"use strict"
var algo =  algo || {};
algo = {
	init : x=>{
		algo.onCreate(x);
		algo.setContentView()
	},
	onCreate: x=>{
		algo.router.onCreate(x);
	},
	setContentView : ()=>{
		$('#wrapper').empty();
	}
};
algo.main = {
	onCreate : ()=>{
		algo.main.setContentView();
	},
	setContentView : ()=>{
		$('#wrapper').html('<h1 class="text-center">알고리즘</h1><h3 class="text-center">수 열</h3><div id="ctn">'
				+'<table id="tb1" style="width:800px;height:300px;border-collapse:collapse;border:1px solid black;margin:0 auto;margin-bottom:10px;>'
				+'<tr style="border:1px solid black;">'
				+'<td id="t__l" style="width:50%;border:1px solid black"></td>'
				+'<td id="t__r" style="width:50%;border:1px solid black"></td>'
				+'</tr>'
				+'</table>');
		let $t__l = $('#t__l');
		let $t__r = $('#t__r');
		$("<ul/>")
		.attr({id:'side__menu'})
		.addClass('list-group')
		.appendTo($t__l);
		$("<li/>")
		.attr({id:'arith'})
		.addClass('list-group-item text-center')
		.appendTo($('#side__menu'));
		$("<a/>")
		.attr({href:"#"})
		.html('등차수열의 합')
		.appendTo($('#arith'))
		.click(e=>{
			$t__r.empty();
			$('<div/>')
			.attr({id:'ques'}).addClass('text-center').appendTo($t__r);
			$('<h4/>')
			.html('시작값 x, 마지막값 y, 공차 d인 수열의 합을 구하시오.').appendTo($('#ques'));
		
			let arr = [{label:'시작값',id:'sta',ap:'ques'},
						{label:'마지막값',id:'end',ap:'ques'},
						{label:'공차',id:'diff',ap:'ques'}];
			$.each(arr, (i,j)=>{
				$.fn.label(j);
				/*$('<'+'label'+'/>').html(j.label).appendTo($('#ques'));*/
				$('<'+'input'+'/>').attr({id:j.id,type:'text'}).appendTo($('#ques'));
				$('<'+'br'+'/>').appendTo($('#ques'));
			});
			/*for(let i in arr){
			$('<'+'label'+'/>').html(arr[i].label).appendTo($('#ques'));
			$('<'+'input'+'/>').attr({id:arr[i].id,type:'text'}).appendTo($('#ques'));
			$('<'+'br'+'/>').appendTo($('#ques'));
			}*/
			/*$(arr).each(function(){
				$('<'+'label'+'/>').html(this.label).appendTo($('#ques'));
				$('<'+'input'+'/>').attr({id:this.id,type:'text'}).appendTo($('#ques'));
				$('<'+'br'+'/>').appendTo($('#ques'));
			})
			$.each(arr, function(){
				$('<'+'label'+'/>').html(this.label).appendTo($('#ques'));
				$('<'+'input'+'/>').attr({id:this.id,type:'text'}).appendTo($('#ques'));
				$('<'+'br'+'/>').appendTo($('#ques'));
			})*/
			
			$('<button/>')
			.attr({type:'button'})
			.addClass('btn btn-primary')
			.text('결과보기')
			.appendTo('#ques')
			.click(e=>{
				$('#h6').remove();
				let res = "숫자를 입력하세요";
				if(!$.fn.zeroChecker([$('#sta').val(),
					  $('#end').val(),
					  $('#diff').val()])){
					let sta = $('#sta').val()*1;
					let end = $('#end').val()*1;
					let diff = $('#diff').val()*1;
					console.log(sta+','+end+','+diff);
					let i = sta;
					let sum = 0;
					while(i<=end){
						sum=sum+i;
						i=i+diff;
					}
					res = "답 : " + sum;
				}
				$('<h6/>').attr({id:"h6"}).appendTo('#ques').text(res);
			})
		});
		
		$("<li/>")
		.attr({id:'swit'})
		.addClass('list-group-item text-center')
		.appendTo($('#side__menu'));
		$("<a/>")
		.attr({href:"#"})
		.html('스위치 수열의 합')
		.appendTo($('#swit'))
		.click(e=>{
			$($t__r).empty();
			$('<div/>').attr({id:'ques'}).addClass('text-center').appendTo($t__r);
			$('<h4/>').html('시작값 x, 마지막값 y, 공차 d인 수열의 합을 구하시오').appendTo('#ques');
			let arr = [{label:'시작값',id:'sta'}
						,{label:'마지막값',id:'end'}
						,{label:'공차',id:'d'}];
			$.each(arr,(i,j)=>{
				$('<label/>').html(j.label).appendTo($('#ques'));
				$('<input/>').attr({id:j.id,type:'text'}).appendTo($('#ques'));
				$('<br/>').appendTo($('#ques'));
			});
			$('<button/>')
			.attr({id:'bt'})
			.addClass('btn btn-primary')
			.text('결과보기')
			.appendTo($('#ques'))
			.click(e=>{
				$('#h6').remove();
				let res = '숫자를 넣어주세요';
				if(!$.fn.zeroChecker([$('#sta').val(),$('#end').val(),$('#d').val()])){
					let sta = $('#sta').val()*1;
					let end = $('#end').val()*1;
					let d = $('#d').val()*1;
					console.log(sta+','+end+','+d);
					let i = sta;
					let sum = 0;
					let count = 0;
					while(i<=end){
						count++;
						if(count%2==1){
							sum=sum+i;
						}else{
							sum=sum-i;
						}
						i=i+d;					
						res='답 : '+sum;
					}
				}
				$('<h6/>').attr({id:'h6'}).text(res).appendTo($('#ques'));
			})
		});
		$('<li/>')
		.attr({id:'fibo'})
		.addClass('list-group-item text-center')
		.appendTo($('#side__menu'));
		$('<a/>')
		.attr({href:'#'})
		.html('피보나치 수열')
		.appendTo($('#fibo'))
		.click(e=>{
			$($t__r).empty();
			$('<div/>').attr({id:'ques'}).addClass('text-center').appendTo($t__r);
			$('<h4/>').html('피보나치 수열의  n번째까지의 합을 구하시오.').appendTo($('#ques'));
			$('<label/>').attr({value:'몇번째'}).appendTo($('#ques'));
			$('<input/>').attr({id:'n',type:'text'}).appendTo($('#ques'));
			$('<br/>').appendTo($('#ques'));
			$('<br/>').appendTo($('#ques'));
			$('<button/>')
			.attr({id:'bt'})
			.addClass('btn btn-primary')
			.text('결과보기')
			.appendTo($('#ques'))
			.click(e=>{
				$('#h6').remove();
				let res = '숫자를 입력하세요.';
				if(!$.fn.zeroChecker([$('#n').val()])){
					let n = $('#n').val()*1;
					console.log('몇번째'+n);
					let a = 1;
					let b = 1;
					let c = 2;
					let sum=2;
					let i = 3;
					if(n==1){
						sum=1;
						res=sum;
					}else{
						while(i<=n){
							c=a+b;
							sum=sum+c;
							a=b;
							b=c;
							i++;
						}
						res=sum;
					}
				}
				$('<h6/>').attr({id:'h6'}).text(res).appendTo($('#ques'));
			});
		});
		
		$('<li/>')
		.attr({id:'fact'})
		.addClass('list-group-item text-center')
		.appendTo($('#side__menu'))
		$('<a/>')
		.attr({href:'#'})
		.html('팩토리얼 수열')
		.appendTo($('#fact'))
		.click(e=>{
			$($t__r).empty();
			$('<div/>')
			.addClass('text-center').attr({id:'ques'}).appendTo($t__r);
			$('<h4/>')
			.text('팩토리얼을 구하시오.').appendTo($('#ques'));
			$('<input/>')
			.attr({id:'n',type:'text'}).appendTo($('#ques'));
			$('<br/>').appendTo($('#ques'));
			$('<br/>').appendTo($('#ques'));	
			$('<button/>')
			.attr({id:'bt'}).text('결과보기').addClass('btn btn-primary').appendTo($('#ques'))
			.click(e=>{
				$('#h6').remove();
				let res = '숫자를 입력하세요.';
				if(!$.fn.zeroChecker([$('#n').val()])){
					let n = $('#n').val()*1;
					console.log('몇번째'+n);
					let sum=1;
					while(1<=n){
						sum*=n;
						n--;
					}
					res=sum;
				}
				$('<h6/>').attr({id:'h6'}).text(res).appendTo($('#ques'));
			});
		});
		
		$('#wrapper').append('<h3 class="text-center">행 열</h3>'
				+'<table id="tb1" style="width:800px;height:300px;border-collapse:collapse;border:1px solid black;margin:0 auto;margin-bottom:10px;>'
				+'<tr style="border:1px solid black;">'
				+'<td id="t__l1" style="width:50%;border:1px solid black"></td>'
				+'<td id="t__r1" style="width:50%;border:1px solid black"></td>'
				+'</tr>'
				+'</table>'
				+'</div>');
		
		let $t__l1 = $('#t__l1');
		let $t__r1 = $('#t__r1');
		$('<ul/>')
		.attr({id:'side__menu1'})
		.addClass('list-group')
		.appendTo($t__l1);
		/*
		$('#insert__array').click(e=>{
			alert("인서트정렬 클릭");
		});
		$('#select__array').click(e=>{
			alert("셀렉트정렬 클릭");
		});
		$('#ranking__array').click(e=>{
			alert("랭킹정렬 클릭");
		});*/
		let arrLi = ['bubble','insert','select','ranking'];
		$(arrLi).each(function(){
			$('<li/>')
			.attr({id:this})
			.addClass('list-group-item text-center')
			.appendTo($('#side__menu1'));	
		})
		$('<a/>')
		.attr({href:'#'})
		.html('버블정렬')
		.appendTo($('#bubble'))
		.click(e=>{
			$t__r1.empty();
			$('<div/>')
			.attr({id:'ques'})
			.addClass('text-center')
			.appendTo($t__r1);
			$('<h4/>')
			.html('5명의 학생 성적을 입력받아 배열에 저장한 후 오름차순으로 정렬하시오.').appendTo($('#ques'))
			for(let i=1;i<=5;i++){
				$('<label/>').attr({value:"학생"+i}).appendTo($('#ques'));
				$('<input/>').attr({id:'s'+i,type:'text'}).appendTo($('#ques'));
			}
			$('<br/>').appendTo($('#ques'));
			$('<button/>').attr({id:'bn'}).text('정렬하기').addClass('btn btn-primary').appendTo($('#ques'))
			.click(e=>{
				$('#h6').remove();
				let res = '숫자를 입력해주세요.';
				if(!$.fn.zeroChecker([$('#s1').val(),$('#s2').val(),$('#s3').val(),$('#s4').val(),$('#s5').val()])){
					let s1 = $('#s1').val();
					let s2 = $('#s2').val();
					let s3 = $('#s3').val();
					let s4 = $('#s4').val();
					let s5 = $('#s5').val();
					let st = [s1,s2,s3,s4,s5];
					let i = 0;
					let temp = 0;
					while(i<st.length-1){
						for(let j=0;j<st.length-1;j++){
							if(st[j]>st[j+1]){
								temp = st[j];
								st[j]=st[j+1];
								st[j+1]=temp;
							}
						}
						i++;
					}
					res=st;
				}
				$('<h6/>').attr({id:'h6'}).text(res).appendTo($('#ques'));
			});
		});
		$('<a/>').attr({href:'#'}).text('인서트 정렬').appendTo($('#insert')).click(e=>{
			alert('인서트 정렬 클릭!');
		});
		$('<a/>').attr({href:'#'}).text('셀렉트 정렬').appendTo($('#select')).click(e=>{
			alert('셀렉트 정렬 클릭!');
		});
		$('<a/>').attr({href:'#'}).text('랭킹 정렬').appendTo($('#ranking')).click(e=>{
			alert('랭킹 정렬 클릭!');
		});
		
	}
};
algo.series ={
	arith : x => {
		
	},
	fibonacci : x => {},
	swit : x =>{},
	factorial : x => {}
};
algo.array={
	bubble : x=>{},
	insert : x=>{},
	select : x=>{},
	ranking : x=>{}
};
algo.matrix={
	fiveBy5 : x => {},
	sandGlass : x=>{},
	snail : x=>{},
	diamond : x=>{},
	zigzag : x=>{}
};
algo.math={
	
};
algo.appl={
	
};

algo.router = {
	onCreate :x=>{
		$.getScript(x+'/resources/js/router.js',
			()=>{
				$.extend(new Session(x));
				$.getScript($.ctx()+'/resources/js/util.js').done(x=>{console.log('실행');}).fail(x=>{console.log('실패')});
				algo.main.onCreate();
			}
		);
	}
};