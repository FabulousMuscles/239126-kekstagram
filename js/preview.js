'use strict';
(function () {
  var index;
  var placedRenderedPicture;
  var bigPictureElement;
  var renderBigPicture = function (arrayObjects) {
    bigPictureElement = window.gallery.bigPictureBlock.cloneNode(true);
    bigPictureElement.querySelector('.big-picture__img').querySelector('img').src = arrayObjects.url;
    bigPictureElement.querySelector('.likes-count').textContent = arrayObjects.likes;
    bigPictureElement.querySelector('.comments-count').textContent = arrayObjects.comments.length;
    bigPictureElement.querySelector('.social__caption').textContent = window.gallery.pictures[Math.floor(Math.random() * 6)].description;
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
    }
    return elementCommentFragment;
};

  var closeGallery = function () {
    placedRenderedPicture.classList.add('hidden');
    document.removeEventListener('keydown', galleryKeydownHandler);
  };

  var galleryKeydownHandler = function (evt) {
    if (evt.keyCode === window.dataFile.ESC_KEYCODE) {
      closeGallery();
    }
  };

  var placedRenderedPictureClickHandler = function (evt) {
    if (evt.target.classList.contains('big-picture__cancel')) {
      closeGallery();
    }
  };

  var renderDataPictures = function(arrayObjects) {
        window.gallery.bigPictureBlock.classList.remove('hidden');
        console.log(arrayObjects);
        var renderedPicture = renderBigPicture(arrayObjects[index]);
        placedRenderedPicture = window.gallery.main.appendChild(renderedPicture);
        document.addEventListener('keydown', galleryKeydownHandler);
        placedRenderedPicture.addEventListener('click', placedRenderedPictureClickHandler);

        return placedRenderedPicture;
  };

  var errorBlock = function (errorMessage) {
    var errorElement = document.createElement('div');
    errorElement.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
    errorElement.style.position = 'absolute';
    errorElement.style.left = 0;
    errorElement.style.right = 0;
    errorElement.style.fontSize = '30px';

    errorElement.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', errorElement);
  };

  window.preview = {
    pictureMainBlockHandler: function (evt) {
      var picturesHTML = document.querySelectorAll('.picture__img');
      if (evt.target.classList.contains('picture__img')) {
        var elementTargetImg = evt.target.src;
        for (var i = 0; i < picturesHTML.length; i++) {
          if (elementTargetImg.includes(picturesHTML[i].src)) {
            index = i;
            window.backend.load(renderDataPictures, window.preview.errorBlock);
          }
        }
      }
    },
    errorBlock: function (errorMessage) {
    var errorElement = document.createElement('div');
    errorElement.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
    errorElement.style.position = 'absolute';
    errorElement.style.left = 0;
    errorElement.style.right = 0;
    errorElement.style.fontSize = '30px';

    errorElement.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', errorElement);
  }
  };
})();
