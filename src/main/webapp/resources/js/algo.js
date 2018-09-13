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
		$('#wrapper').html('<h1>알고리즘</h1><h3>수 열</h3><div id="ctn">'
				+'<table id="tb1" style="width:800px;height:300px;border-collapse:collapse;border:1px solid black;margin:0 auto;>'
				+'<tr style="border:1px solid black;">'
				+'<td id="t__l" style="width:50%;border:1px solid black"></td>'
				+'<td id="t__r" style="width:50%;border:1px solid black"></td>'
				+'</tr>'
				+'</table>');
		$('#wrapper').append('<h3>행 열</h3>'
				+'<table id="tb1" style="width:800px;height:300px;border-collapse:collapse;border:1px solid black;margin:0 auto;>'
				+'<tr style="border:1px solid black;">'
				+'<td id="t__l1" style="width:50%;border:1px solid black"></td>'
				+'<td id="t__r1" style="width:50%;border:1px solid black"></td>'
				+'</tr>'
				+'</table>'
				+'</div>');
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
			$('<label/>')
			.html('시작값').appendTo($('#ques'));
			$('<input/>')
			.attr({id:'sta',type:'text'}).appendTo($('#ques'));
			$('<br/>').appendTo($('#ques'));
			$('<label/>')
			.html('마지막값').appendTo($('#ques'));
			$('<input/>')
			.attr({id:'end',type:'text'}).appendTo($('#ques'));
			$('<br/>').appendTo($('#ques'));
			$('<label/>')
			.html('공차').appendTo($('#ques'));
			$('<input/>')
			.attr({id:'diff',type:'text'}).appendTo($('#ques'));
			$('<br/>').appendTo($('#ques'));
			$('<button/>')
			.attr({type:'button'})
			.addClass('btn btn-primary')
			.text('결과보기')
			.appendTo('#ques')
			.click(e=>{
				$('#h6').remove();
				var res = "숫자를 입력하세요";
				var a = $.fn.zeroChecker([$('#sta').val(),$('#end').val(),$('#diff').val()]);
				if(!a){
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
					res = sum;
				}
				$('<h6/>').attr({id:"h6"}).appendTo('#ques').text(res);
			})
		});
		
		/*$('#t__l').html('<a id="arith__seq"><h3>등차수열</h3></a>');
		$('#t__l').append('<a id="swit__seq"><h3>스위치수열</h3></a>');
		$('#t__l').append('<a id="fibo__seq"><h3>피보나치수열</h3></a>');		
		$('#t__l').append('<a id="fact__seq"><h3>팩토리얼</h3></a>');
		$('#arith__seq').click(e=>{
			let ques =
				'<h4>시작값 x, 마지막값 y, 공차 d인 수열의 합을 구하시오.</h4>'
				+'	<label for="시작값">시작값</label><input id="sta" type="text" value=""></br>'
				+'	<label for="마지막값">마지막값</label><input id="end" type="text" value=""></br>'
				+'	<label for="공차">공차</label><input id="d" type="text" value=""></br>'
				+'	<button id="bt">결과보기</button></br>'
				+'	<h6 id="rs"></h6></br>';
			$('#t__r').html(ques);
			$('#bt').click(()=>{
				if($.fn.zeroChecker([$('#sta').val(),$('#end').val(),$('#d').val()])){
					$('#rs').empty().text('빈칸을 채우세요');
				}else{
					let sta = $('#sta').val()*1;
					let end = $('#end').val()*1;
					let d = $('#d').val()*1;
					console.log(sta+','+end+','+d);
					let i = sta;
					let sum = 0;
					while(i<=end){
						sum=sum+i;
						i=i+d;
					}
					$('#rs').empty().text('답 : '+sum);
				}
				$('#rs').empty().text(($.fn.zeroChecker([$('#sta').val(),$('#end').val(),$('#d').val()]))?'빈칸을 채우세요':'답 : '+sum);
			})*/
		$('#swit__seq').click(e=>{
			let ques =
				'<h4>시작값 x, 마지막값 y, 공차 d인 수열의 합을 구하시오.</h4>'
				+'	<label for="시작값">시작값</label><input id="sta" type="text" value=""></br>'
				+'	<label for="마지막값">마지막값</label><input id="end" type="text" value=""></br>'
				+'	<label for="공차">공차</label><input id="d" type="text" value=""></br>'
				+'	<button id="bt">결과보기</button></br>'
				+'	<h6 id="rs"></h6></br>';
			$('#t__r').html(ques);
			$('#bt').click(()=>{
				if($.fn.zeroChecker([$('#sta').val(),$('#end').val(),$('#d').val()])){
					$('#rs').empty().text('빈칸을 채우세요');
				}else{
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
					}
					$('#rs').empty().text("답 : "+ sum);
				}
			})
		});
		$('#fibo__seq').click(e=>{
			let ques =
				'<h4>피보나치 수열의  n번째까지의 합을 구하시오.</h4>'
				+'	<label for="몇번째">몇번째</label><input id="n" type="text" value=""></br>'
				+'	<button id="bt">결과보기</button></br>'
				+'	<h6 id="rs"></h6></br>';
			$('#t__r').html(ques);
			$('#bt').click(()=>{
				if($.fn.zeroChecker([$('#n').val()])){
					$('#rs').empty().text("숫자를 입력하세요.");
				}else{
					let n = $('#n').val()*1;
					console.log('몇번째'+n);
					let a = 1;
					let b = 1;
					let c = 2;
					let sum=2;
					let i = 3;
					if(n==1){
						sum=1;
					}else{
						while(i<=n){
							c=a+b;
							sum=sum+c;
							a=b;
							b=c;
							i++;
						}
					}
					$('#rs').empty().text("답 : "+ sum);
				}
			})
		});
		$('#fact__seq').click(e=>{
			let ques =
				'<h4>n 팩토리얼을 구하시오.</h4>'
				+'	<label for="n!">n!</label><input id="n" type="text" value=""></br>'
				+'	<button id="bt">결과보기</button></br>'
				+'	<h6 id="rs"></h6>';
			$('#t__r').html(ques);
			$('#bt').click(()=>{
				if($.fn.zeroChecker([$('#n').val()])){
					$('#rs').empty().text('숫자를 입력하세요.');
				}else{
					let n = $('#n').val()*1;
					console.log('몇번째'+n);
					let res=1;
					while(1<=n){
						res*=n;
						n--;
					}
					$('#rs').empty().text("답 : "+ res);
				}
			})
		});
		$('#t__l1').html('<a id="bubble__array"><h3>버블정렬</h3></a>');
		$('#t__l1').append('<a id="insert__array"><h3>인서트정렬</h3></a>');
		$('#t__l1').append('<a id="select__array"><h3>셀렉트정렬</h3></a>');		
		$('#t__l1').append('<a id="ranking__array"><h3>랭킹정렬</h3></a>');
		$('#bubble__array').click(e=>{
			let ques = "<h4>5명의 학생 성적을 입력받아 배열에 저장한 후 오름차순으로 정렬하시오.</h4></br>"
			+'<label for="학생1">학생1</label><input id="s1" type="text" value+"" /></br>'
			+'<label for="학생2">학생2</label><input id="s2" type="text" value+"" /></br>'
			+'<label for="학생3">학생3</label><input id="s3" type="text" value+"" /></br>'
			+'<label for="학생4">학생4</label><input id="s4" type="text" value+"" /></br>'
			+'<label for="학생5">학생5</label><input id="s5" type="text" value+"" /></br>'
			+'<button id="bt">버블정렬</button></br>'
			+'<h6 id="rs"></h6>';
			$('#t__r1').html(ques);
			$('#bt').click(e=>{
				if($.fn.zeroChecker([$('#s1').val(),$('#s2').val(),$('#s3').val(),$('#s4').val(),$('#s').val(),])){
					$('#rs').empty().text('성적을 입력하세요.');
				}else{
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
					$('#rs').append('답 : '+st);
				}
			})
		});
		$('#insert__array').click(e=>{
			alert("인서트정렬 클릭");
		});
		$('#select__array').click(e=>{
			alert("셀렉트정렬 클릭");
		});
		$('#ranking__array').click(e=>{
			alert("랭킹정렬 클릭");
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