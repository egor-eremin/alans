$(document).ready(function () {
    if ($('div').is('#map-init')) {
        // Как только будет загружен API и готов DOM, выполняем инициализацию
        ymaps.ready(init);

        function init() {

    $('.all-project__name, .mobile-project__item-in-map').on('click', function (e) {
            event.preventDefault();
            var coordinateValue = $(this).data('coordinate');
            var placemarkName = $(this).data('placemark');

            console.log(placemarkName);

            myMap.panTo(coordinateValue, {
                flying: 1,
                duration: 1000,
            }).then(function () {
                myMap.setZoom(10, {duration: 300});
                placemarkName.balloon.open();
            });
        });
    var myMap = new ymaps.Map('map-init', {

        center: [52.29778, 104.29639],
        zoom: 4,
        controls: [],

    });

            var html = '<div class="projects__item-in">';
            html += '<span>Газпром</span>';
            html += '<span>Инженерный проект 1</span>';
            html += '<span>Иркутск</span>';
            html += '<button type="button" data-project="project-1" class="projects__item-in-link">Подробнее</button>';
            html += '</div>';

            $('#map-init').on('click', function (e) {
                var target = e.target
                if (target.classList.contains('projects__item-in-link')) {
                    $('.popup').css('display', 'block');
                    $('.projects__item-in').css('display', 'none');
                }
            })

            var myPlacemark1 = new ymaps.Placemark([52.29778, 104.29639],
                {balloonContent: html},
                {
                    iconLayout: ymaps.templateLayoutFactory.createClass(
                        '<div class="map-marker"><div class="map-marker-wrapper"><img src="../img/gazprom-marker.png" class="marker-img"></div></div>'),
                    iconShape: {
                                    type: 'Rectangle',
                                    coordinates: [
                                        [-32, -88], [32, 0]
                                    ]
                                },
                    // iconImageHref: 'img/pin-3.png',
                    iconImageSize: [64, 88],
                    iconImageOffset: [-32, -88],

                    balloonOffset:[-92, -227],
                    balloonContentSize: [184, 130],
                    balloonLayout: "default#imageWithContent",
                    balloonImageSize: [0, 0], balloonShadow: false,
                    hideIconOnBalloonOpen: false
                }
            );
            myMap.geoObjects.add(myPlacemark1);



//     var myPlacemark2 = new ymaps.Placemark([52.49778, 104.49639],
//         {
//             balloonContent: html,
//
//         },
//         {
//             iconLayout: 'default#image',
//             iconImageHref: 'img/pin-4.png',
//             iconImageSize: [64, 88],
//             iconImageOffset: [-32, -88],
//
//             balloonContentSize: [184, 130],
//             balloonLayout: "default#imageWithContent",
//
//             balloonImageSize: [0, 0],
//             balloonImageSize: [0, 0], balloonShadow: false,
//             hideIconOnBalloonOpen: false
//         }
//     );
//
//      myMap.geoObjects.add(myPlacemark2);
//
//             myPlacemark2.balloon.open();
//
//     var myPlacemark3 = new ymaps.Placemark([52.39778, 104.39639],
//         {
//             balloonContent: html,
//
//         },
//         {
//             iconLayout: 'default#image',
//             iconImageHref: 'img/pin-5.png',
//             iconImageSize: [64, 88],
//             iconImageOffset: [-32, -88],
//
//             balloonContentSize: [184, 130], balloonLayout: "default#imageWithContent",
//
//             balloonImageSize: [0, 0], balloonShadow: false,
//             hideIconOnBalloonOpen: false
//         }
//     );
//
//     myMap.geoObjects.add(myPlacemark3);
//
//     var myPlacemark4 = new ymaps.Placemark([52.19778, 104.19639],
//         {
//             balloonContent: html,
//
//         },
//         {
//             iconLayout: 'default#image',
//             iconImageHref: 'img/pin-2.png',
//             iconImageSize: [64, 88],
//             iconImageOffset: [-32, -88],
//
//             balloonContentSize: [184, 130], balloonLayout: "default#imageWithContent",
//
//             balloonImageSize: [0, 0], balloonShadow: false,
//             hideIconOnBalloonOpen: false
//         }
//     );
//
//     myMap.geoObjects.add(myPlacemark4);
//
//     var myPlacemark5 = new ymaps.Placemark([53.59778, 104.59639],
//         {
//             balloonContent: html,
//             /*'<div class="projects__item-in"><span>Газпром<\/span><span>Инженерный проект 1<\/span><span>Иркутск<\/span><button type="button" class="projects__item-in-link">Подробнее<\/button><\/div>',*/
//
//         },
//         {
//             iconLayout: 'default#image',
//             iconImageHref: 'img/pin-4.png',
//             iconImageSize: [64, 88],
//             iconImageOffset: [-32, -88],
//
//             balloonContentSize: [184, 130], balloonLayout: "default#imageWithContent",
//
//             balloonImageSize: [0, 0], balloonShadow: false,
//             hideIconOnBalloonOpen: false
//         }
//     );
//
//     myMap.geoObjects.add(myPlacemark5);
//
//     var myPlacemark6 = new ymaps.Placemark([55.29778, 110.29639],
//         {
//             balloonContent: html,
//
//         },
//         {
//             iconLayout: 'default#image',
//             iconImageHref: 'img/pin-3.png',
//             iconImageSize: [64, 88],
//             iconImageOffset: [-32, -88],
//
//             balloonContentSize: [184, 130], balloonLayout: "default#imageWithContent",
//
//             balloonImageSize: [0, 0], balloonShadow: false,
//             hideIconOnBalloonOpen: false
//         }
//     );
//
//     myMap.geoObjects.add(myPlacemark6);
//
//     var myPlacemark7 = new ymaps.Placemark([53.29778, 100.29639],
//         {
//             balloonContent: html,
//
//         },
//         {
//             iconLayout: 'default#image',
//             iconImageHref: 'img/pin-2.png',
//             iconImageSize: [64, 88],
//             iconImageOffset: [-32, -88],
//
//             balloonContentSize: [184, 130], balloonLayout: "default#imageWithContent",
//
//             balloonImageSize: [0, 0], balloonShadow: false,
//             hideIconOnBalloonOpen: false
//         }
//     );
//
//     myMap.geoObjects.add(myPlacemark7);
//
//     var myPlacemark8 = new ymaps.Placemark([54.29778, 90.29639],
//         {
//             balloonContent: html,
//
//         },
//         {
//             iconLayout: 'default#image',
//             iconImageHref: 'img/pin-3.png',
//             iconImageSize: [64, 88],
//             iconImageOffset: [-32, -88],
//
//             balloonContentSize: [184, 130], balloonLayout: "default#imageWithContent",
//
//             balloonImageSize: [0, 0], balloonShadow: false,
//             hideIconOnBalloonOpen: false
//         }
//     );
//
//     myMap.geoObjects.add(myPlacemark8);
//
//     var myPlacemark9 = new ymaps.Placemark([54.29778, 95.29639],
//         {
//             balloonContent: html,
//
//         },
//         {
//             iconLayout: 'default#image',
//             iconImageHref: 'img/pin-2.png',
//             iconImageSize: [64, 88],
//             iconImageOffset: [-32, -88],
//
//             balloonContentSize: [184, 130], balloonLayout: "default#imageWithContent",
//
//             balloonImageSize: [0, 0], balloonShadow: false,
//             hideIconOnBalloonOpen: false
//         }
//     );
//
//     myMap.geoObjects.add(myPlacemark9);
//
//     var myPlacemark10 = new ymaps.Placemark([55.29778, 93.29639],
//         {
//             balloonContent: html,
//
//         },
//         {
//             iconLayout: 'default#image',
//             iconImageHref: 'img/pin-5.png',
//             iconImageSize: [64, 88],
//             iconImageOffset: [-32, -88],
//
//             balloonContentSize: [184, 130], balloonLayout: "default#imageWithContent",
//
//             balloonImageSize: [0, 0], balloonShadow: false,
//             hideIconOnBalloonOpen: false
//         }
//     );
//
//     myMap.geoObjects.add(myPlacemark10);
//
//     var myPlacemark11 = new ymaps.Placemark([52.29778, 115.29639],
//         {
//             balloonContent: html,
//
//         },
//         {
//             iconLayout: 'default#image',
//             iconImageHref: 'img/pin-2.png',
//             iconImageSize: [64, 88],
//             iconImageOffset: [-32, -88],
//
//             balloonContentSize: [184, 130], balloonLayout: "default#imageWithContent",
//
//             balloonImageSize: [0, 0], balloonShadow: false,
//             hideIconOnBalloonOpen: false
//         }
//     );
//
//     myMap.geoObjects.add(myPlacemark11);
//
//     var myPlacemark12 = new ymaps.Placemark([52.29778, 115.29639],
//         {
//             balloonContent: html,
//
//         },
//         {
//             iconLayout: 'default#image',
//             iconImageHref: 'img/pin-2.png',
//             iconImageSize: [64, 88],
//             iconImageOffset: [-32, -88],
//
//             balloonContentSize: [184, 130], balloonLayout: "default#imageWithContent",
//
//             balloonImageSize: [0, 0], balloonShadow: false,
//             hideIconOnBalloonOpen: false
//         }
//     );
//
//     myMap.geoObjects.add(myPlacemark12);
//
//     var myPlacemark13 = new ymaps.Placemark([52.29778, 115.29639],
//         {
//             balloonContent: html,
//
//         },
//         {
//             iconLayout: 'default#image',
//             iconImageHref: 'img/pin-3.png',
//             iconImageSize: [64, 88],
//             iconImageOffset: [-32, -88],
//
//             balloonContentSize: [184, 130], balloonLayout: "default#imageWithContent",
//
//             balloonImageSize: [0, 0], balloonShadow: false,
//             hideIconOnBalloonOpen: false
//         }
//     );
//
//     myMap.geoObjects.add(myPlacemark13);
//
//     var myPlacemark14 = new ymaps.Placemark([52.29778, 115.29639],
//         {
//             balloonContent: html,
//
//         },
//         {
//             iconLayout: 'default#image',
//             iconImageHref: 'img/pin-2.png',
//             iconImageSize: [64, 88],
//             iconImageOffset: [-32, -88],
//
//             balloonContentSize: [184, 130], balloonLayout: "default#imageWithContent",
//
//             balloonImageSize: [0, 0], balloonShadow: false,
//             hideIconOnBalloonOpen: false
//         }
//     );
//
//     myMap.geoObjects.add(myPlacemark14);
//
//     var myPlacemark15 = new ymaps.Placemark([52.29778, 115.29639],
//         {
//             balloonContent: html,
//
//         },
//         {
//             iconLayout: 'default#image',
//             iconImageHref: 'img/pin-3.png',
//             iconImageSize: [64, 88],
//             iconImageOffset: [-32, -88],
//
//             balloonContentSize: [184, 130], balloonLayout: "default#imageWithContent",
//
//             balloonImageSize: [0, 0], balloonShadow: false,
//             hideIconOnBalloonOpen: false
//         }
//     );
//
//     myMap.geoObjects.add(myPlacemark15);
//
//     var myPlacemark20 = new ymaps.Placemark([55.29778, 126.29639],
//         {
//             balloonContent: html,
//
//         },
//         {
//             iconLayout: 'default#image',
//             iconImageHref: 'img/pin-4.png',
//             iconImageSize: [64, 88],
//             iconImageOffset: [-32, -88],
//
//             balloonContentSize: [184, 130], balloonLayout: "default#imageWithContent",
//
//             balloonImageSize: [0, 0], balloonShadow: false,
//             hideIconOnBalloonOpen: false
//         }
//     );
//
//     myMap.geoObjects.add(myPlacemark20);
//
//     var myPlacemark21 = new ymaps.Placemark([55.29778, 126.29639],
//         {
//             balloonContent: html,
//
//         },
//         {
//             iconLayout: 'default#image',
//             iconImageHref: 'img/pin-5.png',
//             iconImageSize: [64, 88],
//             iconImageOffset: [-32, -88],
//
//             balloonContentSize: [184, 130], balloonLayout: "default#imageWithContent",
//
//             balloonImageSize: [0, 0], balloonShadow: false,
//             hideIconOnBalloonOpen: false
//         }
//     );
//
//     myMap.geoObjects.add(myPlacemark21);
//
//     var myPlacemark22 = new ymaps.Placemark([54.29778, 125.29639],
//         {
//             balloonContent: html,
//
//         },
//         {
//             iconLayout: 'default#image',
//             iconImageHref: 'img/pin-3.png',
//             iconImageSize: [64, 88],
//             iconImageOffset: [-32, -88],
//
//             balloonContentSize: [184, 130], balloonLayout: "default#imageWithContent",
//
//             balloonImageSize: [0, 0], balloonShadow: false,
//             hideIconOnBalloonOpen: false
//         }
//     );
//
//     myMap.geoObjects.add(myPlacemark22);
//
//     var myPlacemark23 = new ymaps.Placemark([55.29778, 125.29639],
//         {
//             balloonContent: html,
//
//         },
//         {
//             iconLayout: 'default#image',
//             iconImageHref: 'img/pin-4.png',
//             iconImageSize: [64, 88],
//             iconImageOffset: [-32, -88],
//
//             balloonContentSize: [184, 130], balloonLayout: "default#imageWithContent",
//
//             balloonImageSize: [0, 0], balloonShadow: false,
//             hideIconOnBalloonOpen: false
//         }
//     );
//
//     myMap.geoObjects.add(myPlacemark23);
//
//     var myPlacemark31 = new ymaps.Placemark([54.29778, 132.29639],
//         {
//             balloonContent: html,
//
//         },
//         {
//             iconLayout: 'default#image',
//             iconImageHref: 'img/pin-5.png',
//             iconImageSize: [64, 88],
//             iconImageOffset: [-32, -88],
//
//             balloonContentSize: [184, 130], balloonLayout: "default#imageWithContent",
//
//             balloonImageSize: [0, 0], balloonShadow: false,
//             hideIconOnBalloonOpen: false
//         }
//     );
//
//     myMap.geoObjects.add(myPlacemark31);
//
//
//     var myPlacemark32 = new ymaps.Placemark([54.29778, 132.29639],
//         {
//             balloonContent: html,
//
//         },
//         {
//             iconLayout: 'default#image',
//             iconImageHref: 'img/pin-5.png',
//             iconImageSize: [64, 88],
//             iconImageOffset: [-32, -88],
//
//             balloonContentSize: [184, 130], balloonLayout: "default#imageWithContent",
//
//             balloonImageSize: [0, 0], balloonShadow: false,
//             hideIconOnBalloonOpen: false
//         }
//     );
//
//     myMap.geoObjects.add(myPlacemark32);
//
//
//     var myPlacemark33 = new ymaps.Placemark([54.29778, 132.29639],
//         {
//             balloonContent: html,
//
//         },
//         {
//             iconLayout: 'default#image',
//             iconImageHref: 'img/pin-5.png',
//             iconImageSize: [64, 88],
//             iconImageOffset: [-32, -88],
//
//             balloonContentSize: [184, 130], balloonLayout: "default#imageWithContent",
//
//             balloonImageSize: [0, 0], balloonShadow: false,
//             hideIconOnBalloonOpen: false
//         }
//     );
//
//     myMap.geoObjects.add(myPlacemark33);
//
//
//     var myPlacemark34 = new ymaps.Placemark([54.29778, 132.29639],
//         {
//             balloonContent: html,
//
//         },
//         {
//             iconLayout: 'default#image',
//             iconImageHref: 'img/pin-5.png',
//             iconImageSize: [64, 88],
//             iconImageOffset: [-32, -88],
//
//             balloonContentSize: [184, 130], balloonLayout: "default#imageWithContent",
//
//             balloonImageSize: [0, 0], balloonShadow: false,
//             hideIconOnBalloonOpen: false
//         }
//     );
//
//     myMap.geoObjects.add(myPlacemark34);
//
//
//     var myGeoObjectsFirst = [
//         myPlacemark1,
//         myPlacemark2,
//         myPlacemark3,
//         myPlacemark4
//     ];
//
//     var myGeoObjectsSecond = [
//         myPlacemark31,
//         myPlacemark32,
//         myPlacemark33,
//         myPlacemark34,
//     ];
//     var myGeoObjectsThird = [
//         myPlacemark11,
//         myPlacemark12,
//         myPlacemark13,
//         myPlacemark14,
//         myPlacemark15,
//     ];
//     var myGeoObjectsFourth = [
//         myPlacemark20,
//         myPlacemark21,
//         myPlacemark22,
//         myPlacemark23,
//     ];
//
//
//
//     var myClustererFirst = new ymaps.Clusterer({
//         clusterIconLayout: ymaps.templateLayoutFactory.createClass('<div class="clusterIcon">{{ properties.geoObjects.length }}</div>'),
//     });
//     var myClustererSecond = new ymaps.Clusterer({
//         clusterIconLayout: ymaps.templateLayoutFactory.createClass('<div class="clusterIcon">{{ properties.geoObjects.length }}</div>'),
//     });
//     var myClustererThird = new ymaps.Clusterer({
//         clusterIconLayout: ymaps.templateLayoutFactory.createClass('<div class="clusterIcon">{{ properties.geoObjects.length }}</div>'),
//     });
//     var myClustererFourth = new ymaps.Clusterer({
//         clusterIconLayout: ymaps.templateLayoutFactory.createClass('<div class="clusterIcon">{{ properties.geoObjects.length }}</div>'),
//     });
//
//     myClustererFirst.add(myGeoObjectsFirst);
//     myMap.geoObjects.add(myClustererFirst);
//
//     myClustererSecond.add(myGeoObjectsSecond);
//     myMap.geoObjects.add(myClustererSecond);
//
//     myClustererSecond.add(myGeoObjectsThird);
//     myMap.geoObjects.add(myClustererThird);
//
//     myClustererSecond.add(myGeoObjectsFourth);
//     myMap.geoObjects.add(myClustererFourth);
//
}

    }
});
