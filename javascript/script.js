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

/* Сбрасывает форму */
function clearForm(...inputs) {
  inputs.forEach(input => {
    input.value = '';
  });
}

/* Создание теста */
function createTestHandler(event) {
  event.preventDefault();

  const inputNameValue = inputName.value;
  const inputDescValue = inputDesc.value;

  /* Создал обьект с карточкой */
  const objCard = {name: inputNameValue, link: inputDescValue};
  initialTests.push(objCard)

  const testNode = createTestNode(inputName.value, inputDesc.value);

  /* Добавляет события */
  addEventsTestNode(testNode);

  testsList.prepend(testNode);

  existTests();

  clearForm(inputName, inputDesc);
}

saveTest.addEventListener('click', createTestHandler);

/* Функция при пустом массиве показывает что тестом нет */
function emptyArrClassAdd() {
  if (initialTests.length === 0) {
    testsNotification.classList.add('tests__notification_active');
  }
}

emptyArrClassAdd();

/* Проверяет на наличие созданных тестов */
function existTests() {
  if (testsList.children.length === 1) {
    testsNotification.classList.add('tests__notification_active');
  }
  else {
    testsNotification.classList.remove('tests__notification_active');
  }
}

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

/* Удаление теста карточки */
function deleteTest(event) {
  event.target.closest('.tests__item').remove();
  existTests()
}

/* Сохряняет данные из формы попапа, в карточку которая редактируется */
function editTest(btnEdit) {
  btnEdit.closest('.card-test').querySelector('.card-test__title').textContent = inputNameTest.value;
  btnEdit.closest('.card-test').querySelector('.card-test__desc').textContent = inputDescTest.value;
}

/* Обработчик формы редактирования теста */
function formSubmitHandlerEditTest(btnEdit, event) {
  event.preventDefault();

  editTest(btnEdit);

  closeAllPopups(event);
}

/* Сохраняет данные из формы попапа редактирования теста, в тест карточку */
function editInputValue(event) {
  const cardNode = event.target.closest('.card-test');

  inputNameTest.value = cardNode.querySelector('.card-test__title').textContent;
  inputDescTest.value = cardNode.querySelector('.card-test__desc').textContent;
}

/* Добавляет собятия для карточки. Редактирования теста. Принимает в параметры DOM узел на который будет вешаться событие */
function addEventsTestNode(itemNode) {
  itemNode.querySelector('.card-test__edit-btn').addEventListener('click', function(event) {

    openPopupEditTest();
    editInputValue(event);

    const btnEdit = event.target;
    popupEditTest.addEventListener('submit', (event) => formSubmitHandlerEditTest(btnEdit, event), {
      once: true,
    });
  });

  itemNode.querySelector('.card-test__delete-btn').addEventListener('click', deleteTest);
}

showTests();

/* Выводит начальные тесты из массива, и вешает события */
function showTests() {
  initialTests.forEach(test => {
    const testCard = createTestNode(test.name, test.desc);

    /* Добавляет события */
    addEventsTestNode(testCard);

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
