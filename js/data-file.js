'use strict';
(function () {
  var COMMENTS_ARRAY = ['Всё отлично!', 'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];
  var DESCRIPTION_ARRAY = ['Тестим новую камеру!', 'Затусили с друзьями на море', 'Как же круто тут кормят', 'Отдыхаем...', 'Цените каждое мгновенье. Цените тех, кто рядом с вами и отгоняйте все сомненья. Не обижайте всех словами......', 'Вот это тачка!'];

  window.dataFile = {
    renderArrayObject: function (quantity) {
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
    },
    ESC_KEYCODE: 27,
    MAX_SCALE_WIDTH: 453
  };
})();
