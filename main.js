$(function(){
	$(".button").click(function(){
		var random = Math.floor((Math.random() * 9) + 1);
		$(".rectangle-neutral:nth-child("+ random + ")").toggleClass('rectangle-active');
	});
});