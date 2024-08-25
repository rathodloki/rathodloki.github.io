$(document).ready(function(){
	var dark=false
	$("age").html(date_finder("1998-08-23"));
	$("#exp_desc text").html(date_finder("2019-12-02"));
	$(".nav-menu li:nth-child(3)").click(function(){
		if(dark){
			$('link[href="assets/css/style.css"]').attr('href','assets/css/style2.css');
			$(".nav-menu li:nth-child(3) a  svg, .nav-menu li:nth-child(3) a span ").attr("data-icon","ic:outline-dark-mode").text("Dark");
			dark = false;
		}
		else{
			$('link[href="assets/css/style2.css"]').attr('href','assets/css/style.css');
			$(".nav-menu li:nth-child(3) a svg, .nav-menu li:nth-child(3) a span").attr("data-icon","ic:outline-light-mode").text("Light");
			dark = true;
		}
	})
});

function date_finder(date)
{
	date = new Date(date);
	var today = new Date();
	var diff = Math.floor((today-date) / (365.25 * 24 * 60 * 60 * 1000));
	return diff;
}

document.querySelector('.scroll-down-btn a').addEventListener('click', function(e) {
	e.preventDefault();
	const targetId = this.getAttribute('href');
	const targetElement = document.querySelector(targetId);
	targetElement.scrollIntoView({ behavior: 'smooth' });
  });


  const scrollContainer = document.getElementById('scrollContainer');
  const cards = Array.from(scrollContainer.children);
  const cardWidth = cards[0].offsetWidth + parseInt(getComputedStyle(cards[0]).marginRight);
  let scrollPosition = 0;
  const scrollSpeed = 0.5;
  let isScrolling = true;

  function setupInfiniteScroll() {
	  cards.forEach(card => {
		  const clone = card.cloneNode(true);
		  scrollContainer.appendChild(clone);
	  });
	  scrollContainer.style.width = `${cardWidth * cards.length * 2}px`;
	  scrollContainer.addEventListener('mouseenter', () => { isScrolling = false; });
	  scrollContainer.addEventListener('mouseleave', () => { isScrolling = true; });

	  // Setup Read More functionality
	  document.querySelectorAll('.read-more').forEach(button => {
		  button.addEventListener('click', (e) => {
			  e.stopPropagation();
			  const card = button.closest('.recommendation-card');
			  const text = card.querySelector('.recommendation-text');
			  text.classList.toggle('expanded');
			  button.textContent = text.classList.contains('expanded') ? 'Read less' : 'Read more';
			  
			  // Adjust the card's height based on the expanded state
			  if (text.classList.contains('expanded')) {
				  card.style.height = `${card.scrollHeight}px`;
			  } else {
				  card.style.height = ''; // Reset to default height
			  }
		  });
	  });
  }

  function scrollRecommendations() {
	  if (isScrolling) {
		  scrollPosition += scrollSpeed;
		  if (scrollPosition >= cardWidth * cards.length) {
			  scrollPosition -= cardWidth * cards.length;
		  }
		  scrollContainer.style.transform = `translateX(${-scrollPosition}px)`;
	  }
	  requestAnimationFrame(scrollRecommendations);
  }

  setupInfiniteScroll();
  scrollRecommendations();

  