//出来上がった内容を記す場所
const CODE_FIELD= document.getElementById("code_field");

//ファイル
const fileInput = document.getElementById("JSONfileselect");

fileInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();

        reader.onload = () => {
          Story= JSON.parse(reader.result);
        };
        
        reader.readAsText(file);
      });
 

//=======================================================
function code_btap(){
  // 初期化
  CODE_FIELD.innerHTML="";
  
  // 内容を書き連ねていく。まずは<flag:フラグ数><item:アイテム数>から
  let page_innerHTMLSTR = 
    "<flag:" + Story["flag"] + ">\n"
    + "<item:" + Story["item"].length + ">\n" ;
  
  
  //アイテムについて。
  // [アイテム番号]アイテム名#説明文
  //にする。
  for(var j=0; j<Story["item"].length; j++){
    temp_item = Story["item"][j];
    
    page_innerHTMLSTR += "[" + j + "]" + 
      temp_item["name"] + "#" +
      temp_item["explain"] + "\n";
  }
  
  
  //アイテム終了。
  //</item>
  //<BFmap:ページ数>
  page_innerHTMLSTR += "</item>\n\n<BFmap:" + 
  Story["map"].length + ">\n";
  
  //MAP内の各ページを文章化
  for(var j=0; j<Story["map"].length; j++){
    temp_page = Story["map"][j];
  
    //タグは、===タグ名===に変更し、そのページの前に置く
    if(temp_page["tag"] != ""){
      page_innerHTMLSTR+= "===" + temp_page["tag"] + "===\n";
    }
    
    //ページのタイトル
    // [タイトル
    page_innerHTMLSTR+="[" + 
      temp_page["name"] + "\n";
      
    //描写文。makespaceを改行に直す
    for(var k=0; k<temp_page["description"].length; k++){
      temp_description = temp_page["description"][k];
      if(temp_description == "makespace"){
        page_innerHTMLSTR += "\n\n";
      }else{
        page_innerHTMLSTR+= temp_description + "\n";
      }
    }
    
    //選択肢
    //s:選択肢名#コード
    for(var k=0; k<temp_page["selection"].length; k++){
      temp_selection = temp_page["selection"][k];
      
      var temp_code = temp_selection["code"];
      
      /* コードを、BTAPの形式になおす。nxpくらいなら逆導入してもいいかも? */
      temp_code = temp_code.replace(/nxp\(\)/g, "mov(" + (j + 1) + ")"); 
      temp_code = temp_code.replace(/bcp\(\)/g, "mov(" + (j - 1) + ")"); 
      temp_code = temp_code.replace(/getitem/g, "geti"); 
      temp_code = temp_code.replace(/ifhave/g, "hav"); 
      temp_code = temp_code.replace(/restart/g, "fromScratch"); 
      
      /* restrartはBTAPでフォローされていないので注意！ */
      
      page_innerHTMLSTR += "s:" 
        + temp_selection["name"] + "#" 
        + temp_code + "\n";
    }
    
    
    page_innerHTMLSTR += "bf]\n\n" 
    //ページ終わり
  }
  
  page_innerHTMLSTR += "</map>\n<end>";
  
  
  //HTMLに転記して終了
  CODE_FIELD.innerText=page_innerHTMLSTR;
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