 window.onload = function() {
    function resize_summary(element, new_height) {
      element.style.height = new_height + "px";
    }

    var header_collection = document.querySelectorAll('h2, h3, h4');
    var headers_r2 = document.querySelectorAll('h2');
    var headers_r3 = document.querySelectorAll('h3');
    var headers_r4 = document.querySelectorAll('h4');
    let nav = document.getElementsByTagName("nav")[0];
    for(index = 0; index < header_collection.length; index++) {
        let dot = header_collection[index].innerHTML.lastIndexOf('.');
        header_collection[index].id = "r" + header_collection[index].innerHTML.slice(0, dot);
        let tmp_nav = document.createElement("nav");
        let header_level = Array.from(header_collection[index].innerHTML).filter(x => x === ".").length;
        var temp_r2_pos, temp_r3_pos, temp_r4_pos;
        switch (header_level){
            case 2:
                tmp_nav.className = "nav_header nav_r2";
                tmp_nav.innerHTML = "<ul><li><a href='#r" + header_collection[index].innerHTML.slice(0, dot) + "'>" + header_collection[index].innerHTML + "</a><details><summary></summary></details></li></ul>";
                temp_r2_pos = Array.from(header_collection).indexOf(Array.from(header_collection)[index]);
                tmp_nav.setAttribute("temp_r2_pos", temp_r2_pos);
                nav.append(tmp_nav);
                break;
            case 3:
                tmp_nav = document.createElement("nav");
                tmp_nav.className = "nav_header nav_r3";
                tmp_nav.innerHTML = "<ul><li><a href='#r" + header_collection[index].innerHTML.slice(0, dot) + "'>" + header_collection[index].innerHTML + "</a><details><summary></summary></details></li></ul>";
                temp_r3_pos = Array.from(header_collection).indexOf(Array.from(header_collection)[index]);
                tmp_nav.setAttribute("temp_r3_pos", temp_r3_pos);
                document.querySelector('nav[temp_r2_pos="' + temp_r2_pos + '"] details').append(tmp_nav);
                break;
            case 4:
                tmp_nav = document.createElement("nav");
                tmp_nav.className = "nav_header nav_r4";
                tmp_nav.innerHTML = "<ul><li><a href='#r" + header_collection[index].innerHTML.slice(0, dot) + "'>" + header_collection[index].innerHTML + "</a><details><summary></summary></details></li></ul>";
                temp_r4_pos = Array.from(header_collection).indexOf(Array.from(header_collection)[index]);
                tmp_nav.setAttribute("temp_r4_pos", index);
                document.querySelector('nav[temp_r3_pos="' + temp_r3_pos + '"] details').append(tmp_nav);
                break;
        }
    }
    for(index = 0; index < document.querySelectorAll('.nav_header details').length; index++){
        let empty_header = document.querySelectorAll('.nav_header details').item(index);
        if (empty_header.children.length == 1){
            empty_header.children.item(0).style.visibility = "hidden";
        }
    }
};