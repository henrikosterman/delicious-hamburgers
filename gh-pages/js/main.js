$(function() {
	$('a[href^="mailto:"]').each(function() {
		this.href = this.href.replace('(at)', '@').replace(/\(dot\)/g, '.');
	});

	$('button.hamburger').on('click', function() {
		$(this).toggleClass('active');
	});
});