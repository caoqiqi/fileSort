window.onload = function() {

	var oparent = document.getElementById('parent');
	var lis = getClassObj(oparent, 'list-group-item');
	var uls = getClassObj(oparent, 'list-group');

	for (var i = 0; i < lis.length; i++) {

		lis[i].setAttribute('draggable', 'true');
		lis[i].ondragstart = function(e) {
			e = e || window.e;
			e.dataTransfer.setData('Text', getTarget(e).id);
			console.log(getTarget(e).id);
		};
	}
	for (var j = 0; j < uls.length; j++) {
		uls[j].ondrop = function(e) {
			e = e || window.e;

			//阻止事件默认行为来避免浏览器对数据的默认处理（drop 事件的默认行为是以链接形式打开）
			if (e.preventDefault) {
				e.preventDefault();
			} else {
				e.returnValue = false;
			}
			//阻止事件冒泡，使其不能实现拖拽打开新窗口
			if (e.stopPropagation) {
				e.stopPropagation();
			} else {
				e.cancelBubble = true;
			}

			var data = e.dataTransfer.getData('Text');
			//判断是否为IE
			if(!!window.ActiveXObject || "ActiveXObject" in window){
				getTarget(e).appendChild(document.getElementById(data));
			}else{
				getTarget(e).parentNode.appendChild(document.getElementById(data));
			}
		};
		uls[j].ondragover = function(e) {

			e = e || window.e;

			//使其可以放置拖动的元素
			if (e.preventDefault) {
				e.preventDefault();
			} else {
				e.returnValue = false;
			}

		};
	}
};

//获取同一类名的元素
function getClassObj(parent, className) {

	var obj = parent.getElementsByTagName('*'); //获取父级的所有子集
	var pinS = []; //创建一个数组 用于收集子元素

	for (var i = 0; i < obj.length; i++) { //遍历子元素、判断类别、压入数组
		if (obj[i].className == className) {
			pinS.push(obj[i]);
		}
	}

	return pinS;
}

function getTarget(e) {

	return e.target || e.srcElement;
}