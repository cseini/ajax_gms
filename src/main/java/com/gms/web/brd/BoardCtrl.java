package com.gms.web.brd;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.gms.web.cmm.Util;
import com.gms.web.cmm.Util2;
import com.gms.web.page.Pagination;

@RestController
public class BoardCtrl {
	static final Logger logger = LoggerFactory.getLogger(BoardCtrl.class);
	@Autowired Util2 util2;
	@Autowired Board brd;
	@Autowired BoardMapper brdMap;
	@Autowired Pagination page;
	@RequestMapping("/boards/{pageNo}")
	public @ResponseBody Map<String,Object> list(@PathVariable int pageNo){
		logger.info("\n BoardCtrl :::::::::: {} !!-----","list");
		Map<String,Object> param=new HashMap<>();
		param.put("pageNumber",pageNo);
		param.put("countRow",brdMap.countAll());
		page.carryOut(param);
		param.clear();
		List<Board> ls = brdMap.listAll(page);
		param.put("page", page);
		param.put("list", ls);
		Util.log.accept("게시글 리스트 :"+ls);
		return param;
	}
	@RequestMapping("/boards/{id}/{pageNo}")
	public @ResponseBody Map<String,Object> myList(@PathVariable String id, @PathVariable int pageNo){
		logger.info("\n BoardCtrl :::::::::: {} !!-----","Mylist");
		Map<String,Object> param=new HashMap<>();
		brd.setWriter(id);
		param.put("pageNumber",pageNo);
		param.put("countRow",brdMap.countRetrieve(brd));
		page.carryOut(param);
		param.clear();
		param.put("writer", id);
		param.put("beginRow", page.getBeginRow());
		param.put("endRow", page.getEndRow());
		List<Board> ls = brdMap.listRetrieve(param);
		param.put("page", page);
		param.put("list", ls);
		return param;
	}
}
