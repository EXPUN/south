// ==UserScript==
// @name         评测平台显示ID及top10对比工具-PC移动
// @namespace    null
// @version      v4.1_201906032041
// @updateURL    https://helper.log.cx/top30paser.js
// @description  评测平台显示ID及top10对比工具-PC移动
// @author       fengguiping
// @match        http://pingce.so.qihoo.net:8360/task-querys/*
// @grant        none
// ==/UserScript==

function loadjs(pagetype){
    //$(".select").css("background-color","");
    //$("#"+pagetype).css("background-color","#3c8dbc");
    //localStorage.pagetype= pagetype;
    if (pagetype=="PCpage"){loadjslocal(pagetype);}
    else if(pagetype=="Mopage"){loadjslocal(pagetype);}
    else if(pagetype=="close"){loadjslocal(pagetype);}
}

function loadjs2(pagetype){
    $.ajax({
                url:'https://helper.log.cx/'+pagetype+'paser.js',//?v='+Math.random(),
                type:'GET',
                dataType: 'text',
                success: function(data) {
                    //$("#site_update").html($("#site_update",wrappedObj).html());
                    //console.log(data);
                    localStorage.tempjs=data;
                    location.reload();
                },
                error: function(data) {
                    $("#display_part").empty();
                    $("#display_part").append("Update Info FAIL!");
                    console.log('POST Error');
                }
            })

}

function loadjslocal(pagetype){
  var pcjsstr=`function paser() {
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
}`;
  var mojsstr=`function paser(){
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
      arrx[n] = decodeURIComponent(String($(this).children("a").attr("href").replace(/https:\\/\\/m\\.so\\.com\\/jump\\?u=|&m=.*$|\\s/g,"")));//a.alink
      console.log(n+"="+arrx[n]);}else{arrx[n]=undefined;console.log(n+"="+arrx[n]);}
  });
  var arry=[];
  var tabley = $(".res-list", y).each(function(n,str){if (n>=30) return;
      if ($(this).children("a").length>0){//a.alink
      arry[n] =  decodeURIComponent(String($(this).children("a").attr("href").replace(/https:\\/\\/m\\.so\\.com\\/jump\\?u=|&m=.*$|\\s/g,"")));//a.alink
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
      $("#container",x).css("paddingLeft","25px");
      $("#container",y).css("paddingLeft","25px");
}`;
  if (pagetype=="PCpage"){localStorage.tempjs=pcjsstr;localStorage.pagetype= pagetype;}
  else if(pagetype=="Mopage"){localStorage.tempjs=mojsstr;localStorage.pagetype= pagetype;}
  else if(pagetype=="close"){localStorage.tempjs='';localStorage.pagetype= pagetype;}
  location.reload();
}

function trace_all() {
    'use strict';
    //$.getScript("http://helper.log.cx/css/flip-switch.js",function(){$("#"+localStorage.pagetype).click();});
    $('<link href="http://helper.log.cx/css/flip-switch.css" type="text/css" rel="stylesheet" />').appendTo($("head"));
    //var jtoolbar = '<div class="jtoolbar" style="position:fixed;left:15px;top:60px;z-index:1500;border:1px solid #ddd;padding:0 10px;"><span id="PCpage" class="select" title="PC工具">PC</span> <span id="Mopage" class="select" title="移动工具">Mob</span> <span id="close" class="select" title="停用"> X</span></div>';
    //$(".wrapper").append(jtoolbar);

    var jtoolbar2 = '<div style="position:fixed;left:15px;top:60px;z-index:1500;">';//border:1px solid #ddd;padding:0 10px;
        jtoolbar2 +='<div class="btn-group" data-toggle="buttons"><button type="button" class="btn btn-primary" id="PCpage">PC端解析</button>';
        jtoolbar2 +='<button type="button" class="btn btn-primary" id="Mopage">移动端解析</button>';
        jtoolbar2 +='<button type="button" class="btn btn-primary" id="close">停用</button></div></div>';

    $(".wrapper").append(jtoolbar2);
    $("#PCpage").click(function(){
        console.log("PCpage");
        if (localStorage.pagetype=="PCpage") return;
        loadjs("PCpage");
    });
    $("#Mopage").click(function(){
        console.log("Mopage");
        if (localStorage.pagetype=="Mopage") return;
        loadjs("Mopage");
    });
    $("#close").click(function(){
        console.log("close");
        if (localStorage.pagetype=="close") return;
        loadjs("close");
    });
    if(localStorage.pagetype){
    //$(".select").css("background-color","");
    //$("#"+localStorage.pagetype).css("background-color","#3c8dbc");
      var head = $("head").remove("script[role='reload']");
      $("<scri" + "pt role='reload'>" + "</scr" + "ipt>").text(localStorage.tempjs).appendTo(head);
      //$("#"+localStorage.pagetype).removeClass("active");
      $("#"+localStorage.pagetype).addClass("active");
      //$("#"+localStorage.pagetype).removeClass("tooltip-show");
      $("#"+localStorage.pagetype).addClass("tooltip-show");
      $("#"+localStorage.pagetype).attr({
          "data-toggle":"tooltip",
          "data-placement":"bottom",
          "title":"当前"
      });
        $('.tooltip-show').tooltip('show');
      var statustxt = '<span class="badge">ON</span>';
      //$(".badge").remove();
      //$("#"+localStorage.pagetype).append(statustxt);
       paser();
    }
}
setTimeout(trace_all,1000);

    //$('head').children(':last').attr({
    //     rel: "stylesheet",
    //     type: 'text/css',
    //     href: 'http://helper.log.cx/css/flip-switch_.css',
    // });
