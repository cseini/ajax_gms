package com.gms.web.mbr;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.function.Function;
import java.util.function.Predicate;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.SessionAttributes;
import org.springframework.web.bind.support.SessionStatus;

@Controller
@RequestMapping("/member")
@SessionAttributes("user")
public class MemberCtrl {
	static final Logger logger = LoggerFactory.getLogger(MemberCtrl.class);
	@Autowired Member member;
	@Autowired MemberMapper mbrMapper;
	/*이게 자바의 new member같이 스프링에서 가져오는 싱글톤객체*/
	@Autowired MemberService memberService;
	@RequestMapping(value="/add",method=RequestMethod.POST)
	public String add(@ModelAttribute("member") Member param) {
		logger.info("\n--------- MemberController {} !!-----","add()");
		String val = "add_failed";
		String gender ="";
		System.out.println(param.toString());
		if(!mbrMapper.exist(param.getUserid()).equals("1")) {
		switch (param.getSsn().split("-")[1]) {
			case "1":case "3":
				gender = "남";
				break;
			case "2":case "4":
				gender = "여";
				break;
			case "5":case "6":
				gender = "외국인";
				break;
			default:
				break;
			}
			String age = String.valueOf(Integer.parseInt(new SimpleDateFormat("yyyy").format(new Date()))-(Integer.parseInt(param.getSsn().substring(0, 2))+1900-1));
			param.setAge(age);
			param.setGender(gender);
			mbrMapper.insert(param);
			System.out.println("쿼리 실행완료, 회원가입완료");
			val="login_failed";
		} 
		return val;
	}
	@RequestMapping("/list")
	public void list() {}
	@RequestMapping("/search")
	public void search() {}
	@RequestMapping("/retrieve")
	public String retrieve(@ModelAttribute("user") Member user) {
		logger.info("\n--------- MemberController {} !!-----","retrieve()");
		mbrMapper.selectOne(user.getUserid());
		return "retrieve";
	}
	@RequestMapping("/count")
	public void count() {}
	@RequestMapping(value="/modify", method=RequestMethod.POST)
	public String modify(@ModelAttribute("user") Member user) {
		logger.info("\n--------- MemberController {} !!-----","modify()");
		mbrMapper.update(user);
		return "retrieve";
	}
	@RequestMapping(value="/remove", method=RequestMethod.POST)
	public String remove(@ModelAttribute Member member,
			@ModelAttribute("user") Member user,
			SessionStatus session){
		logger.info("\n--------- MemberController {} !!-----","remove()");
		member.setUserid(user.getUserid());
		mbrMapper.delete(member);
		session.setComplete();
		return "redirect:/";
	}
	@RequestMapping(value="/login", method=RequestMethod.POST)
	public String login(Model model, @ModelAttribute("member") Member param) {
		logger.info("\n--------- MemberController {} !!-----","login()");
		Predicate<String> p = s -> !s.equals("");
		String view = "login_failed";
		if(p.test(mbrMapper.exist(param.getUserid()))) {
			Function<Member,String> f = (t)->{
				return mbrMapper.login(t);
			};
			view = (f.apply(param).equals("1")) ? 
				"login_success":
				"login_failed";
			model.addAttribute("user", mbrMapper.selectOne(param.getUserid()));
		}
		return view;
	}
	@RequestMapping("/logout")
	public String logout(SessionStatus session) {
		logger.info("\n--------- MemberController {} !!-----","logout()");
		session.setComplete();
		return "redirect:/";
	}
	@RequestMapping("/fileupload")
	public void fileupload() {}
}
