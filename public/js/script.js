(function () {
    
    'use strict';

    var listButton = document.querySelector('.list'),
    	colButton = document.querySelector('.column'),
    	photoSection = document.getElementById('all');


    listButton.addEventListener('click', function(e){
    	this.classList.add('active');
    	colButton.classList.remove('active');
    	photoSection.classList.remove('column');
    });

    colButton.addEventListener('click', function(e){
    	this.classList.add('active');
    	listButton.classList.remove('active');
    	photoSection.classList.add('column');
    });

}());

