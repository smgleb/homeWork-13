var userForm = document.querySelector('#start-question');
var avatarContainer = document.querySelector('#start-question');
var userData = ['Joe', 'avatar'];
var questionBox = document.querySelector('#box-questions');
var questionForm = document.querySelector('.quiz-form');
var correctAnswers = ['B', 'D', 'B', 'A', 'C', 'B', 'B'];// Усовершенствовано
var resultContainer = document.querySelector('.quiz__heading');


avatarContainer.addEventListener('click', function (e) {
	if (document.querySelectorAll('.show')) {
		document.querySelectorAll('.show').forEach(function (item) {
			item.classList.remove('show');
		})
	}

	if (e.target.tagName === 'INPUT' && e.target.type === 'radio') {

		e.target.previousElementSibling.firstElementChild.classList.add('show');
	}
})

userForm.addEventListener('submit', function (e) {
	var activeAvatar = document.querySelector('input[name="question2"]:checked');
	var activeName = userForm.elements.question1.value;
	var activeImg = activeAvatar.previousElementSibling.firstElementChild.src;
	userData = [activeName, activeImg];

	userForm.classList.add('quiz');
	questionBox.classList.remove('quiz');

	scrollingUp();

	e.preventDefault();
})

questionForm.addEventListener('submit', function (e) {
	var userInfo = document.querySelector('.name__user');
	var count = 0;

	var userAnswer = [
		questionForm.elements.q1,
		questionForm.elements.q2,
		questionForm.elements.q3,
		questionForm.elements.q4,
		questionForm.elements.q5,
		questionForm.elements.q6,// Усовершенствовано
		questionForm.elements.q7,// Усовершенствовано
	]

	userAnswer.forEach(function (item, index) {
		if (item.value === correctAnswers[index]) {
			count += 100 / userAnswer.length; // Усовершенствовано
			for (var i = 0; i < item.length; i++) {
				var isChecked = item[i].checked;
				if (isChecked) {
					item[i].parentElement.classList.add('correct')
				}
			}
		} else {
			for (var i = 0; i < item.length; i++) {
				var isChecked = item[i].checked;
				if (isChecked) {
					item[i].parentElement.classList.add('wrong')
				}
			}
		}
	})

	resultContainer.classList.add('show-quiz');

	userInfo.innerHTML = userData[0] + '<img src="' + userData[1] + '" alt="user">' + parseInt(count);// Усовершенствовано

	scrollingUp();

	e.preventDefault();

})


function scrollingUp() {
	window.scrollTo({
		top: 0,
		behavior: 'smooth'
	})
}


// Доработка
// 1)
let formBlock = document.querySelectorAll('.quiz-form__quiz');

for (let i = 0; i < formBlock.length; i++) {
	formBlock[i].insertAdjacentHTML(
		'beforeend',
		'<div class="submit-next">Next</div> <div class="submit-prev">Prev</div>'
	)
}
formBlock[formBlock.length - 1].insertAdjacentHTML(
	'beforeend',
	'<input class="submit my" type="submit" value="Submit" />'
)

let next = document.querySelectorAll('.submit-next');
next[next.length - 1].parentNode.lastElementChild.previousElementSibling.previousElementSibling.style.visibility = 'hidden';


for (let i = 0; i < next.length - 1; i++) {
	next[i].addEventListener('click', function () {
		next[i].parentNode.classList.remove('active');
		next[i + 1].parentNode.classList.add('active');
	})
}

let prev = document.querySelectorAll('.submit-prev');
prev[0].parentNode.lastElementChild.style.display = 'none';

for (let i = 1; i < prev.length; i++) {
	prev[i].addEventListener('click', function () {
		prev[i].parentNode.classList.remove('active');
		prev[i - 1].parentNode.classList.add('active');
	})
}

