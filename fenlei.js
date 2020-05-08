// ==UserScript==
// @name         站点分类填充助手OL
// @namespace    http://tampermonkey.net/
// @version      0.79
// @updateURL    https://helper.log.cx/fenlei.js?v=n
//== @require      https://code.jquery.com/jquery-latest.js
// @description  修改了排版!
// @author       fengguiping
// @match        http://10.206.83.109:14141/update_site?controlpanle=1*
// @grant        none
// ==/UserScript==

function loadsite(index){
    var sitelistarr = localStorage.sitelist.split(/\r?\n/);
    //console.log(sitelistarr.length);
    var site =sitelistarr[index];
  $("#site_embedding").html("<div align='center'>站点"+site+"信息加载中</div>");
  $("#site_update").html("<div align='left'>站点"+site+"信息加载中</div>");
    $.ajax({
                url:'/update_site?site_str='+site,
                type:'GET',
                dataType: 'html',
                success: function(data) {
                    var wrappedObj = $("<code></code>").append($(data.replace(/<script[\s\S]*?<\/script>|src="[^"]*?"|src='[^']*?'/g,"")));
                    var tags ='<table class="table table-hover">' ;
                    $("#site_tag_data tr",wrappedObj).each(function(i){
                        if (i>0) {
                            if(i%6==1){tags +='<tr>'}
                            tags +="<td data-toggle='collapse' data-target='#demo"+i+"' title='"+i+"'><span class='rtags'>"+$("td:eq(1)",this).html()+"</span><span id='cross' class='siteclassadd' title='添加到站点主分类'/></span><span id='cross' class='sitetagadd' title='添加到站点tag'/></span><div id='demo"+i+"' class='collapse'>"+$("td:eq(3)",this).html()+"</div></td>";
                            //<div id="demo" class="collapse in">vice lomo.</div>
                            // $("td:eq(1)",this).append("<span id='cross' class='siteclassadd' title='添加到站点主分类'/></span><span id='cross' class='sitetagadd' title='添加到站点tag'/></span>");
                          }
                    });
                    tags +='</table>';
                    //console.log(tags);
                    $("#site_tag_data").html(tags);
                    //$("#site_tag_data").html($("#site_tag_data",wrappedObj).html());
                    $("#site_tag_data").attr("class","col-md-6");
                    $("#site_embedding").html($("#site_embedding",wrappedObj).html());
                    $("#site_embedding").attr("class","col-md-2");
                    $("#site_update").html($("#site_update",wrappedObj).html());
                    $("#site_update").attr("class","col-md-2");
                    //console.log(site);
                  	if (!$("#site_str").val()){
                      $("#site_str").val(site);
                      $("#site_rate").val("-1");
                      $("#site_cls").val("None");
                      $("#site_tag").val("None");
                    }
                    $("#update_site_button").remove();
                    add();
                    $("#site_embedding h3:eq(0)").html("<a target='_blank' href='http://"+site+"'>"+site+"</a><br><a target='_blank' href='https://helper.log.cx/allso/#site%3A"+site+"'>site链接</a>No."+(parseInt(localStorage.index)+1));
                    if(!$("#site_embedding h3:eq(0)").length){$("#site_embedding >div").html("<a target='_blank' href='http://"+site+"'>"+site+"</a>&nbsp;&nbsp;<a target='_blank' href='https://helper.log.cx/allso/#site%3A"+site+"'>site链接</a>");}
                    $("#site_embedding h1").html('<button id="vote0">满意</button><button id="vote1" style="margin-left:20px;">不满意</button>');
                },
                error: function(data) {
                    $("#display_part").empty();
                    $("#display_part").append("Update Info FAIL!");
                    console.log('POST Error');
                    console.alert('UPDATE_ERROR!');
                }
            })
    //console.log("test function!");
}
function vote0(){console.log("vote0");}
function updatesiteinfo(){
        var site_str=$('#site_str').val();
        var site_rate=$('#site_rate').val();
        var site_cls=$('#site_cls').val();
        var site_tag=$('#site_tag').val();
        var site_type=$('#site_type').val();
        var site_comment=$('#site_comment').val();
        var data= {
            data: JSON.stringify({
                'site_str': site_str,
                'site_rate': site_rate,
                'site_cls': site_cls,
                'site_tag': site_tag,
                'site_type': site_type,
                'site_comment': site_comment,
            }),
        }
            $.ajax({
                url:'/post_site_info',
                type:'POST',
                data: data,
                dataType: 'json',
                success: function(data) {
                  if(data.ok){
                    $("#updatestatus").empty();
                    $("#updatestatus").append("站点 "+site_str+" _更新成功!");
                    if (parseInt(localStorage.index)<localStorage.sitelist.split(/\r?\n/).length-1){
                        //console.log(localStorage.index);
                        //console.log(localStorage.sitelist.split(/\r?\n/).length);
                        localStorage.index = parseInt(localStorage.index)+1;
                        loadsite(localStorage.index);
                        //console.log(localStorage.index);
                    }
                  }else {
                      console.log(data.ok);
                      $("#updatestatus").html("<div style='color:red'>站点"+site_str+" _更新失败!</div>");
                  }
                },
                error: function(data) {
                    $("#updatestatus").empty();
                    $("#updatestatus").html("<div style='color:red'>站点"+site_str+" _更新失败!</div>");
                    console.log('POST Error');
                }
            })
        }

function add(){
    //$("#site_tag_data tr").each(function(){
    //    $("td:eq(1)",this).append("<span id='cross' class='siteclassadd' title='添加到站点主分类'/></span><span id='cross' class='sitetagadd' title='添加到站点tag'/></span>"); //$(".tdadd").css(tdadd);
    //});
    $(".siteclassadd").click(function(){
        //console.log(1);
        console.log($(this).parent().find(".rtags").text());
        //$(this).hide();
        $("#site_cls").val($(this).parent().find(".rtags").text());
        $("#site_type").val(4);
    });
    $(".sitetagadd").click(function(){
        //console.log(1);
        console.log($(this).parent().find(".rtags").text());
        //$(this).hide();
        var temptags =  $("#site_tag").val();
        var thistag = $(this).parent().find(".rtags").text();
        temptags = temptags.replace("None","");
        temptags = temptags.replace(","+thistag,"");
        temptags = temptags+","+thistag;
        temptags = temptags.replace(/^,/,"");
        $("#site_tag").val(temptags);
        $("#site_type").val(4);
    });
}


(function() {
'use strict';
    $("<style></style>").text(".siteclassadd{display: inline-block;background: #f0f0f0 no-repeat center;border: 1px solid #d0d0d0;width: 20px; height: 20px; border-radius: 2px;box-shadow: 0 1px rgba(100,100,100,.1);color: #666;transition: color .2s, background-color .2s;background-image: linear-gradient(to top, currentColor, currentColor), linear-gradient(to top, currentColor, currentColor);background-size: 10px 2px, 2px 10px;}").appendTo($("head"));
    $("<style></style>").text(".sitetagadd{display: inline-block;background: #f0f0f0 no-repeat center;border: 1px solid #d0d0d0;width: 20px; height: 20px;border-radius: 2px;box-shadow: 0 1px rgba(100,100,100,.1);color: #666;transition: color .2s, background-color .2s;background-image: linear-gradient(to top, currentColor, currentColor), linear-gradient(to top, currentColor, currentColor);background-size: 10px 2px, 2px 10px;margin-left:2px;}").appendTo($("head"));

    $("#site_embedding").attr("style","position:fixed;right:34%;top:10px;");
    $("#site_update").attr("style","position:fixed;top:10px;right:14%;");
    var tempdivstr = $("form").html();
    $("form").remove();
   // $("<div id='tempdivstr'class=''></div>").html(tempdivstr).after($(".navbar"));
    $(".navbar").after(tempdivstr);
    var temphtml ='<div style="margin-bottom:10px;"><a  class="label label-info" target=_blank href="http://wiki.so.corp.qihoo.net/pages/viewpage.action?pageId=18001677">wiki</a><span class="label label-info" id="collapse" >展开标签说明</span></div>'
    temphtml+='<div class="input-group" style="margin-bottom:10px;"><input type="text" class="form-control" id="txtKey" ><span class="input-group-btn"><button class="btn btn-default" id="btnSearch" type="button">Go!</button></span></div>';
    temphtml+='<textarea type="text" id="site_list" name="target_site" rows="15" cols="40"></textarea>'
    temphtml+='<div class="btn-group btn-group" style="width:300px;margin-bottom:10px;"><button class="btn btn-default" id="site_list_submit">保存列表</button><button class="btn btn-default" id="btn_last">上一个</button><button class="btn btn-default" id="btn_next" >保存下一个</button><button class="btn btn-default" id="btn_skip">跳过</button></div>';
    temphtml+='<div id="updatestatus" class="alert alert-info" style="width:300px"></div>';

    $("<div id='inputpanel'class='control-group col-md-2' style='position:fixed;top:10px;right:17px;'></div>").html(temphtml).appendTo($("fieldset"));
    if (localStorage.sitelist){$("#site_list").val(localStorage.sitelist);loadsite(localStorage.index);}
    $("nav").remove();
    //$("#site_tag_data tr").each(function(){
    //    $("td:eq(1)",this).append("<span id='cross' class='siteclassadd' title='添加到站点主分类'/></span><span id='cross' class='sitetagadd' title='添加到站点tag'/></span>"); //$(".tdadd").css(tdadd);
    // });
    $(".siteclassadd").click(function(){
        //console.log(1);
        console.log($(this).parent().find(".rtags").text());
        //$(this).hide();
        $("#site_cls").val($(this).parent().find(".rtags").text());
        $("#site_type").val(4);
    });

    $(".sitetagadd").click(function(){
        //console.log(1);
        console.log($(this).parent().find(".rtags").text());
        //$(this).hide();
        var temptags =  $("#site_tag").val();
        var thistag = $(this).parent().find(".rtags").text();
        temptags = temptags.replace("None","");
        temptags = temptags.replace(","+thistag,"");
        temptags = temptags+","+thistag;
        temptags = temptags.replace(/^,/,"");
        $("#site_tag").val(temptags);
        $("#site_type").val(4);
    });

    //$("#site_type").before("<a id='set_site_type'>4</a>");
    //$("#set_site_type").click(function(){
       // $("#site_type").val(4);
   // });
    // Your code here...
    $("#site_list_submit").click(function(){
        //console.log($("#site_list").val());
        localStorage.sitelist=$("#site_list").val();
        localStorage.index=0;
        loadsite(0);
    });

    $("#vote0").click(function(){
        console.log($("#vote0").text());
        vote0();
    });
    $("#btn_next").click(function(){
        updatesiteinfo();
    });
    $("#btn_skip").click(function(){
        localStorage.index = parseInt(localStorage.index)+1;
        loadsite(localStorage.index);
    });
   $("#btn_last").click(function(){
     	if(localStorage.index<=0) return;
        localStorage.index = parseInt(localStorage.index)-1;
        $("#updatestatus").empty();
        loadsite(localStorage.index);
    });
$("#collapse").click(function(){ $('.collapse').collapse('toggle')});
//$(document).keydown(function(event){console.log(event.keyCode);});
    $('#btnSearch').click(function () {
        var searchText = $('#txtKey').val();
        if (searchText.length == 0) {
            alert('请输入搜索关键词!');
            $('#txtKey').focus();
            return false;
        }
        var regExp = new RegExp(searchText, 'g');
        $('.collapse,.rtags').each(function () {
            var html = $(this).html();
            //var _time = $(this).parent().find(".collapse").text();
            if (regExp.test(html)){
                var newHtml = html.replace(regExp, '<span class="label label-primary">' + searchText + '</span>');
                $(this).html(newHtml);
                $(this).collapse('show');
                //flag = 1;
             }
        })
    })
})();
