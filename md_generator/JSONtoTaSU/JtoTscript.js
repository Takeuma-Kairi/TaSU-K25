//ユーザー側のキャッシュで、画像やファイルリンクが更新されないのを防ぐため、以下の文章を末尾につける
//例： script.js?26125

const CACHE_TAIL="?" + "26126";

//#######################################################
//HTMLとJSのコードを作るうえでの定型文。けっこう大量にあります
const HTML1 = `<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>TaSU-K25 4.3</title>
  <link rel="stylesheet" href="../../source/style.css` + CACHE_TAIL + `">
  
  
  <!-- ファビコン -->
  <link rel="icon" href="../../source/favicon.ico` + CACHE_TAIL + `">
  <link rel="apple-touch-icon" href="../../source/apple-touch-icon-180x180.png` + CACHE_TAIL + `" sizes="180x180">
  <link rel="icon" href="../../source/favicon.png` + CACHE_TAIL + `">
</head>

<body id="body">


<header>
  <div class="buttons">
    <button id="button_page" class="tab_button selected" onclick='change_article("page")'>
    
      <svg class="icon"><use href="#page_icon_svg"></use></svg>
      STORY
    </button>
    
    <button id="button_item" class="tab_button" onclick='change_article("item")'>
      <svg class="icon"><use href="#item_icon_svg"></use></svg>
      ITEM
    </button>
    
    <button id="button_setting" class="tab_button" onclick='change_article("setting")'>
      <svg class="icon"><use href="#option_icon_svg"></use></svg>
      OPTION
    </button>
  </div>
</header>

  <main>
    <section id="page">
    
`;

//==========================================
const HTML2=`</section>

    <section id="item">
      <h1>アイテム</h1>
      <div id="item_div" class="item_div">
`;

//==========================================
const HTML3=`</div>
    </section>
  
    <section id="setting">
      <h1>設定</h1>
      
      <p class="setting_p">
        <h2>一つ戻る</h2>
        <label>戻る：
          <button id="return_button">Return</button>
        </label>
      </p>
      
      <p class="setting_p">
        <h2>最初から始める</h2>
        <label>リセット：
          <button id="restart_button">Reset</button>
        </label>
      </p>
      
      <p class="setting_p">
        <h2>カラーテーマ</h2>
        <label>カラーテーマ：
          <select size="1" name="sample" onchange="change_color(this.value)">
            <option value="default" selected>デバイスに合わせる</option>
            <option value="light">ライト</option>
            <option value="dark">ダーク</option>
          </select>
        </label>
      </p>
      
      <p class="setting_p">
        <h2>セーブ</h2>
        <h3>現在のセーブデータ</h3>
          <p>
            キー①：
            <span id="now_save_keyword1"></span>
            ／ キー②：<span id="now_save_keyword2"></span>
            ／ キー③：<span id="now_save_keyword3"></span>
          </p>
          <p>       現在のゲーム進行を保存したいとき、上の3種類のキーを覚えていてください。下のフォームに入力し、送信ボタンを押すと、データがロードされます。※キーワードは半角英数で書いてください。
          </p>
        </p>
        
        <p>
          <h3>データのロード</h3>
          <p>
          <label>キー①：
            <input type="text" required id="save_keyword1"></input>
          </label>
          </p>
          
          
          <p>
          <label>キー②：
            <input type="text" required id="save_keyword2"></input>
          </label>
          </p>
                    
          <p>
          <label>キー③：
            <input type="text" required id="save_keyword3"></input>
          </label>
          </p>
          
          <p>
          <label>確定：
            <input type="submit" id="save_submit"/>
          </label>
          </p>
        </p>
        
        <hr>
        <p class="italic_p">`

//==========================================
const HTML4=`</p>
      
    </section>
  
  </main>

  
<!-- アイコンに使うSVG。表示しないが、あとで<use>する -->

<!-- STORY -->
<svg xmlns="http://www.w3.org/2000/svg" version="1.1"  width="48" height="48" viewbox="0 0 48 48" >
<symbol viewbox="0 0 48 48" id="page_icon_svg">
<path class="icon_svg" d="M8.572891 47.395075c-.12864-.0788-.64624-.61324-1.15021-1.1877l-.91631-1.04445v-15.25974c0-13.97574.0104-15.27739.12311-15.46947.1749-.29792 13.77253-13.61315106 14.07252-13.78025106.23227-.12938.84115-.13816 9.59269-.13828l9.34466-.0001.76932.84940996c.42313.46717.88487.98866 1.0261 1.15887l.25678.30948V45.131805l-.93463 1.06001c-.51405.58301-1.00619 1.10014-1.09364 1.14916-.11563.0648-4.34702.10388-15.50776.14322-14.73586.0519-15.35806.0484-15.58263-.0892zm30.81025-2.38585.53595-.62282V3.5180739l-.53754-.59285-.53757-.59284-2.61138.00006c-1.43626.00003-5.13148.0236-8.2116.0525l-5.60022.0524V15.446165l-.22007.25804-.22007.25804-6.813191.0395-6.813199.0395-.0191 14.21046-.0191 14.21046.4997.58491.49971.58491h29.53164zm-26.71882-6.25195c-.32641-.30023-.40784-.67822-.23047-1.0698.24945-.55071-.5848-.50954 11.43957-.56446 10.02977-.0459 10.89793-.0395 11.11969.081.34241.18602.47598.42574.47598.85422 0 .30564-.0393.41254-.22173.6037-.12197.12776-.32984.25494-.46198.28262-.13212.0277-5.10529.0504-11.05149.0504h-10.81125zm.21535-7.85521c-.37861-.17243-.52796-.41078-.52796-.84255 0-.32975.0356-.42246.24657-.64357l.24657-.25831 11.05494-.0205 11.05493-.0205.25719.26944c.21583.2261.25718.32615.25718.62223 0 .40464-.18125.70204-.50655.83113-.14186.0562-3.72096.0967-11.03329.12454-8.799911.0335-10.86561.022-11.04958-.0618zm.045-8.60006c-.68795-.37038-.64087-1.43032.0753-1.69317.19426-.0713 2.912169-.0954 11.14435-.0988l10.88741-.005.25644.26865c.21889.2293.25644.32302.25644.64 0 .31382-.038.41104-.24512.62729l-.24513.25591-3.19902.0522c-5.81529.0949-18.72603.0624-18.93058-.0477zm11.38146-8.81676c-.28522-.2988-.35447-.70059-.18516-1.07438.24481-.54045-.007-.51779 5.75948-.51779 3.87439 0 5.25498.0241 5.4022.0944.25653.12244.41272.44705.41272.85774 0 .26753-.0472.37733-.25644.59653l-.25644.26865h-10.66144zm-3.63842-4.8187511c.011-3.11476-.009-5.46704-.0467-5.45196-.0754.0303-11.1730597 10.8988911-11.1730597 10.9424911 0 .0157 2.5200897.0194 5.6002087.008l5.600211-.0203z"/>
</symbol>
</svg>

<!-- ITEM -->
<svg xmlns="http://www.w3.org/2000/svg"  version="1.1"  width="48" height="48" viewbox="0 0 48 48" >
<symbol viewbox="0 0 48 48" id="item_icon_svg">
<path class="icon_svg" d="M.005 28.85v-16h10v32h-10Zm14 0v-16h20v32h-20zm24 0v-16h10v32h-10zM16.02 8.1l.015-1.75 1.113-2.113 1.814-1.454 4.402-.098 5.28-.053 2.021 1.548 1.247 1.812-.031 1.898-.013 2.342H28.02l-.222-2.41-.73-.973h-6.126l-.751.864-.444 2.488H15.96z"/>
</symbol>
</svg>

<!-- OPTION -->
<svg xmlns="http://www.w3.org/2000/svg"  version="1.1" width="48" height="48" viewbox="0 0 12.7 12.7" >
<symbol viewbox="0 0 12.7 12.7" id="option_icon_svg">
<g id="layer1" transform="translate(-.02262653 -.02625039)">
<g id="g1" transform="translate(-3.369 -3.198) scale(.26458)">
<path class="icon_svg" d="M32.807413 57.635656c-1.26687-2.480609-.48811-3.865096-1.53475-4.207716-.57564-.18844-1.55748-.589426-2.18184-.891079-1.13521-.548462-1.91397.836024-4.55492 1.707118-2.64094.871091-2.64094.871091-4.64298-1.130949-2.00204-2.002041-2.00204-2.002041-1.13105-4.642999.87098-2.640959 2.34198-3.209587 1.73762-4.432038-.33239-.672348-.74083-1.654845-.90761-2.183326-.30327-.960878-1.77427-.392249-4.23843-1.62195s-2.46416-1.229701-2.46416-4.046636c0-2.816933 0-2.816933 2.4911-4.047502 2.4911-1.23057 3.91266-.56305 4.28543-1.689168.20502-.619365.60739-1.589991.89418-2.156947.52142-1.03083-.90014-1.69835-1.78463-4.364214-.88449-2.665864-.88449-2.665864 1.11788-4.668228 2.00234-2.002365 2.00234-2.002365 4.61098-1.1356 2.60862.866765 3.28851 2.449035 4.58737 1.846154.71439-.331585 1.71157-.738535 2.21596-.904334.91705-.301453.23717-1.883723 1.46625-4.346642 1.22907-2.462917 1.22907-2.462917 4.04872-2.462917 2.81967 0 2.81967 0 3.98998 2.437202 1.1703 2.437204.41625 3.834052 1.52656 4.228217.61066.216791 1.63248.635413 2.27069.930271 1.1604.536105 1.91444-.860742 4.52374-1.727729 2.60929-.866987 2.60929-.866987 4.61197 1.135701 2.00268 2.002686 2.00268 2.002686 1.13144 4.624799-.87124 2.622112-2.40405 3.067125-1.93001 4.008463.26074.517736.77181 1.609731 1.01487 2.305788.44193 1.265558 1.87586.721653 4.33159 1.89676 2.45574 1.175108 2.45574 1.175108 2.45574 4.007142 0 2.832035 0 2.832035-2.42895 4.044169-2.42895 1.212133-4.13484.779481-4.38874 1.60657-.13964.454899-.54714 1.484905-.90554 2.288901-.65165 1.461812 1.05424 1.894463 1.92485 4.514719.87063 2.620255.87063 2.620255-1.09794 4.588835-1.96858 1.968579-1.96858 1.968579-4.63419 1.08417-2.6656-.884409-3.5309-2.293618-4.63236-1.740341-.6058.304302-1.59763.729211-2.20407.944244-1.10262.390966-.23732 1.800175-1.45545 4.241153-1.21811 2.440977-1.21811 2.440977-4.03527 2.440762-2.81714-.000281-2.81714-.000281-4.08403-2.480823zm6.70313-13.457724c5.99275-2.19746 7.68344-9.478264 3.22887-13.904765-5.34897-5.31524-14.34207-1.560763-14.36363 5.996577-.0159 5.55795 5.96331 9.804492 11.13476 7.908188z"/></g></g></svg>
</symbol>
</svg>

<!-- 選択肢 -->
<svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="48" height="48" viewbox="0 0 12.7 12.7" >
<symbol viewbox="0 0 48 48" id="selection_icon_svg">
<g id="g1" transform="translate(.97312396 .97353964) scale(.95946)">
<path class="icon_svg" d="M20.445 47.816C-8.848 40.943-5.768.02 24.042.02c30.286 0 32.646 43.87 2.569 47.748-2.261.292-5.036.313-6.166.048m7.735-30.56-6.613-6.654-2.379 2.23-2.38 2.229 4.345 4.415 4.344 4.416-4.319 4.39-4.32 4.39 2.289 2.282 2.288 2.282 6.678-6.662 6.68-6.662z"/></g>
</symbol>
</svg>


</body>

<!-- scriptは、body以下においておかないと、addEventListenerがうまくはたらかない -->
  <script src="source/script.js` + CACHE_TAIL + `"></script>
</html>`;

//==========================================

const JS1 = `const SECTION_ARR = ["page", "item", "setting"];
const BUTTON_ARR = ["button_page", "button_item", "button_setting"];

//ライトかダークか、カラーモードを保存しておく
let isDarkMode = false; //デフォルトのテーマがダークテーマか否か。初期値はfalse
let color_theme = "light"; //現在のテーマはdarkかlightか。初期値はlight

let page_num = 0;

`;

//==========================================
const JS2 = `window.addEventListener('DOMContentLoaded', () => {

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

`;

//===============================================
let Story={};

// tob用のタグ。連想配列。タグ名:ページ番号
let tagArr = {};

//出来上がった内容を記す場所
const CODE_FIELD= document.getElementById("code_field");

const fileInput = document.getElementById("JSONfileselect");

//マークダウンファイルを読み込む
fileInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();

        reader.onload = () => {
          Story= JSON.parse(reader.result);
        };
        
        reader.readAsText(file);
      });

//####################################################
function code_story(){
  // 初期化
  CODE_FIELD.innerHTML="";
  
  
  // 内容を書き連ねていく
  let page_innerHTMLSTR = HTML1;
  
  //MAP内の各ページを文章化
  for(var j=0; j<Story["map"].length; j++){
    now_page = Story["map"][j];
  
    //ページのタイトル
    page_innerHTMLSTR+="<div id='page_" + j + "' class='hidden_page" + (j==0 ? " open_page" : "") + "'>\n"
    page_innerHTMLSTR+="<h1 class='page_passage_animation'>"+ now_page["name"] + "</h1>\n";
    
      //描写文
    for(var i=0; i<now_page["description"].length; i++){
      if(now_page["description"][i] == "makespace"){
        //makespace=空白行
        page_innerHTMLSTR+="\t<div class='makespace'></div>\n";
      }else{
        page_innerHTMLSTR+="\t<p class='page_passage_animation'>" + now_page["description"][i] + "</p>\n";
      }
    }    
  
  
  //一番最後の要素が選択肢
  selectionArr = now_page["selection"];
  
  //選択肢
  page_innerHTMLSTR+='\t<div class="buttons_centering">\n\t\t';
  
  for(var i=0; i<selectionArr.length; i++){
    page_innerHTMLSTR+='<button class="selection_button" id="';
    page_innerHTMLSTR+='btn_' + j + '_' + i;
    page_innerHTMLSTR+='">';
    page_innerHTMLSTR+=selectionArr[i]["name"];
    page_innerHTMLSTR+='\n\t\t<svg class="icon selection_icon"><use href="#selection_icon_svg"></use></svg></button>\n';
  }
    page_innerHTMLSTR+='\t</div>\n</div>\n\n';
  }

  page_innerHTMLSTR+=HTML2;
  
  //アイテム============================================
  let itemArr = Story["item"];
  
  
  let item_innerHTMLSTR = "<p id='noitem' class='item_p open_item'>特に何も持っていません</p>\n\n";
  
  for(var i=0; i < itemArr.length; i++){
    item_innerHTMLSTR += "<div id='item_" + i + "' class='item_p hidden_item'>\n"
    + "<table class='table_item'>\n"
    + "<tr><td rowspan='2' class='item_img_td'>\n"
    + "<img src='source/" + itemArr[i]['img'] + "' alt='" + itemArr[i]['name'] + "' class='item_img'/></td>\n" 
    + "<td class='item_name_td'>" + itemArr[i]['name'] + "</td></tr>\n"
    + "<td>\n" + itemArr[i]['explain'] 
    + "</td></tr>\n</table>\n</div>\n\n";
  }
  
  page_innerHTMLSTR+=item_innerHTMLSTR; 


  page_innerHTMLSTR+=HTML3;
  page_innerHTMLSTR+=Story["id"];
  page_innerHTMLSTR+=HTML4;
  CODE_FIELD.innerText=page_innerHTMLSTR;
}

//=======================================
function code_item(){
  
  // 初期化
  CODE_FIELD.innerHTML="";
  
  // 内容を書き連ねていく
  let js_script = JS1;
  
  
  //~~~ストーリーの長さ~~~
  js_script += "const STORY_LENGTH=" + Story["map"].length + ";\n\n";
  
  
  //~~~アイテムは最初すべて持っていない(false)~~~
  let item_have = "let item_haveArr=[";
  for(var i=0; i < Story["item"].length; i++){
    item_have += "false,";
  }
  item_have += "];\n";
  
  js_script += item_have;
  
    
  //~~~フラグは、最初すべてfalse~~~
  let flag_Arr = "let flagArr=[";
  for(var i=0; i < Number(Story["flag"]); i++){
    flag_Arr += "false,";
  }
  flag_Arr += "];\n\n";
  
  js_script += flag_Arr;
  
  
  //~~~「戻る」用のパンくずリスト配列~~~
  js_script += "let progress_logArr = [];\n\n";
  
  //~~~GOTOタグ~~~
  let tagDicSTR = "const TAGARR={";
  
  for(var i=0; i<Story["map"].length; i++){
    var tagStr = Story["map"][i]["tag"];
    
    if(tagStr != ""){
      tagDicSTR += '"' + tagStr + '": ' + i + ', \n';
    }
  }

  tagDicSTR += '};\n\n';
  
  js_script += tagDicSTR;
  
  
  //~~~選択肢が押されたときの動作~~~
  let event_script = "const EVENT_SCRIPT=[\n";
  
  for(var i=0; i<Story["map"].length; i++){
    var selectionArr = Story["map"][i]["selection"];
    
    event_script += '[';
    for(var j=0; j<selectionArr.length; j++){
      event_script += "function(){" + selectionArr[j]["code"] + "}, ";
    }
    event_script += '],\n';
    
  }
  event_script += '];\n\n';
  
  js_script += event_script;
  
  js_script += JS2;
  
  
  CODE_FIELD.innerText = js_script;
}

//=======================================
//クリップボードにコピー
function code_copy(){
  
  navigator.clipboard.writeText(CODE_FIELD.innerText).then(
    () => {
      alert("コピーしました");
    },
    () => {
      alert("ブラウザーがコピー機能に対応していないため、失敗しました。手動でコピペしてください。");
    },
  );
}