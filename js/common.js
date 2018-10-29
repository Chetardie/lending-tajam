
$(function() {

	$('.home-slider').slick({
		dots: true,
		arrows: false,
		slidesToShow: 1,
		slidesToScroll: 1,
		autoplay: true,
  	autoplaySpeed: 3000,
	});
	$('.slider-testimonials').slick({
		dots: true,
		arrows: false,
		slidesToShow: 1,
		slidesToScroll: 1,
		autoplay: true,
  	autoplaySpeed: 3000,
	});
	

	//Smooth scrolling

	// Select all links with hashes
$('a[href*="#"]')
// Remove links that don't actually link to anything
.not('[href="#"]')
.not('[href="#0"]')
.click(function(event) {
	// On-page links
	if (
		location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') 
		&& 
		location.hostname == this.hostname
	) {
		// Figure out element to scroll to
		var target = $(this.hash);
		target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
		// Does a scroll target exist?
		if (target.length) {
			// Only prevent default if animation is actually gonna happen
			event.preventDefault();
			$('html, body').animate({
				scrollTop: target.offset().top
			}, 1000, function() {
				// Callback after animation
				// Must change focus!
				var $target = $(target);
				$target.focus();
				if ($target.is(":focus")) { // Checking if the target was focused
					return false;
				} else {
					$target.attr('tabindex','-1'); // Adding tabindex for elements not focusable
					$target.focus(); // Set focus again
				};
			});
		}
	}
});

	//Navigation

	/* When the user scrolls down, hide the navbar. When the user scrolls up, show the navbar */
	let prevScrollpos = window.pageYOffset;
	window.onscroll = function() {
		let currentScrollPos = window.pageYOffset;
		let mobileNav = document.getElementById("mobile-nav");
		if (window.innerWidth <= 576) {
			if (prevScrollpos > currentScrollPos) {
				
					mobileNav.style.display = "block";
				
				mobileNav.style.opacity = 1;
			} else {
				setTimeout(()=> {
					mobileNav.style.display = "none";
				}, 500);
				
				mobileNav.style.opacity = 0;
			}
			prevScrollpos = currentScrollPos;
		}
	}

	window.onresize = checkInnerWidth();
	checkInnerWidth();
	
	function checkInnerWidth(event) {
		if (window.innerWidth > 576) {
			document.getElementById("mobile-nav").style.display = "none";
		}
	}

	const navLinks = document.querySelectorAll('#menu a');
	const navcheck = document.getElementById('navcheck');
	navLinks.forEach((item)=>{
		item.addEventListener('click', ()=> {
			navcheck.checked = false;
		});
	});




	//Video player
	TweenMax.set(".play-circle-01", {
		rotation: 90,
		transformOrigin: "center"
	})
	
	TweenMax.set(".play-circle-02", {
		rotation: -90,
		transformOrigin: "center"
	})
	
	TweenMax.set(".play-perspective", {
		xPercent: 6.5,
		scale: .175,
		transformOrigin: "center",
		perspective: 1
	})
	
	TweenMax.set(".play-video", {
		visibility: "hidden",
		opacity: 0,
	})
	
	TweenMax.set(".play-triangle", {
		transformOrigin: "left center",
		transformStyle: "preserve-3d",
		rotationY: 10,
		scaleX: 2
	})
	
	const rotateTL = new TimelineMax({ paused: true })
		.to(".play-circle-01", .7, {
			opacity: .1,
			rotation: '+=360',
			strokeDasharray: "456 456",
			ease: Power1.easeInOut
		}, 0)
		.to(".play-circle-02", .7, {
			opacity: .1,
			rotation: '-=360',
			strokeDasharray: "411 411",
			ease: Power1.easeInOut
		}, 0)
	
	const openTL = new TimelineMax({ paused: true })
		.to(".play-backdrop", 1, {
			opacity: .95,
			visibility: "visible",
			ease: Power2.easeInOut
		}, 0)
		.to(".play-close", 1, {
			opacity: 1,
			ease: Power2.easeInOut
		}, 0)
		.to(".play-perspective", 1, {
			xPercent: 0,
			scale: 1,
			ease: Power2.easeInOut
		}, 0)
		.to(".play-triangle", 1, {
			scaleX: 1,
			ease: ExpoScaleEase.config(2, 1, Power2.easeInOut)
		}, 0)
		.to(".play-triangle", 1, {
			rotationY: 0,
			ease: ExpoScaleEase.config(10, .01, Power2.easeInOut)
		}, 0)
		.to(".play-video", 1, {
			visibility: "visible",
			opacity: 1
		}, .5)
	
	
	const button = document.querySelector(".play-button")
	const backdrop = document.querySelector(".play-backdrop")
	const close = document.querySelector(".play-close")
	
	button.addEventListener("mouseover", () => rotateTL.play())
	button.addEventListener("mouseleave", () => rotateTL.reverse())
	button.addEventListener("click", () => openTL.play())
	backdrop.addEventListener("click", () => openTL.reverse())
	close.addEventListener("click", e => {
		e.stopPropagation()
		openTL.reverse()
	})

	//Form validation
	const contactForm = $('#contactForm');
	const subscribeForm = $('#subscribe-form');
	contactForm.validate({
		rules: {
			name: {
				required: true
			},
			email: {
				required: true,
				email: true
			},
			phone: {
				required: true,
				digits: true
			},
			textArea: {
				required: true
			}
		},
		focusCleanup: true,
		focusInfalid: false
	});

	subscribeForm.validate({
		rules: {
			email: {
				required: true,
				email: true
			}
		}
	});

	function showMessage(text) {
		console.log(text);
		let messageWindow = document.createElement('div');
		messageWindow.className = 'formSubmit';
		let box = document.createElement('div');
		let p = document.createElement('p');
		p.appendChild(document.createTextNode(text));
		box.appendChild(p);
		messageWindow.appendChild(box);
		document.body.appendChild(messageWindow);
		$('.formSubmit').on('click', ()=> {
			$('.formSubmit').fadeOut();
		})
		setInterval(() => {
			$('.formSubmit').remove();
		}, 3000);
	}

	$('#contactForm').on('submit', (e) => {
		e.preventDefault();
		if ($('#contactForm').valid()) {
			showMessage('Form has been successfully submitted!');
			document.getElementById('contactForm').reset();
		}
	});

	subscribeForm.on('submit', (e) => {
		e.preventDefault();
		if (subscribeForm.valid()) {
			showMessage('You successfully subscribed!');
			document.getElementById('subscribe-form').reset();
		}
	});

	//Loading more works 
	const loadMoreWorksBtn = document.getElementById('load-more-works');
	loadMoreWorksBtn.addEventListener('click', addMoreWorks);

	function addMoreWorks() {
		const container = document.querySelector('.portfolio__container .row');
		for (let i = 1; i <= 4; i++) {
			let workItem = document.createElement('div');
			let randomNumber = Math.floor(Math.random() * 5) + 1;  
			workItem.classList.add('col-sm-6', 'col-md-4', 'col-lg-3');
			workItem.innerHTML = `
			<a href="#" class="portfolio__item">
				<img src="img/work${randomNumber}.jpg" alt="">
			</a>
			<div class="info">
				<h3>Top Secret</h3>
				<a href="#" class="btn">Details</a>
			</div>`;
			container.appendChild(workItem);
		}
	}

});

