	//获取商品信息
	window.onload=function(){
   		var s=0;
   		if(localStorage.getItem('status')=='true'){
        $.ajax({
            url:'http://datainfo.duapp.com/shopdata/getCar.php',
            type:'POST',
            dataType:'JSONP',
            data:{userID:localStorage.getItem('userID')},
            success:function(data){ 
                for(var i=0;i<data.length;i++){
                	$('#buythings').html($('#buythings').html()+'<li id="myli"><input type="checkbox" name="checkbox" class="checkbox" value="'
                	+data[i]['price']+'"><img src="'+data[i]['goodsListImg']+'" alt="" id="imgs" goodID='+data[i]['goodsID']+'><div id="more"><p id="name">'+
	                data[i]['goodsName']+'</p><p id="myprice">'+data[i]['price']+
	                '</p><p id="mynum">数量：'+data[i]['number']+
	                '</p><button id="del" goodsID='+data[i]['goodsID']+'>删除</button></div></li>');
	                //全选
	                s+=Number(data[i]['price']*data[i]['number']);
	                $("#allbtn").click(function(){
//						$("input[name='checkbox']").prop("checked","true");
//						var allprice=document.getElementById('allprice');
//						allprice.innerHTML=s+"元";
						var checkboxs=document.getElementsByName("checkbox");
						 for (var i=0;i<checkboxs.length;i++) {
						  var e=checkboxs[i];
						  if(i%2!==0){
						  var allprice=document.getElementById('allprice');
							allprice.innerHTML=s+"元";}
						  e.checked=!e.checked;
						 }
					})
	                //总价
					$(".checkbox").click(function(){//输出选中的值
						var obj=document.getElementsByName('checkbox');
						var s=0;
						for(var k=0;k<obj.length; k++){ 
						if(obj[k].checked) 
							s+=parseInt(obj[k].value*data[k]['number']);
						}
						var allprice=document.getElementById('allprice');
                		allprice.innerHTML=s+"元";
					})
                }
                	 
                
            //删除商品
		        var mydel=document.getElementsByTagName("button");
		        
		        for(var j=0;j<mydel.length;j++){
		        	mydel[j].onclick=function(){
						var msg = "您真的确定要删除吗？";
						if (confirm(msg)==true){
						return $.ajax({
                                url:'http://datainfo.duapp.com/shopdata/updatecar.php',
                                type:'POST',
                                dataType:'JSON',
                                data:{
                                    userID:localStorage.getItem('userID'),
                                    goodsID:this.getAttribute("goodsID"),
                                    number:0,
                                    },
                                success:function(data){
                                    location.href="goodcar.html";
                                }
                       		});
						}else{
							return false;
						}
		        	}
		        }
            }
       })
       }else{
       	alert('请登录!');
       	window.location.href="login.html";
       }
    }