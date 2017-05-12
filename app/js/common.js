$(function() {
	//variables for underscore template
	let underText = $('.Undertext').html();
	let underCard = $('.Undercard').html();
	let textTemplate = _.template(underText);
	let cardTemplate = _.template(underCard);


	//function for pick dates from json files
	function pickDataFromServer(){
		const $firstWord = $('.first-word');
		const $cardImage = $('.card-image');
		const $checkBtn = $('.check-btn');
		const $helpBtn = $('.help-btn');
		let $translation = $('.translation-word');
        let progressNumber = 0;
        let numberOfWords;

		function showImage() {
			$cardImage.attr('src', $firstWord.attr('data-url'));
			console.log($firstWord.attr('data-url'));
		}
		$.getJSON(`lessons/lesson${lessonNumber}.json`, {scriptCharset: "utf-8"})
			.done(function (data) {
				let numbersArray = []; //array with numbers of words

				data.forEach(function(dat, index) {
					numbersArray.push(index);
				});

                //Shake the array for random words
				function compareRandom(a, b) {
					return Math.random() - 0.5;
				}
				numbersArray.sort(compareRandom);


				let k = 0;
                function addInfoToCard() {
                    $firstWord.text(data[numbersArray[k]].forin);
                    $firstWord.attr('data-translation', data[numbersArray[k]].mother);
                    $firstWord.attr('data-url', `img/lesson${lessonNumber}/${data[numbersArray[k]].image}.jpg`);
                    console.log(k);
                    console.log(numbersArray.length);
                }
                addInfoToCard();

                function checkWord() {
					if ($translation.val() == $firstWord.attr('data-translation')) {
						k++;
                        addInfoToCard();
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

			})
			.fail(function(){
				console.log("fail");
			});

	}

    //Choose the mode
	$('.forin-mother').on('click',function(){
		$('.show-content').html(cardTemplate());
		pickDataFromServer();
	});

    //Choose the lesson
    let lessonLink = $('.lessons').find('a');
    let lessonNumber = 1;
    lessonLink.on('click', function(){
        lessonNumber = $(this).attr('data-number');
        $('.show-content').html(cardTemplate());
        pickDataFromServer();
    });



});
