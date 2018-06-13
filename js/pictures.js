'use strict';

var COMMENTS_ARRAY = ['Всё отлично!', 'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];
var DESCRIPTION_ARRAY = ['Тестим новую камеру!', 'Затусили с друзьями на море', 'Как же круто тут кормят', 'Отдыхаем...', 'Цените каждое мгновенье. Цените тех, кто рядом с вами и отгоняйте все сомненья. Не обижайте всех словами......', 'Вот это тачка!'];

var renderArrayObject = function (quantity) {
  var arrayObjects = [];
  for (var i = 0; i < quantity; i++) {
    arrayObjects[i] = {
      url: 'photos/' + (i + 1) + '.jpg',
      likes: Math.floor(Math.random() * 186 + 15),
      comments: COMMENTS_ARRAY[Math.floor(Math.random() * COMMENTS_ARRAY.length)],
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

var renderBigPicture = function (bigPictureFeature) {
  var bigPictureElement = bigPictureBlock.cloneNode(true);
  bigPictureElement.querySelector('.big-picture__img').querySelector('img').src = bigPictureFeature.url;
  bigPictureElement.querySelector('.likes-count').textContent = bigPictureFeature.likes;
  bigPictureElement.querySelector('.comments-count').textContent = bigPictureFeature.comments.length;
  bigPictureElement.querySelector('.social__caption').textContent = bigPictureFeature.description;
  bigPictureElement.querySelector('.social__comment-count').classList.add('visually-hidden');
  bigPictureElement.querySelector('.social__loadmore').classList.add('visually-hidden');
  renderComments(pictures);
  return bigPictureElement;
};

var renderComments = function (arrayObjects) {
  var elementCommentFragment = elementComment;
  for (var i = 0; i < elementCommentFragment.length; i++) {
    elementCommentFragment[i].querySelector('img').src = 'img/avatar-' + Math.floor(Math.random() * 6 + 1) + '.svg';
    elementCommentFragment[i].querySelector('.social__text').textContent = arrayObjects[i].comments;
  }
  return elementCommentFragment;
};


placeBlockPicturesHTML(fragment, pictures, renderPictures);
bigPictureBlock.classList.remove('hidden');

renderBigPicture(pictures[0], pictures);

main.replaceChild(renderBigPicture(pictures[0]), bigPictureBlock);
