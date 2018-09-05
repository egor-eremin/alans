$(document).ready(function () {
	'use strict';

	//Раздел переменных
	//----------------------------------------------------------------------------------------------------
	var $registrationFormsInput = $('.username, .user-telephone'),
		$registrationFormPlaceholders = $('.field-placeholder'),
		showDigitsAnimationFirst = true,
		showDigitsAnimationSecond = true,
		showDigitsAnimationThird = true,
		$activitiesTypes = $('.article__link--activities-types'),
		$mtbContentDescription = $('.mtb-content-description__text'),
		$mtbContentLink = $('.mtb-items__item');
   



	// Футер
	//------------------------------------------------------------------------------------------------------
	initFields($registrationFormsInput);
	$('.user-telephone, .phone-input').mask('+7 (000) 000-00-00');
	$('.callback-form').validate({
		submitHandler: function(form) {
			$.ajax({
				url: '../ajax/response.json',
				success: function (data) {  
					var hideSelectors = $('.form__fields, .agreement-checkbox');
					$.each(hideSelectors, function () { 
						$(this).addClass('fully-hidden');	 
					});
					
					if(data.answer === 1) {
			
						$('.thank-you').removeClass('fully-hidden'); 
					}

					if(data.answer === 0) {
					
						$('.something-wrong').removeClass('fully-hidden'); 
					}
				}
			});
		},
		invalidHandler: function(event, validator) {
			// 'this' refers to the form
			var errors = validator.numberOfInvalids(),
			$tel_state = validator.element( '.utl' ),
			$usn_state = validator.element( '.username' ),
			$telWrapper = $('.user-telephone__wrapper'),
			$usnWrapper = $('.username__wrapper');
			$tel_state = String($tel_state).trim();
			$usn_state = String($usn_state).trim();
		
				if($tel_state === 'false'){
			
					$telWrapper.addClass('input-error'); 
				}

				if($usn_state === 'false'){
			
					$usnWrapper.addClass('input-error'); 
				}
		  },
	
		onkeyup: function(element){
			var $wrapper = $(element).parent();
			$(element).valid(); 
			if($(element).hasClass('valid')) {
	
				$wrapper.addClass('input-ok');
				$wrapper.removeClass('input-error');
			}
			if(!$(element).hasClass('valid')) {
				$wrapper.addClass('input-error');
				$wrapper.removeClass('input-ok');
			}
			if($(element).val().length <= 0) {
				$wrapper.removeClass('input-ok');
				$wrapper.removeClass('input-error');
			}
		}
	});

	$.validator.addClassRules({
		utl: {
		  required: true,
		  minlength: 18
		},
        'phone-input': {
            required: true,
            minlength: 18
        },
	
	  });



	  $registrationFormsInput.on('focus', function () {
		var $wrapper = $(this).parent();
		$wrapper.addClass('active');
		
		});

	$registrationFormsInput.on('blur', function () {
		var $wrappers = $registrationFormsInput.parent();

		$.each($wrappers, function (indexInArray, valueOfElement) { 
			$(this).removeClass('active');
		});

		
		
	
	});

	$registrationFormsInput.on('keydown keyup', function () {
		var $wrapper = $(this).parent(),
			value =  String($(this).val()).trim();

			if(value.length > 0) {
				$wrapper.addClass('filled');
			}

			if(value.length <= 0) {
				$wrapper.removeClass('filled');
			}
			
		
	});

	$registrationFormPlaceholders.click(function (e) { 
		e.preventDefault();
		var $wrapper = $(this).parent(),
		$wrappers = $registrationFormsInput.parent(),
		$activeField = $(this).siblings('input');
		$.each($wrappers, function (indexInArray, valueOfElement) { 
			$(this).removeClass('active');
		});
		$wrapper.addClass('active');
		$activeField.focus();
		
	});

	$('.usersubmit').click(function (e) { 
		e.preventDefault();
		$('.callback-form').submit();
		
	});

	//Отслеживание появления формы
	$('.advantages').viewportChecker({
		classToAdd: 'onLook',
		repeat: true,
		// scrollBox: $('.layout-template-wrapper'),

	});

	//Отслеживание появления формы
	$('.spincrement__first').viewportChecker({
		classToAdd: 'onLook',
		repeat: true,
		// scrollBox: $('.layout-template-wrapper'),

	});

	$('.spincrement__second').viewportChecker({
		classToAdd: 'onLook',
		repeat: true,
		// scrollBox: $('.layout-template-wrapper'),

	});

	$('.spincrement__third').viewportChecker({
		classToAdd: 'onLook',
		repeat: true,
		// scrollBox: $('.layout-template-wrapper'),

	});

		//Отслеживание появления морды
		$('.person-summary__person').viewportChecker({
			classToAdd: 'onLook',
			repeat: true,
			// scrollBox: $('.layout-template-wrapper'),
	
		});

	

	$activitiesTypes.click(function (e) { 
		e.preventDefault();
		var $formPosition = $('.callback-form').offset().top;
		animatedScrollToPosition($('body, html'), $formPosition, 500);
	

	});

	



	//Событие по скроллу
	$(window).on('scroll', function () {

		var $callBackForm = $('.advantages.onLook.full-visible').not('.done');
		var animationEnd = 'onanimationend animationend webKitAnimationEnd mozAnimationEnd MSAnimationEnd',
		$portfolioFirst = $('.spincrement__first.onLook'),
		$portfolioSecond = $('.spincrement__second.onLook'),
		$portfolioThird = $('.spincrement__third.onLook'),
		selector = $('.advantages-item__description'),
		animation = 'fadeInUp',
		$sticky = $('.about-aside__content-wrp--sticky'),
		$stickyParent = $('.sticky--wrp');
	


		//Запуск Position:sticky


		if($('div').is('.about-contant')){
			stickifyBlock($sticky, $stickyParent);
		}


		//Запуск стрелки наверх
		if($(this).scrollTop() > 500) {
			$('.up-arrow__wrapper').removeClass('hidden-down');
		} else {
			$('.up-arrow__wrapper').addClass('hidden-down');
		}

		//Запуск анимации блоков преимуществ
		if($callBackForm.length > 0){
			if(!selector.hasClass(animation)) {
				selector.addClass(animation).one(animationEnd, function(){
					$callBackForm.addClass('done');
				});
			}
			
		}

		// Запуск набегающих цифр 1* 
		
		
		if($portfolioFirst.length > 0 ){
	    
			if(showDigitsAnimationFirst){
				numbersAnimate($('.spincrement__first'), 0, 12, 1000);
				showDigitsAnimationFirst = false;	
			}
		}

		// Запуск набегающих цифр 2* 
	 
		if($portfolioSecond.length > 0 ){
	 
			if(showDigitsAnimationSecond){
				numbersAnimate($('.spincrement__second'), 0, 4, 1000);
				showDigitsAnimationSecond = false;	
			}
		}


		// Запуск набегающих цифр 3* 
		
		if($portfolioThird.length > 0 ){
	  
			if(showDigitsAnimationThird){
				numbersAnimate($('.spincrement__third'), 0, 19, 1000);
				showDigitsAnimationThird = false;	
				
			}
		}

	});



	//Активация стрелки наверх
	$('.up__arrow-area').click(function (e) { 
		e.preventDefault();
		animatedScrollToPosition($('body, html'), 0, 300);
		
	});

	/*Футер: конец*/ 

	if($mtbContentDescription.length > 0 ) {
		$mtbContentDescription.mCustomScrollbar({
			theme: 'dark',
			scrollbarPosition: 'inside'
		  });
	}

    (function initProductCustomScroll() {
        if ($('.all-project__list').length > 0) {
            initCustomScrollBar($('.all-project__list'));
        }
    })();

	function initCustomScrollBar(selectorInit) {
        selectorInit.mCustomScrollbar({
            theme: 'dark',
            scrollbarPosition: 'inside'
        });
    }

	$('.btn-brief-close').click(function (e) { 
	
		e.preventDefault();
	
		// 
		if($mtbContentLink.hasClass('active')) {
			e.stopPropagation();
			$mtbContentLink.removeClass('active');
		
		}

		
	});


	





	//Медиа-запросы в javascript (Если нужно)
	//-------------------------------------------------------------------------------------------------------
    
    
	media('all and (min-width: 1170px)', function(){
		// console.log('1170px');
	});
   
	media('all and (min-width: 1270px)', function(){
		// console.log('1270px');
	});
	
	//spoiler on the page of vacancy
	
	$('li.list__item').click(function(event) {
		if (event.target.tagName === 'LABEL' || event.target.tagName === 'INPUT') {
			if (event.target.checked) {
				$(this).nextUntil('.list__details').next().find('.vacancy-details').slideDown(300);
			} else {
				$(this).nextUntil('.list__details').next().find('.vacancy-details').slideUp(300);
			}
			return;
		}
		this.querySelector('input').checked = this.querySelector('input').checked ? false : true;
		$(this).nextUntil('.list__details').next().find('.vacancy-details').slideToggle(300);
	});

	activateLinks($mtbContentLink);

	$(document).mouseup(function (e){ // событие клика по веб-документу
	

		hidePopupListener($mtbContentLink, e, function(){
			$mtbContentLink.removeClass('active');
		});
	});
	
    
});

function stickifyBlock($sticky, $stickyParent) {
	var stickyParentHeight = $stickyParent.outerHeight(true),
	stickyHeight = $sticky.outerHeight(true), //Высота блока стикера
	stickyPositionTop = $('.about-contant').offset().top,
	stickyPositionBottom = ($('.sticky.done').length > 0) ? $('.sticky.done').offset().top : false,
	currentPositionInBlock = $(this).scrollTop() - stickyPositionTop;
	if ($(this).scrollTop() > stickyPositionTop) {
		//Значение стикера добавляем в любом случае
		if (!$sticky.hasClass('sticky')) {
			$sticky.addClass('sticky');
		}
		//Отслеживаем появление нижней границы
		if ((stickyParentHeight - currentPositionInBlock) <= stickyHeight) {
			if (!$sticky.hasClass('done')) {
				$sticky.addClass('done');
			}
			if ($sticky.hasClass('done')) {
				if (stickyPositionBottom) {
					if ($(this).scrollTop() < stickyPositionBottom) {
						if ($sticky.hasClass('done')) {
							$sticky.removeClass('done');
						}
					}
				}
			}
		}
		else {
			if ($sticky.hasClass('done')) {
				$sticky.removeClass('done');
			}
		}
	}
	else {
		if ($sticky.hasClass('sticky')) {
			$sticky.removeClass('sticky');
		}
	}
}

//Плавный скролл до позиции на странице
//$selector(jqblock) - анимируемый блок
//position(number) - целевое вертикальное смещение на странице
//duration(number) - длительность анимации

function animatedScrollToPosition($selector, position, duration){
	$($selector).animate({
		scrollTop: position
		}, duration);
		return false;
}

//Анимация цифр 
//$selector(jqblock) - анимируемый блок
//$from(number) - начальное значение
//$to(number) - конечное значение
//$duration(number) - длительность анимации
function numbersAnimate($selector, $from, $to, $duration) {
	$({numberValue: $from}).animate({numberValue: $to}, {
		duration: $duration, // Скорость анимации, где 500 = 0,5 одной секунды, то есть 500 миллисекунд
		easing: "linear",
		step: function(val) {
			$selector.html(Math.ceil(val)); // Блок, где необходимо сделать анимацию
		}
	});
}


//Очистка классов валидации обертки поля в форме
//value (string) - значение поля
//$wrappers(jqblock) - класс обертки поля
function clearValidationClasses($wrappers, value) {
	$.each($wrappers, function (indexInArray, valueOfElement) {
		$(this).removeClass('active');
		value = String($(this).children('input').val()).trim();
		if (value.length <= 0) {
			$(this).removeClass('input-ok');
			$(this).removeClass('input-error');
		}
	});
	return value;
}

function media(mediaQueryString, action){
	'use strict';
	var handleMatchMedia = function (mediaQuery) {
		if (mediaQuery.matches) { //Попадает в запроc
			if (action  && typeof(action) === 'function') {
				action();
			}
		} 
	};
	var mql = window.matchMedia(mediaQueryString); //стандартный медиазапрос для смены режима просмотра
	handleMatchMedia(mql);
	mql.addListener(handleMatchMedia);
}

//Инициализация полей в футере. Если поле заполнено - убирает placehoder
//$registrationFormsInput (jqblock) - выборка полей формы
function initFields($registrationFormsInput) {
	var value='',
		$wrapper;
	$.each($registrationFormsInput, function (indexInArray, valueOfElement) { 
		value =  String($(this).val()).trim();
		$wrapper = $(this).parent();
		if(value.length > 0) {
			$wrapper.addClass('filled');
		}

		if(value.length <= 0) {
			$wrapper.removeClass('filled');
		}
	});

//init callback form
(function initCallBackForm() {
    $('.btn__order-callback, .btn-call').click(function (e) {
        e.preventDefault();
       $('.callback').show(0);
       $('.callback').toggleClass('active');
    });
})();

//close callback form
(function closeCallbackForm() {
    $('.callback__close-icon, .callback__close').click(function (e) {
        e.preventDefault();
       if ($('.callback').hasClass('active')) {
           $('.callback').removeClass('active');
           setTimeout(function () {
               $('.callback').hide(0);
           }, 300);
       }
    });

})();

//validate main-callback
(function vaslidateCallBackForm() {
    $('#main-callback-form').validate({
        submitHandler: function(form) {
            $.ajax({
                url: '../ajax/response.json',
                success: function (data) {
                    var hideSelectors = $('.callback__form');
                    $.each(hideSelectors, function () {
                        $(this).addClass('hide-information');
                    });

                    if(data.answer === 1) {

                        $('.thank-you-text').addClass('show');
                    }

                    if(data.answer === 0) {

                        $('.wrong-text').addClass('show');
                    }
                }
            });
        },
        onkeyup: function(element){
            $(element).valid();
        }
    });
})();

(function editCallbackText() {
    $('#main-callback-form').on('submit', function () {
        var userName = $('.user-callback-name').val();

        $('.callback-text__title').text(userName + ',');
    });
})();
}

(function initMap() {
    if ($('div').is('#map-init')) {

        ymaps.ready(init);

        function init(){
            var myMap = new ymaps.Map("map-init", {
                center: [52.376320118819244,102.550223484375],
                zoom: 7,
                controls: ['typeSelector', 'trafficControl', 'rulerControl'],
                suppressMapOpenBlock: true
            });

            var objectManager = new ymaps.ObjectManager({
                clusterize: true,
                gridSize: 3,
                clusterIconLayout: ymaps.templateLayoutFactory.createClass('<div class="clusterIcon">{{ properties.geoObjects.length }}</div>'),
            });



            myMap.geoObjects.add(objectManager);

            // var myPlacemark = new ymaps.Placemark([55.76, 37.64], {
            //     hintContent: 'Содержимое всплывающей подсказки',
            //     balloonContent: 'Содержимое балуна'
            // });

            // myMap.geoObjects.add(myPlacemark);

        }

    }
})();

(function allChecked() {
    $('.all-checked').on('change', function () {
        if ($(this).prop('checked')) {
            $('.clients-list__label input:not(.all-checked)').prop('checked', true);
        } else {
            $('.clients-list__label input:not(.all-checked)').prop('checked', false);
        }
    });
    $('.clients-list__label input:not(.all-checked)').on('change', function () {
        var flagAllChecked = false;
        $('.clients-list__label input:not(.all-checked)').each(function (indexEl) {
            for (var i=0; i <= indexEl; i++) {
                if (!$(this).prop('checked')) {return}
            }
            flagAllChecked = true;
        });
        if (flagAllChecked) {
            $('.all-checked').prop('checked', true);
        } else {
            $('.all-checked').prop('checked', false);
        }
    });
})();

(function activateSlideAllProject() {
    $('.all-project__title').on('click', function () {
       if ($(this).hasClass('active')) {
           $(this).removeClass('active');
           $('.all-project__list').slideUp(300);
       } else {
           $(this).addClass('active');
           $('.all-project__list').slideDown(300);
       }
    });
})();


function activateLinks($selector) {
	$($selector).click(function (e) { 
		e.preventDefault();

		$.each($selector, function () { 
			if($(this).hasClass('active')) {
			   $(this).removeClass('active');
			}
	   });
	   
	  if(!$(this).hasClass('active')) {
		$(this).addClass('active');

	 }
	  
	});

}


function hidePopupListener($windowPopupSelector, e, callback) {

	var div = $($windowPopupSelector); 
	if (!div.is(e.target) && div.has(e.target).length === 0) {
		if (callback) {
			callback();
		}
	}

}
