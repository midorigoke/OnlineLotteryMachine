'use strict';

const result_element = document.getElementById('result');

const list_textarea = document.getElementById('list_textarea');

document.getElementById('run_button').addEventListener('click', function(evt){
	list_textarea.value = list_textarea.value.replace(/\r/g, '');
	
	let list_array = list_textarea.value.split('\n');

	list_array = list_array.filter(e => e !== "");
	
	if (list_array.length > 0){
		const xhr = new XMLHttpRequest();

		xhr.onreadystatechange = function(){
			if (xhr.readyState === 2 && xhr.status !== 200){
				xhr.abort();
				alert('送信に失敗しました');
			}

			if (xhr.readyState === 4 && xhr.status === 200){
				let shuffle_text_array = [];

				while (shuffle_text_array.length < 50){
					shuffle_text_array = shuffle_text_array.concat(list_array);
				}

				shuffle_text_array = shuffle_text_array.slice(0, 50);
				
				shuffle_text_array.push(xhr.responseText);

				let i = 0;

				const shuffle_job = window.setInterval(function(){
					result_element.textContent = shuffle_text_array[i];
					
					i++
					
					if (i > 50){
						window.clearInterval(shuffle_job);
					}
				}, 25);
			}
		}

		xhr.open('POST', './selector.php');

		xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

		xhr.send('data=' + encodeURIComponent(JSON.stringify(list_array).replace(/%20/g, '+')));
		
	}
});

document.getElementById('file_input').addEventListener('change', function(evt){
	if (evt.target.files[0]){
		const reader = new FileReader();
		
		reader.readAsText(evt.target.files[0]);
		
		reader.onload = function(){
			list_textarea.value = reader.result;
		}
	}
});


