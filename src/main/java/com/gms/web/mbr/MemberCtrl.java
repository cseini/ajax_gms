package com.gms.web.mbr;

import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import com.gms.web.cmm.Util2;

@RestController
@RequestMapping("/member")
public class MemberCtrl {
	static final Logger logger = LoggerFactory.getLogger(MemberCtrl.class);
	@Autowired Member mbr;
	@Autowired MemberMapper mbrMap;
	/*이게 자바의 new member같이 스프링에서 가져오는 싱글톤객체*/
	
	@PostMapping("/join")
	public @ResponseBody void join(@RequestBody Member param) {
		logger.info("\n--------- MemberController {} !!-----","join()");
		Util2 u = new Util2();
		param.setAge(u.ageAndGender(param).getAge());
		param.setGender(u.ageAndGender(param).getGender());
		mbrMap.post(param);
	}
	@RequestMapping("/search")
	public void search() {}
	@RequestMapping("/count")
	public void count() {}
	@RequestMapping(value="/modify", method=RequestMethod.POST)
	public String modify(@ModelAttribute("user") Member user) {
		logger.info("\n--------- MemberController {} !!-----","modify()");
		mbrMap.put(user);
		return "retrieve";
	}
	@RequestMapping(value="/remove", method=RequestMethod.POST)
	public String remove(@ModelAttribute Member param,
			@ModelAttribute("user") Member user){
		logger.info("\n--------- MemberController {} !!-----","remove()");
		param.setUserid(user.getUserid());
		mbrMap.delete(param);
		return "redirect:/";
	}
	@PostMapping("/login")
	public @ResponseBody Map<String,Object> login(
			@RequestBody Member pm) {
		logger.info("\n--------- MemberController {} !!-----","login()");
		Map<String,Object> rm =  new HashMap<>();
		String pwValid = "WRONG";
		String idValid ="WRONG";
		if(mbrMap.count(pm)!=0) {
			idValid ="CORRECT";
			Function<Member,Member> f = (t)->{
				return mbrMap.get(t);
			};
			mbr = f.apply(pm);
			System.out.println(mbr);
			pwValid = (mbr != null) ?"CORRECT":"WRONG";
			mbr = (mbr != null)?mbr:new Member();
		}
		rm.put("ID",idValid);
		rm.put("PW", pwValid);
		rm.put("MBR", mbr);
		return rm;
	}
}
