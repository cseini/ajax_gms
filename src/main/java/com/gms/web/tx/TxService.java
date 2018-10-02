package com.gms.web.tx;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.gms.web.brd.Board;
import com.gms.web.brd.BoardMapper;
import com.gms.web.point.PointMapper;

@Service
public class TxService {
	@Autowired BoardMapper brdMapper;
	@Autowired Board brd;
	@Autowired PointMapper poMapper;
	@Autowired HashMap<String,Object> map;
	@Transactional
	public Map<?,?> write(Map<?,?> p){
		map.clear();
		brdMapper.create((Board) p.get("brd"));
		poMapper.update(p);
		map.clear();
		map.put("brd", brdMapper);
		return map;
	}
	@Transactional
	public Map<?,?> delete(Map<?,?> p){
		map.clear();
		brdMapper.delete(Integer.parseInt(p.get("bno").toString()));
		poMapper.update(map);
		map.clear();
		return map;
	}
}
