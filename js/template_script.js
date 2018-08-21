$(document).ready(function () {
	'use strict';

	//Раздел переменных
	//----------------------------------------------------------------------------------------------------
	var $registrationFormsInput = $('.username, .user-telephone');
   


	//Раздел функций
	//------------------------------------------------------------------------------------------------------
	$registrationFormsInput.focus(function (e) { 
		e.preventDefault();
		activateInputs($registrationFormsInput, $(this));
	});

	$registrationFormsInput.on('focus keydown blur', function (event) {
		var textValue = String($(this).val()).trim();
		if(textValue.length <= 0) {
			$(this).removeClass('input-ok');
			$(this).removeClass('input-error');
		}
		
	});

	$registrationFormsInput.blur(function (e) { 
		e.preventDefault();
		deactivateInputs($registrationFormsInput);
	});

	activateFastValidation($('.callback-form'));

   
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

