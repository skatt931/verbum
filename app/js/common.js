$(function() {
	//variables for underscore template
	let underText = $('.Undertext').html();
	let underCard = $('.Undercard').html();
	var textTemplate = _.template(underText);
	var cardTemplate = _.template(underCard);

    //function for pick datas from json files
	function pickDataFromServer(){
		const $firstWord = $('.first-word');
		const $cardImage = $('.card-image');
		const $checkBtn = $('.check-btn');
		const $helpBtn = $('.help-btn');
		let $translation = $('.translation-word');

		function showImage() {
			$cardImage.attr('src', $firstWord.attr('data-url'));
			console.log($firstWord.attr('data-url'));
		}
		$.getJSON('lessons/lesson2.json', {scriptCharset: "utf-8"})
			.done(function (data) {
				let numbersArray = []; //array with numbers of words

				data.forEach(function(dat, index) {
					numbersArray.push(index);
				});

				function compareRandom(a, b) {
					return Math.random() - 0.5;
				}
				numbersArray.sort(compareRandom);
				console.log(numbersArray);


				let k = 0;
				$firstWord.text(data[numbersArray[k]].forin);
				$firstWord.attr('data-translation', data[numbersArray[k]].mother);
				$firstWord.attr('data-url', `img/${data[numbersArray[k]].image}.jpg`);
				//$cardImage.attr('src', $firstWord.data('url'));

				function checkWord() {
					if ($translation.val() == $firstWord.attr('data-translation')) {
						k++;
						$firstWord.text(data[numbersArray[k]].forin);
						$firstWord.attr('data-translation', data[numbersArray[k]].mother);
						$firstWord.attr('data-url', `img/${data[numbersArray[k]].image}.jpg`);
						showImage();
						$translation.val("");
					}
				}
				$checkBtn.on('click', checkWord);
				$(document).on('keypress', function(){
					if(event.keyCode == 13){
						checkWord();
					}
				});
				$helpBtn.on('click', showImage);



				console.log($firstWord.attr('data-url'));
			})
			.fail(function(){
				console.log("fail");
			});

	}

	$('.forin-mother').on('click',function(){
		$('.show-content').html(cardTemplate());
		pickDataFromServer();
	});



});
