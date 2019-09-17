var line_line_k = ["#455","#455","#455","#455","#455","#455","#ffffff","#455","#455","#455"];
var load_data_stock ={};
var linesS ="";
function init_line1_load(code){
	var data ={};
	data.serv='9';
	data.list=code;
	$.stockService({
                data: data,
                success: function (result) {
                	console.log(result)
                	var results = result.split("#");
                	//得到请求到的此时此刻的最新的行情数据
                	console.log(results)
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
//  					info_stock_load_N(data,code)
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
				    	console.log(rowDate)
	    				load_line(lineMyChart,rowDate);
                	}
                },
                error : function() {
                	console.log('123')
                	/*setTimeout(function(){
						localStorage.setItem("token","");
						localStorage.setItem("uname","");
						localStorage.setItem("showname","");
						window.location.href = 'login.html';
					},2000);
					setTimeout(function(){
						messageResult("当前网络不可用，请检查网络");
					},500);*/
					//请求失败的用本地数据
					const result = 'sh000001,上证指数,3023.71,3030.75,2978.12,3023.71,2970.57,-52.63,-1.74%,1.75%,10.64,22333.81万,2377.39亿,149,31939.33,15,5761.08,430,746806.81,0,2978.12,0,2978.12,1398,2978.12,3,3129.28,681,2978.12,0,2978.12,0,2978.12,ZS,,已闭市,09-17 15:11:05#09:30,3018.24,534507,3018.24;09:31,3016.02,231284,3017.13;09:32,3018.24,233600,3017.5;09:33,3015.8,254021,3017.07;09:34,3017.2,234950,3017.1;09:35,3013.97,255737,3016.58;09:36,3016.01,230445,3016.5;09:37,3014.99,194586,3016.31;09:38,3014.55,182302,3016.11;09:39,3013.02,200795,3015.8;09:40,3012.34,211289,3015.49;09:41,3011.04,197197,3015.12;09:42,3010.48,184201,3014.76;09:43,3008.78,198354,3014.33;09:44,3009.08,198498,3013.98;09:45,3010.65,190040,3013.78;09:46,3011.68,157688,3013.65;09:47,3009.69,160132,3013.43;09:48,3008.48,145900,3013.17;09:49,3008.49,155056,3012.94;09:50,3007.98,154602,3012.7;09:51,3008.2,135177,3012.5;09:52,3008.07,135037,3012.3;09:53,3008.77,132127,3012.16;09:54,3009.86,141771,3012.07;09:55,3010.03,123307,3011.99;09:56,3009.03,119145,3011.88;09:57,3008.61,114641,3011.76;09:58,3007.48,118610,3011.61;09:59,3006.07,135612,3011.43;10:00,3004.65,183355,3011.21;10:01,3005.72,178134,3011.04;10:02,3005.35,138693,3010.87;10:03,3005.04,112363,3010.69;10:04,3005.99,118961,3010.56;10:05,3007.15,114629,3010.47;10:06,3007.09,100490,3010.37;10:07,3007.71,102399,3010.3;10:08,3007.48,99033,3010.23;10:09,3007.94,101404,3010.17;10:10,3008.38,102378,3010.13;10:11,3010.23,105044,3010.13;10:12,3009.69,104496,3010.12;10:13,3009.55,93287,3010.11;10:14,3009.55,87109,3010.1;10:15,3007.52,118254,3010.04;10:16,3006.18,124569,3009.96;10:17,3005.39,119404,3009.86;10:18,3005.41,108363,3009.77;10:19,3005.93,102180,3009.7;10:20,3005.77,110222,3009.62;10:21,3005.23,105897,3009.53;10:22,3004.14,118400,3009.43;10:23,3004.68,128405,3009.34;10:24,3004.65,99254,3009.26;10:25,3006.91,122517,3009.22;10:26,3007.81,89055,3009.19;10:27,3008.09,92857,3009.17;10:28,3008.14,75718,3009.16;10:29,3007.73,76170,3009.13;10:30,3007.35,74901,3009.1;10:31,3006.73,82037,3009.07;10:32,3006.57,72634,3009.03;10:33,3006.33,81947,3008.98;10:34,3005.89,91230,3008.94;10:35,3004.95,97988,3008.88;10:36,3003.49,98756,3008.79;10:37,3003.26,107449,3008.71;10:38,3002.49,102957,3008.62;10:39,3002.28,105412,3008.53;10:40,3001.17,107123,3008.43;10:41,3001.24,105371,3008.33;10:42,3002.59,103505,3008.25;10:43,3002.49,82876,3008.17;10:44,3002.26,71555,3008.09;10:45,3001.3,78195,3008.0;10:46,3000.71,75648,3007.91;10:47,3001.15,73655,3007.82;10:48,3000.96,78129,3007.74;10:49,3001.76,70285,3007.66;10:50,3001.69,70114,3007.59;10:51,3001.55,63487,3007.51;10:52,3000.93,60235,3007.43;10:53,3000.13,75747,3007.35;10:54,2999.85,105113,3007.26;10:55,3002.33,118212,3007.2;10:56,3002.09,68645,3007.14;10:57,3002.01,56567,3007.09;10:58,3001.73,54555,3007.03;10:59,3002.98,52983,3006.98;11:00,3002.44,53700,3006.93;11:01,3002.41,51518,3006.88;11:02,3002.29,48995,3006.83;11:03,3002.72,50886,3006.79;11:04,3002.56,55822,3006.74;11:05,3003.63,63536,3006.71;11:06,3004.48,64980,3006.69;11:07,3005.42,54886,3006.68;11:08,3006.38,54712,3006.67;11:09,3005.8,51243,3006.66;11:10,3005.26,49394,3006.65;11:11,3004.78,42677,3006.63;11:12,3005.49,50855,3006.62;11:13,3005.59,39562,3006.61;11:14,3006.43,44054,3006.61;11:15,3005.18,43027,3006.59;11:16,3004.89,47744,3006.58;11:17,3003.63,55999,3006.55;11:18,3003.67,53851,3006.53;11:19,3002.91,49024,3006.49;11:20,3002.6,46418,3006.46;11:21,3002.36,46904,3006.42;11:22,3001.19,59382,3006.37;11:23,3002.52,57390,3006.34;11:24,3001.6,58278,3006.3;11:25,3001.7,58128,3006.26;11:26,3000.48,53178,3006.21;11:27,3000.36,65984,3006.16;11:28,3000.57,65059,3006.11;11:29,2999.84,65490,3006.06;13:00,2997.63,201604,3005.99;13:01,2999.02,68791,3005.93;13:02,2997.31,52811,3005.86;13:03,2998.16,58802,3005.8;13:04,2998.06,59293,3005.74;13:05,2996.99,60773,3005.67;13:06,2996.24,74067,3005.6;13:07,2997.64,76042,3005.53;13:08,2995.8,69599,3005.46;13:09,2994.97,82881,3005.38;13:10,2993.33,99350,3005.29;13:11,2991.31,108427,3005.18;13:12,2993.31,126826,3005.09;13:13,2992.67,93219,3005.0;13:14,2992.62,74538,3004.91;13:15,2992.94,75205,3004.82;13:16,2992.55,80143,3004.73;13:17,2991.93,84069,3004.64;13:18,2992.34,79001,3004.55;13:19,2992.13,78359,3004.46;13:20,2990.58,87005,3004.36;13:21,2990.14,120471,3004.26;13:22,2991.95,141823,3004.17;13:23,2991.66,79732,3004.09;13:24,2991.58,69531,3004.0;13:25,2990.96,69738,3003.91;13:26,2990.8,74593,3003.82;13:27,2989.74,75458,3003.73;13:28,2988.05,100635,3003.62;13:29,2986.05,136429,3003.51;13:30,2987.41,149751,3003.4;13:31,2987.23,103376,3003.29;13:32,2986.97,87916,3003.19;13:33,2988.13,90334,3003.09;13:34,2989.25,91768,3003.0;13:35,2989.93,77738,3002.92;13:36,2991.0,74121,3002.84;13:37,2990.73,66012,3002.76;13:38,2990.61,59182,3002.69;13:39,2989.89,57683,3002.61;13:40,2990.05,55305,3002.53;13:41,2989.96,54414,3002.45;13:42,2989.81,60076,3002.37;13:43,2989.37,64697,3002.29;13:44,2986.99,87837,3002.2;13:45,2985.51,98204,3002.1;13:46,2984.1,122136,3001.99;13:47,2982.98,125227,3001.88;13:48,2982.46,100335,3001.76;13:49,2982.65,90503,3001.65;13:50,2981.86,97922,3001.54;13:51,2982.05,88566,3001.42;13:52,2981.78,74098,3001.31;13:53,2982.65,76488,3001.2;13:54,2983.14,66315,3001.1;13:55,2983.48,68547,3001.0;13:56,2983.47,71730,3000.9;13:57,2983.86,60887,3000.8;13:58,2982.9,64846,3000.7;13:59,2983.36,60574,3000.61;14:00,2982.54,69074,3000.51;14:01,2981.83,77017,3000.41;14:02,2978.86,122301,3000.29;14:03,2977.01,144372,3000.16;14:04,2977.0,134027,3000.04;14:05,2978.73,118246,2999.92;14:06,2978.71,83230,2999.81;14:07,2978.24,80468,2999.69;14:08,2979.29,73084,2999.59;14:09,2979.62,65776,2999.48;14:10,2980.47,75653,2999.38;14:11,2981.2,74283,2999.29;14:12,2983.13,79796,2999.2;14:13,2983.68,75300,2999.12;14:14,2983.18,73921,2999.04;14:15,2983.0,79164,2998.96;14:16,2982.46,64128,2998.88;14:17,2982.89,53900,2998.79;14:18,2981.63,54771,2998.71;14:19,2979.75,68706,2998.61;14:20,2977.84,105580,2998.51;14:21,2977.8,78474,2998.41;14:22,2977.79,63050,2998.31;14:23,2977.47,71861,2998.2;14:24,2977.5,66412,2998.1;14:25,2979.16,83373,2998.01;14:26,2979.39,63317,2997.92;14:27,2979.36,60697,2997.83;14:28,2977.99,67456,2997.74;14:29,2978.02,64477,2997.64;14:30,2977.92,65109,2997.55;14:31,2977.57,65896,2997.45;14:32,2977.89,65150,2997.36;14:33,2974.76,109461,2997.26;14:34,2972.13,155223,2997.14;14:35,2971.39,142470,2997.02;14:36,2972.37,125612,2996.91;14:37,2971.83,102865,2996.79;14:38,2971.18,96198,2996.68;14:39,2970.58,100145,2996.56;14:40,2972.25,103997,2996.45;14:41,2973.14,98125,2996.34;14:42,2974.57,89450,2996.24;14:43,2975.38,90665,2996.15;14:44,2975.79,92680,2996.06;14:45,2976.26,95431,2995.97;14:46,2978.27,99524,2995.9;14:47,2979.06,103941,2995.82;14:48,2980.16,101723,2995.75;14:49,2980.27,98544,2995.69;14:50,2980.5,115020,2995.62;14:51,2980.46,113131,2995.55;14:52,2979.77,115195,2995.49;14:53,2979.87,124574,2995.42;14:54,2979.98,133500,2995.35;14:55,2979.58,143145,2995.29;14:56,2979.16,154089,2995.22;14:57,2979.4,2700,2995.15;14:58,2979.4,0,2995.09;14:59,2978.12,0,2995.02;15:00,2978.12,288840,2995.02';
                	var results = result.split("#");
                	//得到请求到的此时此刻的最新的行情数据
                	console.log(results)
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
//  					info_stock_load_N(data,code)
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
				    	console.log(rowDate)
	    				load_line(lineMyChart,rowDate);
                	}
                }
           });
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
		  xAxis:[{
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