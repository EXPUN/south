function paser() {
  var x=document.getElementsByTagName("iframe")[0].contentDocument;
   var y=document.getElementsByTagName("iframe")[1].contentDocument;
      //var x_list=x.getElementsByClassName("res-list");
      //var x_list= $(".res-list",x);
      //console.log(x_list.length);
      //if (x_list !== undefined) {
         // for (var xi = 0; xi < x_list.length; xi++) {
         //    $(".res-list >h3 >a:eq("+xi+")",x).prepend("【"+(xi+1)+"】");
        //  }
      //}

      //else{
          //console.debug("no iframe0");
           //console.log('no ');
      //}


  var arrx=[];
  var tablex = $(".res-list >h3", x).each(function(n,str){if (n>=30) return;
      arrx[n] = String($(this).find("a:eq(0)").attr("data-url"));
      //console.log(n+"="+arrx[n]);
  });
  var arry=[];
  var tabley = $(".res-list >h3", y).each(function(n,str){if (n>=30) return;
      arry[n] =  String($(this).find("a:eq(0)").attr("data-url"));
      //console.log(n+"="+arry[n]);
  });


  for ( var i=0; i<arrx.length;i++){
      var xyi=arry.indexOf(arrx[i]);
      if (xyi!=-1) {
          //console.log("x"+i+"=y"+xyi);
           (xyi!=i)?$(".res-list>h3:eq("+i+")", x).prepend("<div class='yi'>右"+(xyi+1)+"</div>"):$(".res-list>h3:eq("+i+")", x).prepend("<div class='yi'>=</div>");  }
       else{console.log(arrx[i]+"-"+arry[i]);}
   }

  for ( var j=0; j<arrx.length;j++){
      var yxi=arrx.indexOf(arry[j]);
      if (yxi!=-1) {
          //console.log("y"+j+"=y"+yxi);
           (yxi!=j)?$(".res-list>h3:eq("+j+")", y).prepend("<div class='xi'>左"+(yxi+1)+"</div>"):$(".res-list>h3:eq("+j+")", y).prepend("<div class='xi'>=</div>");  }
       else{console.log(arry[j]+"-"+arrx[j]);}
   }

  $(".yi",x).css({"position":"relative","top":"0","right":"-25px","display":"inline","background-color":"#317ef3","border-radius": "10px","color": "#fff","font-size": "12px","height": "20px","text-align": "center","width": "40px","z-index":"15","opacity": "0.62","float":"right","white-space":"nowrap"});
  $(".xi",y).css({"position":"relative","left":"0","display":"inline","background-color":"#317ef3","border-radius": "10px","color": "#fff","font-size":"12px","height":"20px","text-align":"center","width":"40px","z-index":"15","opacity":"0.62","float":"left","white-space":"nowrap"});
  $("#container",x).css({"padding-left":"80px"});
}
