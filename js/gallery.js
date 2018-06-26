'use strict';
(function () {
  window.gallery = {
    pictures: window.dataFile.renderArrayObject(25),
    bigPictureBlock: document.querySelector('.big-picture'),
    main: document.querySelector('main')
  };

  var pictureMainBlock = document.querySelector('.pictures');
  var pictureTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture__link');
  var fragment = document.createDocumentFragment();

  window.gallery.main.removeChild(window.gallery.bigPictureBlock);

  window.picture.placeBlockPicturesHTML(fragment, window.gallery.pictures, pictureMainBlock, pictureTemplate);

  pictureMainBlock.addEventListener('click', window.preview.pictureMainBlockHandler, true);
})();
