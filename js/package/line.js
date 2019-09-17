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
                	console.log(result)
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