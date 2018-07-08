'use strict';
(function () {
  var MAX_VISIBLE_COMMENTS_NUMBER = 5;
  var index;
  var placedRenderedPicture;
  var bigPictureElement;
  var renderBigPicture = function (arrayObjects) {
    bigPictureElement = window.gallery.bigPictureBlock.cloneNode(true);
    bigPictureElement.querySelector('.big-picture__img').querySelector('img').src = arrayObjects.url;
    bigPictureElement.querySelector('.likes-count').textContent = arrayObjects.likes;
    bigPictureElement.querySelector('.comments-count').textContent = arrayObjects.comments.length;
    bigPictureElement.querySelector('.social__comment-count').classList.add('visually-hidden');
    bigPictureElement.querySelector('.social__loadmore').classList.add('visually-hidden');
    renderComments(arrayObjects);
    return bigPictureElement;
  };

  var renderComments = function (arrayObjects) {
    var elementCommentsContainer = bigPictureElement.querySelector('.social__comments');
    var elementComment = bigPictureElement.querySelectorAll('.social__comment');
    for (var i = 0; i < elementComment.length; i++) {
      elementCommentsContainer.removeChild(elementComment[i]);
    }
    for (var j = 0; j < arrayObjects.comments.length; j++) {
      var elementCommentFragment = elementComment[0].cloneNode(true);
      elementCommentFragment.querySelector('img').src = 'img/avatar-' + Math.floor(Math.random() * 6 + 1) + '.svg';
      elementCommentFragment.querySelector('.social__text').textContent = arrayObjects.comments[j];
      elementCommentsContainer.appendChild(elementCommentFragment);
      if (j > MAX_VISIBLE_COMMENTS_NUMBER) {
        return;
      }
    }
  };

  var closeGallery = function () {
    document.body.removeAttribute('class');
    window.gallery.main.removeChild(bigPictureElement);
    document.removeEventListener('keydown', galleryKeydownHandler);
  };

  var galleryKeydownHandler = function (evt) {
    if (evt.keyCode === window.dataFile.ESC_KEYCODE) {
      closeGallery();
    }
  };

  var placedRenderedPictureClickHandler = function (evt) {
    var target = evt.target;
    if (target.classList.contains('big-picture__cancel') || target.classList.contains('overlay')) {
      closeGallery();
    }
  };

  var renderDataPictures = function (arrayObjects) {
    window.gallery.bigPictureBlock.classList.remove('hidden');
    var renderedPicture = renderBigPicture(arrayObjects[index]);
    placedRenderedPicture = window.gallery.main.appendChild(renderedPicture);
    document.addEventListener('keydown', galleryKeydownHandler);
    placedRenderedPicture.addEventListener('click', placedRenderedPictureClickHandler);

    return placedRenderedPicture;
  };

  window.preview = {
    pictureMainBlockHandler: function (evt) {
      var target = evt.target;
      var elementTargetImg;
      if (target.classList.contains('picture__img') || target.classList.contains('picture__link')) {
        evt.preventDefault();
        document.body.classList.add('modal-open');
        if (target.classList.contains('picture__img')) {
          elementTargetImg = target.src;
        } else if (target.classList.contains('picture__link')) {
          elementTargetImg = target.firstElementChild.src;
        }
        for (var i = 0; i < window.dataFile.downloadedObjects.length; i++) {
          if (elementTargetImg.includes(window.dataFile.downloadedObjects[i].url)) {
            index = i;
            window.backend.load(renderDataPictures, window.preview.errorBlock);
          }
        }
      }
    },
    errorBlockUploadFile: function () {
      var imgUploadWrapper = document.querySelector('.img-upload__wrapper');
      var errorElement = document.querySelector('#picture')
    .content
      .querySelector('.img-upload__message--error');
      var fragment = document.createDocumentFragment();
      window.scaleFilter.imgUpload.classList.add('hidden');
      errorElement.classList.remove('hidden');
      fragment.appendChild(errorElement);
      window.gallery.main.appendChild(fragment);
    },
    errorBlockLoadFile: function (errorMessage) {
      var errorElement = document.createElement('div');
      errorElement.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
      errorElement.style.position = 'absolute';
      errorElement.style.left = 0;
      errorElement.style.right = 0;
      errorElement.style.fontSize = '30px';

      errorElement.textContent = errorMessage;
      document.body.insertAdjacentElement('afterbegin', errorElement);
    },
    pictureMainBlockKeydownHandler: function (evt) {
      if (evt.keyCode === window.dataFile.ENTER_KEYCODE) {
        window.preview.pictureMainBlockHandler(evt);
      }
    }
  };
})();
