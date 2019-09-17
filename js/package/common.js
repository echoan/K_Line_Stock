/**
 * ajax封装
 * data 发送到服务器的数据，数组存储，如：{"date": new Date().getTime(), "state": 1}
 * asyncStatus 同步异步标志位
 * callBacksuccess 成功回调函数
 */
jQuery.stockService=function (param) {
	if(navigator.onLine){
  		console.log("onLine");
  		var _success = param.success;
		var _error = param.error;
		var _data = param.data;
		if (typeof (_success) != "function") {
			_success = function() {
			};
		}
		if (typeof (_error) != "function") {
			_error = function() {
			};
		}
		var funcId = new Date().getTime();
		var successName = "success" + funcId;
		var topWin = window.top;
		topWin[successName] = function(resp) {
			// 判断会话已完成
			try {
				_success(resp);
			} catch (e) {
			}
			delete topWin[successName];
		};
		var errorName = "error" + funcId;
		topWin[errorName] = function(resp) {
			try {
				_error(resp);
			} catch (e) {
			}
			delete topWin[errorName];
		};
		param.success = topWin[successName];
		param.error = topWin[errorName];
		param.type = 'post';
		param.data = _data;
		param.url = amtp_kline_url+"?fresh="+Math.random();
		$.ajax(param);
	}else{
		messageResult("当前网络不可用，请检查网络");
		return false;
	}
}