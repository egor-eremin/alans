$(document).ready(function () {
	'use strict';

	//Раздел переменных
	//----------------------------------------------------------------------------------------------------
	var $registrationFormsInput = $('.username, .user-telephone'),
		$registrationFormPlaceholders = $('.field-placeholder');

   


	//Раздел функций
	//------------------------------------------------------------------------------------------------------
	$registrationFormsInput.focus(function (e) { 
		e.preventDefault();
		activateInputs($registrationFormsInput, $(this));
	});

	$registrationFormPlaceholders.click(function (e) { 
		e.preventDefault();
		var $currentField = $(this).siblings('input[type=text]'); 
		activateInputs($registrationFormsInput, $(this));
		$currentField.focus();
	});


	$registrationFormsInput.on('focus keydown  blur', function (event) {
		var textValue = String($(this).val()).trim(),
		$wrapper = $(this).parent();
		if(textValue.length <= 0) {
			$(this).removeClass('input-ok');
			$(this).removeClass('input-error');
			$wrapper.removeClass('input-ok');
			$wrapper.removeClass('input-error');
		} 
		if(textValue.length > 0) {
			if($(this).hasClass('input-ok')) {
				$wrapper.removeClass('input-error');
				$wrapper.addClass('input-ok');
				
			}
			if($(this).hasClass('input-error')) {
				$wrapper.removeClass('input-ok');
				$wrapper.addClass('input-error');
				
			}
		}
		
	});

	$registrationFormsInput.blur(function (e) { 
		e.preventDefault();
		deactivateInputs($registrationFormsInput);
	});

	activateFastValidation($('.callback-form'));
	initializeForm($registrationFormsInput);
   
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



function initializeForm($registrationFormsInput) {
	if (!window.validation.isValid({ container: '.callback-form' }) || window.validation.isValid({ container: '.callback-form' })) {
		$.each($registrationFormsInput, function () {
			if ($(this).val().length > 0) {
				if ($(this).hasClass('input-ok')) {
					$(this).parent().addClass('input-ok');
					$(this).parent().removeClass('input-error');
				}
				if ($(this).hasClass('input-error')) {
					$(this).parent().addClass('input-error');
					$(this).parent().removeClass('input-ok');
				}
			}
		});
	}
}

function activateInputs($registrationFormsInput, $selector) {
	var $wrapper = $selector.parent(), 
	$wrappers = $registrationFormsInput.parent();
	$.each($wrappers, function () {
		if ($(this).hasClass('active')) {
			$(this).removeClass('active');
		}
	});

	$wrapper.addClass('active');
}

function deactivateInputs($registrationFormsInput) {
	var	$wrappers = $registrationFormsInput.parent();
	$.each($wrappers, function () {
		if ($(this).hasClass('active')) {
			$(this).removeClass('active');
		}
	});

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

function activateFastValidation($selectorContainer) {
	if(($selectorContainer.length > 0) && typeof($selectorContainer)!='undefined'){
		window.validation.init({
			container: $selectorContainer
		});
	}

}

