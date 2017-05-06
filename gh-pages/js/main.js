$(function() {
	$('a[href^="mailto:"]').each(function() {
		this.href = this.href.replace('(at)', '@').replace(/\(dot\)/g, '.');
	});

	$('button.hamburger').on('click', function() {
		$(this).toggleClass('active');
	});

	$('#reset').on('click', function(e) {
		e.preventDefault();
		$('button.hamburger').each(function() {
			$(this).removeClass('active');
		});
	});

	$('#toggle-all').on('click', function(e) {
		e.preventDefault();
		$('button.hamburger').each(function() {
			$(this).toggleClass('active');
		});
	});

	/*
	 * Little show for creating the gif
	 */
	/*
	var count = 0;
	setTimeout(function() {
		setInterval(function() {
			var $thisburger = $('button.hamburger').eq(count);

			$thisburger.toggleClass('active');

			setTimeout(function() {
				$thisburger.toggleClass('active');
			}, 1200);

			count++;
		}, 500);
	}, 1000);
	*/ 
});