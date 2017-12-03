window.onload = function(){
	var box = document.getElementById('box1');
	var text = document.getElementById('text');
	var left1 = document.getElementById('left1');
	var left2 = document.getElementById('left2');
	var right2 = document.getElementById('right2');
	var right1 = document.getElementById('right1');
	var queue = document.getElementById('queue')
	//增加数值
	num = 1;

	function insert(direction){
	//验证
		if(num > 60){
			alert("数量大于60了");
			return false;
		}
		if(text.value.indexOf(" ")>=0 || text.value==""|| text.value<10 || text.value>100){
			alert("请输入10-100的数字且没有空格");
			text.focus();
		}else if(isNaN(text.value)){
			alert('it must be a number');
			text.focus();
		}else{
			var li = document.createElement('li');
			li.style.height = text.value+"px";
			if(direction = "left"){
				box.insertBefore(li,box.firstChild);
				num ++;
			}else if (direction = "right"){
				box.appendChild(li);
				num ++;
			}
		}
	}
	//删除数值
	function dele(direction){
		if(box.childNodes.length<=0){
			alert("没有可以侧出的元素")
			return false;
		}else{
			if(direction==="left"){//点击左侧出
				alert("删除数字："+parseInt(box.firstChild.style.height));
				box.removeChild(box.firstChild);
			}if(direction ==="right"){//点击右侧出
				var last = box.lastChild;
				alert(parseInt(last.style.height));//不能访问style属性是因为ul之间有很多空白符
				box.removeChild(box.lastChild);
			}
		}
	
	}
	//点击li删除啊
		box.addEventListener('click', function(e) {//用addEventListener绑定单击事件。
		box.removeChild(e.target);
	});
	function queuesort(){
	    var lis = box.getElementsByTagName('li');
	    var arr= [];
	    for(var i =lis.length-1; i>=0; i--){//没有>=只是=的话一开始就循坏不了
	    	arr.push(parseInt(box.children[i].style.height));//用box.children才能访问style
	    	box.removeChild(lis[i]);
	    	num --;
	    }
	    arr.sort(function(a,b){
	    	return a>b;
	    })
	    for(var u = 0;u <arr.length;u++){
	    	var lis = document.createElement('li');
	    	lis.style.height = arr[u] +"px";//在右边赋值的时候可以，又或者是上面创造了的原因
	    	box.appendChild(lis);
	    }
	} 
	
	left1.onclick = function(){insert("left");};
	right1.onclick = function(){insert("right");};
	left2.onclick = function(){dele("left");};
	right2.onclick = function(){dele("right");};
	queue.onclick = function(){queuesort();};
	//target 事件属性可返回事件的目标节点（触发该事件的节点），如生成事件的元素、文档或窗口。 
//语法 event.target event 无法识别。
}
