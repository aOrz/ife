/**
 * aqiData，存储用户输入的空气指数数据
 * 示例格式：
 * aqiData = {
 *    "北京": 90,
 *    "上海": 40
 * };
 */
var aqiData = {};

/**
 * 从用户输入中获取数据，向aqiData中增加一条数据
 * 然后渲染aqi-list列表，增加新增的数据
 */
function addAqiData() {
	var city = document.getElementById('aqi-city-input').value;
	var num = document.getElementById('aqi-value-input').value;
	var alphaReg = /^[\u4e00-\u9fa5a-z]+$/i,
    numReg = /^\d+$/,
    nullReg = /^\s+|\s+$/g;
    city = city.replace(nullReg,'');
    num = num.replace(nullReg,'');
    if (!alphaReg.test(city)||!numReg.test(num)) {
    	alert('输入数据不合法');
    	return;
    }
	aqiData[city] = num;
}

/**
 * 渲染aqi-table表格
 */
function renderAqiList() {
	var tableNodes = [];
	var table = document.getElementById('aqi-table');
	tableNodes.push("<tr>");
	tableNodes.push("<td>城市</td>");
	tableNodes.push("<td>指数</td>");
	tableNodes.push("<td >操作</td>");
	tableNodes.push("</tr>");
    for (var data in aqiData) {
        tableNodes.push("<tr>");
		tableNodes.push("<td>" + data + "</td>");
		tableNodes.push("<td>" + aqiData[data] + "</td>");
		tableNodes.push("<td style='text-align:center'><button type='button' data-city='"+ data + "'>删除</button></td>");
		tableNodes.push("</tr>");
	}
	if(tableNodes.length>5){
		table.innerHTML = tableNodes.join("");
	}else{
		table.innerHTML = '';	
	}
}

/**
 * 点击add-btn时的处理逻辑
 * 获取用户输入，更新数据，并进行页面呈现的更新
 */
function addBtnHandle() {
  addAqiData();
  renderAqiList();
}

/**
 * 点击各个删除按钮的时候的处理逻辑
 * 获取哪个城市数据被删，删除数据，更新表格显示
 */
function delBtnHandle(city) {
  // do sth.
  delete aqiData[city];
  renderAqiList();
}

function init() {

  // 在这下面给add-btn绑定一个点击事件，点击时触发addBtnHandle函数
  document.getElementById("add-btn").addEventListener('click',addBtnHandle,false)
  // 想办法给aqi-table中的所有删除按钮绑定事件，触发delBtnHandle函数
  document.getElementById("aqi-table").addEventListener("click", function(event){
        if(event.target.nodeName.toLowerCase() === 'button') 
        	delBtnHandle(event.target.dataset.city);
    });

}

init();