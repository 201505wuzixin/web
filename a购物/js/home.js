	//判断是否登录
    $('#mycar').click(function(){
        if(localStorage.getItem('status')=='true'){
        	window.location.href="goodcar.html";
        }else{
            alert("请登录！");
            window.location.href="login.html";
        }
    });
    $('#msg').click(function(){
        if(localStorage.getItem('status')=='true'){
        	var a=document.getElementById('msg');
        	a.setAttribute('href','#page2');
        }else{
            alert("请登录！");
            window.location.href="login.html";
        }
    });
     $('#me').click(function(){
        	window.location.href="me.html";
     });
    //搜索商品
    var goodul=document.getElementById("goodul");
    $("#btn1").click(function(){
  		$.ajax({
	            url:'http://datainfo.duapp.com/shopdata/selectGoodes.php',
	            type:'POST',
	            dataType:'JSONP',
	            data:{selectText:$("#search").val()},
	            success:function(data){
	            	goodul.innerHTML='';
	                for(var k=0;k<data.length;k++){
		            $('#goodul').html($('#goodul').html()+'<li id="goodli"><a id="goodname" goodID='+data[k]['goodsID']+'>'+
	                data[k]['goodsName']+'</a></li>');
	                $('#goodul>li>a').on('click',function(){
                		location.href='good.html#'+this.getAttribute('goodID');
                	});
	            	}
	            }
	    	})
		});
    //请求商品列表
    var myscroller=document.getElementsByClassName("scroller")[0];
    var mylist=document.getElementById("goodLists");
    var myli= myscroller.getElementsByTagName("li");
    var myimgs=document.getElementById("imglist");
    for(var i=0;i<myli.length;i++){
	    myli[i].onclick=function(){
	        $.ajax({
	            url:'http://datainfo.duapp.com/shopdata/getGoods.php',
	            type:'POST',
	            dataType:'JSONP',
	            data:{classID:this.getAttribute("goodid")},
	            success:function(data){
	            	mylist.innerHTML='';
	                for(var j=0;j<10;j++){
		            $('#goodLists').html($('#goodLists').html()+'<li id="myli"><img src="'+data[j]['goodsListImg']+'" alt="" id="imglist" goodID='+data[j]['goodsID']+'><h3 id="name">'+
	                data[j]['goodsName']+'</h3><p id="price">'+data[j]['price']+'</p></li>');
                	$('#goodLists>li>img').on('click',function(){
                		
                		location.href='good.html#'+this.getAttribute('goodID');
                	});
	            }
	            }
	    	})
	 	}
    }
    //请求商品列表
    window.onload=function(){
        $.ajax({
            url:'http://datainfo.duapp.com/shopdata/getGoods.php',
            type:'POST',
            dataType:'JSONP',
            data:{classID:(location.hash.slice(1)+'') || '1'},
            success:function(data){
                for(var j=0;j<10;j++){    
                    $('#goodLists').html($('#goodLists').html()+'<li id="myli"><img src="'+data[j]['goodsListImg']+'" alt="" id="imglist" goodID='+data[j]['goodsID']+'><p id="name">'+
                data[j]['goodsName']+'</p><p id="price">'+data[j]['price']+'</p></li>');
	               	$('#goodLists>li>img').on('click',function(){
	               		  	location.href='good.html#'+this.getAttribute('goodID');
	                });
                }  
            }
        });
    }