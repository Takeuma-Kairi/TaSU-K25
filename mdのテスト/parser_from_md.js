//====================
//たぶん未完成！出力はできるが、未テスト
//====================

const fileInput = document.getElementById("fileselect");
const outputdiv = document.getElementById("output");  //結果を書きだすdiv




//マークダウンファイルを読み込む
fileInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();

        reader.onload = () => {
          outputdiv.innerText = Dict_scripting(reader.result);
        };
        
        reader.readAsText(file);
      });


function Dict_scripting(filetxt){
  //let ans = ""; //ここに答えが入る。しかし、先にデータ形式にしてから文字列にすればいいのか？
  let StoryDic={item :[], map: []};
  
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
  
  //とりあえず最初はITEM_MODEか。
  let insertmode = ITEM_MODE;
  
  for(var i=0; i<TEXTARR.length; i++){
    //lineにその行の文字列が入る
    line = TEXTARR[i];
    
    //いま見ている最後のページ要素
    let last_page = StoryDic["map"][StoryDic["map"].length-1];
    
    //アイテム
    if(line.match(/# item/)){
      insertmode = ITEM_MODE;
      
    //アイテムの追加
    }else if(line.match(/[0-9]+\. (.+?)>>(.+)/)){
      StoryDic["item"].push({name: RegExp.$1, explain: RegExp.$2, have:false});
      
    //マップの開始
    }else if(line.match(/# map/)){
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

    //ストーリーの描写文
    }else if(insertmode == DESCRIPTION_MODE || insertmode == TITLE_MODE){
      insertmode = DESCRIPTION_MODE;
      last_page["description"].push(line);
    }

  }
  
  console.log(StoryDic);
  
  //いちおう、文字列としても残す。
  return StoryDic_stringfy(StoryDic);
}

//そのままだと読みづらいので、適度に改行を入れる。
function StoryDic_stringfy(StoryDic){
  ans = JSON.stringify(StoryDic);

  ans =ans.replace(/\{"name"/g, '\n{"name"');
  ans =ans.replace(/"map"/g, '\n\n"map"');
  ans =ans.replace(/}\]},/g, '}]},\n')
  alert(1);
  return(ans);
}

