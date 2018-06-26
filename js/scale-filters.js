'use strict';
(function () {
  var currentInputValue = '';
  var inputTarget;
  var effectsList = document.querySelector('.effects__list');
  var scaleLine = document.querySelector('.scale__line');
  var scaleValue = document.querySelector('.scale__value');
  var scalePin = scaleLine.querySelector('.scale__pin');
  var scaleLevel = scaleLine.querySelector('.scale__level');
  var uploadSelectImage = document.querySelector('#upload-select-image');
  var uploadFileInput = uploadSelectImage.querySelector('#upload-file');
  var imgUpload = uploadSelectImage.querySelector('.img-upload__overlay');
  var imgUploadPreview = uploadSelectImage.querySelector('.img-upload__preview');
  var imgUploadPreviewFilterClass;
  window.scaleFilter = {
    popupKeydownHandler: function (evt) {
      if (evt.keyCode === window.dataFile.ESC_KEYCODE) {
        closePopup();
      }
    }
  };
  var openPopup = function () {
    imgUpload.classList.remove('hidden');
    document.addEventListener('keydown', window.scaleFilter.popupKeydownHandler);
  };

  var closePopup = function () {
    imgUpload.classList.add('hidden');
    document.removeEventListener('keydown', window.scaleFilter.popupKeydownHandler);
  };

  var inputChangeHandler = function (evt) {
    if (currentInputValue === uploadFileInput.value) {
      evt.preventDefault();
    } else {
      currentInputValue = uploadFileInput.value;
      openPopup();
    }
  };

  var inputFocusHandler = function (evt) {
    if (evt.target.tagName === 'INPUT') {
      inputTarget = evt.target;
    }

    return inputTarget;
  };

  var toggleFiltres = function (evt) {
    var filterEffectButton = evt.target.nextElementSibling.firstElementChild;
    if (imgUploadPreview) {
      scaleLevel.style.width = window.dataFile.MAX_SCALE_WIDTH + 'px';
      scalePin.style.left = scaleLevel.style.width;

      if (imgUploadPreview.classList.length === 1) {
        imgUploadPreview.classList.add(filterEffectButton.classList.item(1));
      } else if (imgUploadPreview.classList.item(1) !== filterEffectButton.classList.item(1)) {
        imgUploadPreview.classList.remove(imgUploadPreview.classList.item(1));
        imgUploadPreview.style = '';
        imgUploadPreview.classList.add(filterEffectButton.classList.item(1));
      }
    }
    imgUploadPreviewFilterClass = imgUploadPreview;

    return imgUploadPreviewFilterClass;
  };

  var scaleValueFilters = function () {
    if (imgUploadPreviewFilterClass) {
      if (inputTarget.value === 'chrome') {
        imgUploadPreviewFilterClass.style = 'filter: grayscale(' + 1 * (scaleValue.value / 100) + ')';
      } else if (inputTarget.value === 'sepia') {
        imgUploadPreviewFilterClass.style = 'filter: sepia(' + 1 * (scaleValue.value / 100) + ')';
      } else if (inputTarget.value === 'marvin') {
        imgUploadPreviewFilterClass.style = 'filter: invert(' + 100 * (scaleValue.value / 100) + '%)';
      } else if (inputTarget.value === 'phobos') {
        imgUploadPreviewFilterClass.style = 'filter: blur(' + 5 * (scaleValue.value / 100) + 'px)';
      } else if (inputTarget.value === 'heat') {
        imgUploadPreviewFilterClass.style = 'filter: brightness(' + 3 * (scaleValue.value / 100) + ')';
      }
    }

    return imgUploadPreviewFilterClass.style;
  };

  var imgUploadClickHandler = function (evt) {
    var elementTarget = evt.target;
    if (elementTarget.id === 'upload-cancel') {
      closePopup();
    } else if (elementTarget.name === 'effect') {
      toggleFiltres(evt);
    }

    return elementTarget;
  };

  var scaleLineMousedownHandler = function () {
    var startCoords = 494;

    var scaleLineMousemoveHandler = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = startCoords - moveEvt.clientX;
      scaleLevel.style.width = (scaleLine.offsetLeft - shift) + 'px';
      if (shift < -430) {
        scaleLevel.style.width = window.dataFile.MAX_SCALE_WIDTH + 'px';
      }
      scalePin.style.left = scaleLevel.style.width;
      scaleValue.value = Math.round((scaleLine.offsetLeft - shift) / (window.dataFile.MAX_SCALE_WIDTH / 100));
      scaleValueFilters();
    };

    var scalePinMouseUpHandler = function (upEvt) {
      upEvt.preventDefault();

      scaleLine.removeEventListener('mousemove', scaleLineMousemoveHandler);
      scaleLine.parentElement.removeEventListener('mouseup', scalePinMouseUpHandler);
    };
    scaleLine.addEventListener('mousemove', scaleLineMousemoveHandler);
    scaleLine.parentElement.addEventListener('mouseup', scalePinMouseUpHandler);
  };

  uploadFileInput.addEventListener('change', inputChangeHandler);
  imgUpload.addEventListener('click', imgUploadClickHandler);
  effectsList.addEventListener('focus', inputFocusHandler, true);
scaleLine.addEventListener('mousedown', scaleLineMousedownHandler);

})();
