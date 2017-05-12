$(function() {
	//variables for underscore template
	let underText = $('.Undertext').html();
	let underCard = $('.Undercard').html();
	let textTemplate = _.template(underText);
	let cardTemplate = _.template(underCard);
    let modeLink = $('.mode').find('a');
    let languageMode = "forin";
    let lessonLink = $('.lessons').find('a');
    let lessonNumber = 1;


	//function for pick dates from json files
	function pickDataFromServer(){
		const $firstWord = $('.first-word');
		const $cardImage = $('.card-image');
		const $checkBtn = $('.check-btn');
		const $helpBtn = $('.help-btn');
        const $wordNumber = $('.word-number');
		let $translation = $('.translation-word');

		function showImage() {
			$cardImage.attr('src', $firstWord.attr('data-url'));
            console.log($cardImage.attr('src'));
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
                    if( languageMode == "forin") {
                        $firstWord.text(data[numbersArray[k]].forin);
                        $firstWord.attr('data-translation', data[numbersArray[k]].mother);
                    } else if (languageMode == "mother"){
                        $firstWord.text(data[numbersArray[k]].mother);
                        $firstWord.attr('data-translation', data[numbersArray[k]].forin);
                    }
                    $firstWord.attr('data-url', `img/lesson${lessonNumber}/${data[numbersArray[k]].image}.jpg`);
                    $wordNumber.text(`${k}/${numbersArray.length-1}`);
                }
                addInfoToCard();

                function checkWord() {
					if ($translation.val().toLowerCase() == $firstWord.attr('data-translation')) {
						k++;
                        showImage();
                        setTimeout(function(){
                            addInfoToCard();
                            $cardImage.attr('src', 'img/питання.jpg');
                            $translation.val("");
                        }, 1000);

					}
				}
				$checkBtn.on('click', checkWord);
				$(document).on('keypress', function(){
					if(event.keyCode == 13){
						checkWord();
					}
				});
				$helpBtn.on('click', function(){
                    $firstWord.attr('data-url', `img/lesson${lessonNumber}/${data[numbersArray[k]].image}.jpg`);
                    $cardImage.attr('src', $firstWord.attr('data-url'));
                });

			})
			.fail(function(){
				console.log("fail");
			});

	}

    //Choose the mode
    modeLink.on('click',function(){
        languageMode = $(this).attr('data-mode');
            $('.show-content').html(cardTemplate());
            pickDataFromServer();
	});

    //Choose the lesson
    lessonLink.on('click', function(){
        lessonNumber = $(this).attr('data-number');
        $('.show-content').html(cardTemplate());
        pickDataFromServer();
    });



});
