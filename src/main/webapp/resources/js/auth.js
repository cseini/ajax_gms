"use strict"
function authUI(x){
	return '<nav class="navbar navbar-light bg-light static-top">'
	+'  <div class="container">'
	+'    <a id="logo_btn" class="navbar-brand">Yanolja!</a>'
	+'    <div class="float-right">'
	+'      <a id="retrieve_btn" class="btn btn-primary" >'+x+'님의 페이지</a>'
	+'      <a id="board-write"  class="btn btn-primary" >게시글 쓰기</a>'
	+'      <a id="board_list" class="btn btn-primary">게시글 목록 보기</a>'
	+'      <a id="logout_btn" class="btn btn-primary w-100px " href="#">로그아웃</a>'
	+'    </div>'
	+'  </div>'
	+'</nav>';
}
