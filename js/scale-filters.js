'use strict';
(function () {
  var SCALE_PERCENTAGE = 100;
  var resizeControlValue = document.querySelector('.resize__control--value');
  resizeControlValue.value = SCALE_PERCENTAGE + '%';
  var currentInputValue = '';
  var inputTarget;
  var effectsList = document.querySelector('.effects__list');
  var scaleWrapper = document.querySelector('.img-upload__scale');
  var scaleLine = document.querySelector('.scale__line');
  var scaleValue = document.querySelector('.scale__value');
  var scalePin = scaleLine.querySelector('.scale__pin');
  var scaleLevel = scaleLine.querySelector('.scale__level');
  var uploadSelectImage = document.querySelector('#upload-select-image');
  var uploadFileInput = uploadSelectImage.querySelector('#upload-file');
  var imgUploadPreview = uploadSelectImage.querySelector('.img-upload__preview');
  var imgUploadPreviewFilterClass;
  window.scaleFilter = {
    popupKeydownHandler: function (evt) {
      if (evt.keyCode === window.dataFile.ESC_KEYCODE) {
        closePopup();
      }
    },
    imgUpload: uploadSelectImage.querySelector('.img-upload__overlay')
  };
  var openPopup = function () {
    window.scaleFilter.imgUpload.classList.remove('hidden');
    scaleWrapper.classList.add('hidden');
    document.addEventListener('keydown', window.scaleFilter.popupKeydownHandler);
  };

  var closePopup = function () {
    window.scaleFilter.imgUpload.classList.add('hidden');
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
    var target = evt.target;
    if (target.tagName === 'INPUT') {
      inputTarget = target;
    }
    return inputTarget;
  };

  var toggleFiltres = function (evt) {
    var target = evt.target;
    var filterEffectButton;
    if (target.tagName === 'INPUT') {
      filterEffectButton = target.nextElementSibling.firstElementChild;
    } else if (target.tagName === 'LABEL') {
      filterEffectButton = target.firstElementChild;
    }

    scaleLevel.style.width = window.dataFile.MAX_SCALE_WIDTH + '%';
    scalePin.style.left = scaleLevel.style.width;
    imgUploadPreview.classList.add(filterEffectButton.classList.item(1));

    if (imgUploadPreview.classList.item(1) !== filterEffectButton.classList.item(1)) {
      imgUploadPreview.classList.remove(imgUploadPreview.classList.item(1));
      imgUploadPreview.style = '';
      imgUploadPreview.classList.add(filterEffectButton.classList.item(1));
    }

    if (imgUploadPreview.classList.contains('effects__preview--none')) {
      scaleWrapper.classList.add('hidden');
    } else if (!imgUploadPreview.classList.contains('effects__preview--none') || scaleWrapper.classList.contains('hidden')) {
      scaleWrapper.classList.remove('hidden');
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
    } else if (elementTarget.classList.contains('img-upload__overlay')) {
      closePopup();
    } else if (elementTarget.name === 'effect') {
      toggleFiltres(evt);
    } else if (elementTarget.classList.contains('resize__control')) {
      resizeImage(evt);
    }

    return elementTarget;
  };

  var resizeImage = function (evt) {
    var target = evt.target;
    var imgResize = imgUploadPreview.querySelector('img');
    if (target.classList.contains('resize__control--minus')) {
      resizeControlValue.value = resizeControlValue.value.replace('%', '');
      resizeControlValue.value = Number(resizeControlValue.value) - (SCALE_PERCENTAGE / 4) + '%';
      if (Number(resizeControlValue.value.replace('%', '')) < 0) {
        resizeControlValue.value = 0 + '%';
      }
    } else if (target.classList.contains('resize__control--plus')) {
      resizeControlValue.value = resizeControlValue.value.replace('%', '');
      resizeControlValue.value = Number(resizeControlValue.value) + (SCALE_PERCENTAGE / 4) + '%';
      if (Number(resizeControlValue.value.replace('%', '')) > SCALE_PERCENTAGE) {
        resizeControlValue.value = SCALE_PERCENTAGE + '%';
      }
    } imgResize.style = 'transform: scale(' + (Number(resizeControlValue.value.replace('%', '')) / SCALE_PERCENTAGE) + ')';

    return resizeControlValue;
  };

  var scaleLineMousedownHandler = function (evt) {
    var startCoordsX = evt.clientX;

    var scaleLineMousemoveHandler = function (moveEvt) {
      moveEvt.preventDefault();

      var moveLimit = scaleLine.offsetWidth;
      var shiftX = startCoordsX - moveEvt.clientX;

      startCoordsX = moveEvt.clientX;

      var newOffsetLeft = (scalePin.offsetLeft - shiftX) / moveLimit * 100;

      if (newOffsetLeft < 0) {
        newOffsetLeft = 0;
      } else if (newOffsetLeft > 100) {
        newOffsetLeft = 100;
      }
      scaleLevel.style.width = newOffsetLeft + '%';
      scalePin.style.left = scaleLevel.style.width;
      scaleValue.value = Math.round(newOffsetLeft);
      scaleValueFilters();
    };

    var scalePinMouseUpHandler = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', scaleLineMousemoveHandler);
      document.removeEventListener('mouseup', scalePinMouseUpHandler);
    };
    document.addEventListener('mousemove', scaleLineMousemoveHandler);
    document.addEventListener('mouseup', scalePinMouseUpHandler);
  };

  var imgUploadKeydownHandler = function (evt) {
    if (evt.keyCode === window.dataFile.ENTER_KEYCODE) {
      toggleFiltres(evt);
    }
  };


  uploadFileInput.addEventListener('change', inputChangeHandler);
  window.scaleFilter.imgUpload.addEventListener('click', imgUploadClickHandler);
  window.scaleFilter.imgUpload.addEventListener('keydown', imgUploadKeydownHandler);
  effectsList.addEventListener('focus', inputFocusHandler, true);
  scaleLine.addEventListener('mousedown', scaleLineMousedownHandler);

})();
