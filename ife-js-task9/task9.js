//1.声明需要用的全局变量;//获取根div层;//声明一个数组，用于储存遍历获得的有顺序的div元素;
//声明一个变量，用于储存在显示遍历特效过程中，当前遍历到的元素;
//声明一个布尔值类型变量，利用布尔值的变化和if条件判断的配合，使得网页不刷新情况下前序、后序遍历及查询能够无限次进行;
//声明一个变量，用于储存遍历之后获得的rankarr类数组，并将其转化为数组;
var root =document.querySelector('div');
var arr =[];
var showarr;
var boole=false;
var realarr=[];
/*
2.初始化函数:清除元素中的“select”类名;清空rankarr数组;
用于在再次遍历时清除上一次遍历最后一个元素的特殊样式;clearClass()
*/
function reset(){
	clearClass("select");
	arr=[];
	if(showarr){
		showarr.style.backgroundColor="#fff";
		showarr.style.color="#000";
	}
}
/*
3-1.绑定前序遍历按钮用boole判断:首先初始化;然后调用前序遍历函数;最后调用显示遍历过程函数;
显示的和遍历的函数分开，
用boole判断一下，
//阻止元素鼠标点击事件的默认行为;
*/
function beforeBtn(){
	var btnbefore=document.getElementById("btn-before");
	btnbefore.onclick=function(e){
		e.preventDefault();
		if(!boole){
			reset();
			prereversal(root);
			showFn();
		}
	}
}
/*
3-2.绑定后序遍历按钮:首先初始化;然后调用后序遍历函数;最后调用显示遍历过程函数;
*/
function behindBtn(){
	var btnbehind=document.getElementById("btn-behind");
	btnbehind.onclick=function(e){
		e.preventDefault();
		if(!boole){
			boole =true;
			reset();
			lastreversal(root);
			showFn();
		}
	}
}
/*
3-3.绑定查询按钮:首先初始化；然后调用前序遍历函数，以获得一个前序遍历顺序的类数组（调用后续遍历函数也可以）;
最后调用显示查询过程及结果的函数timeR;
类数组不能使用forEach（）
*/
function searchBtn(){
	var btnsearch=document.getElementById('btn-search');
	btnsearch.onclick=function(e){
		e.preventDefault();
		if(!boole){
			boole =true;
			reset();
			prereversal(root);
			timeR();
		}
	}
}
/*
3-4.给各div层绑定鼠标点击事件:利用addClass函数增加类名“select”,在css中对该类名设置特殊样式;
将类数组转化为数组，

防止事件冒泡和默认鼠标点击事件函数
*/
function clickFn(){
prereversal(root);
realarr=Array.prototype.slice.call(arr);
realarr.forEach(function(e){
		e.onclick=function(e){
		e.preventDefault();//阻止元素鼠标点击事件的默认行为;
     e.stopPropagation();//防止事件冒泡;
      reset();
      addClass(this,"select");

	};
});
}

//console.log(arr);
/*
3-5.绑定删除按钮:通过forEach方法遍历数组,如果数组中有元素的类名包含有select,删除该元素;
*/
function deleBtn(){
	var btndele=document.getElementById('btn-delete');
	btndele.onclick=function(e){
		e.preventDefault();
		realarr.forEach(function(e){
			if(e.className.indexOf("select")!==-1){
				e.remove(this);
			}
		})
		clickFn();
	}
}
/*
3-6.绑定添加按钮:通过forEach方法遍历数组,如果数组中有元素的类名包含有select,向该元素中添加内容;
创建div和textnode 并绑定增加属性setAttribute
className用indexOf查找类名select 
然后再增加。
*/
function addBtn(){
	var btnadd =document.getElementById('btn-add');
	btnadd.onclick=function(e){
		e.preventDefault();
		var newdiv=document.createElement('div');
		var text=document.getElementById('textTxt').value;
		var newtext=document.createTextNode(text);
		newdiv.appendChild(newtext);
		newdiv.setAttribute("class","nItem");
		realarr.forEach(function(e){
			if(e.className.indexOf("select")!==-1){
				e.appendChild(newdiv);
			};
		});
	};clickFn();
}
//4.功能函数;
/*
4-1.前序遍历函数:主要通过函数的迭代和for循环实现遍历;数组push方法加入的顺序决定了获得的类数组是前序还是后序;
*/
function prereversal(node){
	if(node){
	arr.push(node);
	var num=node.children;
	for(var i=0;i<num.length;i++){
		prereversal(num[i]);
	}
	}
}
console.log(arr);
/*
4-2.后序遍历函数:主要通过函数的迭代和for循环实现遍历;数组push方法加入的顺序决定了获得的类数组是前序还是后序;
*/
function lastreversal(node){
	if(node){
		var num=node.children;
	for(var i=0;i<num.length;i++){
		lastreversal(num[i]);
		
	}arr.push(node);
}
}
/*4-3.显示遍历过程函数:
使用定时器定时显示遍历到的元素（在for循环中嵌套定时器时需要注意定时器是异步进行的,
其需要的变量i不能从for循环中获得,因为for循环是同步进行,
当定时器开始启动时,for循环已经遍历结束,此时for循环内的i变量值已经是最大值,所以要用function）

*/
function showFn(){
	var timer=0;
	for(var i=0;i<arr.length;i++){
		(function(i){
			setTimeout(function(){
			if(showarr){//这里消除掉保存的遍历到的函数，否则就不能呈现出遍历的效果。
				showarr.style.backgroundColor="#fff";
			}
			arr[i].style.backgroundColor="#444";
			showarr=arr[i];//将遍历到的函数保存起来。
			},i*100)
		})(i);
	}
}
/*
4-4.显示查询过程函数:查询过程利用延时器来模拟“显示遍历过程的函数”,在使用延时器的过程中，
由于延时器可以无限次启动其内部函数，因此可以自设变量i,再配合if条件语句来达到使用定时器的时候需要的for循环效果;
*/
function timeR(){
	var i=-1;
	if(document.getElementById("searchTxt").value == ""){
		alert('please type some word');
	}else{
		var timer=setInterval(function(){
			if(i<arr.length){
				i++;
				arr[i-1].style.backgroundColor="#fff";
				arr[i].style.backgroundColor="#111";
				if(arr[i].childNodes[0].data.indexOf(document.getElementById("searchTxt").value)!== -1){
					arr[i].style.backgroundColor="blue";
					alert("find it");//直接在遍历的时候同时找出相应的值。
				}
			}else{
				boole =false;
				arr[i-1].style.backgroundColor="#fff";
				clearInterval(timer);

			}
		},100);
	} clickFn();
}

/*
4-5.增加元素类名函数:element为需要增加类名的元素,value为需要给其增加的类名;
*/
function addClass(element,value){
	if(!element){return false;}//如果元素不存在
	if(!element.className){//如果类名不存在
		element.className=value;
	}else{
		var ggname=element.className;
		ggname += " ";
		ggname += value
		element.className=ggname;
	}
}
/*
4-6.删除元素类名函数:element为需要删除类名的元素,value为需要给其删除的类名;
*/
function removeClass(element,value){
	if(element.className.indexOf('select')!== -1){
		var ggname = element.className;
		ggname=ggname.replace(value," ");
		element.className=ggname;//再将替换的属性名赋予回去
	}
}
function clearClass(value){//使用多个形参传递值
	realarr.forEach(function(e){
		removeClass(e,value);
	})
}
/*
4-7.初始化类名函数;
*/
window.onload=function(){
	clickFn();
	beforeBtn();
	searchBtn();
	deleBtn();
	addBtn();
	behindBtn();
}