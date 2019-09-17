/* $(function() {
 	// 初始化内容
 	var data1 ={};
		data1.serviceName ="QUERY_SELT_STOCK";
	var reqDatas={};
		data1.reqData=reqDatas;
		$.callService(data1, false,
			function(data){
				if(data.code == 0){
						sessionStorage.setItem("self_stock_code","");
                    	if(data.data.length>0){
                    		 load_self_stock(data.data);
                    	}
					}else{
					 }
				},
			function(err){
					layer.msg('系统错误');
			}
		);
 });*/
function select_self_stock(){
	// 初始化内容
 	var data1 ={};
		data1.serviceName ="QUERY_SELT_STOCK";
	var reqDatas={};
		data1.reqData=reqDatas;
		$.callService(data1, true,
			function(data){
				if(data.code == 0){
						sessionStorage.setItem("self_stock_code","");
                    	if(data.respData.length>0){
                    		 load_self_stock(data.respData);
                    	}else{
                    			if(interval_stock_code_!=null){
									clearInterval(interval_stock_code_);
									interval_stock_code_ =null;
								}
                    			$("#zxlist").html("");
                    	}
					}else{
						if(interval_stock_code_!=null){
							clearInterval(interval_stock_code_);
							interval_stock_code_ =null;
						}
					}
				},
			function(err){
			}
		);
}

function select_self_stock_set(){
	// 初始化内容
 	var data1 ={};
		data1.serviceName ="QUERY_SELT_STOCK";
	var reqDatas={};
		data1.reqData=reqDatas;
		$.callService(data1, true,
			function(data){
				if(data.code == 0){
                    	if(data.respData.length>0){
							if(data.respData.indexOf(sessionStorage.getItem("Stock_Code"))>=0){
								$("#addId").css("display","none");
								$("#deleteId").css("display","block");	
							}else{
								$("#addId").css("display","block");
								$("#deleteId").css("display","none");	
							}
						
                    	}else{
                    		$("#addId").css("display","block");
							$("#deleteId").css("display","none");	
                    	}
                    	load_run_app(sessionStorage.getItem('Stock_Code'));
					}else{
						$("#addId").css("display","block");
						$("#deleteId").css("display","none");
					}
				},
			function(err){
			}
		);
}
var arr_first_data;
function load_self_stock(codes){
 	sessionStorage.setItem("self_stock_code",codes);
 	var stockCodes ="";
 	for(var i=0;i<codes.length;i++){
 		if(codes.length==1){
 			stockCodes +=codes[i];
 		}else if(i==codes.length-1){
 			stockCodes +=codes[i];
 		}else{
 			stockCodes +=codes[i]+",";
 		}
 		
 	}
	var data ={};
	data.serv='0';
	data.list=stockCodes;
	data.method='load_self_stock';
	$.stockService({
            data: data,
			success: function(result){
					var results=result.split(";");
					$("#zxlist").html("");
					var dataHtml="<ul id='zxulid'>";
					for(var i=0;i<codes.length;i++){
						var html ="";
						var redStyle="#DD294D";
						var greenStyle="#27AD1D";
						var greyStyle="#828EA2";
    					for(var j=0;j<results.length;j++){
    						var data = results[j].split(",");
    						if(data[0]==codes[i]){
    							var cValue = parseFloat(data[4]);
			    				var aValue = parseFloat(data[3]);
			    				var tp = data[34];
			    				var zhd = data[7];
			    				//涨幅  （当前价格-昨日收盘价格）/ 昨日收盘价格 
    							var zhf = data[8];
			    				var cValueStyle="";
			    				if(cValue>aValue){
			    					cValueStyle ='redStyle';
			    				}else if(cValue==aValue){
			    					cValueStyle ='greyStyle';
			    				}else if(cValue=='0.00'){
			    					cValueStyle ='greyStyle';
			    				}else{
			    					cValueStyle ='greenStyle';
			    				}
			    				zhfStyle="";
			    				if(data[8].indexOf('+')>=0){
			    					zhfStyle ='redStyle';
			    				}else if(data[8].indexOf('0.00%')>=0){
			    					zhfStyle ='greyStyle';
			    				}else{
			    					zhfStyle ='greenStyle';
			    				}
    							
    							html='<li onclick="onlickSelfStock(this)"  data="'+codes[i]+'"><span><p>'+data[1]+'</p><label data="'+codes[i]+'">'+codes[i].substring(2)+'</label></span><span class = "'+cValueStyle+'">'+cValue.toFixed(2)+'</span><span><label class = "'+zhfStyle+'">'+(tp=="停牌"?"停牌":data[8])+'</label></span></li>';
								dataHtml+=html;
								html ="";	
    						}
    							
    					}
					}
					dataHtml+="</ul>";
					$("#zxlist").append(dataHtml);
					
					arr_first_data = $('#zxulid').children();
					
					
				if(codes!="" && codes!= undefined && codes!= 'undefined'){
						if(interval_stock_code_!=null){
							clearInterval(interval_stock_code_);
							interval_stock_code_ =null;
						}
						if(interval_stock_app!=null){
							clearInterval(interval_stock_app);
							interval_stock_app =null;
						}
						var hours=new Date().getHours();
						var minute=new Date().getMinutes();
						interval_stock_code_ = setInterval(function () {
							hours=new Date().getHours();
							minute=new Date().getMinutes();
								if(!((hours<9) || (hours==9 && minute<0) ||(hours==11 && minute> 35) || (hours>11 && hours<13) || (hours==15 && minute>35) || (hours>15))){
							   			load_run_stockInfo();
								}
			   			}, 5000);
				}
			
			},
			error : function() {
                	/*setTimeout(function(){
						localStorage.setItem("token","");
						localStorage.setItem("uname","");
						localStorage.setItem("showname","");
						window.location.href = 'login.html';
					},2000);
					setTimeout(function(){
						messageResult("当前网络不可用，请检查网络");
					},500);*/
            }
		});
 }

function load_run_stockInfo(){
	var codes  = sessionStorage.getItem("self_stock_code");
	var data ={};
	data.serv='0';
	data.list=codes;
	data.method='load_run_stockInfo';
	$.stockService({
			data: data,
			success: function (result) {
					var results=result.split(";");
					var redStyle="#DD294D";
					var greenStyle="#27AD1D";
					var greyStyle="#828EA2";
					var length_stock =$("#zxulid")[0].childNodes.length
					for(var i=0;i<length_stock;i++){
						var code = $($("#zxulid")[0].childNodes[i]).attr('data');
						for(var j=0;j<results.length;j++){
							var data = results[j].split(",");
							if(data[0]==code){
								var cValue = parseFloat(data[4]);
								var aValue = parseFloat(data[3]);
								var tp = data[34];
								var zhf = data[8];
			    				var cValueStyle="";
			    				if(cValue>aValue){
			    					cValueStyle ='redStyle';
			    				}else if(cValue==aValue){
			    					cValueStyle ='greyStyle';
			    				}else if(cValue=='0.00'){
			    					cValueStyle ='greyStyle';
			    				}else{
			    					cValueStyle ='greenStyle';
			    				}
			    				zhfStyle="";
			    				if(data[8].indexOf('+')>=0){
			    					zhfStyle ='redStyle';
			    				}else if(data[8].indexOf('0.00%')>=0){
			    					zhfStyle ='greyStyle';
			    				}else{
			    					zhfStyle ='greenStyle';
			    				}
			    				if(tp=="停牌"){
			    					zhf="停牌";
			    				}
//			    				$($("#zxulid")[0].childNodes[i].children[1]).css("color",cValueStyle);
                            $("#zxulid")[0].childNodes[i].children[1].className = cValueStyle
			    				$($("#zxulid")[0].childNodes[i].children[1]).text(cValue.toFixed(2));
//			    				$($("#zxulid")[0].childNodes[i].children[2].children[0]).css("background-color",zhfStyle);
                            $("#zxulid")[0].childNodes[i].children[2].children[0].className = zhfStyle
			    				$($("#zxulid")[0].childNodes[i].children[2].children[0]).text(zhf);
								break;
							}
						}
					}
				},
                error : function() {
                	/*setTimeout(function(){
						localStorage.setItem("token","");
						localStorage.setItem("uname","");
						localStorage.setItem("showname","");
						window.location.href = 'login.html';
					},2000);
					setTimeout(function(){
						messageResult("当前网络不可用，请检查网络");
					},500);*/
                }
      });
}


/**
 * 添加/删除自选股
 */
function selfFunc(obj){
	event.stopPropagation();
	//添加
	if(obj.id=='addId'){
		var stockName = $(".SotckNameId").attr('data');
		var stockCode = sessionStorage.getItem('Stock_Code');
		var data1 ={};
		data1.serviceName ="ADD_SELT_STOCK";
		var reqDatas={};
		reqDatas.fSecurityCode=stockCode;
		reqDatas.fSecurityName=stockName;
		data1.reqData=reqDatas;
		$.callService(data1, true,
				function(data){
					if(data.code == 0){
							$("#"+obj.id).css("display","none");
							$("#deleteId").css("display","block");
							sessionStorage.setItem("self_stock_code",sessionStorage.getItem("self_stock_code")+","+stockCode);
					}
				},
				function(err){
				}
		);
	}
	
	if(obj.id=='deleteId'){
		// 初始化内容
		var data1 ={};
			data1.serviceName ="DEL_SELT_STOCK";
		var reqDatas={};
			reqDatas.fSecurityCode=sessionStorage.getItem('Stock_Code');
			data1.reqData=reqDatas;
		$.callService(data1, true,
			function(data){
					if(data.code == 0){
						    sessionStorage.setItem("self_stock_code",sessionStorage.getItem("self_stock_code").replace(","+sessionStorage.getItem('Stock_Code'),""));
							$("#"+obj.id).css("display","none");
							$("#addId").css("display","block");				
					}else{
											
					}
			},
			function(err){
								
				}
		);
	}
	select_self_stock();
	
}
/**
 * 切换到详情页面
 * @param {Object} obj
 */
function onlickSelfStock(obj){
	
	/*$("#one").children('span').addClass('active').parent('li').siblings().children('span').removeClass('active');   
	$("#lineImgOne").css("display","block");
	$("#lineImgTwo").css("display","none");	
	$("#lineImgThree").css("display","none");	
	$("#lineImgFour").css("display","none");	*/
	var code =$(obj)[0].children[0].children[1].getAttribute("data");
	sessionStorage.setItem("Stock_Code",code);
	daykMyChart.clear();
	weekkMyChart.clear();
	monthkMyChart.clear();
	lineMyChart.clear();
	activeFunc($($("#one")).get(0));
	var clickpL = $('#footerdiv p');
 	for(var j = 0;j<clickpL.length;j++){
            clickpL[j].children[0].children[0].className = '';
            clickpL[j].children[1].className = ''
    }
	sessionStorage.setItem("searchHtml_",'');
	
	$("#_sotckLineId").addClass("activediv").siblings(".contentDiv").removeClass("activediv");
		$('#footstockId')[0].children[0].children[0].className='activelabel';
		$('#footstockId')[0].children[1].className ='activesapn';
		if(sessionStorage.getItem("self_stock_code").indexOf(sessionStorage.getItem("Stock_Code"))>=0){
			$("#addId").css("display","none");
			$("#deleteId").css("display","block");	
		}else{
			$("#addId").css("display","block");
			$("#deleteId").css("display","none");	
		}
	
}

function selectTabFunc(obj){
	var arr = $('#zxulid').children();
	if(obj.id=='nameId'){
		arr =selectByName(arr,obj)
	}else if(obj.id=='priceId'){
		arr = selsectByPrice(arr,obj);
	}else{
		arr = selsectByGain(arr,obj);
	}
	$('#zxulid').html(arr);
}
function selsectByGain(arr,obj){
		if(obj.children[0].className.indexOf('angle_select')>0 && obj.children[1].className.indexOf('angle_select')>0){
			obj.children[1].className='angle_bottom angle_unselect';
			$("#nameId")[0].children[0].className='angle_top angle_select';
			$("#nameId")[0].children[1].className='angle_bottom angle_select';
			$("#priceId")[0].children[0].className='angle_top angle_select';
			$("#priceId")[0].children[1].className='angle_bottom angle_select';
			arr.sort(gainUp);
		}else if(obj.children[0].className.indexOf('angle_select')>0 && obj.children[1].className.indexOf('angle_select')<0){
			obj.children[1].className='angle_bottom angle_select';
			obj.children[0].className='angle_top angle_unselect';
			$("#nameId")[0].children[0].className='angle_top angle_select';
			$("#nameId")[0].children[1].className='angle_bottom angle_select';
			$("#priceId")[0].children[0].className='angle_top angle_select';
			$("#priceId")[0].children[1].className='angle_bottom angle_select';
			arr.sort(gainDown);
		}else{
			obj.children[1].className='angle_bottom angle_select';
			obj.children[0].className='angle_top angle_select';
			$("#nameId")[0].children[0].className='angle_top angle_select';
			$("#nameId")[0].children[1].className='angle_bottom angle_select';
			$("#priceId")[0].children[0].className='angle_top angle_select';
			$("#priceId")[0].children[1].className='angle_bottom angle_select';
			arr =arr_first_data;
		}
		return arr;
}
function selsectByPrice(arr,obj){
		if(obj.children[0].className.indexOf('angle_select')>0 && obj.children[1].className.indexOf('angle_select')>0){
			obj.children[1].className='angle_bottom angle_unselect';
			$("#nameId")[0].children[0].className='angle_top angle_select';
			$("#nameId")[0].children[1].className='angle_bottom angle_select';
			$("#gainId")[0].children[0].className='angle_top angle_select';
			$("#gainId")[0].children[1].className='angle_bottom angle_select';
			arr.sort(priceUp);
		}else if(obj.children[0].className.indexOf('angle_select')>0 && obj.children[1].className.indexOf('angle_select')<0){
			obj.children[1].className='angle_bottom angle_select';
			obj.children[0].className='angle_top angle_unselect';
			$("#nameId")[0].children[0].className='angle_top angle_select';
			$("#nameId")[0].children[1].className='angle_bottom angle_select';
			$("#gainId")[0].children[0].className='angle_top angle_select';
			$("#gainId")[0].children[1].className='angle_bottom angle_select';
			arr.sort(priceDown);
		}else{
			obj.children[1].className='angle_bottom angle_select';
			obj.children[0].className='angle_top angle_select';
			$("#nameId")[0].children[0].className='angle_top angle_select';
			$("#nameId")[0].children[1].className='angle_bottom angle_select';
			$("#gainId")[0].children[0].className='angle_top angle_select';
			$("#gainId")[0].children[1].className='angle_bottom angle_select';
			arr =arr_first_data;
		}
		return arr;
}
function selectByName(arr,obj){
	if(obj.children[0].className.indexOf('angle_select')>0 && obj.children[1].className.indexOf('angle_select')>0){
			obj.children[1].className='angle_bottom angle_unselect';
			$("#priceId")[0].children[0].className='angle_top angle_select';
			$("#priceId")[0].children[1].className='angle_bottom angle_select';
			$("#gainId")[0].children[0].className='angle_top angle_select';
			$("#gainId")[0].children[1].className='angle_bottom angle_select';
			arr.sort(nameUp);
		}else if(obj.children[0].className.indexOf('angle_select')>0 && obj.children[1].className.indexOf('angle_select')<0){
			obj.children[1].className='angle_bottom angle_select';
			obj.children[0].className='angle_top angle_unselect';
			$("#priceId")[0].children[0].className='angle_top angle_select';
			$("#priceId")[0].children[1].className='angle_bottom angle_select';
			$("#gainId")[0].children[0].className='angle_top angle_select';
			$("#gainId")[0].children[1].className='angle_bottom angle_select';
			arr.sort(nameDown);
		}else{
			obj.children[1].className='angle_bottom angle_select';
			obj.children[0].className='angle_top angle_select';
			$("#priceId")[0].children[0].className='angle_top angle_select';
			$("#priceId")[0].children[1].className='angle_bottom angle_select';
			$("#gainId")[0].children[0].className='angle_top angle_select';
			$("#gainId")[0].children[1].className='angle_bottom angle_select';
			arr =arr_first_data;
		}
		return arr;
}
function gainUp(li1,li2){
	var value1 =li1.children[2].innerText.replace("%","");
	var value2 =li2.children[2].innerText.replace("%","");
	if(value1=="停牌"){
		value1="-11";
	}
	if(value2=="停牌"){
		value2="-11";
	}
	return parseFloat(value1)-parseFloat(value2);
}

function gainDown(li1,li2){
	var value1 =li1.children[2].innerText.replace("%","");
	var value2 =li2.children[2].innerText.replace("%","");
	if(value1=="停牌"){
		value1="-11";
	}
	if(value2=="停牌"){
		value2="-11";
	}
	return parseFloat(value2)-parseFloat(value1);
}
function priceUp(li1,li2){
	var value1 =parseFloat(li1.children[1].innerText);
	var value2 = parseFloat(li2.children[1].innerText);
	return value1-value2;
}

function priceDown(li1,li2){
	var value1 =parseFloat(li1.children[1].innerText);
	var value2 = parseFloat(li2.children[1].innerText);
	return value2-value1;
}
function nameUp(li1,li2){
	var value1 = li1.children[0].children[0].innerText;
	var value2 = li2.children[0].children[0].innerText;
	return value1.localeCompare(value2,'zh');
}

function nameDown(li1,li2){
	var value1 = li1.children[0].children[0].innerText;
	var value2 = li2.children[0].children[0].innerText;
	return value2.localeCompare(value1,'zh');
}













