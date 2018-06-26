'use strict';
(function () {
  var renderedPicture;
  var elementComment = document.querySelectorAll('.social__comment');
  var renderBigPicture = function (arrayObjects) {
    var bigPictureElement = window.gallery.bigPictureBlock.cloneNode(true);
    bigPictureElement.querySelector('.big-picture__img').querySelector('img').src = arrayObjects.url;
    bigPictureElement.querySelector('.likes-count').textContent = arrayObjects.likes;
    bigPictureElement.querySelector('.comments-count').textContent = arrayObjects.comments.length;
    bigPictureElement.querySelector('.social__caption').textContent = arrayObjects.description;
    bigPictureElement.querySelector('.social__comment-count').classList.add('visually-hidden');
    bigPictureElement.querySelector('.social__loadmore').classList.add('visually-hidden');
    renderComments(arrayObjects);

    return bigPictureElement;
  };

  var renderComments = function (arrayObjects) {
    var elementCommentFragment = elementComment;
    for (var i = 0; i < elementCommentFragment.length; i++) {
      elementCommentFragment[i].querySelector('img').src = 'img/avatar-' + Math.floor(Math.random() * 6 + 1) + '.svg';
      elementCommentFragment[i].querySelector('.social__text').textContent = arrayObjects.comments[i];
    }
    return elementCommentFragment;
  };

  var closeGallery = function () {
    renderedPicture.classList.add('hidden');
    document.removeEventListener('keydown', galleryKeydownHandler);
  };

  var galleryKeydownHandler = function (evt) {
    if (evt.keyCode === window.dataFile.ESC_KEYCODE) {
      closeGallery();
    }
  };

  var renderedPictureClickHandler = function (evt) {
    if (evt.target.classList.contains('big-picture__cancel')) {
      closeGallery();
    }
  };

  window.preview = {
    pictureMainBlockHandler: function (evt) {
      if (evt.target.classList.contains('picture__img')) {
        var elementTargetImg = evt.target.src;
        for (var i = 0; i < window.gallery.pictures.length; i++) {
          if (elementTargetImg.includes(window.gallery.pictures[i].url)) {
            window.gallery.bigPictureBlock.classList.remove('hidden');
            renderBigPicture(window.gallery.pictures[i]);
            renderedPicture = window.gallery.main.appendChild(renderBigPicture(window.gallery.pictures[i]));
          }
        }
        document.addEventListener('keydown', galleryKeydownHandler);
        renderedPicture.addEventListener('click', renderedPictureClickHandler);
      }

      return renderedPicture;
    }
  };
})();
