$(document).ready(function () {
	'use strict';

	//Раздел переменных
	//----------------------------------------------------------------------------------------------------
	var $registrationFormsInput = $('.username, .user-telephone'),
		$registrationFormPlaceholders = $('.field-placeholder');

   


	//Раздел функций
	//------------------------------------------------------------------------------------------------------
	initFields($registrationFormsInput);
	$('.user-telephone').mask('+7 (000) 000-00-00');
	$('.callback-form').validate({
	
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
		var $wrapper = $(this).parent(),
			$wrappers = $registrationFormsInput.parent(),
			value;
		value = clearValidationClasses($wrappers, value);
		$wrapper.addClass('active');
		
	
	});

	$registrationFormsInput.on('blur', function () {
		var $wrappers = $registrationFormsInput.parent(),
		value;
		$.each($wrappers, function (indexInArray, valueOfElement) { 
			$(this).removeClass('active');
		});
		clearValidationClasses($wrappers, value);
		
		
	
	});

	$registrationFormsInput.on('keydown keyup', function () {
		var $wrappers = $registrationFormsInput.parent(),
			$wrapper = $(this).parent(),
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
