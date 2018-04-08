var bar_bg = document.getElementById("scrollbar-bg"),
    body = document.body,
    html = document.documentElement;

bar_bg.style.minWidth = window.innerWidth + "px";

document.getElementsByTagName("body")[0].onresize = function() {
	// Update the gradient width
	bar_bg.style.minWidth = window.innerWidth + "px";
}

window.onscroll = function() {
	// Change the width of the progress bar
	var bar = document.getElementById("scrollbar"),
		dw  = window.innerWidth,
		dh  = Math.max( body.scrollHeight, body.offsetHeight, 
                       html.clientHeight, html.scrollHeight, html.offsetHeight ),
		wh  = window.innerHeight,
		pos = pageYOffset || (document.documentElement.clientHeight ?
                              document.documentElement.scrollTop : document.body.scrollTop),
		bw  = ((pos / (dh - wh)) * 100);

	bar.style.width = bw + "%";
}

//for modals

var modalWindow = {
        _block: null,
        _win: null,

        initBlock: function() {
          _block = document.getElementById('blockscreen'); //Получаем наш блокирующий фон по ID

          //Если он не определен, то создадим его
          if (!_block) {
            var parent = document.getElementsByTagName('body')[0]; //Получим первый элемент тега body
            var obj = parent.firstChild; //Для того, чтобы вставить наш блокирующий фон в самое начало тега body
            _block = document.createElement('div'); //Создаем элемент div
            _block.id = 'blockscreen'; //Присваиваем ему наш ID
            parent.insertBefore(_block, obj); //Вставляем в начало
            _block.onclick = function() { modalWindow.close(); } //Добавим обработчик события по нажатию на блокирующий экран - закрыть модальное окно.
          }
          _block.style.display = 'inline'; //Установим CSS-свойство        
        },

        initWin: function(html) {
          _win = document.getElementById('modalwindow'); //Получаем наше диалоговое окно по ID
          //Если оно не определено, то также создадим его по аналогии
          if (!_win) {
            var parent = document.getElementsByTagName('body')[0];
            var obj = parent.firstChild;
            _win = document.createElement('div');
            _win.id = 'modalwindow';
            parent.insertBefore(_win, obj);
          }
          _win.style.width = 90 + 'vw'; //Установим ширину окна
          _win.style.overflowX = "auto";
          _win.style.display = 'inline'; //Зададим CSS-свойство

          _win.innerHTML = html; //Добавим нужный HTML-текст в наше диалоговое окно

          //Установим позицию по центру экрана

          _win.style.left = '0%'; //Позиция по горизонтали
          _win.style.top = '50%'; //Позиция по вертикали

          //Выравнивание по центру путем задания отрицательных отступов
          _win.style.marginTop = -(_win.offsetHeight / 2) + 'px'; 
          _win.style.marginLeft = 4 + 'vw';
        },

        close: function() {
          document.getElementById('blockscreen').style.display = 'none';
          document.getElementById('modalwindow').style.display = 'none';     
		  document.getElementsByTagName('html')[0].style.overflowY = 'auto';  
        },

        show: function(html) {
          modalWindow.initBlock();
          modalWindow.initWin(html);
          document.getElementsByTagName('html')[0].style.overflowY = 'hidden'; 
        }
      }