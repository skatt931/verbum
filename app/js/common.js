$(function() {
	const $firstWord = $('.first-word');
	const $cardImage = $('.card-image');
	const $checkBtn = $('.check-btn');
	const $helpBtn = $('.help-btn');
	let $translation = $('.translation-word');

	function showImage() {
		$cardImage.attr('src', $firstWord.data('url'));
	}
	$.getJSON('lessons/lesson1.json', {scriptCharset: "utf-8"})
		.done(function (data) {
			let leng = data.length;
			let number;
			let numbersArray = [];

			for(let i = 0; i < leng; i++ ) {
				number = Math.floor(Math.random() * (leng - 0)) + 0;
				numbersArray.push(number);
			}

			//Вивід інформації
				let k = 0;
				$firstWord.text(data[numbersArray[k]].forin);
				$firstWord.attr('data-translation', data[numbersArray[k]].mother);
				$firstWord.attr('data-url', `img/${data[numbersArray[k]].image}.jpg`);
				//$cardImage.attr('src', $firstWord.data('url'));

			//console.log($translation.val());
				$checkBtn.on('click', function(){
					if ($translation.val() == $firstWord.attr('data-translation')) {
						k++;
						$firstWord.text(data[numbersArray[k]].forin);
						$firstWord.attr('data-translation', data[numbersArray[k]].mother);
						$firstWord.attr('data-url', `img/${data[numbersArray[k]].image}.jpg`);
						showImage();
						$translation.val("");
					}
					//if(k < leng) {
					//	k++;
					//}
				});
			$helpBtn.on('click', showImage);



				console.log($firstWord.attr('data-url'));
	})
		.fail(function(){
			console.log("fail");
		});

});
