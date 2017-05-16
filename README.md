# This is Verbum project.
## It is made for healping you to learn new forin words by the cards.
###To add a new lessons with words you nedd to do couple of things that will be written below


1. Find the photos to your words in the Internet.
- Create a new folder in app/img folder with name lesson(number of the lesson).
- Find the photos to your words in the Internet. Download them in to the app/img/lesson(number of the lesson).
2. Add new lesson.json file
- Create lesson(number of lesson).json file in lessons folder.
- Add words, translation and name of the photo to json file like in the example.json.
3. Add links in index.html
- Open index.html file by the some text redactor.
- Find `<li><a href="#" data-number="1">Lesson1</a></li>` sstring copy it and paste before </ul> tag.
- In pased string find 'data-number' and change a number of it to your number of the lesson.
- Change number of the lesson before </a> tag.
