'use strict';
(function () {

  window.picture = {
    renderPictures: function (arrayObjects, templateExample) {
      var pictureElement = templateExample.cloneNode(true);

      pictureElement.querySelector('.picture__img').src = arrayObjects.url;
      pictureElement.querySelector('.picture__stat--comments').textContent = arrayObjects.comments.length;
      pictureElement.querySelector('.picture__stat--likes').textContent = arrayObjects.likes;

      return pictureElement;
    },
    placeBlockPicturesHTML: function (documentFragment, arrayObjects, pictureBlock, templateExample) {
      for (var i = 0; i < arrayObjects.length; i++) {
        documentFragment.appendChild(window.picture.renderPictures(arrayObjects[i], templateExample));
      }
      return pictureBlock.appendChild(documentFragment);
    }
  };
})();
