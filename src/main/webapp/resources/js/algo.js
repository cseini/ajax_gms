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
				+'<td id="t__1" style="width:50%;border:1px solid black"></td>'
				+'<td id="t__2" style="width:50%;border:1px solid black"></td>'
				+'</tr>'
				+'</table>'
				+'</div>');
		$('#t__1').html('<a id="arith__seq"><h3>등차수열</h3></a>');
		$('#t__1').append('<a id="fibo__seq"><h3>피보나치수열</h3></a>');
		$('#t__1').append('<a id="swit__seq"><h3>스위치수열</h3></a>');
		$('#t__1').append('<a id="fact__seq"><h3>팩토리얼</h3></a>');
		$('#arith__seq').click(e=>{alert('등차수열 선택');});
		$('#fibo__seq').click(e=>{alert('피보나치수열 선택');});
		$('#swit__seq').click(e=>{alert('스위치수열 선택');});
		$('#fact__seq').click(e=>{alert('팩토리얼 선택');});
		$('#t__2').html('<h1>수열 결과 출력</h1>');
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
				algo.main.onCreate();
			}
		);
	}
};