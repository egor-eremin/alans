$(document).ready(function () {
	'use strict';

	//Раздел переменных
	//----------------------------------------------------------------------------------------------------
	var $registrationFormsInput = $('.username, .user-telephone'),
		$registrationFormPlaceholders = $('.field-placeholder'),
		showDigitsAnimationFirst = true,
		showDigitsAnimationSecond = true,
		showDigitsAnimationThird = true,
		$activitiesTypes = $('.article__link--activities-types');

   



	// Футер
	//------------------------------------------------------------------------------------------------------
	initFields($registrationFormsInput);
	$('.user-telephone').mask('+7 (000) 000-00-00');
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
		}
	
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
	$('.callback-form').viewportChecker({
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

		var $callBackForm = $('.callback-form.onLook').not('.done');
		var animationEnd = 'onanimationend animationend webKitAnimationEnd mozAnimationEnd MSAnimationEnd',
		$portfolioFirst = $('.spincrement__first.onLook'),
		$portfolioSecond = $('.spincrement__second.onLook'),
		$portfolioThird = $('.spincrement__third.onLook'),
		$person = $('.person-summary__person.onLook'),

		selector = $('.advantages-item__description'),
		animation = 'fadeInUp';
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
   
	//Активация медиа-запросов в javascript
	//@param mediaQueryString (String) - строка медиа-запроса как в CSS
	//@param action(function) - функция, которая выполняется при соблюдении условий медиа-запроса





	//Медиа-запросы в javascript (Если нужно)
	//-------------------------------------------------------------------------------------------------------
    
    
	media('all and (min-width: 1170px)', function(){
		// console.log('1170px');
	});
   
	media('all and (min-width: 1270px)', function(){
		// console.log('1270px');
	});
	
	
	
    
});

function animatedScrollToPosition($selector, position, duration){
	$($selector).animate({
		scrollTop: position
		}, duration);
		return false;
}

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
}
