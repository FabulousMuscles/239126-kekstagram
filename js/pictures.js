'use strict';

var COMMENTS_ARRAY = ['Всё отлично!', 'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];
var DESCRIPTION_ARRAY = ['Тестим новую камеру!', 'Затусили с друзьями на море', 'Как же круто тут кормят', 'Отдыхаем...', 'Цените каждое мгновенье. Цените тех, кто рядом с вами и отгоняйте все сомненья. Не обижайте всех словами......', 'Вот это тачка!'];

var ESC_KEYCODE = 27;


var renderArrayObject = function (quantity) {
  var arrayObjects = [];
  for (var i = 0; i < quantity; i++) {
    arrayObjects[i] = {
      url: 'photos/' + (i + 1) + '.jpg',
      likes: Math.floor(Math.random() * 186 + 15),
      comments: [COMMENTS_ARRAY[Math.floor(Math.random() * COMMENTS_ARRAY.length)], COMMENTS_ARRAY[Math.floor(Math.random() * COMMENTS_ARRAY.length)]],
      description: DESCRIPTION_ARRAY[Math.floor(Math.random() * DESCRIPTION_ARRAY.length)]
    };
  }
  return arrayObjects;
};
var main = document.querySelector('main');
var pictureMainBlock = document.querySelector('.pictures');
var bigPictureBlock = document.querySelector('.big-picture');
var elementComment = bigPictureBlock.querySelectorAll('.social__comment');
var pictureTemplate = document.querySelector('#picture')
.content
.querySelector('.picture__link');

var uploadSelectImage = document.querySelector('#upload-select-image');
var uploadFileInput = uploadSelectImage.querySelector('#upload-file');
var currentInputValue = '';
var imgUpload = uploadSelectImage.querySelector('.img-upload__overlay');
var imgUploadPreview = uploadSelectImage.querySelector('.img-upload__preview');
var imgUploadPreviewFilterClass;
var inputTarget;
var renderedPicture;
var effectsList = document.querySelector('.effects__list');


var fragment = document.createDocumentFragment();

var pictures = renderArrayObject(25);

var renderPictures = function (arrayObjects) {
  var pictureElement = pictureTemplate.cloneNode(true);

  pictureElement.querySelector('.picture__img').src = arrayObjects.url;
  pictureElement.querySelector('.picture__stat--comments').textContent = arrayObjects.comments.length;
  pictureElement.querySelector('.picture__stat--likes').textContent = arrayObjects.likes;

  return pictureElement;
};

var placeBlockPicturesHTML = function (documentFragment, arrayObjects) {
  for (var i = 0; i < arrayObjects.length; i++) {
    documentFragment.appendChild(renderPictures(arrayObjects[i]));
  }
  return pictureMainBlock.appendChild(documentFragment);
};

var renderComments = function (arrayObjects) {
  var elementCommentFragment = elementComment;
  for (var i = 0; i < elementCommentFragment.length; i++) {
    elementCommentFragment[i].querySelector('img').src = 'img/avatar-' + Math.floor(Math.random() * 6 + 1) + '.svg';
    elementCommentFragment[i].querySelector('.social__text').textContent = arrayObjects.comments[i];
  }
  return elementCommentFragment;
};

var renderBigPicture = function (arrayObjects) {
  var bigPictureElement = bigPictureBlock.cloneNode(true);
  bigPictureElement.querySelector('.big-picture__img').querySelector('img').src = arrayObjects.url;
  bigPictureElement.querySelector('.likes-count').textContent = arrayObjects.likes;
  bigPictureElement.querySelector('.comments-count').textContent = arrayObjects.comments.length;
  bigPictureElement.querySelector('.social__caption').textContent = arrayObjects.description;
  bigPictureElement.querySelector('.social__comment-count').classList.add('visually-hidden');
  bigPictureElement.querySelector('.social__loadmore').classList.add('visually-hidden');
  renderComments(arrayObjects);

  return bigPictureElement;
};


var openPopup = function () {
  imgUpload.classList.remove('hidden');
  document.addEventListener('keydown', popupKeydownHandler);
};

var closePopup = function () {
  imgUpload.classList.add('hidden');
  document.removeEventListener('keydown', popupKeydownHandler);
};

var closeGallery = function () {
  renderedPicture.classList.add('hidden');
  document.removeEventListener('keydown', galleryKeydownHandler);
};

var popupKeydownHandler = function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    closePopup();
  }
};

var galleryKeydownHandler = function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    closeGallery();
  }
};

var inputChangeHandler = function (evt) {
  if (currentInputValue === uploadFileInput.value) {
    evt.preventDefault();
  } else {
    currentInputValue = uploadFileInput.value;
    openPopup();
  }
};


var toggleFiltres = function (evt) {
  var filterEffectButton = evt.target.nextElementSibling.firstElementChild;
  if (imgUploadPreview.classList.length === 1) {
    imgUploadPreview.classList.add(filterEffectButton.classList.item(1));
  } else if (imgUploadPreview.classList.item(1) !== filterEffectButton.classList.item(1)) {
    imgUploadPreview.classList.remove(imgUploadPreview.classList.item(1));
    imgUploadPreview.style = '';
    imgUploadPreview.classList.add(filterEffectButton.classList.item(1));
  }
  imgUploadPreviewFilterClass = imgUploadPreview;

  return imgUploadPreviewFilterClass;
};

var scalePinMouseupHandler = function (evt) {
  var scaleValue = evt.target.parentElement.previousElementSibling;
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

var inputFocusHandler = function (evt) {
  if (evt.target.tagName === 'INPUT') {
    inputTarget = evt.target;
  }

  return inputTarget;
};

var imgUploadClickHandler = function (evt) {
  var elementTarget = evt.target;
  if (elementTarget.id === 'upload-cancel') {
    closePopup();
  } else if (elementTarget.classList.contains('scale__pin')) {
    elementTarget.addEventListener('mouseup', scalePinMouseupHandler);
  } if (elementTarget.name === 'effect') {
    toggleFiltres(evt);
  }

  return elementTarget;
};

var renderedPictureClickHandler = function (evt) {
  if (evt.target.classList.contains('big-picture__cancel')) {
    closeGallery();
  }
};

var pictureMainBlockHandler = function (evt) {
  for (var i = 0; i < pictures.length; i++) {
    if (evt.target.src.includes(pictures[i].url)) {
      bigPictureBlock.classList.remove('hidden');
      renderBigPicture(pictures[i]);
      renderedPicture = main.appendChild(renderBigPicture(pictures[i]));
    }
  }
  document.addEventListener('keydown', galleryKeydownHandler);
  renderedPicture.addEventListener('click', renderedPictureClickHandler);

  return renderedPicture;
};

main.removeChild(bigPictureBlock);

uploadFileInput.addEventListener('change', inputChangeHandler);

imgUpload.addEventListener('click', imgUploadClickHandler);

effectsList.addEventListener('focus', inputFocusHandler, true);

pictureMainBlock.addEventListener('click', pictureMainBlockHandler, true);

placeBlockPicturesHTML(fragment, pictures);
