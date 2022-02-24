$(document).ready(function(){
	var dark=false
	$(".nav-menu li:nth-child(3)").click(function(){
	if(dark){
	$('link[href="assets/css/style.css"]').attr('href','assets/css/style2.css');
	$(".nav-menu li:nth-child(3) a svg").attr("data-icon","ic:outline-dark-mode");
	$(".nav-menu li:nth-child(3) a  span").text("Dark");
	dark = false;
	}
	else{
	$('link[href="assets/css/style2.css"]').attr('href','assets/css/style.css');
	$(".nav-menu li:nth-child(3) a svg").attr("data-icon","ic:outline-light-mode");
	$(".nav-menu li:nth-child(3) a span").text("Light");
	dark = true;
	}
	})
});