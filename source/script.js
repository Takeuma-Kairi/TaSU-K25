
//ライトかダークか、カラーモードを保存しておく
let isDarkMode = false; //デフォルトのテーマがダークテーマか否か。初期値はfalse
let color_theme = "light"; //現在のテーマはdarkかlightか。初期値はlight

const EVENT_SCRIPT=[
[function(){window.open("stories/Tochino/index.html")}]];



//ページの選択肢ボタンに、clickイベントを配置する。
function make_selection_event(){
  for(let i=0; i<EVENT_SCRIPT.length; i++){
  
  /*よくわからないが、単純にfor文でaddEventListenerを制御しようとすると、ループが終わり切ったカウンタ変数の値しか反映されず、ちっとも動かない様子。
  高階関数でスコープの問題をなんとかするしかない。*/
  
  (function(n){
    //var selectionArr = EVENT_SCRIPT[i];
  
    for(let j=0; j<EVENT_SCRIPT[i].length; j++){
      
      (function(m){document.getElementById("btn_" + i + "_" + j).addEventListener("click",
        function (e) {
          EVENT_SCRIPT[i][j]();
        });
      })(j);
      
    }
    
  })(i);
}
}

window.addEventListener('DOMContentLoaded', () => {

  const darkModeMediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
  isDarkMode = darkModeMediaQuery.matches;

  // 初期状態でどちらのテーマなのかを取得、それに合わせてページのテーマを決める
  color_theme = isDarkMode ? "dark": "light";
  
  document.documentElement.setAttribute("theme", color_theme);
  change_color(color_theme);
  
  
  //スクロール高速化のために必要らしい内容。
  //touchstart？もしくはontouchstartは、スマホでホバーを実現するために入れている。
  document.getElementById("body").addEventListener('touchstart', function(){}, {passive: true});

  
  //get_tag();
  make_selection_event();
});

//カラーテーマの変更
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


