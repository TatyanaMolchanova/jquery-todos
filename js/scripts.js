$(document).ready(function(){
	'use strict';


	let todos = getStorage();

	$(todos).each(function(index, todo) {
		createTodo('todos', todo);
	});

	$('#todoInput').on('input', function(e){
		console.log(e);
		if ($(this).val().length > 3) {
			$('#addBtn').attr('disabled', false);
		} else {
			$('#addBtn').attr('disabled', true);
		}

	});

	$('form').on('submit', function(e) {
		e.preventDefault();

		let str = $('#todoInput').val();

		createTodo('todos', str);
		createTaskAtStorage(str);


		$('#todoInput').val('');
		$('#addBtn').attr('disabled', true);
	});

	$('body').on('change', '[type="checkbox"]', function() {
		moveTodo($(this).parents('li'));
	})


	$('body').on('click', '.deleteBtn', function() {
		removeTodo($(this).parents('li'));
	})

	$('body').on('click', '.editBtn', function() {
		editTodo($(this).parents('li'));
	})

	$('body').on('click', '.cancelBtn', function() {
		cancelTodo($(this).parents('li'));
	})

	$('body').on('click', '.saveBtn', function() {
		saveTodo($(this).parents('li'));
	})

	function createTodo(target, text) {
		let html = `
				<li style="display: none">
					<label>
						<input type="checkbox">
						<span>${text}</span>
					</label>
					<input type="text" value="${text}" style="display: none">
					<button class="editBtn">Edit</button>
					<button class="deleteBtn">Delete</button>
					<button class="saveBtn" style="display: none">Save</button>
					<button class="cancelBtn" style="display: none">Cancel</button>
				</li>`;

		if (target == 'completed') {
			html = `
					<li style="display: none">
					${text} <button class="deleteBtn">Delete</button>
					</li>`;
		}	

		$(`#${target}`).append(html);
		$(`#${target}`).find('li[style="display: none"]')
						.fadeIn();

	}

	


	function moveTodo(li) {
		let text = li.find('span').text();

		createTodo('completed', text);
		removeTodo(li);
	}

	function removeTodo(todo) {
		deleteTaskFromStorage(todo.find('span').text());
		todo.remove();
	}

	function editTodo(li) {
		li.find('label, .editBtn, .deleteBtn').hide();
		li.find('[type="text"], .saveBtn, .cancelBtn').fadeIn();

	}

	function cancelTodo(li) {
		li.find('label, .editBtn, .deleteBtn').fadeIn();
		li.find('[type="text"], .saveBtn, .cancelBtn').hide();


	}

	function saveTodo(li) {
		let str = li.find('[type="text"]').val();
		

		if(str.length) {
			updateTaskAtStorage(li.find('span').text(), str);

			li.find('span').text(str);
			cancelTodo(li);
		} else {
			removeTodo(li);
		}

		li.find('span').text(str);
		cancelTodo(li);
	}



		function createTaskAtStorage(todo) {
			let todos = getStorage();

			todos.push(todo);

			setStorage(todos);

		}

		function updateTaskAtStorage(oldTodo, newTodo) {
			let todos = getStorage();

			todos.forEach(function(todo, index) {
				if (todo == oldTodo.trim()) {
					todos[index] = newTodo.trim();
				}
			});

			setStorage(todos);

		}

		function deleteTaskFromStorage(todo) {

			let todos = getStorage(),
				index = todos.indexOf(todo.trim());

			if (index > -1) {
				todos.splice(index, 1);
			}

			setStorage(todos);

		}

		function getStorage() {
			let todos = localStorage.getItem('todos'); // забираем из localStorage строку с задачами
			todos = todos ? todos.split('**') : [];	
			return todos;	
		}

		function setStorage(todos) {
			todos = todos.join('**');
			localStorage.setItem('todos', todos);
		}


















	// $('body').on('input', 'todoInput', function() {

	// })





});