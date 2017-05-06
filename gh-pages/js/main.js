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
	})

	$('#toggle-all').on('click', function(e) {
		e.preventDefault();
		$('button.hamburger').each(function() {
			$(this).toggleClass('active');
		});
	})
});