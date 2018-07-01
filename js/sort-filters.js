'use strict';
(function() {
  var imgFiltersForm = document.querySelector('.img-filters__form');

  var shuffleArray = function (array) {
  var j;
  var temp;
  for (var i = array.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1));
    temp = array[j];
    array[j] = array[i];
    array[i] = temp;
  }
  return array;

  };

  var sortByTopDiscussed = function (sortedArray) {
    var sortedByTopObjects = sortedArray.slice()
    .sort(function (a, b) {
      return b.comments.length - a.comments.length;
    });
    window.picture.placeBlockPicturesHTML(sortedByTopObjects);
  };

  var sortByNew = function (sortedArray) {
    var sortedByNewObjects = sortedArray.slice();
    sortedByNewObjects = shuffleArray(sortedByNewObjects).slice(15);
    window.picture.placeBlockPicturesHTML(sortedByNewObjects);
  };

  var imgFiltersFormClickHandler = function (evt) {
    var target = evt.target;
    var activeButton = document.querySelector('.img-filters__button--active');
      if (target.classList.length === 1) {
        activeButton.classList.remove('img-filters__button--active');
        target.classList.add('img-filters__button--active');
        activeButton = target;
      } switch (target.id) {
        case 'filter-popular':
        window.picture.removeBlockPicturesHTML();
        window.picture.placeBlockPicturesHTML(window.dataFile.downloadedObjects);
        break;
        case 'filter-new':
        window.picture.removeBlockPicturesHTML();
        sortByNew(window.dataFile.downloadedObjects);
        break;
        case 'filter-discussed':
        window.picture.removeBlockPicturesHTML();
        sortByTopDiscussed(window.dataFile.downloadedObjects);
        break;
        default:
        throw new Error('Неизвестный фильтр');
      }
  };

  imgFiltersForm.addEventListener('click', imgFiltersFormClickHandler);
})();
