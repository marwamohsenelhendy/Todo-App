const addTaskForm = document.querySelector('.add-task form');
const taskInput = document.querySelector('.add-task .input-group');
const resultsContainer = document.querySelector('.results');

  const tasks = (function() {
  
    function showTodos(todos) {
      resultsContainer.innerHTML = '';
      todos.forEach(todo => {
        addTodoTask(todo);
      });
    }
  
    function addTodoTask(todo) {
      const taskResult = document.createElement('div');
      taskResult.classList.add('task-result');
      const infoDiv = document.createElement('div');
      infoDiv.classList.add('info');
      const titleElement = document.createElement('p');
      titleElement.textContent = todo.title;
      const createdAtElement = document.createElement('span');
      createdAtElement.textContent = todo.createdAt.toLocaleString();
      infoDiv.appendChild(titleElement);
      infoDiv.appendChild(createdAtElement);
  
      const taskCompleted = document.createElement('div');
      taskCompleted.classList.add('task-completed');
      taskCompleted.addEventListener('click', () => {
        toggleTaskStatus(todo.id);
      });
  
      if (todo.completed) {
        taskCompleted.classList.add('completed');
      }
  
      taskResult.appendChild(infoDiv);
      taskResult.appendChild(taskCompleted);
      resultsContainer.appendChild(taskResult);
    }
  
  
    return {
      showTodos,
      addTodoTask
     
    }
  
  })();

   //  storage  // 
  const Storage = (function() {
    function getTodos() {
      const storedTodos = localStorage.getItem('todo');
      return storedTodos ? JSON.parse(storedTodos) : [];
    }
    
    function addTodo(todo) {
      const todos = getTodos();
      todos.push(todo);
      localStorage.setItem('todos', JSON.stringify(todos));
    }
    
    
    return {
      getTodos,
      addTodo
      
    }
  })();
  

  const App = (function(Storage, tasks) {
  

    const todos = Storage.getTodos();
    tasks.showTodos(todos);
  
    // add todo //
    const addTodo = (title) => {
      if (title === '') {
        alert('Title required');
        return;
      }
  
      const todo = {
        id: Date.now(),
        title,
        completed: false,
        createdAt: new Date()
      }
  
      // add to storage
      Storage.addTodo(todo);
  
      // add to tasks //
      tasks.addTodoTask(todo);
    }
    return {
      addTodo
    }
  })(Storage, tasks);
  

  addTaskForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const taskTitle = taskInput.value.trim();
    App.addTodo(taskTitle);
    taskInput.value = '';
  });
  

  function resultsTasks() {
    const resultsContainer = document.querySelector('.results');
    resultsContainer.innerHTML = '';
  
    const todos = Storage.getTodos();
    todos.forEach(todo => {
      const taskResult = document.createElement('div');
      taskResult.classList.add('task-result');
      const infoDiv = document.createElement('div');
      infoDiv.classList.add('info');
      const titleElement = document.createElement('p');
      titleElement.textContent = todo.title;
      const createdAtElement = document.createElement('span');
      createdAtElement.textContent = todo.createdAt.toLocaleString();
      infoDiv.appendChild(titleElement);
      infoDiv.appendChild(createdAtElement);
  
      const taskCompleted = document.createElement('div');
      taskCompleted.classList.add('task-completed');
      taskCompleted.addEventListener('click', () => {
        toggleTaskResult(todo);
      });
  
      if (todo.completed) {
        taskCompleted.classList.add('completed');
      }
  
      taskResult.appendChild(infoDiv);
      taskResult.appendChild(taskCompleted);
      resultsContainer.appendChild(taskResult);
    });
  }
  

  resultsTasks();