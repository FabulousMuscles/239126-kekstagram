'use strict';
(function() {
  var URL = 'https://js.dump.academy/kekstagram';
  window.backend = {
    upload: function (data, onSuccess) {
     var xhr = new XMLHttpRequest();
     xhr.responseType = 'json';

     xhr.addEventListener('load', function () {
       onSuccess(xhr.response);
     });

    xhr.open('POST', URL);
    xhr.send(data);
    console.log(xhr.send(data));
    }

  };
})();
