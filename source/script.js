const SECTION_ARR = ["page", "item", "setting"];
const BUTTON_ARR = ["icon_page", "icon_item", "icon_setting"];

let isDarkMode = false;
let color_theme = "light";

let page_num = 0;


window.addEventListener('DOMContentLoaded', () => {
  //const checkbox = document.getElementById("chk");

  const darkModeMediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
  isDarkMode = darkModeMediaQuery.matches;

  // 初期状態でどちらのテーマなのかを取得、それに合わせてページのテーマを決める
  color_theme = isDarkMode ? "dark": "light";
  
  document.documentElement.setAttribute("theme", color_theme);
});

function change_color(color){
  color_theme = color;
  
  // ライトかダークか明示されないなら、デフォルトの設定に合わせる
  if(color_theme != "light" && color_theme != "dark"){
    color_theme = isDarkMode ? "dark" : "light";
  }
  
  document.documentElement.setAttribute("theme", color_theme);
  
  // 画像の変更
  document.getElementById("icon_setting").src = "source/icon1_" + color_theme + ".png"
  document.getElementById("icon_page").src = "source/icon2_" + color_theme + ".png"
  document.getElementById("icon_item").src = "source/icon4_" + color_theme + ".png"
  
  let selection_iconArr = document.getElementsByClassName("selection_icon");
  for(i=0; i<selection_iconArr.length; i++){
    selection_iconArr[i].src = "source/icon3_" + color_theme + ".png";
  }
}

// ページと設定のアーティクル切り替え
function change_article(name){
  // いったん全部選択されていない状態にリセットしてから
  SECTION_ARR.map((value)=>{document.getElementById(value).style.display="none"});
  BUTTON_ARR.map((value)=>{document.getElementById(value).className="icon"});
  
  // 個々を選択状態にする
  document.getElementById(name).style.display="inline-block";
  document.getElementById("icon_" + name).className="icon selected";
}



function show_page(){
  page= document.getElementById("page");
  // 初期化
  page.innerHTML="";
  
  now_page = Story["map"][page_num];
  
  // 内容を書き連ねていく
  page_innerHTMLSTR = "";
  
  page_innerHTMLSTR+="<h1>"+ now_page[0] + "</h1>";
  
  for(var i=1; i<now_page.length-1; i++){
    page_innerHTMLSTR+="<p>"+ now_page[i] + "</p>";
  }
  
  selectionArr = now_page.at(-1);
  
  for(var i=0; i<selectionArr.length; i++){
    page_innerHTMLSTR+='<div class="selection_button" onclick ="';
    page_innerHTMLSTR+=selectionArr[i][1];
    page_innerHTMLSTR+='">';
    page_innerHTMLSTR+=selectionArr[i][0];
    page_innerHTMLSTR+='<img class="selection_icon" src="source/icon3_'
    page_innerHTMLSTR+= color_theme;
    page_innerHTMLSTR+='.png"/></div>';
    
  }
  
  page.innerHTML=page_innerHTMLSTR;
}

// ページ移動
function mov(i){
  page_num = i;
  show_page();
}


//アイテムの表示
function item_update(){
  item= document.getElementById("item_div");
  
  itemArr = Story["item"];
  
  item.innerHTML = "";
  
  for(var i=0; i < itemArr.length; i++){
    if(itemArr[i][2]){
      item.innerHTML += "<p class='item_p'> ～ " + itemArr[i][0] + " ～<br>" 
        + itemArr[i][1] + "</p>";
    }
  }
}


//アイテムを持っているか否か
function ifhave(i){
  return(Story["item"][i][2]);
}

//アイテムを得る
function getitem(i){
  Story["item"][i][2]=true;
  item_update();
}
