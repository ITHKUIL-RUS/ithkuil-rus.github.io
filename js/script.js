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

up.onclick = function() {
  html.style.fontSize = parseInt(getComputedStyle(html, '').fontSize) + 1 + 'px';
};
down.onclick = function() {
  html.style.fontSize = parseInt(getComputedStyle(html, '').fontSize) - 1 + 'px';
};

/******************************************************************************
 *                 JS Extension for the W3C Spec Style Sheet                  *
 *                                                                            *
 * This code handles:                                                         *
 * - some fixup to improve the table of contents                              *
 * - the obsolete warning on outdated specs                                   *
 ******************************************************************************/
(function() {
  "use strict";
  var collapseSidebarText = '<span aria-hidden="true">↩</span> '
                          + '<span>Скрыть боковую панель</span>';
  var expandSidebarText   = '<span aria-hidden="true">↪</span> '
                          + '<span>Показать боковую панель</span>';
  var tocJumpText         = '<span aria-hidden="true">⤴</span> '
                          + '<span>Перейти к содержанию</span>';

  var sidebarMedia = window.matchMedia('screen and (orientation: landscape)');
  var autoToggle   = function(e){ toggleSidebar(e.matches) };
  if(sidebarMedia.addListener) {
    sidebarMedia.addListener(autoToggle);
  }

  function toggleSidebar(on, skipScroll) {
    if (on == undefined) {
      on = !document.body.classList.contains('toc-sidebar');
    }

    if (!skipScroll) {
      /* Don't scroll to compensate for the ToC if we're above it already. */
      var headY = 0;
      var head = document.querySelector('.head');
      if (head) {
        // terrible approx of "top of ToC"
        headY += head.offsetTop + head.offsetHeight;
      }
      skipScroll = window.scrollY < headY;
    }

    var toggle = document.getElementById('toc-toggle');
    var tocNav = document.getElementById('toc');
    if (on) {
      var tocHeight = tocNav.offsetHeight;
      document.body.classList.add('toc-sidebar');
      document.body.classList.remove('toc-inline');
      toggle.innerHTML = collapseSidebarText;
      if (!skipScroll) {
        window.scrollBy(0, 0 - tocHeight);
      }
      tocNav.focus();
      sidebarMedia.addListener(autoToggle); // auto-collapse when out of room
    }
    else {
      document.body.classList.add('toc-inline');
      document.body.classList.remove('toc-sidebar');
      toggle.innerHTML = expandSidebarText;
      if (!skipScroll) {
        window.scrollBy(0, tocNav.offsetHeight);
      }
      if (toggle.matches(':hover')) {
        /* Unfocus button when not using keyboard navigation,
           because I don't know where else to send the focus. */
        toggle.blur();
      }
    }
  }

  function createSidebarToggle() {
    /* Create the sidebar toggle in JS; it shouldn't exist when JS is off. */
    var toggle = document.createElement('a');
      /* This should probably be a button, but appearance isn't standards-track.*/
    toggle.id = 'toc-toggle';
    toggle.class = 'toc-toggle';
    toggle.href = '#toc';
    toggle.innerHTML = collapseSidebarText;

    sidebarMedia.addListener(autoToggle);
    var toggler = function(e) {
      e.preventDefault();
      sidebarMedia.removeListener(autoToggle); // persist explicit off states
      toggleSidebar();
      return false;
    }
    toggle.addEventListener('click', toggler, false);


    /* Get <nav id=toc-nav>, or make it if we don't have one. */
    var tocNav = document.getElementById('toc-nav');
    if (!tocNav) {
      tocNav = document.createElement('p');
      tocNav.id = 'toc-nav';
      /* Prepend for better keyboard navigation */
      document.body.insertBefore(tocNav, document.body.firstChild);
    }
    /* While we're at it, make sure we have a Jump to Toc link. */
    var tocJump = document.getElementById('toc-jump');
    if (!tocJump) {
      tocJump = document.createElement('a');
      tocJump.id = 'toc-jump';
      tocJump.href = '#toc';
      tocJump.innerHTML = tocJumpText;
      tocNav.appendChild(tocJump);
    }

    tocNav.appendChild(toggle);
  }

  var toc = document.getElementById('toc');
  if (toc) {
    if (!document.getElementById('toc-toggle')) {
      createSidebarToggle();
    }
    toggleSidebar(sidebarMedia.matches, true);

    /* If the sidebar has been manually opened and is currently overlaying the text
       (window too small for the MQ to add the margin to body),
       then auto-close the sidebar once you click on something in there. */
    toc.addEventListener('click', function(e) {
      if(document.body.classList.contains('toc-sidebar') && !sidebarMedia.matches) {
        toggleSidebar(false);
      }
    }, false);
  }
  else {
    console.warn("Can't find Table of Contents. Please use <nav id='toc'> around the ToC.");
  }

})();

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