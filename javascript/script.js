/* Массив с тестами */
const initialTests = [
  {
    name: 'Тест по Питеру',
    desc: 'Насколько хорошо вы знакомы с Питером',
  },
  {
    name: 'Тест по Москве',
    desc: 'Насколько хорошо вы знакомы с Москвой',
  },
];

// Блок create-test
const createTest = document.querySelector('.create-test');
// Данные из формы
const inputName = createTest.querySelector('.create-test__input-text');
const inputDesc = createTest.querySelector('.create-test__input-textarea');
/* Кнопка создать тест  */
const saveTest = createTest.querySelector('.create-test__save-sb');

/* Блок tests */
const tests = document.querySelector('.tests');
/* Контейнер со всеми тестами */
const testsList = tests.querySelector('.tests__list');
/* Надпись тесты отсуствуют */
const testsNotification = tests.querySelector('.tests__notification');
/* Кнопка по которой открывается попап редактирования тестов */
const btnEditTest = testsList.querySelector('.card-test__edit-btn');

/* Попап редактирования тестов */
const popupEditTest = document.querySelector('.popup_edit_tests');
/* Текстовое поле формы, название теста */
const inputNameTest = document.querySelector('.popup__input-text');
/* Текстовое поле формы, описание теста */
const inputDescTest = document.querySelector('.popup__input-textarea');

/* Кнопки закрытия попапов */
const closePopupBtns = document.querySelectorAll('.popup__close-btn');

/* Шаблон для создания теста */
const templateCreateTest = document.querySelector('.tests-list-container');


/* Блок шапка */
const header = document.querySelector('.header');
/* Кнопка открывает скрывает меню на мобильных устройствах */
const openMenu = header.querySelector('.header__open-menu-btn');
/* Меню */
const menuButton = header.querySelector('.header__list');

/* Проверяет на наличие тестов на странице */
/* existTests(); */

/* Сбрасывает форму */
function clearForm() {
  inputName.value = '';
  inputDesc.value = '';
}

/* Создание теста */
function formSubmitHandler(event) {
  event.preventDefault();

  const inputNameValue = inputName.value;
  const inputDescValue = inputDesc.value;

  if (inputNameValue.length < 4 || inputDescValue.length < 8) {
    return;
  }

  clearForm();

  /* existTests(); */
}

addEventListener('submit', formSubmitHandler);

/* Проверяет на наличие созданных тестов */
/* function existTests() {
  const TestsList = testsList.querySelectorAll('.tests__item');

  if (TestsList.length === 0) {
    testsNotification.classList.add('tests__notification_active');
  } else {
    testsNotification.classList.remove('tests__notification_active');
  }
} */

/* Открыть закрыть меню */
function toggleMenuModule() {
  menuButton.classList.toggle('header__list_active');

  /* Не дает вводить в форму при открытом меню на мобильных */
  disabledForm();
}

openMenu.addEventListener('click', toggleMenuModule);

/* Запрещает при открытом меню писать в форме и отправлять ее */
function disabledForm() {
  if (menuButton.classList.contains('header__list_active')) {
    console.log('disabled')
    inputName.setAttribute('disabled', '');
    inputDesc.setAttribute('disabled', '');
    saveTest.setAttribute('disabled', '');
  }
}

/* Сохряняет данные из формы попапа, в карточку которая редактируется */
function editTest(btnEdit) {
  btnEdit.closest('.card-test').querySelector('.card-test__title').textContent = inputNameTest.value;
  btnEdit.closest('.card-test').querySelector('.card-test__desc').textContent = inputDescTest.value;
}

/* Обработчик формы редактирования теста */
function formSubmitHandlerEditTest(btnEdit, event) {
  console.log(btnEdit)
  editTest(btnEdit);

  closeAllPopups(event);
}

/* Сохраняет данные из формы попапа редактирования теста, в тест карточку */
function editInputValue(event) {
  const cardNode = event.target.closest('.card-test');

  inputNameTest.value = cardNode.querySelector('.card-test__title').textContent;
  inputDescTest.value = cardNode.querySelector('.card-test__desc').textContent;
}

showTests();

/* Выводит начальные тесты из массива, и вешает события */
function showTests() {
  initialTests.forEach(test => {
    const testCard = createTestNode(test.name, test.desc);

    testCard.querySelector('.card-test__edit-btn').addEventListener('click', function(event) {
      openPopupEditTest();
      editInputValue(event);

      const btnEdit = event.target;
      console.log(btnEdit)
      popupEditTest.addEventListener('submit', (event) => formSubmitHandlerEditTest(btnEdit, event));
    });

    testsList.append(testCard);
  });
}

/* Создает один тест из шаблона. Принимает в параметр заголовок теста, и его описание */
function createTestNode(titleTest, descTest) {
  const cardTest = templateCreateTest.content.querySelector('.tests__item').cloneNode('true');

  cardTest.querySelector('.card-test__title').textContent = titleTest;
  cardTest.querySelector('.card-test__desc').textContent = descTest;

  return cardTest;
}

/* Открытие попапа редактирования теста */
function openPopupEditTest() {
  addPopupClass(popupEditTest);
}

/* Добавляет класс открытия попапа. Принимает попап аргументом, на который будет вешатся класс открытия попапа */
function addPopupClass(popupType) {
  popupType.classList.add('popup_opened')
}

/* Закрывает открывшейся попап при нажатии на крестик, или кнопку сохранить */
function closeAllPopups(event) {
  event.target.closest('.popup').classList.remove('popup_opened');
}

closePopupBtns.forEach(item => {
  item.addEventListener('click', closeAllPopups);
});
