$(function() {
	$.getJSON('lessons/lesson1.json', function (data) {
		let enter = $(".enter");
		$.each(data, function (key, value) {
			console.log(value.forin);
			$(".enter").text(value.mother);
		});
	});
});
