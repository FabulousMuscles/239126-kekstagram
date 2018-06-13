'use strict';

var COMMENTS_ARRAY = ['Всё отлично!', 'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];
var DESCRIPTION_ARRAY = ['Тестим новую камеру!', 'Затусили с друзьями на море', 'Как же круто тут кормят', 'Отдыхаем...', 'Цените каждое мгновенье. Цените тех, кто рядом с вами и отгоняйте все сомненья. Не обижайте всех словами......', 'Вот это тачка!'];

var pictures = [];

var pictureMainBlock = document.querySelector('.pictures');
var bigPictureBlock = document.querySelector('.big-picture');
var elementComment = bigPictureBlock.querySelectorAll('.social__comment');
var pictureTemplate = document.querySelector('#picture')
.content
.querySelector('.picture__link');

var fragment = document.createDocumentFragment();


var renderArrayObject = function (arrayObjects, quantity) {
  for (var i = 0; i < quantity; i++) {
    arrayObjects[i] = {
      url:'photos/' + (i + 1) + '.jpg',
      likes: Math.floor(Math.random() * 186 + 15),
      comments: COMMENTS_ARRAY[Math.floor(Math.random() * COMMENTS_ARRAY.length)],
      description: DESCRIPTION_ARRAY[Math.floor(Math.random() * DESCRIPTION_ARRAY.length)]
    };
  }
  return arrayObjects;
};

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

var renderBigPicture = function (bigPicture, bigPictureFeature) {
  bigPicture.querySelector('.big-picture__img').querySelector('img').src = bigPictureFeature.url;
  bigPicture.querySelector('.likes-count').textContent = bigPictureFeature.likes;
  bigPicture.querySelector('.comments-count').textContent = bigPictureFeature.comments.length;
  bigPicture.querySelector('.social__caption').textContent = bigPictureFeature.description;
};

var renderComments = function (elementComment, arrayObjects) {
  for (var i = 0; i < elementComment.length; i++) {
    elementComment[i].querySelector('img').src = 'img/avatar-' + Math.floor(Math.random() * 6 + 1) + '.svg';
    elementComment[i].querySelector('.social__text').textContent = arrayObjects[i].comments;
  }
};

renderArrayObject(pictures, 25);

placeBlockPicturesHTML(fragment, pictures);

bigPictureBlock.classList.remove('hidden');

renderBigPicture(bigPictureBlock, pictures[0]);

renderComments(elementComment, pictures);

bigPictureBlock.querySelector('.social__comment-count').classList.add('visually-hidden');
bigPictureBlock.querySelector('.social__loadmore').classList.add('visually-hidden');
