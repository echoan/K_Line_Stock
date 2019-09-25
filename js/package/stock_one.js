function init_stock(myChart,code){
	var url_ ="http://192.168.1.20:8080/amtp-pre/tdx/list";
	var data ={};
	var cd = sessionStorage.getItem('Stock_Code');
	//var cd = "sh000001";
	if(code=='day-k'){
		data.serv='2';
	}
	if(code=='stock-k'){
		data.serv='2';
	}
	if(code=='week-k'){
		data.serv='3';
	}
	if(code=='month-k'){
		data.serv='4';
	}
	data.list=cd;
	 $.ajax({
            //几个参数需要注意一下
                type: "POST",//方法类型
                //url: amtp_kline_url ,//url
				url: "http://yapi.demo.qunar.com/mock/97035/amtp-pre/tdx/list",
                data: data,
                success: function (result) {
                	console.log(result)
		            var data ="";
		    		var name ="";
		    		var interval=10;
		    		if(code=='day-k'){
		    			name ="日K";
		    		}
					if(code=='stock-k'){
						name ="操盘线";
					}
		    		if(code=='week-k'){
		    			name ="周K";
		    		}
		    			
			    	if(code=='month-k'){
		    			name ="月K";
		    			interval =20;
		    		}
                   	data = result.split(";");
                   	var rowDate =[];
			    	for(var i=0;i<data.length;i++){
			    		var temp = data[i].split(",");
			    		rowDate.push(temp);
			    	}
    				load_stock(myChart,rowDate,name,interval);
                },
                error : function() {
                }
          });
}
function load_stock(myChart,rowDate,names,interval){
var upColor = '#FF3232';
var upBorderColor = '#FF3232';
var downColor = '#54FCFC';
var downBorderColor = '#54FCFC';
var data =splitData(rowDate);
var stockdata = getDataToFoce(data);
//MA计算公式
var length_=data.times.length;
 if(length_<100){
	for(var i=0;i<100-length_;i++){
		data.times.push("");
	}
 }
  
function calculateMA(dayCount){
  var result = [];
  for (var i = 0, len = length_; i < len; i++) {
      if (i < dayCount) {
          result.push('-');
          continue;
      }
      var sum = 0;
      for (var j = 0; j < dayCount; j++) {
          sum += parseFloat(data.datas[i - j][1]);
      }
      result.push((sum / dayCount).toFixed(2));
  }
  return result;
}
var option = "";
if(names!="操盘线"){
	option = {
	        toolbox: {
	            feature: {
	                dataZoom: {
	                    yAxisIndex: false
	                },
	                brush: {
	                    type: ['lineX', 'clear']
	                }
	            }
	        },
	        brush: {
	            xAxisIndex: 'all',
	            brushLink: 'all',
	            outOfBrush: {
	                colorAlpha: 0.1
	            }
	        },
		  grid: [           {
		      left: '5%',
		      right: '3%',
		      height: '60%',
		      top: '5%'
		  },{
		      left: '5%',
		      right: '3%',
		      top: '70%',
		      height: '25%',
		  }],
		  xAxis: [{
		      type: 'category',
		      data: data.times,
		      gridIndex: 0,
		      scale: true,
		      boundaryGap: false,
		      axisLine: { onZero: false,
		      lineStyle:{color:'#c3c3c3'}
		      },
		      axisTick: {
	        	show: false,
	    	  },
		      splitLine: {show: false,
		      lineStyle:{
	                     color: ["#455"],
	                     width: 0.5,
	                     type: 'dotted'
	                }
		      },
		      axisLabel: {
	                            show: false,
	                            textStyle: {
	                                color: '#red'
	                            },
	                            interval:interval
	                        }
		  },{
		      type: 'category',
		      gridIndex: 1,
		      data: data.times,
		      scale: true,
		      boundaryGap: false,
		      axisLine: { onZero: false,
		      lineStyle:{color:'#c3c3c3'}},
		      axisTick: {
	        	show: false
	    	  },
		      splitLine: {show: false,
		      	lineStyle:{
	                     color: ["#455"],
	                     width: 0.5,
	                     type: 'dotted'
	                }
		      },
		      axisLabel: {show: false,interval:interval},
		      axisPointer: {z: 100}
		  }],
		  yAxis: [{
		      scale: true,
		      axisLine: {onZero: false,
		      lineStyle:{color:'#c3c3c3'}},
		      axisTick: {show: false},
		      splitLine: {show: true,
		      	lineStyle:{
	                     color: ["#c3c3c3"],
	                     width: 0.5,
	                     type: 'dotted'
	                }
		      },
		      splitArea: {
		          show: false
		      },
		      axisLabel: {show: true,inside: true,
		      				textStyle: {
	                                color: function(params) {
						      		if(localStorage.getItem("skin_kind") =='black'){
										return	"#FFFFFF";
									}else{
										return  "black";
									}
						      	}
					        }
		      }
		  },{
		      gridIndex: 1,
		      splitNumber: 3,
		      axisLine: {onZero: false,lineStyle:{color:'#c3c3c3'}},
		      axisTick: {show: false},
		      splitLine: {show: true,
		      	lineStyle:{
	                     color: ["#c3c3c3"],
	                     width: 0.5,
	                     type: 'dotted'
	                }
		      },
		      axisLabel: {show: true,inside: true,
		      				textStyle: {
	                                color: 'black'
	                           }, formatter: function (value,index) { 
			       		if(index==0){
			       			return "";
			       		}else{
			       			return value;
			       		}
		            	
		            }
		      }
		  }],
		  series: [
		  {
		          name: names,
		          type: 'candlestick',
		          data: data.datas,
		          itemStyle: {
		              normal: {
							color: upColor,
		                    color0: downColor,
		                    borderColor: upBorderColor,
		                    borderColor0: downBorderColor
		              }
		          }
		      }, 
		      {
		          name: 'MA5',
		          type: 'line',
		          data: data.line_5,
		          symbol:'none',  //这句就是去掉点的  
	           	  smooth:true,  //这句就是让曲线变平滑的 
		          lineStyle: {
		              normal: {
		                  opacity: 0.5
		              }
		          }
		      }, 
		      {
		          name: 'MA10',
		          type: 'line',
		          data: data.line_10,
		          symbol:'none',  //这句就是去掉点的  
	          	  smooth:true,  //这句就是让曲线变平滑的 
		          lineStyle: {
		              normal: {
		                  opacity: 0.5
		              }
		          }
		      }, 
		      {
		          name: 'MA20',
		          type: 'line',
		          data: data.line_20,
		          symbol:'none',  //这句就是去掉点的  
	           	  smooth:true,  //这句就是让曲线变平滑的 
		          lineStyle: {
		              normal: {
		                  opacity: 0.5
		              }
		          }
		      }, 
		      {
		          name: 'MA30',
		          type: 'line',
		          data: data.line_30,
		          symbol:'none',  //这句就是去掉点的  
	           	  smooth:true,  //这句就是让曲线变平滑的 
		            lineStyle: {
		                normal: {
		                    width: 1
		                }
		            }
		      },{
		          name: '成交量(万)',
		          type: 'bar',
		          xAxisIndex: 1,
		          yAxisIndex: 1,
		          data: data.vols,
		          itemStyle: {
			    	  normal: {
				          color: function(params) {
				              var colorList;
				              if (data.datas[params.dataIndex][1]>data.datas[params.dataIndex][0]) {
				                  colorList = '#FC3131';
				              } else {
				                  colorList = '#54FCFC';
				              }
				              return colorList;
				          },
				      }
			      }
		      }
		  ]
		};
}else{
	option = {
	        toolbox: {
	            feature: {
	                dataZoom: {
	                    yAxisIndex: false
	                },
	                brush: {
	                    type: ['lineX', 'clear']
	                }
	            }
	        },
	        brush: {
	            xAxisIndex: 'all',
	            brushLink: 'all',
	            outOfBrush: {
	                colorAlpha: 0.1
	            }
	        },
		  grid: [           {
		      left: '5%',
		      right: '3%',
		      height: '60%',
		      top: '5%'
		  },{
		      left: '5%',
		      right: '3%',
		      top: '70%',
		      height: '25%',
		  }],
		  xAxis: [{
		      type: 'category',
		      data: data.times,
		      gridIndex: 0,
		      scale: true,
		      boundaryGap: false,
		      axisLine: { onZero: false,
		      lineStyle:{color:'#c3c3c3'}
		      },
		      axisTick: {
	        	show: false,
	    	  },
		      splitLine: {show: false,
		      lineStyle:{
	                     color: ["#455"],
	                     width: 0.5,
	                     type: 'dotted'
	                }
		      },
		      axisLabel: {
	                            show: false,
	                            textStyle: {
	                                color: '#red'
	                            },
	                            interval:interval
	                        }
		  },{
		      type: 'category',
		      gridIndex: 1,
		      data: data.times,
		      scale: true,
		      boundaryGap: false,
		      axisLine: { onZero: false,
		      lineStyle:{color:'#c3c3c3'}},
		      axisTick: {
	        	show: false
	    	  },
		      splitLine: {show: false,
		      	lineStyle:{
	                     color: ["#455"],
	                     width: 0.5,
	                     type: 'dotted'
	                }
		      },
		      axisLabel: {show: false,interval:interval},
		      axisPointer: {z: 100}
		  }],
		  yAxis: [{
		      scale: true,
		      axisLine: {onZero: false,
		      lineStyle:{color:'#c3c3c3'}},
		      axisTick: {show: false},
		      splitLine: {show: true,
		      	lineStyle:{
	                     color: ["#c3c3c3"],
	                     width: 0.5,
	                     type: 'dotted'
	                }
		      },
		      splitArea: {
		          show: false
		      },
		      axisLabel: {show: true,inside: true,
		      				textStyle: {
	                                color: function(params) {
						      		if(localStorage.getItem("skin_kind") =='black'){
										return	"#FFFFFF";
									}else{
										return  "black";
									}
						      	}
					        }
		      }
		  },{
		      gridIndex: 1,
		      splitNumber: 3,
		      axisLine: {onZero: false,lineStyle:{color:'#c3c3c3'}},
		      axisTick: {show: false},
		      splitLine: {show: true,
		      	lineStyle:{
	                     color: ["#c3c3c3"],
	                     width: 0.5,
	                     type: 'dotted'
	                }
		      },
		      axisLabel: {show: true,inside: true,
		      				textStyle: {
	                                color: 'black'
	                           }, formatter: function (value,index) { 
			       		if(index==0){
			       			return "";
			       		}else{
			       			return value;
			       		}
		            	
		            }
		      }
		  }],
		  series: [
			{
		        name: names,
		        type: 'candlestick',
		        data: data.datas,
		        itemStyle: {
		            normal: {
						color: upColor,
		                color0: downColor,
		                borderColor: upBorderColor,
		                borderColor0: downBorderColor
		            }
		        },
				markPoint: {
					symbolSize:[10,10],
					data:stockdata
				}
		    },
			{
		          name: '成交量(万)',
		          type: 'bar',
		          xAxisIndex: 1,
		          yAxisIndex: 1,
		          data: data.vols,
		          itemStyle: {
			    	  normal: {
				          color: function(params) {
				              var colorList;
				              if (data.datas[params.dataIndex][1]>data.datas[params.dataIndex][0]) {
				                  colorList = '#FC3131';
				              } else {
				                  colorList = '#54FCFC';
				              }
				              return colorList;
				          },
				      }
			      }
		      }
		  ]
		};
}
	myChart.setOption(option,true);
}
//数组处理
function splitData(rawData) {
  var datas = [];
  var times = [];
  var vols = [];
  var line_5 = [];
  var line_10 = [];
  var line_20 = [];
  var line_30 = [];
  var line_stock = [];
  for (var i = 0; i < rawData.length; i++) {
	   datas.push(rawData[i]);
	   line_5.push(rawData[i].splice(6, 1)[0]);
	   line_10.push(rawData[i].splice(6, 1)[0]);
	   line_20.push(rawData[i].splice(6, 1)[0]);
	   line_30.push(rawData[i].splice(6, 1)[0]);
	   line_stock.push(rawData[i].splice(6, 1)[0]);
	   times.push(rawData[i].splice(0, 1)[0]);
	  var v = parseFloat(rawData[i][4]/10000);
	  vols.push(v.toFixed(2));
  }
  return {
      datas: datas,
      times: times,
      vols: vols,
      line_5:line_5,
      line_10:line_10,
      line_20:line_20,
      line_30:line_30,
	  line_stock:line_stock
  };
}

function getDataToFoce(rawData){
	var stock = "";
	var stockDataList = [];
	for (var i = 0; i < rawData.times.length; i++) {
		if(stock==rawData.line_stock[i]||rawData.line_stock[i]=='-'){
			continue;
		}
		stock=rawData.line_stock[i];
		if(stock==0){
			stockDataList.push({xAxis: rawData.times[i],yAxis: rawData.datas[i][2],silent:true,itemStyle:{color:'#1afa29'},symbolOffset:[0,'-150%'],symbol:'path://M512 128a384 384 0 1 0 0 768A384 384 0 0 0 512 128z m150.784 406.464l-126.208 128c-5.952 6.144-13.504 10.496-22.784 9.536-0.32 0-0.576-0.192-0.896-0.192-0.32 0-0.576 0.192-0.896 0.192a31.36 31.36 0 0 1-26.176-14.656L361.536 534.784a32 32 0 1 1 44.928-45.568L480 561.728V384a32 32 0 0 1 64 0v179.776l73.216-74.24a32 32 0 1 1 45.568 44.928z'},);
		}else{
			stockDataList.push({xAxis: rawData.times[i],yAxis: rawData.datas[i][3],silent:true,itemStyle:{color:'#d81e06'},symbolOffset:[0,'150%'],symbol:'path://M512 64.383234C264.7878 64.383234 64.383234 264.7878 64.383234 512s200.404567 447.616766 447.616766 447.616766 447.616766-200.404567 447.616766-447.616766S759.2122 64.383234 512 64.383234zM649.153661 476.550387c-14.514842 12.958403-36.414339 11.264-48.914906-3.784303l-50.402874-60.683752 0 287.768527c0 19.858651-15.528623 35.958547-34.684168 35.958547s-34.684168-16.098874-34.684168-35.958547L480.467545 409.174866l-57.516711 64.531417c-13.000303 14.585357-34.942723 15.483657-49.011992 2.005078-14.068248-13.477557-14.933844-36.227321-1.934563-50.812679l106.756599-119.777341c20.609788-23.122778 55.10285-22.477924 74.964567 1.433804l99.077621 119.283737C665.302611 440.886164 663.668503 463.590962 649.153661 476.550387z'},);
		}
	}
	return stockDataList
}











