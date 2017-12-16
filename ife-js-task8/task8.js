//用check实现遍历查询，遍历方法中通过对text输入而查询到对应的 位置停下，并且显色弹窗显示
var treeroot = document.getElementById('root');
var text = document.getElementById('text');
var button = document.getElementById('button');
var timer = 0;
var arr=[];
var addbtn=document.getElementById('btn-add');
button.addEventListener('click',function(){
	
	arr.push(treeroot);
	reset();
	traverse(treeroot);
	changeColor(arr);
	
});
var di=document.getElementsByTagName('div');

function traverse(node){
	
	if(node ){
		for(var i = 0;i<node.children.length;i++){
			changeColor(node);
			arr.push(node.children[i]);
			//console.log(node.children[i]);
			traverse(node.children[i]);	
		}
	}
}

function changeColor(ar){
	
	var i = -1;
	if(i<ar.length){
		timer=setInterval(function(){
	i++;
	ar[i].style.backgroundColor="#222";
	ar[i-1].style.backgroundColor="#fff";
	if(ar[i].childNodes[0].data==text.value){
	//从arr的子元素中找到第一个元素是obj text元素，
	//再用.data或者.wholeText，调用出其中的text文字
		clearInterval(timer);
		alert("i find this Element!")
	}		
		},700)}
		else{
		timer=clearInterval(timer);
		
		}
	
}
function reset(){
	var div =document.getElementsByTagName('div')
	for(var i =0;i<div.length;i++){
	div[i].style.backgroundColor='#fff';}
	clearInterval(timer);
}

