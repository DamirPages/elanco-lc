"use strict";

var inputEqualValidation = document.querySelectorAll('[data-validate-equal]');
inputEqualValidation.forEach(function (input) {
  var validValues = input.dataset.validateEqual;
  var inputContainer = input.closest('.input');
  var button = input.closest('.outpoints__container').querySelector('.button-js');
  if (validValues) validValues = validValues.split(',').map(function (item) {
    return item.trim();
  });
  input.addEventListener('input', function () {
    var currentValue = input.value.trim();
    if (validValues.indexOf(currentValue) !== -1) {
      inputContainer.classList.add('valid');
      button.removeAttribute('disabled');
      return;
    }
    inputContainer.classList.remove('valid');
    button.setAttribute('disabled', true);
  });
});
"use strict";

var passwordToggler = document.querySelectorAll('.input-toggler');
passwordToggler.forEach(function (toggler) {
  toggler.addEventListener('click', function () {
    if (toggler.classList.contains('active')) {
      toggler.classList.remove('active');
      toggler.previousElementSibling.setAttribute('type', 'password');
    } else {
      toggler.classList.add('active');
      toggler.previousElementSibling.setAttribute('type', 'text');
    }
  });
});
window.addEventListener("DOMContentLoaded", function () {
  [].forEach.call(document.querySelectorAll('.tel'), function (input) {
    var keyCode;
    function mask(event) {
      event.keyCode && (keyCode = event.keyCode);
      var pos = this.selectionStart;
      if (pos < 3) event.preventDefault();
      var matrix = "+7 (___) ___ ____",
        i = 0,
        def = matrix.replace(/\D/g, ""),
        val = this.value.replace(/\D/g, ""),
        new_value = matrix.replace(/[_\d]/g, function (a) {
          return i < val.length ? val.charAt(i++) || def.charAt(i) : a;
        });
      i = new_value.indexOf("_");
      if (i != -1) {
        i < 5 && (i = 3);
        new_value = new_value.slice(0, i);
      }
      var reg = matrix.substr(0, this.value.length).replace(/_+/g, function (a) {
        return "\\d{1," + a.length + "}";
      }).replace(/[+()]/g, "\\$&");
      reg = new RegExp("^" + reg + "$");
      if (!reg.test(this.value) || this.value.length < 5 || keyCode > 47 && keyCode < 58) this.value = new_value;
      if (event.type == "blur" && this.value.length < 5) this.value = "";
    }
    input.addEventListener("input", mask, false);
    input.addEventListener("focus", mask, false);
    input.addEventListener("blur", mask, false);
    input.addEventListener("keydown", mask, false);
  });
});
var popupOpenButtons = document.querySelectorAll('[data-popup-open]');
popupOpenButtons.forEach(function (popupBtn) {
  popupBtn.addEventListener('click', function () {
    var popupName = popupBtn.dataset.popupOpen;
    var popupContainer = document.querySelector('.' + popupName);
    popupContainer.classList.add('active');
    disabledScroll();
  });
});
var popupCloseButtons = document.querySelectorAll('[data-popup-close]');
popupCloseButtons.forEach(function (closeBtn) {
  var popupContainer = closeBtn.closest('.popup');
  closeBtn.addEventListener('click', function () {
    popupContainer.classList.remove('active');
    activeScroll();
  });
});
"use strict";

var emptyVlidationFields = document.querySelectorAll('.empty-validation');
emptyVlidationFields.forEach(function (field) {
  var container = field.closest('.lc-container');
  var textAreaContainer = field.parentElement;
  var button = container.querySelector('.button-js');
  field.addEventListener('input', function () {
    if (!field.value.length) {
      textAreaContainer.classList.remove('valid');
      button === null || button === void 0 ? void 0 : button.setAttribute('disabled', true);
      return;
    }
    textAreaContainer.classList.add('valid');
    button === null || button === void 0 ? void 0 : button.removeAttribute('disabled');
  });
});
"use strict";
"use strict";

var tabs = document.querySelectorAll('[data-tab-open]');
var containers = document.querySelectorAll('[data-tab-container]');
tabs.forEach(function (tab) {
  var containerId = tab.dataset.tabOpen;
  tab.addEventListener('click', function (e) {
    e.preventDefault();
    tabs.forEach(function (tab) {
      return tab.classList.remove('active');
    });
    tab.classList.add('active');
    containers.forEach(function (tab) {
      return tab.classList.remove('active');
    });
    document.querySelector('[data-tab-container=' + containerId + ']').classList.add('active');
    document.querySelector('.pages-overlay').classList.add('active');
  });
});
var closeButtonPages = document.querySelectorAll('[data-tab-close]');
closeButtonPages.forEach(function (close) {
  close.addEventListener('click', function () {
    containers.forEach(function (tab) {
      return tab.classList.remove('active');
    });
    tabs.forEach(function (tab) {
      return tab.classList.remove('active');
    });
    document.querySelector('.pages-overlay').classList.remove('active');
  });
});
"use strict";

var uploadInput = document.querySelectorAll('.upload-input');
uploadInput.forEach(function (input) {
  var parent = input.closest('.upload__container');
  var preview = parent.querySelector('.upload__preview img');
  var fileName = parent.querySelector('.lc-file-file');
  var clearButton = parent.querySelector('.lc-file-clear');
  var inputContainer = parent.querySelector('.upload__file');
  var button = parent.querySelector('.button-js');
  var DEFAULT_TEXT = fileName.textContent;
  var DEFAULT_PREVIEW = preview.getAttribute('src');
  clearButton.addEventListener('click', function (e) {
    e.stopPropagation();
    e.preventDefault();
    input.value = '';
    var event = new Event("change");
    input.dispatchEvent(event);
  });
  input.addEventListener('change', function (e) {
    if (typeof e.target.files[0] == 'undefined') {
      inputContainer.classList.remove('success');
      inputContainer.classList.remove('active');
      fileName.textContent = DEFAULT_TEXT;
      preview.setAttribute('src', DEFAULT_PREVIEW);
      button === null || button === void 0 ? void 0 : button.setAttribute('disabled', true);
    } else {
      var reader = new FileReader();
      reader.onload = function (e) {
        preview.setAttribute('src', e.target.result);
      };
      reader.readAsDataURL(input.files[0]);
      inputContainer.classList.add('active');
      fileName.textContent = e.target.files[0].name;
      button === null || button === void 0 ? void 0 : button.removeAttribute('disabled');
    }
  });
});