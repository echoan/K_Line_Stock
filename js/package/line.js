var line_line_k = ["#455","#455","#455","#455","#455","#455","#ffffff","#455","#455","#455"];
var load_data_stock ={};
var linesS ="";
function init_line1(code){
       init_line1_load(code);
}
function init_line1_load(code){
	var data ={};
	data.serv='9';
	data.list=code;
	$.stockService({
                data: data,
                success: function (result) {
                	var results = result.split("#");
                	if(results[0]){
                		var data = results[0].split(",");
                		//最低
    					var zd = data[6];
    					load_data_stock.zd =zd;
    					//昨收
    					var zsh =data[3];
    					load_data_stock.zsh =zsh;
    					//最高
    					var zg = data[5];
    					load_data_stock.zg =zg;
    					info_stock_load_N(data,code)
                	}
                	
                	if(results.length>=1){
	                	var rowDate =[];
			    		var data ="";
			    		data = results[1].split(";");
				    	for(var i=0;i<data.length;i++){
				    		var temp = data[i].split(",");
				    		var row =[];
				    		for(var j=0;j<temp.length;j++){
				    			row.push(temp[j]);
				    		}
				    		rowDate.push(row);
				    	}
	    				load_line(lineMyChart,rowDate);
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
function info_stock_load_N(data,code){
		var value = data[3];
    	var redStyle="#FA4A52";
    	var greStyle="#27AD1D";
    	var whiteStyle="#333333";
    	
    	//现价
    	var xj;
    	//昨收
    	var zsh;
    	//最高
    	var zg ;
    	//今开
    	var jk;
    	//最低
    	var zd;
    	//振幅 |当日最高价-当日最低价|/昨日收盘价*100%
    	var zf;
    	//涨跌  现价-昨收
    	var zdie;
    	//涨幅  （当前价格-昨日收盘价格）/ 昨日收盘价格 
    	var zhf;
    	//成交额
    	var chje;
    	
    	//交易状态
    	var jyzht;
    	//交易时间
    	var jyshij;
    		
    	//成交量
    	var chl;
    	var xj_s='whiteStyle';
    	var zg_s='whiteStyle';
    	var jk_s='whiteStyle';
    	var zd_s='whiteStyle';
    	var zdie_s='whiteStyle';
    	var zhf_s='whiteStyle';
    	var chje_s =whiteStyle;
    	var chl_s =whiteStyle;
    	
    	//停牌标记
    	tp = data[34];
    	if(tp=='停牌'){
    		//现价
	    	xj ="--";
	    	//昨收
	    	zsh =data[3];
	    	//最高
	    	zg ="--";
	    	//今开
	    	jk  ="--";
	    	//最低
	    	zd ="--";
	    	//振幅 |当日最高价-当日最低价|/昨日收盘价*100%
	    	zf="--";
	    	//涨跌  现价-昨收
	    	zdie  ="--";
	    	//涨幅  （当前价格-昨日收盘价格）/ 昨日收盘价格 
	    	zhf ="--";
	    	//成交额
	    	chje  ="--";
	    	//成交量
	    	chl  ="--";
	    	jyshij =data[36];
	    	jyzht =data[35];
    	}else{
    		//现价
	    	xj =data[4];
	    	//昨收
	    	zsh =data[3];
	    	//最高
	    	zg = data[5];
	    	//今开
	    	jk =  data[2];
	    	//最低
	    	zd = data[6];
	    	//振幅 |当日最高价-当日最低价|/昨日收盘价*100%
	    	zf = data[9];
	    	//涨跌  现价-昨收
	    	zdie = data[7];
	    	//涨幅  （当前价格-昨日收盘价格）/ 昨日收盘价格 
	    	zhf = data[8];
	    	//成交额
	    	chje = data[12];
	    	//成交量
	    	chl = data[11];
	    	jyshij =data[36];
	    	jyzht =data[35];
	    	if(value>xj){
	    		if(xj=="0.00"){
	    			xj_s ='whiteStyle';
	    		}else{
	    			xj_s ='greStyle';
	    		}
	    		
	    	}else if(value==xj){
	    		xj_s ='whiteStyle';
	    	}else{
	    		xj_s ='redStyle'
	    	}
	    	
	    	if(value>zg){
	    		if(zg=="0.00"){
	    			zg_s ='whiteStyle';
	    		}else{
	    			zg_s ='greStyle';
	    		}
	    	}else if(value==zg){
	    		zg_s ='whiteStyle';
	    	}else{
	    		zg_s ='redStyle'
	    	}
	    	
	    	if(value>jk){
	    		if(jk=="0.00"){
	    			jk_s ='whiteStyle';
	    		}else{
	    			jk_s ='greStyle';
	    		}
	    	}else if(value==jk){
	    		jk_s ='whiteStyle';
	    	}else{
	    		jk_s ='redStyle'
	    	}
	    	
	    	
	    	if(value>zd){
	    		if(zd=='0.00'){
	    			zd_s ='whiteStyle';
	    		}else{
	    			zd_s ='greStyle';
	    		}
	    	}else if(value==zd){
	    		zd_s ='whiteStyle';
	    	}else{
	    		zd_s ='redStyle'
	    	}
	    	
	    	if(zdie.indexOf('+')>=0){
	    		zdie_s ='redStyle';
	    	}else if(zdie=='0.00' || zdie=='-0.00'){
	    		zdie_s = 'whiteStyle';
	    	}else{
	    		zdie_s = 'greStyle';
	    	}
	    	
	    	if(chje.indexOf('+')>=0){
	    		chje_s =redStyle;
	    	}else if(chje=='0.00亿'){
	    		chje_s = whiteStyle;
	    	}else{
	    		chje_s = greStyle;
	    	}
	    	if(chl.indexOf('+')>=0){
	    		chl_s =redStyle;
	    	}else if(chl=='0.00万'){
	    		chl_s = whiteStyle;
	    	}else{
	    		chl_s = greStyle;
	    	}
	    	
	    	if(zhf.indexOf('+')>=0){
    			zhf_s ='redStyle';
	    	}else if(zhf=='0.00%'){
	    		zhf_s = 'whiteStyle';
	    	}else{
	    		zhf_s = 'greStyle';
	    	}
	    	
    	}
    	var html ='';
    		html +='<li><p class = "'+xj_s+'">'+xj+'</p><p><span class = "'+zdie_s+'">'+zdie+'</span><span style="padding-left: 0.4rem;" class = "'+zhf_s+'">'+zhf+'</span> </p> </li>';
    		if(code.length>6){
    			html +='<li><p class="SotckNameId" data="'+data[1]+'" >'+data[1]+'('+code.substring(2)+')</p><span id="tradeState">'+jyzht+'<label>'+jyshij+'</label></span>';
    		}else{
    			html +='<li><p class="SotckNameId" data="'+data[1]+'" >'+data[1]+'('+code+')</p><span id="tradeState">'+jyzht+'<label>'+jyshij+'</label></span>';
    		}
    		html +='<p style="display:flex;margin-top: 5px"><span style="flex:1;" class="max_oneday">最高</span>';
    		html +='<span style="flex:1;" class="max_oneday">最低</span></p>';
    		html +='<p style="display: flex" id="datamount"><span style="flex:1;" class = "'+zg_s+'">'+zg+'</span>';
    		html +='<span style="flex:1;" class = "'+zd_s+'">'+zd+'</span></p>';
    		html +='</li>';
    	$("#topoul").html("");	
    	$("#topoul").html(html);	
    	var uhtml ='<ul id="dataBox">';
    		uhtml +='<li><p>今开</p><p>现价</p><p>涨跌</p><p>涨幅</p></li>';
    		uhtml +='<li><p class = "'+jk_s+'">'+jk+'</p><p class = "'+xj_s+'">'+xj+'</p> <p class = "'+zdie_s+'">'+zdie+'</p><p class = "'+zhf_s+'">'+zhf+'</p> </li>';
    		uhtml +='<li><p>昨收</p> <p>振幅</p><p>成交额</p><p>成交量</p></li>';
    		uhtml +='<li><p class = "yestoday_data">'+zsh+'</p><p class = "yestoday_data">'+zf+'</p><p style="color:'+chje_s+'">'+chje+'</p><p style="color:'+chl_s+'">'+chl+'</p></li>';
    	$("#stockData").html("");	
    	$("#stockData").html(uhtml);	
    		
    		
		if(interval_stock_app!=null){
				clearInterval(interval_stock_app);
				interval_stock_app =null;
		}
		var hours=new Date().getHours();
		var minute=new Date().getMinutes();
		interval_stock_app = setInterval(function () {
					hours=new Date().getHours();
					minute=new Date().getMinutes();
					if(!((hours<9) || (hours==9 && minute<0) ||(hours==11 && minute> 35) || (hours>11 && hours<13) || (hours==15 && minute>35) || (hours>15))){
						init_line1(code);
					}
		}, 5000);
}

function load_run_app(code){
	init_line1(code);
}
function load_line(myChart,rowDate){
var data =splitData_line(rowDate);
var length_line = data.times.length;
if(length_line<240){
	for(var k=0;k<240-length_line;k++){
		data.times.push("");
	}
}
var max_ =data.max_y;
var min_ =data.min_y;
var interval_ =parseFloat(data.interval_y).toFixed(2);
var option1 = {
	/*   tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow',
	            label: {show: false},
	            triggerTooltip: true,
	            handle: {
	                show: true,
	                margin: 30,
	                color: '#B80C00'
	            }
            },
             //showContent:f
            
        },
        axisPointer: {
            link: {xAxisIndex: 'all'}
        },*/
        toolbox: {
            feature: {
                dataZoom: {yAxisIndex: false},
                brush: {type: ['lineX', 'clear']}
            }
        },
        brush: {
            xAxisIndex: 'all',
            brushLink: 'all',
            outOfBrush: {colorAlpha: 0.1}
        },
	  grid: [           {
	      left: '5%',
	      right: '3%',
	      height: '60%',
	      top: '5%'
	  },{
	      left: '5%',
	      right: '3%',
	      top: '73%',
	      height: '25%',
	  }],
	  xAxis: [{
	      type: 'category',
	      data: data.times,
	      scale: true,
	      boundaryGap: false,
	      axisLine: { onZero: false ,lineStyle:{color:'#c3c3c3'}},
	      axisTick: {
        	show: false
    	  },
	      splitLine: { show: true,
	      lineStyle:{
                     color: ["#c3c3c3"],
                     width: 0.5,
                     type: 'dotted'
                }
	      },
	      axisLabel: {show: false,
	      				textStyle: { color: 'black'},
	      				interval: function(data){
	      					if(data==0){
	      						return true;
	      					}else  if(data==60){
	      						return false;
	      					}else if(data==120){
	      						return true;
	      					}else if(data==180){
	      						return false;
	      					}else if(data==240){
	      						return true;
	      					}else{
	      						return false;
	      					}
	      				},
						formatter: function(value){
							/*if(value=="11:30"){
								return value+"/13:00";
							}else if(value=="13:00"){
								return "11:30/"+value;
							}else{
								return value;
							}*/
							return "";
						}
					}
	     
	  },{
	      type: 'category',
	      gridIndex: 1,
	      data: data.times,
	      scale: true,
	      boundaryGap: false,
	      axisTick: {
        	show: false
    	  },
	      axisLine: { onZero: false,lineStyle:{color:'#c3c3c3'} },
	      splitLine: { show: true,
	      	lineStyle:{
                     color: ["#c3c3c3"],
                     width: 0.5,
                     type: 'dotted'
               }
	      },
	      axisLabel: {show: false,interval: function(data){
	      					if(data==0){
	      						return true;
	      					}else  if(data==60){
	      						return false;
	      					}else if(data==120){
	      						return true;
	      					}else if(data==180){
	      						return false;
	      					}else if(data==240){
	      						return true;
	      					}else{
	      						return false;
	      					}
	      				},
						formatter: function(value){
							if(value=="11:30"){
								return value+"/13:00";
							}else if(value=="13:00"){
								return "11:30/"+value;
							}else{
								return value;
							}
						
						}
					 }
	  }],
	  yAxis: [{
	      scale: true,
	      axisLine: {onZero: false,lineStyle:{color:'#c3c3c3'}},
	      axisTick: {show: false},
	      splitLine: {show: true,
	      	lineStyle:{
                     color:line_line_k,
                     width: 0.5,
                     type: 'dotted',
                     fontSize: 12,
                }
	      },
	      min:min_,
	      max:max_,
	      interval:parseFloat(interval_), 
	      splitArea: { show: false},
	      axisLabel: {show: true,inside: true,
	      textStyle: {color: function(params) {
	      	if(parseFloat(data.zsh)>parseFloat(params)){
	      		return "green";
	      	}else if(parseFloat(data.zsh)==parseFloat(params)) {
	      		if(localStorage.getItem("skin_kind") =='white'){
					return	"black";
				}else{
					return  "white";
				}
	      	}else{
	      		return "red";
	      	}
	      }},
	       formatter: function (value) { 
	       	//使用函数模板，函数参数分别为刻度数值（类目），刻度的索引
	       		return parseFloat(value).toFixed(2);
            	
            }
	      }
	  },{
	      gridIndex: 1,
	      splitNumber: 1,
	      axisLine: {onZero: false,lineStyle:{color:'#c3c3c3'}},
	      axisTick: {show: false},
	      splitLine: {show: true,
	      	lineStyle:{
                     color: ["#c3c3c3"],
                     width: 0.5,
                     type: 'dotted'
                }
	      },
	      axisLabel: {show: true,inside: true,textStyle:{color:"black"},
			  formatter: function (value,index) { 
			       		if(index==0){
			       			return "";
			       		}else{
			       			return value;
			       		}
		            	
		      }
	      }
	  }],
	  series: [{
	          name: '分时数据',
	          type: 'line',
	          data: data.lines,
	          symbol:'none',  //这句就是去掉点的  
           	  smooth:true,  //这句就是让曲线变平滑的 
	          lineStyle: {
	              normal: {
	                  opacity: 1,
	                  color:linesS,
	                  width: 1
	              }
	              
	          }
	      },{
	          name: '平均线',
	          type: 'line',
	          data: data.aver,
	          symbol:'none',  //这句就是去掉点的  
           	  smooth:true,  //这句就是让曲线变平滑的 
	          lineStyle: {
	              normal: {
	                  opacity: 1,
	                  color:'#B18904',
	                  width: 1
	              }
	              
	          }
	      },{
	          name: '成交量',
	          type: 'bar',
	          xAxisIndex: 1,
	          yAxisIndex: 1,
	          data: data.vols,
	          itemStyle: {
		    	  normal: {
			          color: function(params) {
			              var colorList;
			              if(params.dataIndex==0){
			              		colorList = '#FC3131';
			              }else if (data.lines[params.dataIndex]>data.lines[params.dataIndex-1]) {
			                  colorList = '#FC3131';
			              } else {
			                  colorList = '#54FCFC';
			              }
			              return colorList;
			          }
			      }
		      }
	      }
	  ]
	};	
	myChart.setOption(option1,true);
	
}

//数组处理
function splitData_line(rawData) {
	if(localStorage.getItem("skin_kind") =='white'){
		linesS ="#1E90FF";
	}else{
		linesS ="#FFFFFF";
	}
  var lines = [];
  var times = [];
  var vols = [];
  var aver = [];
  for (var i = 0; i < rawData.length; i++) {
  	  times.push(rawData[i][0]);
	  lines.push(rawData[i][1]);
	  vols.push(rawData[i][2]);
	  aver.push(rawData[i][3]);
  }
  var zsh = load_data_stock.zsh;
  var min =load_data_stock.zd;
  var max =load_data_stock.zg;
  var inte=0;
  var max_y=0;
  var min_y=0;
  var abs1 = Math.abs(max-zsh);
  var abs2 = Math.abs(zsh-min);
  var ch =0;
  if(abs1>abs2){
  	  ch = parseFloat(parseFloat(abs1)/2).toFixed(2);
  }else{
  	  ch = parseFloat(parseFloat(abs2)/2).toFixed(2);
  }
  if(ch<0.01){
  	ch = 0.01;
  }else if(ch==0.01){
  	ch = 0.02;
  }
	min_y =  parseFloat(zsh)-ch*2;
	if(parseFloat(min)<parseFloat(min_y).toFixed(2)){
		min_y =parseFloat(min);
	  var countS =Math.ceil(Math.abs(min_y -parseFloat(zsh))/ch);
	    if(countS>0){
	  		min_y =  parseFloat(zsh)-ch*countS;
	  	}
	  	line_line_k = ["#c3c3c3","#c3c3c3","c3c3c3","#c3c3c3","#c3c3c3","#c3c3c3","#c3c3c3","#c3c3c3","#c3c3c3","#c3c3c3"];
	  	for(var i=0;i<line_line_k.length;i++){
	  		if(i==countS){
	  			line_line_k[i] ="#c3c3c3";
	  		}
	  	}
	}else{
	  	line_line_k = ["#c3c3c3","#c3c3c3","c3c3c3","#c3c3c3","#c3c3c3","#c3c3c3","#c3c3c3","#c3c3c3","#c3c3c3","#c3c3c3"];
	}
	
	max_y = parseFloat(zsh)+ch*2;
	if(parseFloat(max)>parseFloat(max_y).toFixed(2)){
		max_y =parseFloat(max);
	  	var count = Math.ceil(Math.abs(max -parseFloat(zsh))/ch);
	  	 if(count>0){
	  	 	max_y =  parseFloat(zsh)+ch*count;
	  	 }
	}
	
  return {
      lines: lines,
      times: times,
      vols: vols,
      aver: aver,
      max_y:parseFloat(max_y).toFixed(2),
      min_y:parseFloat(min_y).toFixed(2),
      interval_y:ch,
      zsh:zsh
  };
}