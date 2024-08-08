$(document).ready(function(){
	var dark=false
	$("age").html(date_finder("1998-08-23"));
	$("#exp_desc text").html(date_finder("2019-12-02"));
	$(".nav-menu li:nth-child(3)").click(function(){
		if (dark) {
			$('link[href="assets/css/style.css"]').attr('href', 'assets/css/style2.css');
			
			// Update SVG and span text for dark mode
			$(".nav-menu li:nth-child(3) a svg").attr("viewBox", "0 0 24 24").html('<path fill="currentColor" d="M6 2h8v2h-2v2h-2V4H6zM4 6V4h2v2zm0 10H2V6h2zm2 2H4v-2h2zm2 2H6v-2h2zm10 0v2H8v-2zm2-2v2h-2v-2zm-2-4h2v4h2v-8h-2v2h-2zm-6 0v2h6v-2zm-2-2h2v2h-2zm0 0V6H8v6z"/></svg>');
			$(".nav-menu li:nth-child(3) a span").text("Dark");
			
			dark = false;
		} else {
			$('link[href="assets/css/style2.css"]').attr('href', 'assets/css/style.css');
			
			// Update SVG and span text for light mode
			$(".nav-menu li:nth-child(3) a svg").attr("viewBox", "0 0 24 24").html('<path fill="currentColor" d="M13 0h-2v4h2zM0 11v2h4v-2zm24 0v2h-4v-2zM13 24h-2v-4h2zM8 6h8v2H8zM6 8h2v8H6zm2 10v-2h8v2zm10-2h-2V8h2zm2-14h2v2h-2zm0 2v2h-2V4zm2 18h-2v-2h2zm-2-2h-2v-2h2zM4 2H2v2h2v2h2V4H4zM2 22h2v-2h2v-2H4v2H2z"/></svg>');
			$(".nav-menu li:nth-child(3) a span").text("Light");
			
			dark = true;
		}
		
		
	})
});

//Age and exp years finder
function date_finder(date)
{
	date = new Date(date);
	var today = new Date();
	var diff = Math.floor((today-date) / (365.25 * 24 * 60 * 60 * 1000));
	return diff;
}