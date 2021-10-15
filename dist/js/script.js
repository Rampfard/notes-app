/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/js/main.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/js/App.js":
/*!***********************!*\
  !*** ./src/js/App.js ***!
  \***********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return App; });
/* harmony import */ var _components_Store__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./components/Store */ "./src/js/components/Store.js");
/* harmony import */ var _components_UI__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./components/UI */ "./src/js/components/UI.js");
/* harmony import */ var _components_Form__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./components/Form */ "./src/js/components/Form.js");
/* harmony import */ var _components_NoteTemplate__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./components/NoteTemplate */ "./src/js/components/NoteTemplate.js");
/* harmony import */ var _components_Actions__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./components/Actions */ "./src/js/components/Actions.js");





class App {
  static init() {
    const noteTemplate = new _components_NoteTemplate__WEBPACK_IMPORTED_MODULE_3__["default"]();
    const mainForm = new _components_Form__WEBPACK_IMPORTED_MODULE_2__["default"]('.form');
    const store = new _components_Store__WEBPACK_IMPORTED_MODULE_0__["default"]('notes');
    const actionsHandler = new _components_Actions__WEBPACK_IMPORTED_MODULE_4__["default"](store);
    const ui = new _components_UI__WEBPACK_IMPORTED_MODULE_1__["default"](noteTemplate, mainForm, actionsHandler);
    ui.init(store.getLocalStorage());
  }

}

/***/ }),

/***/ "./src/js/components/Actions.js":
/*!**************************************!*\
  !*** ./src/js/components/Actions.js ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Actions; });
class Actions {
  constructor(store) {
    this.store = store;
  }

  addItem(noteData) {
    this.store.addItem(noteData);
  }

  saveNoteChanges(id, newValue, prop) {
    const existingItem = this.store.findItem(id);
    const newItem = { ...existingItem,
      [prop]: newValue
    };
    this.store.updateItem(newItem);
  }

  removeNote(id) {
    this.store.removeItem(id);
  }

  removeAll() {
    this.store.removeAll();
  }

  removeCompleted() {
    this.store.removeCompleted();
  }

  setAllIncompleted() {
    this.store.setCompleteStatus('incomplete');
  }

  setAllCompleted() {
    this.store.setCompleteStatus('complete');
  }

  setNoteComplete(id) {
    const existingItem = this.store.findItem(id);
    existingItem.isCompleted = true;
    this.store.updateItem(existingItem);
  }

  getItemsCount() {
    return this.store.getItemsCount();
  }

  setTheme(themeName) {
    this.store.setTheme(themeName);
  }

  getTheme() {
    return this.store.getTheme('Theme');
  }

  toggleCompleteStatus(id, completedOptions = []) {
    const existingItem = this.store.findItem(id);

    if (!existingItem.options) {
      existingItem.isCompleted = !existingItem.isCompleted;
      this.store.updateItem(existingItem);
      return;
    }

    existingItem.options = existingItem.options.map(op => {
      const shouldUpdate = completedOptions.includes(op.id);

      if (shouldUpdate) {
        op.isCompleted = true;
        return op;
      }

      op.isCompleted = false;
      return op;
    });

    if (completedOptions.length === existingItem.options.length) {
      existingItem.isCompleted = true;
    } else {
      existingItem.isCompleted = false;
    }

    this.store.updateItem(existingItem);
  }

}

/***/ }),

/***/ "./src/js/components/Form.js":
/*!***********************************!*\
  !*** ./src/js/components/Form.js ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Form; });
/* harmony import */ var _utils_DOMHelpers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/DOMHelpers */ "./src/js/utils/DOMHelpers.js");

class Form {
  constructor(formSelector) {
    this.form = Object(_utils_DOMHelpers__WEBPACK_IMPORTED_MODULE_0__["getEl"])(formSelector);
    this.titleInput = Object(_utils_DOMHelpers__WEBPACK_IMPORTED_MODULE_0__["getEl"])('input[name="note-title"]', this.form);
    this.descriptionInput = Object(_utils_DOMHelpers__WEBPACK_IMPORTED_MODULE_0__["getEl"])('textarea', this.form);
    this.formBody = Object(_utils_DOMHelpers__WEBPACK_IMPORTED_MODULE_0__["getEl"])('.form__body', this.form);
    this.formSelectors = Object(_utils_DOMHelpers__WEBPACK_IMPORTED_MODULE_0__["getElements"])('input[type="radio"]', this.form);
    this.submitButton = Object(_utils_DOMHelpers__WEBPACK_IMPORTED_MODULE_0__["getEl"])('#create-btn', this.form);
    this.formType = 'note';
    this.connectInputHandler(this.titleInput);
    this.connectInputHandler(this.descriptionInput);
    this.connectChangeBodyHandler();
    this.connectCloseBtnHandler();
  }

  getFormData() {
    const options = Object(_utils_DOMHelpers__WEBPACK_IMPORTED_MODULE_0__["getElements"])('.option p', this.form);
    const formData = {
      id: `n${Math.random().toString().slice(4)}`,
      date: `${new Date().toDateString()} ${new Date().toLocaleTimeString()}`,
      type: this.formType,
      isCompleted: false
    };

    if (!this.validateForm(options, this.formType)) {
      return;
    }

    formData.title = this.titleInput.value;

    if (this.descriptionInput) {
      formData.description = this.descriptionInput.value;
    }

    if (options.length > 0) {
      formData.options = [...options].map(el => {
        return {
          text: el.textContent,
          isCompleted: false,
          id: 'opt' + Math.random().toString().slice(4)
        };
      });
    }

    this.clearForm();
    return formData;
  }

  validateForm(options, noteType) {
    if (!this.isValid(this.titleInput)) {
      this.titleInput.parentNode.classList.add('invalid');
      return false;
    }

    if (this.descriptionInput) {
      if (!this.isValid(this.descriptionInput)) {
        this.descriptionInput.parentNode.classList.add('invalid');
        return false;
      }
    }

    if (options.length < 1 && noteType !== 'note') {
      const message = Object(_utils_DOMHelpers__WEBPACK_IMPORTED_MODULE_0__["createElement"])('div');
      message.classList.add('form-message', 'form__message--invalid');
      message.innerText = 'You need to add at least 1 option';
      this.formBody.append(message);
      setTimeout(() => {
        message.remove();
      }, 4000);
      return false;
    }

    return true;
  }

  isValid(input) {
    return input.value.trim() !== '' ? true : false;
  }

  clearForm() {
    this.titleInput.value = '';

    if (this.descriptionInput) {
      this.descriptionInput.value = '';
    }

    Object(_utils_DOMHelpers__WEBPACK_IMPORTED_MODULE_0__["getElements"])('.option', this.form).forEach(el => el.remove());
  }

  changeFormBody(e) {
    this.formType = e.target.dataset.type;
    this.formBody.innerHTML = '';
    this.createFormBody(this.formType);
  }

  createFormBody(type) {
    const optionPicker = Object(_utils_DOMHelpers__WEBPACK_IMPORTED_MODULE_0__["createElement"])('div');
    optionPicker.classList.add('options-control');
    const optionsList = Object(_utils_DOMHelpers__WEBPACK_IMPORTED_MODULE_0__["createElement"])('ul');
    optionsList.classList.add('options-list');

    if (type === 'todo') {
      optionsList.classList.add('options-list--todo');
    }

    if (type === 'targets' || type === 'note') {
      const descrInput = Object(_utils_DOMHelpers__WEBPACK_IMPORTED_MODULE_0__["createElement"])('div');
      descrInput.classList.add('form-control');
      descrInput.innerHTML = `
				<label>Note Description</label>
				<textarea class="input form-input" placeholder="Enter description"></textarea>
			`;
      this.descriptionInput = Object(_utils_DOMHelpers__WEBPACK_IMPORTED_MODULE_0__["getEl"])('textarea', descrInput);
      this.connectInputHandler(this.descriptionInput);
      this.formBody.append(descrInput);

      if (type === 'note') {
        return;
      }
    } else {
      this.descriptionInput = null;
    }

    optionPicker.innerHTML = `
			<input class="input form-input" placeholder="Enter Your task" type="text">
			<button type="button" class="btn form-btn">Add Option</button>
    `;
    const optionPickerBtn = Object(_utils_DOMHelpers__WEBPACK_IMPORTED_MODULE_0__["getEl"])('button', optionPicker);
    optionPickerBtn.addEventListener('click', this.createOption.bind(this));
    this.formBody.append(optionsList, optionPicker);
  }

  createOption(e) {
    e.preventDefault();
    const parentEl = Object(_utils_DOMHelpers__WEBPACK_IMPORTED_MODULE_0__["getEl"])('.options-list', this.formBody);
    const input = Object(_utils_DOMHelpers__WEBPACK_IMPORTED_MODULE_0__["getEl"])('input', this.formBody);

    if (input.value.trim() === '') {
      return;
    }

    const option = Object(_utils_DOMHelpers__WEBPACK_IMPORTED_MODULE_0__["createElement"])('li');
    option.classList.add('option');
    const optionText = Object(_utils_DOMHelpers__WEBPACK_IMPORTED_MODULE_0__["createElement"])('p');
    optionText.textContent = input.value;
    const deleteBtn = Object(_utils_DOMHelpers__WEBPACK_IMPORTED_MODULE_0__["createElement"])('button');
    deleteBtn.classList.add('btn', 'delete-btn');
    deleteBtn.innerText = 'X';
    deleteBtn.addEventListener('click', e => {
      e.target.parentNode.remove();
    });
    option.append(optionText, deleteBtn);
    parentEl.append(option);
    input.value = '';
  }

  connectChangeBodyHandler() {
    this.formSelectors.forEach(selector => selector.addEventListener('change', this.changeFormBody.bind(this)));
  }

  connectInputHandler(input) {
    input.addEventListener('blur', () => {
      if (this.isValid(input)) {
        input.parentNode.classList.remove('invalid');
      } else {
        input.parentNode.classList.add('invalid');
      }
    });
  }

  connectCloseBtnHandler() {
    Object(_utils_DOMHelpers__WEBPACK_IMPORTED_MODULE_0__["getEl"])('.close-btn', this.form).addEventListener('click', () => this.form.classList.remove('shown'));
  }

}

/***/ }),

/***/ "./src/js/components/NoteTemplate.js":
/*!*******************************************!*\
  !*** ./src/js/components/NoteTemplate.js ***!
  \*******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Note; });
/* harmony import */ var _utils_DOMHelpers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/DOMHelpers */ "./src/js/utils/DOMHelpers.js");
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }


class Note {
  constructor() {
    _defineProperty(this, "months", ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']);
  }

  createNote(formData) {
    const note = Object(_utils_DOMHelpers__WEBPACK_IMPORTED_MODULE_0__["createElement"])('li');
    note.classList.add('note');

    if (formData.type !== 'note') {
      note.classList.add(formData.type);
    }

    if (formData.isCompleted) {
      note.classList.add('completed');
    }

    const {
      title,
      type,
      id
    } = formData;
    note.dataset.type = type;
    note.id = id;
    const [day, date, month] = formData.date.split(' ');
    note.innerHTML = `
			<div class="note__inner">
				<h2 class="note__title">
					${title}
				</h2>
				<div class="note__content"></div>
				<div class="note__info">
					<div class="note__date">${date} ${month}</div>
					<div class="note__type">${type}</div>
				</div>
			</div>
		`;
    const noteContentEl = Object(_utils_DOMHelpers__WEBPACK_IMPORTED_MODULE_0__["getEl"])('.note__content', note);

    if (type !== 'todo') {
      const description = Object(_utils_DOMHelpers__WEBPACK_IMPORTED_MODULE_0__["createElement"])('p');
      description.innerText = formData.description;
      description.classList.add('note__description');
      noteContentEl.insertAdjacentElement('afterbegin', description);
    }

    if (type === 'todo' || type === 'targets') {
      this.createOptions(formData.options, noteContentEl);
    }

    return note;
  }

  createOptions(options, parentEl) {
    const optionsList = Object(_utils_DOMHelpers__WEBPACK_IMPORTED_MODULE_0__["createElement"])('ul');
    optionsList.classList.add('note-options');
    options.forEach(option => {
      const newOption = Object(_utils_DOMHelpers__WEBPACK_IMPORTED_MODULE_0__["createElement"])('li');
      newOption.classList.add('note-option');
      newOption.innerHTML = `
				<span></span>
				<p>${option.text}</p>
			`;

      if (option.isCompleted) {
        newOption.classList.add('completed');
      }

      newOption.id = option.id;
      optionsList.append(newOption);
    });
    parentEl.append(optionsList);
  }

}

/***/ }),

/***/ "./src/js/components/Notification.js":
/*!*******************************************!*\
  !*** ./src/js/components/Notification.js ***!
  \*******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Notification; });
/* harmony import */ var _utils_DOMHelpers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/DOMHelpers */ "./src/js/utils/DOMHelpers.js");

class Notification {
  constructor(description, type) {
    this.type = type;
    this.description = description;
  }

  createNotification() {
    const notification = Object(_utils_DOMHelpers__WEBPACK_IMPORTED_MODULE_0__["createElement"])('div');
    notification.classList.add('notification');

    if (this.type) {
      notification.classList.add(this.type);
    }

    notification.innerText = this.description;
    return notification;
  }

}

/***/ }),

/***/ "./src/js/components/Store.js":
/*!************************************!*\
  !*** ./src/js/components/Store.js ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Store; });
class Store {
  constructor(name) {
    this.name = name;
    this.store = window.localStorage;
    this.items;
  }

  getLocalStorage() {
    return this.items || JSON.parse(this.store.getItem(this.name) || '[]');
  }

  setLocalStorage(newItems) {
    this.store.setItem(this.name, JSON.stringify(this.items = newItems));
  }

  setTheme(themeName) {
    this.store.setItem('Theme', themeName);
  }

  getTheme() {
    return this.store.getItem('Theme');
  }

  updateItem(newItem) {
    const id = newItem.id;
    const storeItems = this.getLocalStorage();
    const newItems = storeItems.map(item => {
      if (item.id !== id) {
        return item;
      }

      return newItem;
    });
    this.setLocalStorage(newItems);
  }

  findItem(id) {
    const storeItems = this.getLocalStorage();
    return storeItems.find(item => item.id === id);
  }

  addItem(item) {
    const storeItems = this.getLocalStorage();
    storeItems.push(item);
    this.setLocalStorage(storeItems);
  }

  removeItem(id) {
    const storeItems = this.getLocalStorage();
    const updatedStoreItems = storeItems.filter(item => item.id !== id);
    this.setLocalStorage(updatedStoreItems);
  }

  removeAll() {
    this.setLocalStorage([]);
  }

  removeCompleted() {
    const storeItems = this.getLocalStorage();

    if (storeItems.length < 1) {
      return;
    }

    const updatedItems = storeItems.filter(item => !item.isCompleted);
    this.setLocalStorage(updatedItems);
  }

  setCompleteStatus(status) {
    let completeStatus;
    const storeItems = this.getLocalStorage();

    if (status === 'complete') {
      completeStatus = true;
    } else {
      completeStatus = false;
    }

    if (storeItems.length < 1) {
      return;
    }

    const updatedItems = storeItems.map(item => {
      item.isCompleted = completeStatus;

      if (item.options) {
        item.options.forEach(opt => opt.isCompleted = completeStatus);
      }

      return item;
    });
    this.setLocalStorage(updatedItems);
  }

  getItemsCount() {
    const storeItems = this.getLocalStorage();
    const completedNotes = storeItems.filter(item => item.isCompleted).length;
    return {
      notesQuantity: storeItems.length,
      completedNotesQuantity: completedNotes
    };
  }

}

/***/ }),

/***/ "./src/js/components/UI.js":
/*!*********************************!*\
  !*** ./src/js/components/UI.js ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return UI; });
/* harmony import */ var _Notification__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Notification */ "./src/js/components/Notification.js");
/* harmony import */ var _utils_DOMHelpers__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/DOMHelpers */ "./src/js/utils/DOMHelpers.js");


class UI {
  constructor(noteTemplate, formInstance, actions) {
    this.actions = actions;
    this.noteTemplate = noteTemplate;
    this.formInstance = formInstance;
    this.mainSection = Object(_utils_DOMHelpers__WEBPACK_IMPORTED_MODULE_1__["getEl"])('.main');
    this.noteList = Object(_utils_DOMHelpers__WEBPACK_IMPORTED_MODULE_1__["getEl"])('.notes');
    this.tabs = Object(_utils_DOMHelpers__WEBPACK_IMPORTED_MODULE_1__["getEl"])('.notes-tabs');
    this.createNoteBtn = Object(_utils_DOMHelpers__WEBPACK_IMPORTED_MODULE_1__["getEl"])('#create-note');
    this.searchInput = Object(_utils_DOMHelpers__WEBPACK_IMPORTED_MODULE_1__["getEl"])('#search-input');
    this.form = Object(_utils_DOMHelpers__WEBPACK_IMPORTED_MODULE_1__["getEl"])('#form');
    this.editMenu = Object(_utils_DOMHelpers__WEBPACK_IMPORTED_MODULE_1__["getEl"])('.header__edit');
    this.settingsMenu = Object(_utils_DOMHelpers__WEBPACK_IMPORTED_MODULE_1__["getEl"])('.header__settings');
    this.tabs = Object(_utils_DOMHelpers__WEBPACK_IMPORTED_MODULE_1__["getEl"])('.notes-tabs');
    this.backdrop = Object(_utils_DOMHelpers__WEBPACK_IMPORTED_MODULE_1__["getEl"])('.backdrop');
    this.notifications = Object(_utils_DOMHelpers__WEBPACK_IMPORTED_MODULE_1__["getEl"])('#notifications');
    this.contextMenuTemplate = Object(_utils_DOMHelpers__WEBPACK_IMPORTED_MODULE_1__["getEl"])('#context-menu-template');
    this.noteDetail = Object(_utils_DOMHelpers__WEBPACK_IMPORTED_MODULE_1__["getEl"])('#note-detail');
    this.themeModal = Object(_utils_DOMHelpers__WEBPACK_IMPORTED_MODULE_1__["getEl"])('#theme-modal');
    this.tabsBtn = Object(_utils_DOMHelpers__WEBPACK_IMPORTED_MODULE_1__["getEl"])('#tabs-btn');
    this.startScreen = Object(_utils_DOMHelpers__WEBPACK_IMPORTED_MODULE_1__["getEl"])('.start-screen');
    this.infoBlock = Object(_utils_DOMHelpers__WEBPACK_IMPORTED_MODULE_1__["getEl"])('.info-block');
    this.kitty = Object(_utils_DOMHelpers__WEBPACK_IMPORTED_MODULE_1__["getEl"])('.kitty');
    this.bindEventsToElements();
  }

  createNote(formData) {
    if (!formData) {
      return;
    }

    if (this.startScreen) {
      this.startScreen.classList.add('hiden');
    }

    const newNote = this.noteTemplate.createNote(formData);
    this.noteList.insertAdjacentElement('afterbegin', newNote);
    this.resizeAllNotes();
  }

  createNotification(type, description) {
    const notification = new _Notification__WEBPACK_IMPORTED_MODULE_0__["default"](type, description).createNotification();
    this.notifications.append(notification);
    setTimeout(() => {
      notification.remove();
    }, 4000);
  }

  resizeNote(item) {
    const grid = this.noteList;
    const rowHeight = parseInt(window.getComputedStyle(grid).getPropertyValue('grid-auto-rows'));
    const rowGap = parseInt(window.getComputedStyle(grid).getPropertyValue('grid-row-gap'));
    const rowSpan = Math.ceil((Object(_utils_DOMHelpers__WEBPACK_IMPORTED_MODULE_1__["getEl"])('.note__inner', item).getBoundingClientRect().height + rowGap) / (rowHeight + rowGap));
    item.style.gridRowEnd = 'span ' + rowSpan;
  }

  resizeAllNotes() {
    Object(_utils_DOMHelpers__WEBPACK_IMPORTED_MODULE_1__["getElements"])('.note', this.noteList).forEach(note => {
      this.resizeNote(note);
    });
  }

  editNote(target) {
    target.classList.add('editing');
    const textarea = Object(_utils_DOMHelpers__WEBPACK_IMPORTED_MODULE_1__["createElement"])('textarea');
    textarea.classList.add('input', 'form-input', 'edit');
    textarea.value = target.innerText;
    target.appendChild(textarea);
    textarea.focus();
  }

  editNoteFinished(id, contentEl) {
    const note = Object(_utils_DOMHelpers__WEBPACK_IMPORTED_MODULE_1__["getEl"])(`#${id}`);
    const textarea = Object(_utils_DOMHelpers__WEBPACK_IMPORTED_MODULE_1__["getEl"])('textarea', note);
    contentEl.innerText = textarea.value;
    contentEl.classList.remove('editing');
    textarea.remove();
    this.resizeAllNotes();
  }

  setNotesActiveStatus(id) {
    Object(_utils_DOMHelpers__WEBPACK_IMPORTED_MODULE_1__["getElements"])('.note', this.noteList).forEach(note => {
      if (id && note.id !== id) {
        return;
      }

      note.classList.add('completed');
      Object(_utils_DOMHelpers__WEBPACK_IMPORTED_MODULE_1__["getElements"])('.note-option', note).forEach(opt => opt.classList.add('completed'));
    });
  }

  setNotesInactiveStatus(id) {
    Object(_utils_DOMHelpers__WEBPACK_IMPORTED_MODULE_1__["getElements"])('.note', this.noteList).forEach(note => {
      if (id && note.id !== id) {
        return;
      }

      note.classList.remove('completed');
      Object(_utils_DOMHelpers__WEBPACK_IMPORTED_MODULE_1__["getElements"])('.note-option', note).forEach(opt => opt.classList.remove('completed'));
    });
  }

  filterNotesByType(type) {
    const notes = Object(_utils_DOMHelpers__WEBPACK_IMPORTED_MODULE_1__["getElements"])('.note', this.noteList);
    notes.forEach(note => {
      const noteType = note.dataset.type;

      if (type === 'all') {
        note.classList.remove('hide');
        return;
      }

      if (type === 'completed' && note.classList.contains(type)) {
        note.classList.remove('hide');
        return;
      }

      if (noteType !== type) {
        note.classList.add('hide');
      } else {
        note.classList.remove('hide');
      }
    });
  }

  copyToClipboard(textToCopy) {
    if (navigator.clipboard && window.isSecureContext) {
      return navigator.clipboard.writeText(textToCopy);
    } else {
      let textArea = document.createElement('textarea');
      textArea.value = textToCopy;
      textArea.style.position = 'fixed';
      textArea.style.left = '-999999px';
      textArea.style.top = '-999999px';
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      return new Promise((res, rej) => {
        document.execCommand('copy') ? res() : rej();
        textArea.remove();
      });
    }
  }

  createContextMenu(e, note) {
    const contextMenuTemplate = this.contextMenuTemplate.content.firstElementChild;
    const contextMenu = contextMenuTemplate.cloneNode(true);

    if (note.dataset.type === 'todo') {
      Object(_utils_DOMHelpers__WEBPACK_IMPORTED_MODULE_1__["getEl"])('#copy-description-btn', contextMenu).remove();
      Object(_utils_DOMHelpers__WEBPACK_IMPORTED_MODULE_1__["getEl"])('#edit-description-btn', contextMenu).remove();
    }

    const y = e.clientY;
    const x = e.clientX;
    const noteRect = note.getBoundingClientRect();
    let yInside = y - noteRect.top;
    let xInside = x - noteRect.left;

    if (x > document.documentElement.getBoundingClientRect().width / 2) {
      xInside -= note.clientWidth / 2;
    }

    contextMenu.style.top = `${yInside}px`;
    contextMenu.style.left = `${xInside}px`;
    contextMenu.addEventListener('click', e => {
      this.contextMenuHandler(e, note);
    }, true);
    this.contextMenu = contextMenu;
    note.append(contextMenu);
  }

  contextMenuHandler(e, note) {
    const noteId = note.id;

    switch (e.target.closest('button').id) {
      case 'remove-note-btn':
        this.actions.removeNote(noteId);
        note.remove();
        this.createNotification('Note removed');

        if (this.actions.getItemsCount().notesQuantity < 1) {
          this.startScreen.classList.remove('hiden');
        }

        break;

      case 'select-text-btn':
        this.contextMenu.remove();
        this.selectNoteText(noteId);
        break;

      case 'complete-note-btn':
        if (note.classList.contains('completed')) {
          note.classList.remove('completed');
          this.actions.toggleCompleteStatus(noteId);
          this.setNotesInactiveStatus(noteId);
        } else {
          let options = [...Object(_utils_DOMHelpers__WEBPACK_IMPORTED_MODULE_1__["getElements"])('.note-option', note)];

          if (options.length > 0) {
            options = options.map(op => op.id);
          }

          this.actions.toggleCompleteStatus(noteId, options);
          this.setNotesActiveStatus(noteId);
        }

        break;

      case 'edit-title-btn':
        this.editNote(Object(_utils_DOMHelpers__WEBPACK_IMPORTED_MODULE_1__["getEl"])('.note__title', note));
        this.contextMenu.remove();
        break;

      case 'edit-description-btn':
        this.editNote(Object(_utils_DOMHelpers__WEBPACK_IMPORTED_MODULE_1__["getEl"])('.note__description', note));
        this.contextMenu.remove();
        break;

      case 'copy-description-btn':
        this.contextMenu.remove();
        this.copyToClipboard(Object(_utils_DOMHelpers__WEBPACK_IMPORTED_MODULE_1__["getEl"])('.note__description', note).textContent);
        this.createNotification('Description copied!');
        break;

      case 'copy-title-btn':
        this.contextMenu.remove();
        this.copyToClipboard(Object(_utils_DOMHelpers__WEBPACK_IMPORTED_MODULE_1__["getEl"])('.note__title', note).textContent);
        this.createNotification('Title copied!');
        break;
    }
  }

  editMenuHandler(e) {
    const target = e.target;

    switch (target.id) {
      case 'edit-btn':
        {
          target.parentNode.classList.toggle('active');
          break;
        }

      case 'remove-all-btn':
        {
          if (!confirm('Are You sure You want to delete all notes?')) {
            return;
          }

          this.actions.removeAll();
          this.noteList.innerHTML = '';
          this.startScreen.classList.remove('hiden');
          this.createNotification('All notes removed', 'succsess');
          break;
        }

      case 'remove-completed-btn':
        {
          if (!confirm('Are You sure You want to delete completed notes?')) {
            return;
          }

          this.actions.removeCompleted();
          Object(_utils_DOMHelpers__WEBPACK_IMPORTED_MODULE_1__["getElements"])('.note', this.noteList).forEach(note => {
            if (note.classList.contains('completed')) {
              note.remove();
            }
          });
          this.createNotification('All completed notes removed', 'succsess');
          break;
        }

      case 'mark-notes-btn':
        {
          if (target.dataset.complete === 'false') {
            this.actions.setAllCompleted();
            this.setNotesActiveStatus();
            target.dataset.complete = true;
            target.innerText = 'Mark all as incompleted';
          } else {
            this.actions.setAllIncompleted();
            this.setNotesInactiveStatus();
            target.dataset.complete = false;
            target.innerText = 'Mark all as completed';
            break;
          }
        }
    }
  }

  selectNoteText(id) {
    const note = Object(_utils_DOMHelpers__WEBPACK_IMPORTED_MODULE_1__["getEl"])(`#${id}`);
    this.noteDetail.innerHTML = '';
    const noteClone = note.cloneNode(true);
    noteClone.classList.add('select');
    this.noteDetail.appendChild(noteClone);
    flipNotes(note, noteClone, () => {
      this.mainSection.dataset.state = 'detail';
      note.style.opacity = 0;
    });

    const revert = e => {
      if (!e.target.classList.contains('note-detail')) {
        return;
      }

      flipNotes(noteClone, note, () => {
        this.mainSection.dataset.state = 'gallery';
        note.style.opacity = '';
        noteClone.remove();
        this.noteDetail.removeEventListener('click', revert);
      });
    };

    this.noteDetail.addEventListener('click', revert);

    function flipNotes(firstEl, lastEl, change) {
      const firstRect = firstEl.getBoundingClientRect();
      const lastRect = lastEl.getBoundingClientRect();
      const deltaX = firstRect.left - lastRect.left;
      const deltaY = firstRect.top - lastRect.top;
      const deltaW = firstRect.width / lastRect.width;
      const deltaH = firstRect.height / lastRect.height;
      change();
      lastEl.animate([{
        transform: `translateX(${deltaX}px) translateY(${deltaY}px) scaleX(${deltaW}) scaleY(${deltaH})`
      }, {
        transform: 'none'
      }], {
        duration: 600,
        easing: 'cubic-bezier(0.2, 0, 0.3, 1)'
      });
    }
  }

  settingsMenuHandler(e) {
    const target = e.target;

    switch (target.id) {
      case 'settings-btn':
        if (this.settingsMenu.classList.contains('expand')) {
          this.settingsMenu.classList.remove('expand');
          this.settingsMenu.classList.add('shrink');
        } else {
          this.settingsMenu.classList.remove('shrink');
          this.settingsMenu.classList.add('expand');
        }

        target.classList.toggle('active');
        break;

      case 'change-theme-btn':
        this.backdrop.classList.add('shown');
        this.showThemeModal();
        break;

      case 'info-btn':
        this.backdrop.classList.add('shown');
        this.infoBlock.classList.add('shown');
        break;

      case 'kitty-btn':
        if (this.kitty.classList.contains('.shown')) {
          return;
        }

        this.kitty.classList.add('shown');
        setTimeout(() => {
          this.kitty.classList.remove('shown');
        }, 2000);
    }
  }

  showThemeModal() {
    this.themeModal.classList.add('shown');
  } // bind events to DOM elements


  connectSettingsMenu() {
    this.settingsMenu.addEventListener('click', e => {
      this.settingsMenuHandler(e);
    });
  }

  connectThemeModal() {
    this.themeModal.addEventListener('click', e => {
      if (e.target.checked) {
        this.actions.setTheme(e.target.id);
        document.body.className = `${e.target.id}`;
      }
    });
  }

  connectContextMenu() {
    this.noteList.addEventListener('contextmenu', e => {
      e.preventDefault();
      const target = e.target;

      if (target.closest('.context-menu')) {
        return;
      }

      if (target.closest('.note') && !target.closest('.context-menu')) {
        const note = target.closest('.note');

        if (this.contextMenu) {
          this.contextMenu.remove();
        }

        this.createContextMenu(e, note);
      }
    });
  }

  connectSearchHandler() {
    this.searchInput.addEventListener('input', e => {
      Object(_utils_DOMHelpers__WEBPACK_IMPORTED_MODULE_1__["getElements"])('.note', this.noteList).forEach(note => {
        const searchValue = e.target.value.trim();
        const title = Object(_utils_DOMHelpers__WEBPACK_IMPORTED_MODULE_1__["getEl"])('.note__title', note).textContent.trim();

        if (!title.toLowerCase().includes(searchValue.toLowerCase())) {
          note.classList.add('hide');
        } else {
          note.classList.remove('hide');
        }
      });
      this.resizeAllNotes();
    });
  }

  connectShowFormBtn(btn) {
    btn.addEventListener('click', () => {
      this.backdrop.classList.add('shown');
      this.form.classList.add('shown');
    });
  }

  connectTabsHandler() {
    this.tabs.addEventListener('click', e => {
      const target = e.target;

      if (target.closest('.notes-tab')) {
        Object(_utils_DOMHelpers__WEBPACK_IMPORTED_MODULE_1__["getElements"])('.notes-tab').forEach(tab => tab.classList.remove('active'));
        target.classList.add('active');
        Object(_utils_DOMHelpers__WEBPACK_IMPORTED_MODULE_1__["getEl"])('span', this.tabsBtn).textContent = target.textContent;
        this.filterNotesByType(target.dataset.type);
      }
    });
  }

  connectDoubleClickToNoteList() {
    this.noteList.addEventListener('dblclick', e => {
      const target = e.target;

      if (target.closest('.note') && (target.classList.contains('note__description') || target.classList.contains('note__title'))) {
        this.editNote(target);
      }
    });
  }

  connectBodyClickHandler() {
    document.body.addEventListener('click', e => {
      if (this.contextMenu && !e.target.closest('.context-menu')) {
        this.contextMenu.remove();
      }

      if (e.target.classList.contains('close-btn')) {
        this.backdrop.classList.remove('shown');
      }

      if (!e.target.closest('.header__edit')) {
        Object(_utils_DOMHelpers__WEBPACK_IMPORTED_MODULE_1__["getEl"])('.header__edit').classList.remove('active');
      }

      if (e.target.classList.contains('backdrop')) {
        this.backdrop.classList.remove('shown');
        this.form.classList.remove('shown');
        this.themeModal.classList.remove('shown');
        this.infoBlock.classList.remove('shown');
      }

      if (this.settingsMenu.classList.contains('expand') && !e.target.closest('.header__settings')) {
        this.settingsMenu.classList.remove('expand');
        this.settingsMenu.classList.add('shrink');
        this.settingsMenu.firstElementChild.classList.remove('active');
      }

      if (window.matchMedia('(max-width: 640px)') && !e.target.closest('.tabs-container')) {
        this.tabs.classList.remove('active');
        this.tabsBtn.classList.remove('active');
      }
    });
  }

  connectEditMenu() {
    this.editMenu.addEventListener('click', e => {
      const {
        notesQuantity
      } = this.actions.getItemsCount();

      if (notesQuantity < 1) {
        this.editMenu.classList.add('edit-disabled');
      } else {
        this.editMenu.classList.remove('edit-disabled');
      }

      this.editMenuHandler(e);
    });
  }

  connectSubmitFormHandler() {
    this.formInstance.form.addEventListener('submit', e => {
      e.preventDefault();
      const formData = this.formInstance.getFormData();

      if (!formData) {
        return;
      }

      this.createNote(formData);
      this.actions.addItem(formData);
      this.form.classList.remove('shown');
      this.backdrop.classList.remove('shown');
      this.createNotification(`${formData.type} created!`, 'success');
    });
  }

  connectToggleCompleteStatusHandler() {
    this.noteList.addEventListener('click', e => {
      if (!e.target.closest('.note')) {
        return;
      }

      const target = e.target.closest('.note-option');
      const id = e.target.closest('.note').id;

      if (target) {
        const allOptions = Object(_utils_DOMHelpers__WEBPACK_IMPORTED_MODULE_1__["getElements"])('.note-option', target.parentNode);
        target.classList.toggle('completed');
        const completedOptions = Object(_utils_DOMHelpers__WEBPACK_IMPORTED_MODULE_1__["getElements"])('.note-option.completed', target.parentNode);

        if (completedOptions.length === allOptions.length) {
          target.closest('.note').classList.add('completed');
        } else {
          target.closest('.note').classList.remove('completed');
        }

        const completedIds = [...completedOptions].map(op => op.id);
        this.actions.toggleCompleteStatus(id, completedIds);
      }
    });
  }

  connectEditNoteSaveHandler() {
    this.noteList.addEventListener('blur', e => {
      const target = e.target;
      const id = target.closest('.note').id;
      const newValue = target.value;

      if (newValue.trim() === '') {
        return;
      }

      if (e.target.closest('.note__title')) {
        this.actions.saveNoteChanges(id, newValue, 'title');
        this.editNoteFinished(id, target.parentNode);
      }

      if (e.target.closest('.note__description')) {
        this.actions.saveNoteChanges(id, newValue, 'description');
        this.editNoteFinished(id, target.parentNode);
      }
    }, true);
  }

  connectEditNoteCancel() {
    this.noteList.addEventListener('keyup', e => {
      const target = e.target;

      if (e.keyCode === 27) {
        target.value = target.parentNode.textContent.trim();
        target.blur();
      }
    });
  }

  connectMansornyLayoutResize() {
    let timer;
    window.addEventListener('resize', () => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        this.resizeAllNotes();
      }, 200);
    });
  }

  connectTabsBtn() {
    this.tabsBtn.addEventListener('click', e => {
      this.tabsBtn.classList.toggle('active');
      this.tabsBtn.nextElementSibling.classList.toggle('active');
    });
  }

  bindEventsToElements() {
    this.connectBodyClickHandler();
    this.connectSearchHandler();
    this.connectTabsHandler();
    this.connectDoubleClickToNoteList();
    this.connectToggleCompleteStatusHandler();
    this.connectContextMenu();
    this.connectEditMenu();
    this.connectEditNoteSaveHandler();
    this.connectEditNoteCancel();
    this.connectSubmitFormHandler();
    this.connectShowFormBtn(this.createNoteBtn);
    this.connectShowFormBtn(Object(_utils_DOMHelpers__WEBPACK_IMPORTED_MODULE_1__["getEl"])('button', this.startScreen));
    this.connectTabsBtn();
    this.connectSettingsMenu();
    this.connectThemeModal();
    this.connectMansornyLayoutResize();
  } // first render


  init(store) {
    const currentTheme = this.actions.getTheme();

    if (currentTheme !== null) {
      document.body.className = currentTheme;
      Object(_utils_DOMHelpers__WEBPACK_IMPORTED_MODULE_1__["getEl"])(`#${currentTheme}`).checked = true;
    }

    if (store.length > 0) {
      this.noteList.innerHTML = '';
      store.forEach(itemData => {
        this.createNote(itemData);
      });
    }

    this.resizeAllNotes();
  }

}

/***/ }),

/***/ "./src/js/main.js":
/*!************************!*\
  !*** ./src/js/main.js ***!
  \************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _App__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./App */ "./src/js/App.js");

window.addEventListener('DOMContentLoaded', () => {
  _App__WEBPACK_IMPORTED_MODULE_0__["default"].init();
});

/***/ }),

/***/ "./src/js/utils/DOMHelpers.js":
/*!************************************!*\
  !*** ./src/js/utils/DOMHelpers.js ***!
  \************************************/
/*! exports provided: getEl, getElements, createElement, connectEvent, delegate */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getEl", function() { return getEl; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getElements", function() { return getElements; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createElement", function() { return createElement; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "connectEvent", function() { return connectEvent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "delegate", function() { return delegate; });
const getEl = (selector, parent = document) => {
  return parent.querySelector(selector);
};
const getElements = (selector, parent = document) => {
  return parent.querySelectorAll(selector);
};
const createElement = tag => {
  return document.createElement(tag);
};
const connectEvent = (target, type, handler, capture) => {
  target.addEventListener(type, handler, !!capture);
};
const delegate = (target, selector, type, handler, capture) => {
  const dispatchEvent = e => {
    if (e.target.closest(selector)) {
      handler.call(e.target, e);
    }
  };

  connectEvent(target, type, dispatchEvent, !!capture);
};

/***/ })

/******/ });
//# sourceMappingURL=script.js.map