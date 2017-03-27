'use strict'

const result_element = document.getElementById('result');

let result_old = '';

const result_xhr = new XMLHttpRequest();

function checkUpdate(){
	result_xhr.onreadystatechange = function(){
		if (result_xhr.readyState === 4 && result_xhr.status === 200){
			if (result_xhr.responseText !== result_old){
				const list_xhr = new XMLHttpRequest();

				list_xhr.onreadystatechange = function(){
					if (list_xhr.readyState === 4 && list_xhr.status === 200){
						const list_array = list_xhr.responseText.split('\n');

						let shuffle_text_array = [];

						while (shuffle_text_array.length < 50){
							shuffle_text_array = shuffle_text_array.concat(list_array);
						}

						shuffle_text_array = shuffle_text_array.slice(0, 50);

						shuffle_text_array.push(result_xhr.responseText);

						let i = 0;

						const shuffle_job = window.setInterval(function(){
							result_element.textContent = shuffle_text_array[i];

							i++

							if (i > 50){
								window.clearInterval(shuffle_job);
							}
						}, 25);
					}
					
					result_old = result_xhr.responseText;
				}

				list_xhr.open('GET', './list.txt');

				list_xhr.send();
			}
		}	
	}

	result_xhr.open('GET', './result.txt');

	result_xhr.send();
}

checkUpdate();

window.setInterval(checkUpdate, 1000);

