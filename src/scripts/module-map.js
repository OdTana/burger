ymaps.ready(init);

var placemarks = [ // созд массив с метками
    {
        latitude: 55.75,
        longitude: 37.57,
        hintContent: '<div class="map__hint">ул. Новый Арбат , д. 31</div>',
        balloonContent: [
            '<div class="map__balloon">',
            // '<img class="map__chocco-img" src="img/burger.png" alt="Шоко"/>',
            'Единственно полезные батончики у нас! Заходите по адресу: ул. Новый Арбат , д. 3',
            '</div>'
        ]
    },
    {
        latitude: 55.74,
        longitude: 37.58,
        hintContent: '<div class="map__hint">Смоленская пл., д. 3</div>',
        balloonContent: [
            '<div class="map__balloon">',
            // '<img class="map__chocco-img" src="img/burger.png" alt="Шоко"/>',
            'Единственно полезные батончики у нас! Заходите по адресу: Смоленская пл., д. 3',
            '</div>'
        ]
    },
    {
      latitude: 55.75,
      longitude: 37.63,
      hintContent: '<div class="map__hint">Лучников пер, д. 44</div>',
      balloonContent: [
          '<div class="map__balloon">',
          // '<img class="map__chocco-img" src="img/burger.png" alt="Шоко"/>',
          'Единственно полезные батончики у нас! Заходите по адресу: Лучников пер, д. 44',
          '</div>'
      ]
    },
    {
        latitude: 55.74,
        longitude: 37.59,
        hintContent: '<div class="map__hint">Филипповский пер., д. 8</div>',
        balloonContent: [
            '<div class="map__balloon">',
            // '<img class="map__chocco-img" src="img/burger.png" alt="Шоко"/>',
            'Единственно полезные батончики у нас! Заходите по адресу: Филипповский пер., д. 8',
            '</div>'
        ]
    }
],
    geoObjects= [];//созд переменную

function init() {
    var map = new ymaps.Map('map', {
        center: [55.75, 37.62],//центр карты 55.75399400, 37.62209300
        zoom: 13,//коэф масштабирования
        controls: ['zoomControl'],//оставили зум на карте
        behaviors: ['drag'] // никакого поведения по умолчанию не будет на карте, кроме перетаскиваня левой кнопкой мыши
    });


    // placemarks.forEach(function(obj){//разместили метки с помощью перебора методом forEach
    for (var i = 0; i < placemarks.length; i++) {
        geoObjects[i] = new ymaps.Placemark([placemarks[i].latitude, placemarks[i].longitude],{
            hintContent: placemarks[i].hintContent,
            balloonContent: placemarks[i].balloonContent.join('')
        },
        {
          iconLayout: 'default#image',//вид маркера-иконки
          iconImageHref: '../img/icon/map_sec/marker.png',//путь к иконке
          iconImageSize: [50, 60],//размер иконки: ширина и высот
          iconImageOffset: [-23, -57]//смещение метки чтобы ее ножка была прямо в адресе (а не ее левый верхний угол)
          // iconImageClipRect: [[415, 0], [461, 57]]//координаты иконки внутри метки
        });

    }; 

    var clusterer = new ymaps.Clusterer({//создание кластера чтобы метки не кучкаваись в видимой области карты
              // clusterIcons: [ //вместо иконки кластера иконка бургера
              //     {
              //         href: 'img/burger.png',
              //         size: [100, 100],
              //         offset: [-50, -50]
              //     }
              // ],
              // clusterIconContentLayout: null
          });

    map.geoObjects.add(clusterer);
    // map.geoObjects.add(placemark);
    clusterer.add(geoObjects);
    //    


//     for (var i = 0; i < placemarks.length; i++) {
//             geoObjects[i] = new ymaps.Placemark([placemarks[i].latitude, placemarks[i].longitude],
//             {
//                 hintContent: placemarks[i].hintContent,
//                 balloonContent: placemarks[i].balloonContent.join('')
//             },
// //             {
//                 iconLayout: 'default#image',//вид маркера-иконки
//                 iconImageHref: '../../img/icon/map_sec/marker.png',//путь к иконке
//                 iconImageSize: [50, 60],//размер иконки: ширина и высот
//                 iconImageOffset: [-23, -57],//смещение иконки чтобы ее ножка была прямо в адресе (а не ее левый верхний угол)
//                 iconImageClipRect: [[415, 0], [461, 57]]
// //             });
//     }

//     var clusterer = new ymaps.Clusterer({
//         clusterIcons: [
//             {
//                 href: 'img/burger.png',
//                 size: [100, 100],
//                 offset: [-50, -50]
//             }
//         ],
//         clusterIconContentLayout: null
//     });

//     map.geoObjects.add(clusterer);
//     clusterer.add(geoObjects);
}





