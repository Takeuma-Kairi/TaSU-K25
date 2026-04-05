const fileInput = document.getElementById("fileselect");
const outputdiv = document.getElementById("output");  //結果を書きだすdiv


//マークダウンファイルを読み込む
fileInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();

        reader.onload = () => {
          outputdiv.innerText = JSON_scripting(reader.result);
        };
        
        reader.readAsText(file);
      });


function JSON_scripting(filetxt){
  let StoryDic={id:"", flag: 0, item :[], minimap:[], map: []};
  
  //このストーリーにミニマップが用意されているかの判定
  let if_minimap_prepared = false;
  
  
  //改行で区切って配列にする
  const TEXTARR = filetxt.split(/\r?\n/);
  
  //いまどのようなデータを見ているのかを記憶しておくためのモードの例を定数で。
  //数字は順序データとかではなく、意味はない。
  //こんなに種類はあるが、今見ている部分がストーリーの描写文か否かの判定にしか使っていない。
  const ITEM_MODE = 1;  //アイテム
  const MAP_MODE = 2;   //マップ
  const SELECTION_MODE = 3; //ページ内選択肢
  const TITLE_MODE = 4; //ページタイトル
  const DESCRIPTION_MODE = 5; //ページ描写文
  const ID_MODE = 6;
  const FLAG_MODE = 7;
  
  //暫定的に、初期値は0にしておく。
  let insertmode = 0;
  
  for(var i=0; i<TEXTARR.length; i++){
    //lineにその行の文字列が入る
    line = TEXTARR[i];
    
    //いま見ている最後のページ要素
    let last_page = StoryDic["map"][StoryDic["map"].length-1];
    
    //ストーリーの描写文
    if (line.match(/# ID/)){
      insertmode=ID_MODE;
      
    }else if(line.match(/# FLAG/)){
      insertmode=FLAG_MODE;
      
    //アイテム
    }else if(line.match(/# ITEM/)){
      insertmode = ITEM_MODE;
      
    //アイテムの追加
    }else if(line.match(/[0-9]+\. (.+?)>>(.+?)>>(.+)/)){
      StoryDic["item"].push({name: RegExp.$1, explain: RegExp.$2, have:false, img: RegExp.$3});
      
	
    //アイテム
    }else if(line.match(/# MINIMAP_PREPARED/)){
		if_minimap_prepared = true;
		
    //マップの開始
    }else if(line.match(/# MAP/)){
      insertmode = MAP_MODE;

    
    //ページの始まり
      //タグ付き
    }else if (line.match(/## (.+?)\[(.+)\]/)){
      insertmode = TITLE_MODE;
      StoryDic["map"].push({name:"", tag:"", description:[], selection:[]});
      last_page = StoryDic["map"][StoryDic["map"].length-1];
      last_page["name"] = RegExp.$1;
      last_page["tag"] = RegExp.$2;
     
      //タグ無し
    }else if(line.match(/## (.+)/)){
      insertmode =  TITLE_MODE;
      StoryDic["map"].push({name:"", tag:"", description:[], selection:[]});
      last_page = StoryDic["map"][StoryDic["map"].length-1];
      last_page["name"] = RegExp.$1;

    
    //選択肢
    }else if(line.match(/- (.+?)>>(.+)/)){
      if(insertmode != SELECTION_MODE){
        insertmode = SELECTION_MODE
      }
      
      last_page["selection"].push({name: RegExp.$1, code:RegExp.$2});

    //ミニマップ
	//背景画像指定
    }else if(line.match(/\* (.+)m(.+)/)){
		StoryDic["minimap"].push(new Array(parseInt(RegExp.$2), parseInt(RegExp.$1)));
		
	//ミニマップ
	//背景画像指定の省略(既定のものを自動で選択)
	}else if(line.match(/\* (.+)/)) {
		StoryDic["minimap"].push(new Array(1, parseInt(RegExp.$1)));
		
    }else if(insertmode == ID_MODE){
      StoryDic["id"] += line;
    
    }else if(insertmode == FLAG_MODE){
      console.log(line);
      if(line!= "" && !isNaN(line)){ //数字（フラグ数を示す）かどうかを判定
        StoryDic["flag"] = line;
      }
    //ストーリーの描写文
    }else if(insertmode == DESCRIPTION_MODE || insertmode == TITLE_MODE){
      insertmode = DESCRIPTION_MODE;
      last_page["description"].push(line);
    }

  }
  
  console.log(StoryDic);
  
  return StoryDic_stringfy(StoryDic);
}

//そのままだと読みづらいので、整形してJSONファイルにする。
function StoryDic_stringfy(StoryDic){
  ans = JSON.stringify(StoryDic,null, "  ");
  return(ans);
}


//=======================================
//クリップボードにコピー
function code_copy(){
  
  navigator.clipboard.writeText(outputdiv.innerText).then(
    () => {
      alert("コピーしました");
    },
    () => {
      alert("ブラウザーがコピー機能に対応していないため、失敗しました。手動でコピペしてください。");
    },
  );
}