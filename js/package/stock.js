function init_stock(myChart,code){
	var url_ ="http://192.168.1.20:8080/amtp-pre/tdx/list";
	var data ={};
	var cd = sessionStorage.getItem('Stock_Code');
	var cd = "sh000001";
	if(code=='day-k'){
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
                url: amtp_kline_url ,//url
                data: data,
                success: function (result) {
                	console.log(result);
		            var data ="";
		    		var name ="";
		    		var interval=10;
		    		if(code=='day-k'){
		    			name ="日K";
		    		}
		    		if(code=='week-k'){
		    			name ="周K";
		    		}
		    			
			    	if(code=='month-k'){
		    			name ="月K";
		    			interval =20;
		    		}
                   	data = result.split(";");
                   	console.log(data);
                   	var rowDate =[];
			    	for(var i=0;i<data.length;i++){
			    		var temp = data[i].split(",");
			    		console.log(temp);
			    		rowDate.push(temp);
			    	}
			    	console.log(rowDate[0].length);
    				load_stock(myChart,rowDate,name,interval);
                },
                error : function() {
                	console.log('哈哈哈哈')
                	const result = '20190423,3211.87,3198.59,3231.58,3186.76,328361216.00,3239.55,3224.97,3182.49,3142.54;20190424,3203.56,3201.61,3210.65,3156.61,274872160.00,3227.25,3220.93,3192.71,3147.25;20190425,3190.59,3123.83,3193.75,3123.03,325879136.00,3201.97,3214.32,3197.77,3150.48;20190426,3108.16,3086.40,3129.21,3085.80,280873856.00,3165.09,3204.10,3202.34,3153.67;20190429,3090.63,3062.50,3107.76,3050.03,292114880.00,3134.59,3192.57,3200.93,3155.02;20190430,3052.62,3078.34,3088.41,3052.62,222302512.00,3110.54,3175.04,3196.33,3154.42;20190506,2984.73,2906.46,2986.54,2876.47,326972256.00,3051.51,3139.38,3182.81,3148.27;20190507,2914.29,2926.39,2937.28,2889.07,253281776.00,3012.02,3107.00,3168.31,3142.80;20190508,2873.14,2893.76,2929.43,2866.70,231530512.00,2973.49,3069.29,3150.67,3135.87;20190509,2871.20,2850.95,2888.86,2845.04,200041136.00,2931.18,3032.88,3130.98,3127.43;20190510,2878.23,2939.21,2941.45,2838.38,282306816.00,2903.35,3006.95,3115.96,3123.97;20190513,2905.07,2903.71,2921.41,2892.17,212029888.00,2902.80,2977.16,3099.04,3120.86;20190514,2872.83,2883.61,2909.20,2872.83,208345360.00,2894.25,2953.13,3083.73,3116.22;20190515,2902.64,2938.68,2945.39,2902.64,230519696.00,2903.23,2938.36,3071.23,3114.35;20190516,2933.50,2955.71,2956.17,2929.06,248385696.00,2924.18,2927.68,3060.13,3109.84;20190517,2955.77,2882.30,2956.78,2873.80,266301648.00,2912.80,2908.08,3041.56,3100.24;20190520,2874.80,2870.60,2882.63,2838.45,209472448.00,2906.18,2904.49,3021.93,3090.04;20190521,2867.71,2905.97,2919.24,2862.50,211387024.00,2910.65,2902.45,3004.72,3079.69;20190522,2905.52,2891.70,2912.40,2879.64,200026912.00,2901.26,2902.24,2985.77,3067.86;20190523,2880.84,2852.52,2885.14,2846.96,197340304.00,2880.62,2902.40,2967.64,3054.79;20190524,2847.84,2852.99,2871.86,2846.02,167205488.00,2874.76,2893.78,2950.36,3041.90;20190527,2851.28,2892.38,2898.13,2833.04,196720896.00,2879.11,2892.65,2934.90,3030.25;20190528,2890.27,2909.91,2924.04,2887.08,223310560.00,2879.90,2895.28,2924.20,3020.91;20190529,2894.83,2914.70,2934.98,2890.66,198958816.00,2884.50,2892.88,2915.62,3011.78;20190530,2903.42,2905.81,2907.85,2881.38,205758784.00,2895.16,2887.89,2907.78,3002.71;20190531,2904.50,2898.70,2922.91,2895.58,195230576.00,2904.30,2889.53,2898.80,2990.88;20190603,2901.74,2890.08,2920.83,2875.90,215943552.00,2903.84,2891.48,2897.98,2978.45;20190604,2887.64,2862.28,2888.39,2851.97,188463536.00,2894.31,2887.11,2894.78,2965.52;20190605,2882.94,2861.42,2888.77,2858.57,181561040.00,2883.66,2884.08,2893.16,2951.87;20190606,2862.33,2827.80,2862.33,2822.19,177064416.00,2868.06,2881.61,2892.00,2938.96;20190610,2833.01,2852.13,2861.13,2824.36,166585920.00,2858.74,2881.52,2887.65,2927.41;20190611,2854.07,2925.72,2927.43,2854.07,260525792.00,2865.87,2884.86,2888.75,2918.22;20190612,2917.22,2909.38,2924.70,2903.88,240255776.00,2875.29,2884.80,2890.04,2911.07;20190613,2905.29,2910.74,2918.42,2885.92,212957792.00,2885.15,2884.41,2888.64,2905.21;20190614,2913.00,2881.97,2924.32,2879.66,215435792.00,2895.99,2882.02,2884.95,2899.20;20190617,2880.42,2887.62,2902.48,2877.39,153964960.00,2903.09,2880.91,2885.22,2892.84;20190618,2891.09,2890.16,2898.33,2874.31,147705312.00,2895.97,2880.92,2886.20,2892.30;20190619,2944.12,2917.80,2953.34,2916.21,230756976.00,2897.66,2886.47,2886.79,2892.01;20190620,2917.33,2987.12,2997.39,2915.09,291011552.00,2912.93,2899.04,2891.56,2895.12;20190621,2990.37,3001.98,3010.35,2989.25,286973824.00,2936.94,2916.46,2899.03,2900.16;20190624,3004.29,3008.15,3012.83,2994.42,210493888.00,2961.04,2932.06,2906.79,2902.45;20190625,3004.91,2982.07,3004.91,2948.99,243699248.00,2979.42,2937.70,2911.28,2905.07;20190626,2964.62,2976.28,2986.91,2958.46,174449536.00,2991.12,2944.39,2914.60,2908.16;20190627,2982.61,2996.79,3011.54,2981.04,195397056.00,2993.05,2952.99,2918.70,2910.09;20190628,2992.24,2978.88,2992.24,2961.22,181431520.00,2988.43,2962.68,2922.35,2910.87;20190701,3024.62,3044.90,3045.37,3014.69,250840432.00,2995.78,2978.41,2929.66,2916.29;20190702,3042.58,3043.94,3048.48,3033.78,214520624.00,3008.16,2993.79,2937.36,2922.06;20190703,3031.83,3015.26,3031.83,3006.32,212296176.00,3015.95,3003.54,2945.01,2925.71;20190704,3015.68,3005.25,3024.50,2991.91,194415136.00,3017.65,3005.35,2952.20,2929.49;20190705,3004.74,3011.06,3014.85,2990.92,156755424.00,3024.08,3006.26,2961.36,2934.78;20190708,2997.81,2933.36,2997.81,2918.72,211541264.00,3001.77,2998.78,2965.42,2937.45;20190709,2928.82,2928.23,2937.76,2912.81,145110608.00,2978.63,2993.40,2965.55,2938.65;20190710,2935.19,2915.30,2936.75,2908.16,135483536.00,2958.64,2987.30,2965.84,2938.83;20190711,2928.06,2917.76,2945.80,2907.89,143692528.00,2941.14,2979.39,2966.19,2938.93;20190712,2915.34,2930.55,2938.53,2905.81,137794752.00,2925.04,2974.56,2968.62,2939.76;20190715,2921.55,2942.19,2955.00,2886.70,167643392.00,2926.81,2964.29,2971.35,2941.21;20190716,2938.64,2937.62,2944.82,2931.29,131811752.00,2928.68,2953.66,2973.72,2942.79;20190717,2933.02,2931.69,2942.07,2924.46,149631616.00,2931.96,2945.30,2974.42,2945.10;20190718,2921.74,2901.18,2921.74,2901.18,149888832.00,2928.65,2934.89,2970.12,2946.43;20190719,2909.68,2924.20,2939.60,2909.68,149469552.00,2927.38,2926.21,2966.23,2949.64;20190722,2925.79,2886.97,2927.16,2879.69,180674960.00,2916.33,2921.57,2960.17,2950.80;20190723,2886.90,2899.94,2901.36,2883.05,129310512.00,2908.80,2918.74,2956.07,2949.94;20190724,2907.93,2923.28,2936.45,2907.79,155245760.00,2907.11,2919.54,2953.42,2950.41;20190725,2923.19,2937.36,2937.36,2916.15,145684384.00,2914.35,2921.50,2950.45,2951.30;20190726,2928.06,2944.54,2948.33,2924.45,139343392.00,2918.42,2922.90,2948.73,2953.38;20190729,2943.92,2941.01,2948.47,2932.98,127991848.00,2929.23,2922.78,2943.53,2955.16;20190730,2946.26,2952.34,2965.63,2946.26,148316464.00,2939.71,2924.25,2938.95,2957.23;20190731,2944.40,2932.51,2944.40,2926.49,141052352.00,2941.55,2924.33,2934.82,2957.72;20190801,2920.85,2908.77,2927.34,2901.75,142389808.00,2935.83,2925.09,2929.99,2955.11;20190802,2861.33,2867.84,2872.47,2851.44,184888448.00,2920.49,2919.46,2922.83,2950.64;20190805,2854.58,2821.50,2863.69,2821.50,167419424.00,2896.59,2912.91,2917.24,2944.42;20190806,2776.99,2777.56,2787.42,2733.92,231123728.00,2861.64,2900.67,2909.71,2937.60;20190807,2789.02,2768.68,2792.69,2768.68,157716752.00,2828.87,2885.21,2902.37,2930.68;20190808,2784.18,2794.55,2799.69,2782.24,149539568.00,2806.03,2870.93,2896.21,2923.94;20190809,2805.59,2774.75,2808.33,2770.48,148240288.00,2787.41,2853.95,2888.42,2917.14;20190812,2781.98,2814.99,2814.99,2776.62,131563432.00,2786.11,2841.35,2882.06,2909.47;20190813,2798.05,2797.26,2802.04,2790.61,130916504.00,2790.05,2825.84,2875.05,2901.25;20190814,2824.49,2808.91,2829.89,2807.72,144014640.00,2798.09,2813.48,2868.91,2894.37;20190815,2762.34,2815.80,2815.90,2756.83,152772160.00,2802.34,2804.18,2864.64,2888.06;20190816,2817.57,2823.82,2840.32,2811.80,148582336.00,2812.16,2799.78,2859.62,2881.82;20190819,2835.52,2883.10,2883.10,2829.85,214546672.00,2825.78,2805.94,2859.43,2880.14;20190820,2879.08,2880.00,2892.08,2875.00,189677200.00,2842.33,2816.19,2858.43,2878.53;20190821,2875.47,2880.33,2885.59,2872.56,159019664.00,2856.61,2827.35,2856.28,2877.37;20190822,2887.66,2883.44,2888.50,2867.55,149206208.00,2870.14,2836.24,2853.58,2876.22;20190823,2885.15,2897.43,2902.46,2878.74,159156832.00,2884.86,2848.51,2851.23,2875.12;20190826,2851.02,2863.57,2870.49,2849.24,169895360.00,2880.95,2853.37,2847.36,2872.50;20190827,2879.52,2902.19,2919.64,2879.41,208141792.00,2885.39,2863.86,2844.85,2871.32;20190828,2901.63,2893.76,2905.44,2887.01,183097904.00,2888.08,2872.34,2842.91,2870.05;20190829,2896.00,2890.92,2898.60,2878.59,178613088.00,2889.57,2879.86,2842.02,2869.71;20190830,2907.38,2886.24,2914.58,2874.10,193959952.00,2887.34,2886.10,2842.94,2868.45;20190902,2886.94,2924.11,2928.48,2883.68,202786800.00,2899.44,2890.20,2848.07,2869.68;20190903,2925.94,2930.15,2930.15,2915.20,189001216.00,2905.04,2895.21,2855.70,2870.69;20190904,2927.75,2957.41,2957.41,2925.88,225495904.00,2917.77,2902.92,2865.14,2871.83;20190905,2972.66,2985.86,3015.84,2972.66,305438720.00,2936.75,2913.16,2874.70,2873.44;20190906,2996.62,2999.60,2999.94,2981.60,216826032.00,2959.43,2923.38,2885.94,2875.28;20190909,3023.78,3024.74,3026.24,3005.69,243377760.00,2979.55,2939.50,2896.43,2878.07;20190910,3027.41,3021.20,3027.41,3005.38,240012944.00,2997.76,2951.40,2907.63,2880.37;20190911,3029.93,3008.81,3030.56,3004.22,229837360.00,3008.04,2962.90,2917.62,2882.91;20190912,3016.63,3031.24,3033.47,3005.19,196968704.00,3017.12,2976.94,2928.40,2886.99;20190916,3041.92,3030.75,3042.93,3020.05,221878960.00,3023.35,2991.39,2938.74,2892.42'
                	var data ="";
		    		var name ="";
		    		var interval=10;
		    		if(code=='day-k'){
		    			name ="日K";
		    		}
		    		if(code=='week-k'){
		    			name ="周K";
		    		}
		    			
			    	if(code=='month-k'){
		    			name ="月K";
		    			interval =20;
		    		}
                   	data = result.split(";");
                   	console.log(data);
                   	var rowDate =[];
			    	for(var i=0;i<data.length;i++){
			    		var temp = data[i].split(",");
			    		console.log(temp);
			    		rowDate.push(temp);
			    	}
			    	console.log(rowDate[0].length);
    				load_stock(myChart,rowDate,name,interval);
                }
          });
}
function load_stock(myChart,rowDate,names,interval){
var upColor = '#FF3232';
var upBorderColor = '#FF3232';
var downColor = '#54FCFC';
var downBorderColor = '#54FCFC';
console.log(rowDate);
var data =splitData(rowDate);
console.log(data);
//MA计算公式
var length_=data.times.length;

 if(length_<100){
	for(var i=0;i<100-length_;i++){
		data.times.push("");
	}
 }
function calculateMA(dayCount) {
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

var option = {
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
	  xAxis: [
	  	//	上部的k线图区域
	  	{
	      type: 'category',//坐标轴类型 ，设置为category类目轴，适用于离散的类目数据，为该类型时必须通过 data 设置类目数据
	      data: data.times,//设置数据
	      gridIndex: 0,//x 轴所在的 grid 的索引，默认位于第一个 grid
	      scale: true,//坐标原点改变 脱离0值比例(数值轴有效)
	      //坐标轴两边留白策略，类目轴和非类目轴的设置和表现不一样。类目轴中 boundaryGap 可以配置为 true 和 false。默认为 true，这时候刻度只是作为分隔线，标签和数据点都会在两个刻度之间的带(band)中间。非类目轴，包括时间，数值，对数轴，boundaryGap是一个两个值的数组，分别表示数据最小值和最大值的延伸范围，可以直接设置数值或者相对的百分比，在设置 min 和 max 后无效
	      boundaryGap:true,
	      //X 轴或者 Y 轴的轴线是否在另一个轴的 0 刻度上，只有在另一个轴为数值轴且包含 0 刻度时有效
	      axisLine: { onZero: true,lineStyle:{color:'#c3c3c3'}},
	      axisTick: {
        	show: false,//是否显示刻度线
    	  },
	      splitLine: {
	      	//是否显示分割线，分割线的颜色，宽度和线条类型
	      	show: false,
	      	lineStyle:{
            	color: ["#455"],
             	width: 0.5,
             	type: 'dotted'
              }
	      },
	      axisLabel: {
                        show:false,//是否显示刻度标签
                        interval:interval,//坐标轴刻度标签的显示间隔，在类目轴中有效
                        textStyle: {color: 'red'}//横坐标刻度的颜色
                    }
	  },
	  //下部显示量的图线区域
	  {
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
	      //底部横坐标是否显示
	      axisLabel: {show: false,interval:interval},
	      axisPointer: {z: 100}
	  }],
	  yAxis: [
	  //上部k线区域的纵坐标
	  	{
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
					      		if(localStorage.getItem("skin_kind") =='white'){
									return	"black";
								}else{
									return  "white";
								}
					      	}
				        }
	      }
	  },
	  	//下部区域的纵坐标相关设置
	  	{
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
	                  opacity: 0.5,
	                  color:'yellow'
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
	                  opacity: 0.5,
	                  color:'pink'
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
	                  opacity: 0.5,
	                  color:'blue'
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
	                    width: 1,
	                    color:'orange'
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
  for (var i = 0; i < rawData.length; i++) {
	   datas.push(rawData[i]);
	   line_5.push(rawData[i].splice(6, 1)[0]);
	   line_10.push(rawData[i].splice(6, 1)[0]);
	   line_20.push(rawData[i].splice(6, 1)[0]);
	   line_30.push(rawData[i].splice(6, 1)[0]);
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
      line_30:line_30
  };
}











