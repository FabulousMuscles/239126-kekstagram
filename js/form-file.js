'use strict';
(function () {
  var form = document.querySelector('.img-upload__form');
  var inputValue = document.querySelector('.img-upload__text');
  var textAreaValue = document.querySelector('.text__description');

  var textAreaValueFocusHandler = function () {
    document.removeEventListener('keydown', window.scaleFilter.popupKeydownHandler);
  };

  var textAreaValueBlurHandler = function () {
    document.addEventListener('keydown', window.scaleFilter.popupKeydownHandler);
  };

  var isIdentically = function (element, array) {
    var isTrue = false;
    for (var i = 0; i < array.length; i++) {
      if (element.toLowerCase() !== array[i].toLowerCase()) {
        isTrue = true;
      }
    } return isTrue;
  };

  var isMoreThanOneHashtagSymbol = function (element) {
    var isTrue = false;
    var hashtagArrayFirstElement = element;
    for (var i = 1; i < hashtagArrayFirstElement.length; i++) {
      if (hashtagArrayFirstElement[i] !== '#') {
        isTrue = true;
      }
    } return isTrue;
  };

  var textInputValueInputHandler = function (evt) {
    if (evt.target.classList.contains('text__hashtags')) {
      var hashtagArray = evt.target.value.split(' ');
      for (var i = 0; i < hashtagArray.length; i++) {
        if (hashtagArray.length > 5) {
          evt.target.setCustomValidity('Нельзя указать больше пяти хэш-тегов');
        } else if (evt.target.value === '') {
          evt.target.setCustomValidity('');
        } else if (hashtagArray[i].indexOf(',') !== -1) {
          evt.target.setCustomValidity('хэш-теги разделяются пробелами');
        } else if (hashtagArray[i].indexOf('#') !== 0) {
          evt.target.setCustomValidity('хэш-тег начинается с символа # (решётка)');
        } else if (hashtagArray[i].length === 1 && hashtagArray[i].indexOf('#') === 0 || !isMoreThanOneHashtagSymbol(hashtagArray[i])) {
          evt.target.setCustomValidity('хеш-тег не может содержать только решётку');
        } else if (hashtagArray[i].length > 20) {
          evt.target.setCustomValidity('максимальная длина одного хэш-тега 20 символов, включая решётку');
        } else if (!isIdentically(hashtagArray[i], hashtagArray) && hashtagArray.length !== 1) {
          evt.target.setCustomValidity('один и тот же хэш-тег не может быть использован дважды');
        } else {
          evt.target.setCustomValidity('');
        }
      }
    }
    return hashtagArray;
  };

  inputValue.addEventListener('input', textInputValueInputHandler);

  textAreaValue.addEventListener('focus', textAreaValueFocusHandler);

  textAreaValue.addEventListener('blur', textAreaValueBlurHandler);

  form.addEventListener('submit', function (evt) {
    window.backend.upload(new FormData(form), function (response) {
      window.scaleFilter.imgUpload.classList.add('hidden');
    });
    console.log(FormData());
    evt.preventDefault();
  });

})();
