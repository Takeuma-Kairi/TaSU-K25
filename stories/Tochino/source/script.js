const SECTION_ARR = ["page", "item", "setting"];
const BUTTON_ARR = ["button_page", "button_item", "button_setting"];

//ライトかダークか、カラーモードを保存しておく
let isDarkMode = false; //デフォルトのテーマがダークテーマか否か。初期値はfalse
let color_theme = "light"; //現在のテーマはdarkかlightか。初期値はlight

let page_num = 0;

const STORY_LENGTH=42;

let item_haveArr=[false,false,false,];
let flagArr=[];

let progress_logArr = [];

const TAGARR={"0": 3, 
"1": 4, 
"2": 6, 
"3": 7, 
"4": 9, 
"5": 10, 
"10": 12, 
"11": 13, 
"12": 15, 
"13": 17, 
"14": 18, 
"15": 20, 
"20": 23, 
"21": 25, 
"22": 28, 
"23": 31, 
};

const EVENT_SCRIPT=[
[function(){nxp()}, ],
[function(){nxp()}, ],
[function(){nxp()}, ],
[function(){tob(10)}, function(){if(ifhave(0)){tob(2)}else{tob(1)}}, function(){tob(3)}, ],
[function(){getitem(0);nxp();}, function(){tob(0)}, ],
[function(){tob(0)}, ],
[function(){tob(0)}, ],
[function(){tob(0)}, function(){nxp()}, function(){if(ifhave(1)){tob(4)}else{tob(5)}}, ],
[function(){tob(3)}, ],
[function(){tob(3)}, ],
[function(){getitem(1);nxp();}, function(){tob(3)}, ],
[function(){tob(3)}, ],
[function(){tob(15)}, function(){tob(12)}, function(){tob(11)}, function(){tob(0)}, ],
[function(){nxp()}, function(){tob(10)}, ],
[function(){bcp()}, ],
[function(){if(ifhave(0)){if(ifhave(2)){tob(13)}else{tob(14)}}else{nxp()}}, function(){tob(10)}, ],
[function(){tob(12)}, ],
[function(){tob(12)}, ],
[function(){getitem(2);nxp()}, function(){tob(12)}, ],
[function(){tob(12)}, ],
[function(){nxp()}, ],
[function(){nxp()}, ],
[function(){if(ifhave(1)){if(ifhave(2)){tob(23)}else{tob(21)}}else if(ifhave(2)){tob(22)}else{tob(20)}}, ],
[function(){nxp()}, ],
[function(){restart()}, ],
[function(){nxp()}, ],
[function(){nxp()}, ],
[function(){restart()}, ],
[function(){nxp()}, ],
[function(){nxp()}, ],
[function(){restart()}, ],
[function(){nxp()}, ],
[function(){nxp()}, ],
[function(){nxp()}, ],
[function(){nxp()}, ],
[function(){nxp()}, ],
[function(){nxp()}, ],
[function(){nxp()}, ],
[function(){nxp()}, ],
[function(){nxp()}, ],
[function(){nxp()}, ],
[function(){restart()}, ],
];

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

  make_selection_event();
  
  
  //進捗リセット
  restart();
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
  document.getElementById("icon_setting").src = "../../source/icon1_" + color_theme + ".png?261252"
  document.getElementById("icon_page").src = "../../source/icon2_" + color_theme + ".png?261252"
  document.getElementById("icon_item").src = "../../source/icon4_" + color_theme + ".png?261252"
  
  let selection_iconArr = document.getElementsByClassName("selection_icon");
  for(i=0; i<selection_iconArr.length; i++){
    selection_iconArr[i].src = "../../source/icon3_" + color_theme + ".png?261252";
  }
}


//設定タブの「戻る」ボタン
document.getElementById("return_button").addEventListener("click", () => {
  if (progress_logArr.length <= 1){ //セーブ記録がない場合（初期値）
    alert("戻せません");
  }else{
    
    progress_logArr.shift();
    
    let temp_log = progress_logArr.shift();//セーブ記録の最初の要素が１つ前のセーブデータ
    savedata_load(temp_log[0],temp_log[1],temp_log[2]);
    change_article("page");
  }
});


//設定タブの「最初から始める」ボタン
document.getElementById("restart_button").addEventListener("click", () => {
  var res = confirm("最初から始めますか？進行は保存されません");
  if(res){
    restart();
    change_article("page");
    alert("リセットしました");
    
  }
});



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


// セーブデータをロードするボタン
document.getElementById("save_submit").addEventListener("click", () => {
  var keyword1 = document.getElementById("save_keyword1").value;  //1. ページ番号データ
  document.getElementById("save_keyword1").defaultValue=keyword1;
  
  var keyword2 = document.getElementById("save_keyword2").value;  //2. アイテムデータ
  document.getElementById("save_keyword2").defaultValue=keyword2;
  
  var keyword3 = document.getElementById("save_keyword3").value;  //3. フラグデータ
  document.getElementById("save_keyword3").defaultValue=keyword3;
  
  keyword1Int=parseInt(keyword1);
  keyword2Int=parseInt(keyword2);
  keyword3Int=parseInt(keyword3);
  
  //補正したデータを送る
  savedata_load(keyword1Int, keyword2Int, keyword3Int);
  
});


// セーブデータをロードする。ページ番号、アイテムデータ数字、フラグデータ数字を受け取る
function savedata_load(page1, item2, flag3){
  //空文字だと不適
  if(isNaN(page1) || isNaN(item2)  || isNaN(flag3)){
    alert("セーブデータが不適です。")
  }else{
    mov(page1);
    load_itemdata(item2.toString(2));
    load_flagdata(flag3.toString(2));
    
    change_article("page");
    alert("セーブデータを反映しました。");
  }
}

/*アイテムデータについて
アイテムのセーブデータは10進数で管理していますが、これは2進数がベースです。
たとえば、6種類のアイテム（０，１，２，３，４，５番まである）のうち、１，３番を持っている場合、
001010
のように表記されることを期待します。1がもっていて、0はもっていないという意味です。右からの方向です。
実際は、左の桁の0はカットされて、1010となってしまい、4番、5番のアイテム所持データが消えます。
これを補正するため、load_itemdataでは、桁をひっくり返しておき、ついでに配列にしておきます。

001010 → 010100 → ['0', '1', '0', '1', '0', '0']

左からfor文で走査しながら、アイテムをもっている／もっているの評価をします。
なお、5番目より後のアイテムを考える時、0も1もかいていない状況になり、undefinedなので、それは、もっていない判定にします。

ちなみにこのデータを10進数で表すと「26」です。

なぜ10進数で表すかと言うと、仮に25種類のアイテムを
11001011000111111101
このように持っていた場合、このままの2進数データを覚えるより、
10進数で「831997」としたほうが、覚えやすさがマシだと思ったからです。
*/
//2進数のアイテムセーブデータを読んで、もっている／もっていないを更新する
function load_itemdata(binaryStr){
  dataArr = binaryStr.split("").reverse();
  for(var i=0; i<item_haveArr.length; i++){

    if(dataArr[i] == "1"){
      item_haveArr[i] = true;
    }else{ 
      //"0"があった場合 
      //あと、dataArrの要素オーバーフローでundefinedが返された場合も、もっていない判定
      item_haveArr[i] = false;
    }
  }
  
  item_update();
}

//フラグバージョンのセーブデータ読み込み
function load_flagdata(binaryStr){
  dataArr = binaryStr.split("").reverse();
  for(var i=0; i<flagArr.length; i++){

    if(dataArr[i] == "1"){
      flagArr[i] = true;
    }else{ 
      //"0"があった場合 
      //あと、dataArrの要素オーバーフローでundefinedが返された場合も、false判定
      flagArr[i] = false;
    }
  }
}


// セーブデータを出力する
function savedata_write(){
  // アイテムの二進数化
  var item_binaryStr = "";
  for(var i=0; i<item_haveArr.length; i++){
    if(item_haveArr[i]){
      item_binaryStr = "1" + item_binaryStr;
    }else{
      item_binaryStr = "0" + item_binaryStr;
    }
  }
  
  //フラグの二進数化
  var flag_binaryStr = "";
  for(var i=0; i<flagArr.length; i++){
    if(flagArr[i]){
      flag_binaryStr = "1" + flag_binaryStr;
    }else{
      flag_binaryStr = "0" + flag_binaryStr;
    }
  }
  
  //アイテム、フラグが１つもないと、""となってセーブデータを書き込めなくなるため、かわりに"0"を入れておく
  if(item_binaryStr ==""){
    item_binaryStr ="0";
  }
  
  if(flag_binaryStr ==""){
    flag_binaryStr ="0";
  }
  
  const save_dataArr = [page_num, parseInt(item_binaryStr, 2), parseInt(flag_binaryStr, 2)];
  savedata_write_ui(save_dataArr);
  
  return(save_dataArr);
}


//現在のセーブデータをUIテキストボックスに転記
function savedata_write_ui(save_dataArr){
  document.getElementById("now_save_keyword1").innerText = save_dataArr[0];
  document.getElementById("now_save_keyword2").innerText = save_dataArr[1];
  document.getElementById("now_save_keyword3").innerText = save_dataArr[2];
}


// ページと設定のアーティクル切り替え
function change_article(name){
  // いったん全部選択されていない状態にリセットしてから
  SECTION_ARR.map((value)=>{document.getElementById(value).style.display="none"});
  BUTTON_ARR.map((value)=>{document.getElementById(value).className="tab_button"});
  
  // 個々を選択状態にする
  document.getElementById(name).style.display="inline-block";
  document.getElementById("button_" + name).className="tab_button selected";
  
  //設定ページに飛んだら、セーブデータも表示しておく
  if(name=="setting"){
    savedata_write();
  }
}



// ページ移動
function mov(i){
  //無効なのは、0未満の数字
  if(i < STORY_LENGTH && i>=0){
    document.getElementById("page_" + page_num).className="hidden_page";
    document.getElementById("page_" + i).className="hidden_page open_page";
     
    
    page_num = i;
    
    progress_logArr.unshift(savedata_write());  //セーブデータを更新
  
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
  mov(TAGARR[i]);
}

//アイテムの表示
function item_update(){
  item= document.getElementById("item_div");
  
  
  //アイテムを１つももっていないか否かの判定をする
  ifhave_any_item = false;
  
  for(var i=0; i < item_haveArr.length; i++){
    if(item_haveArr[i]){
      ifhave_any_item = true;
      document.getElementById("item_" + i).className="item_p open_item";
    }else{
      document.getElementById("item_" + i).className="item_p hidden_item";
    }
  }
  
  // 走査しても、何もアイテムを持っていなければ
  if(!ifhave_any_item){
    document.getElementById("noitem").className="item_p open_item";
  }else{
    document.getElementById("noitem").className="item_p hidden_item";
  }
}


//アイテムを持っているか否か
function ifhave(i){
  return(item_haveArr[i]);
}

//アイテムを得る
function getitem(i){
  item_haveArr[i]=true;
  item_update();
}

//アイテムを失う
function loseitem(i){
  item_haveArr[i]=false;
  item_update();
}

//一番初めから再開
function restart(){
  //アイテムを失う
  for(var i=0; i< item_haveArr.length; i++){
    item_haveArr[i] = false;
  }
  item_update();

  mov(0);
}

//フラグが立っているか
function iflag(i){
  return(flagArr[i]);
}

//フラグを立てる
function onflag(i){
  flagArr[i]=true;
}


//フラグをおろす
function offlag(i){
  flagArr[i]=false;
}

