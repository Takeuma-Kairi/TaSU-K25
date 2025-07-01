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
  let ans = ""; //ここに答えが入る。しかし、先にデータ形式にしてから文字列にすればいいのか？
  
  //改行で区切って配列にする
  const TEXTARR = filetxt.split(/\r?\n/);
  
  //いまどのようなデータを見ているのかを記憶しておくためのモードの例を定数で。
  //数字は順序データとかではなく、意味はない
  const ITEM_MODE = 1;
  const MAP_MODE = 2;
  const SELECTION_MODE = 3;
  const TITLE_MODE = 4;
  const DESCRIPTION_MODE = 5;
  
  //とりあえず最初はITEM_MODEか。
  let insertmode = ITEM_MODE;
  
  for(var i=0; i<TEXTARR.length; i++){
    //lineにその行の文字列が入る
    line = TEXTARR[i];
    
    //アイテム
    if(line.match(/# item/)){
      insertmode = ITEM_MODE;
      ans += "{item: [\n";
      continue
    }
    
    //アイテムの追加
    if(line.match(/[0-9]+\. (.+?)>>(.+)/)){
      ans += "{name: " + RegExp.$1 + ", explain: " +  RegExp.$2 + ",have: false},\n";
      continue
    }
    
    //マップの開始
    if(line.match(/# map/)){
      insertmode = MAP_MODE;
      ans += "], \n\nmap: \[\n";
      continue
    }
    
    //ページの始まり
      //タグ付き
    if(line.match(/## (.+?)\[(.+)\]/)){
      if(insertmode == SELECTION_MODE){ //直前に選択肢があったら、終わらせる
        ans += "]\n\n";
      }
      insertmode = TITLE_MODE;
      ans += '\n{tag: "' + RegExp.$2 + '",name:"' + RegExp.$1+ '",\n';
      continue
      
      //タグ無し
    }else if(line.match(/## (.+)/)){
      if(insertmode == SELECTION_MODE){ //直前に選択肢があったら、終わらせる
        ans += "]\n\n";
      }
      insertmode =  TITLE_MODE;
      ans += '\n{tag:""' + ',name: "' + RegExp.$1 + '",\n';
      continue
    }
    
    //選択肢
    if(line.match(/- (.+?)>>(.+)/)){
      if(insertmode != SELECTION_MODE){
        insertmode = SELECTION_MODE
        ans += "] \n,selection: ["; //選択肢の入りならば、ここから
      }
      ans += "[name: " + RegExp.$1 + ", code: " +  RegExp.$2 + "],\n";
      continue
    }
    
    //どれでもない。つまり、ページの描写内容
    if(insertmode == DESCRIPTION_MODE){
      ans+= '"' + line + '",';
      continue
    }else if(insertmode == TITLE_MODE){
      insertmode = DESCRIPTION_MODE;
      ans+= "description: [";//描写の入りならば、ここから
      continue
    }
         
  }
  
  return ans;
}
    