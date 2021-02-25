// Блок create-test
let createTest = document.querySelector('.create-test');
// Данные из формы
let inputName = createTest.querySelector('.create-test__input-text');
let inputDesc = createTest.querySelector('.create-test__input-textarea');
/* Кнопка создать тест  */
let saveTest = createTest.querySelector('.create-test__save-sb');

/* Блок tests */
let tests = document.querySelector('.tests');
/* Контейнер со всеми тестами */
let testsList = tests.querySelector('.tests__list');
/* Надпись тесты отсуствуют */
let testsNotification = tests.querySelector('.tests__notification');

/* Блок шапка */
let header = document.querySelector('.header');
/* Кнопка открывает скрывает меню на мобильных устройствах */
let openMenu = header.querySelector('.header__open-menu-btn');
/* Меню */
let menuButton = header.querySelector('.header__list');

/* Проверяет на наличие тестов на странице */
existTests();

function addTest(inputNameValue, inputDescValue) {
  console.log(inputNameValue, inputDescValue)
  let blok =
  `<li class="tests__item">
    <div class="card-test">
      <div class="card-test__container-text">
        <h2 class="card-test__title">
          ${inputNameValue}
        </h2>
        <p class="card-test__desc">
          ${inputDescValue}
        </p>
      </div>
      <ul class="card-test__list">
        <li class="card-test__item">
          <button class="card-test__edit-btn"></button>
        </li>
        <li class="card-test__item">
          <button class="card-test__delete-btn"></button>
        </li>
      </ul>
    </div>
  </li>`;

  /* Есть еще insertAdjacentElement */
  testsList.insertAdjacentHTML('afterbegin', blok);
}

/* Сбрасывает форму */
function clearForm() {
  inputName.value = '';
  inputDesc.value = '';
}

/* Создание теста */
function formSubmitHandler(event) {
  event.preventDefault();

  let inputNameValue = inputName.value;
  let inputDescValue = inputDesc.value;

  if (inputNameValue.length < 4 || inputDescValue.length < 8) {
    return;
  }

  addTest(inputNameValue, inputDescValue);

  clearForm();

  existTests();
}

addEventListener('submit', formSubmitHandler);

/* Проверяет на наличие созданных тестов */
function existTests() {
  const TestsList = testsList.querySelectorAll('.tests__item');

  if (TestsList.length === 0) {
    testsNotification.classList.add('tests__notification_active');
  } else {
    testsNotification.classList.remove('tests__notification_active');
  }
}

/* Открыть закрыть меню */
function toggleMenuModule() {
  menuButton.classList.toggle('header__list_active');
}

addEventListener('click', toggleMenuModule);

/* Запрещает при открытом меню писать в форме и отправлять ее */
/* function disabledForm() {
  if (menuButton.classList.contains('header__list_active')) {
    console.log('disabled')
  }
}

disabledForm() */
