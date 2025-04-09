const SECTION_ARR = ["page", "item", "setting"];
const BUTTON_ARR = ["icon_page", "icon_item", "icon_setting"];

//ライトかダークか、カラーモードを保存しておく
let isDarkMode = false; //デフォルトのテーマがダークテーマか否か。初期値はfalse
let color_theme = "light"; //現在のテーマはdarkかlightか。初期値はlight

let page_num = 0;

// tob用のタグ。連想配列。タグ名:ページ番号
let tagArr = {};


// tob用のタグを得る
function get_tag(){
  for(var i=0; i<Story["map"].length; i++){
    var tagStr = Story["map"][i][0];
    if(tagStr != ""){
      tagArr[Number(tagStr)] = i;
    }
  }
}


window.addEventListener('DOMContentLoaded', () => {

  const darkModeMediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
  isDarkMode = darkModeMediaQuery.matches;

  // 初期状態でどちらのテーマなのかを取得、それに合わせてページのテーマを決める
  color_theme = isDarkMode ? "dark": "light";
  
  document.documentElement.setAttribute("theme", color_theme);
  
  get_tag();
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


//設定タブの「最初から始める」ボタン
document.getElementById("restart_button").addEventListener("click", () => {
  var res = confirm("最初から始めますか？進捗は保存されません");
  if(res){
    restart();
  }
});


// セーブデータをロードするボタン
document.getElementById("save_submit").addEventListener("click", () => {
  var keyword1 = document.getElementById("save_keyword1").value;
  document.getElementById("save_keyword1").defaultValue=keyword1;
  var keyword2 = document.getElementById("save_keyword2").value;
  document.getElementById("save_keyword2").defaultValue=keyword2;
  
  keyword1Int=parseInt(keyword1);
  keyword2Int=parseInt(keyword2);
  
  if(isNaN(keyword1Int) || isNaN(keyword2Int)){
    alert("セーブデータが不適です。")
  }else{
    mov(keyword1Int);
    load_itemdata(keyword2Int.toString(2));
    
    alert("セーブデータを反映しました。");
    change_article("page");
  }
});

/*アイテムデータについて
アイテムのセーブデータは10進数で管理していますが、これは2進数がベースです。
たとえば、6種類のアイテム（０，１，２，３，４，５番まである）のうち、１，３番を持っている場合、
001010
のように表記されることを期待します。1がもっていて、0はもっていないという意味です。
実際は、左の桁の0はカットされて、1010となります。
これを補正するため、load_itemdataでは、桁をひっくり返しておきます。ついでに配列にしておきます。

1010 → 0101 → ['0', '1', '0', '1']

左からfor文で走査しながら、アイテムをもっている／もっているの評価をします。
なお、5番目以降のアイテムを考える時、0も1もかいていない状況になり、undefinedなので、それは、もっていない判定にします。

ちなみにこのデータを10進数で表すと「26」です。

なぜ10進数で表すかと言うと、仮に25種類のアイテムを
11001011000111111101
このように持っていた場合、このままの2進数データを覚えるより、
10進数で「831997」としたほうが、覚えやすさがマシだからです。

ちなみに16進数では「CB1FD」です。アルファベットも登場するとなると覚えづらいと思います。
*/
//2進数のアイテムセーブデータを読んで、もっている／もっていないを更新する
function load_itemdata(binaryStr){
  dataArr = binaryStr.split("").reverse();
  for(var i=0; i<Story["item"].length; i++){

    if(dataArr[i] == "1"){
      Story["item"][i][2] = true;
    }else{ 
      //"0"があった場合 
      //あと、dataArrの要素オーバーフローでundefinedが返された場合も、もっていない判定
      Story["item"][i][2] = false;
    }
  }
  
  item_update();
}


// 現在のセーブデータを出力する
function savedata_write(){
  var item_binaryStr = "";
  for(var i=0; i<Story["item"].length; i++){
    if(Story["item"][i][2]){
      item_binaryStr = "1" + item_binaryStr;
    }else{
      item_binaryStr = "0" + item_binaryStr;
    }
  }
  
  document.getElementById("now_save_keyword1").innerText = page_num;
  document.getElementById("now_save_keyword2").innerText = parseInt(item_binaryStr, 2);
}



// ページと設定のアーティクル切り替え
function change_article(name){
  // いったん全部選択されていない状態にリセットしてから
  SECTION_ARR.map((value)=>{document.getElementById(value).style.display="none"});
  BUTTON_ARR.map((value)=>{document.getElementById(value).className="icon"});
  
  // 個々を選択状態にする
  document.getElementById(name).style.display="inline-block";
  document.getElementById("icon_" + name).className="icon selected";
  
  //設定ページに飛んだら、セーブデータも表示しておく
  if(name=="setting"){
    savedata_write();
  }
}



function show_page(){
  page= document.getElementById("page");
  // 初期化
  page.innerHTML="";
  
  now_page = Story["map"][page_num];
  
  // 内容を書き連ねていく
  page_innerHTMLSTR = "";
  
    //タイトル
  page_innerHTMLSTR+="<h1>"+ now_page[1] + "</h1>";
  
    //描写文
  for(var i=2; i<now_page.length-1; i++){
    page_innerHTMLSTR+="<p class='page_p'>"+ now_page[i] + "</p>";
  }
  
    //一番最後の要素が選択肢
  selectionArr = now_page.at(-1);
  
    //選択肢
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
  //無効なのは、0未満の数字
  if(i < Story["map"].length && i>=0){
  page_num = i;
  show_page();
  }else{
    alert("エラー：存在しないページに飛ぼうとしています！");
  }
}

//次のページへ
function nxp(){
  mov(page_num+1);
}

//前のページへ
function bcp(){
  mov(page_num-1);
}

//タグ番号で飛ぶ
function tob(i){
  mov(tagArr[i]);
}

//アイテムの表示
function item_update(){
  item= document.getElementById("item_div");
  
  itemArr = Story["item"];
  
  item.innerHTML = "";
  
  //アイテムを１つももっていないか否かの判定をする
  ifhave_any_item = false;
  
  for(var i=0; i < itemArr.length; i++){
    if(itemArr[i][2]){
      ifhave_any_item = true;
      item.innerHTML += "<p class='item_p'> ----[  " + itemArr[i][0] + "  ]----<br>" 
        + itemArr[i][1] + "</p>";
    }
  }
  
  // 走査しても、何もアイテムを持っていなければ
  if(!ifhave_any_item){
    item.innerHTML = "<p class='item_p'>特に何も持っていません</p>";
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

//一番初めから再開
function restart(){
  //アイテムを失う
  for(var i=0; i<Story["item"].length; i++){
    Story["item"][i][2] = false;
  }
  item_update();

  mov(0);
}

