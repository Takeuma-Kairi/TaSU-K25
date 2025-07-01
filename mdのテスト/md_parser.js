function mdmake(){
  let md_doc = "# item\n";  //アイテムから始める
  
  for(var i=0; i<Story["item"].length; i++){
    let temp_item=Story["item"][i];
    md_doc += i + ". " + temp_item[0] + ">>" + temp_item[1] + "\n";
    // アイテム番号. アイテム名>>説明文
  }

  md_doc += "\n# map\n";  //マップ

  for(var i=0; i<Story["map"].length; i++){
    let temp_map=Story["map"][i];
    md_doc += "\n## " + temp_map[1];  //ページのタイトル
    
    if(temp_map[0] != "") { //Gotoタブがあるなら、タイトルの後ろに[]付きでつける
      md_doc += "[" + temp_map[0] + "]\n"
    }else{
      md_doc += "\n";
    }

     for(var j=2; j<temp_map.length-1; j++){  //マップの描写文
      md_doc += temp_map[j] + "\n";
    }

    for(var k=0; k<temp_map[temp_map.length - 1].length; k++){  //選択肢。ページの最終要素

      let temp_sel_name = temp_map[temp_map.length - 1][k][0];
      let temp_sel_code = temp_map[temp_map.length - 1][k][1];

      md_doc += "- " + temp_sel_name + ">>" + temp_sel_code + "\n";
      //- 選択肢名>>コード
    }
  }
  document.getElementById("md_answer").innerText = md_doc;  //転記
}