function paser(){ 
	var x=document.getElementsByTagName("iframe")[0].contentDocument;
   var y=document.getElementsByTagName("iframe")[1].contentDocument;

      var x_list= $(".res-list",x);
      //console.log(x_list.length);
      if (x_list !== undefined) {
          for (var xi = 0; xi < x_list.length; xi++) {
              $(".res-list:eq("+xi+")",x).prepend('<span class="prependid">【'+(xi+1)+'】</span>');
          }
      }
      var y_list= $(".res-list",y);
      //console.log(y_list.length);
      if (y_list !== undefined) {
          for (var yi = 0; yi < y_list.length; yi++) {
              $(".res-list:eq("+yi+")",y).prepend('<span class="prependid">【'+(yi+1)+'】</span>');
          }
      }

  var arrx=[];
  var tablex = $(".res-list", x).each(function(n,str){if (n>=30) return;
      if ($(this).children("a").length>0){//a.alink
      arrx[n] = decodeURIComponent(String($(this).children("a").attr("href").replace(/https:\/\/m\.so\.com\/jump\?u=|&m=.*$|\s/g,"")));//a.alink
      console.log(n+"="+arrx[n]);}else{arrx[n]=undefined;console.log(n+"="+arry[n]);}
  });
  var arry=[];
  var tabley = $(".res-list", y).each(function(n,str){if (n>=30) return;
      if ($(this).children("a").length>0){//a.alink
      arry[n] =  decodeURIComponent(String($(this).children("a").attr("href").replace(/https:\/\/m\.so\.com\/jump\?u=|&m=.*$|\s/g,"")));//a.alink
      //console.log(n+"="+arry[n]);
      }else{arry[n]=undefined;}
  });


  for ( var i=0; i<arrx.length;i++){
      var xyi=arry.indexOf(arrx[i]);
      if (xyi!=-1) {
          //console.log("x"+i+"=y"+xyi);
           (xyi!=i)?$(".res-list>.prependid:eq("+i+")", x).prepend("<div class='yi'>右"+(xyi+1)+"</div>"):$(".res-list>.prependid:eq("+i+")", x).prepend("<div class='yi'>=</div>");  }
       else{console.log(arrx[i]+"-"+arry[i]);}
   }

  for ( var j=0; j<arrx.length;j++){
      var yxi=arrx.indexOf(arry[j]);
      if (yxi!=-1) {
          //console.log("y"+j+"=y"+yxi);
           (yxi!=j)?$(".res-list>.prependid:eq("+j+")", y).prepend("<div class='xi'>左"+(yxi+1)+"</div>"):$(".res-list>.prependid:eq("+j+")", y).prepend("<div class='xi'>=</div>");  }
       else{console.log(arry[j]+"-"+arrx[j]);}
   }

  $(".yi",x).css({"position":"relative","top":"0","right":"0px","display":"inline","background-color":"#317ef3","border-radius": "10px","color": "#fff","font-size": "12px","height": "20px","text-align": "center","width": "40px","z-index":"15","opacity": "0.62","float":"right","white-space":"nowrap"});
  $(".xi",y).css({"position":"relative","left":"0","display":"inline","background-color":"#317ef3","border-radius": "10px","color": "#fff","font-size":"12px","height":"20px","text-align":"center","width":"40px","z-index":"15","opacity":"0.62","float":"left","white-space":"nowrap"});
  $("#container",x).css({"padding-left":"80px"});
  
   var z=document.getElementsByTagName("iframe")[2].contentDocument;
   var a=document.getElementsByTagName("iframe")[3].contentDocument;
   var b=document.getElementsByTagName("iframe")[4].contentDocument;
      $("#container",x).css("paddingLeft","25px");
      $("#container",y).css("paddingLeft","25px");
      $("#container",z).css("paddingLeft","25px");
      $("#container",a).css("paddingLeft","25px");
      $("#container",b).css("paddingLeft","25px");
      //var x_list=x.getElementsByClassName("res-list");
        var z_list= $(".res-list",z);
      //console.log(y_list.length);
      if (z_list !== undefined) {
          for (var zi = 0; zi < z_list.length; zi++) {
              $(".res-list:eq("+zi+")",z).prepend('<span class="prependid">【'+(zi+1)+'】</span>');
          }
      }
      var a_list= $(".res-list",a);
      //console.log(a_list.length);
      if (a_list !== undefined) {
          for (var ai = 0; ai < a_list.length; ai++) {
              $(".res-list:eq("+ai+")",a).prepend('<span class="prependid">【'+(ai+1)+'】</span>');
          }
      }
      var b_list= $(".res-list",b);
      //console.log(b_list.length);
      if (b_list !== undefined) {
          for (var bi = 0; bi < b_list.length; bi++) {
              $(".res-list:eq("+bi+")",b).prepend('<span class="prependid">【'+(bi+1)+'】</span>');
          }
      }
      //else{
          //console.debug("no iframe0");
           //console.log('no ');
      //}


}
