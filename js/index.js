var ul = document.getElementById('ul');
var li = ul.getElementsByTagName('li');
var type = document.getElementById('type');
var btn = document.getElementById('btn');
li[2].className = 'background';
var num1 = 1;
var num2 = 10;


var page = 1,
    row = 10;
var pageNum = 200;

function getData($,page) {
    var url = 'http://123.207.11.231:8080/SCIEManagement/article/manage';
    $.ajax({
        url: url,
        type: "POST",
        data: {
            'page': page,
            'row': row
        },
        success: function(data) {
                // console.log(data);
                render(data.articles.article);
            }
    })
}
function render(datalist) {
    var str = '';
    var addCont = $("#content");
    $.each(datalist,function(i) {
        // console.log(datalist[i].title);
        str += "<p class = "+"title"+">" + datalist[i].title + "</p>";
        $("#content").html(str);
    })
}
getData($);

//给表示页数的三个li写上页数
content(num1);
function content(number){
    for(var i=0 ; i<li.length-4 ; i++){
        li[i+2].innerHTML = number;
        number++;
    }
}

//把所有的分页背景去掉，给指定的分页添加背景颜色
function Background(num){
    for(var i = 0;i<li.length;i++){
       	li[i].className = li[i].className.replace('background','');
        li[num].className = 'background';
    }
} 
//首页的点击事件
li[0].onclick = function(){
    Background(2);
    num1 = 1;
    content(num1);
    getData($);
}
//尾页的点击事件
li[li.length-1].onclick = function(){
    Background(li.length-3);
    num1 = num2-(li.length-5);
    content(num1);
    getData($,(li.length-1));
}
//上一页的点击事件
li[li.length-(li.length-1)].onclick = function(){

    for(var j = 0;j<li.length-4;j++){
        if(li[j+2].className == 'background' && li[j+2].innerHTML != 1){
            if(j+2 != li.length-(li.length-2)){
                Background(j+1);
                getData($,li[j+1].innerHTML);
            }
            break;
        }
    }
    if(j+2 == li.length-(li.length-2)){
        num1 -- ;
        content(num1);
        getData($,li[j+2].innerHTML);
    }
}
//下一页的点击事件
li[li.length-2].onclick = function(){
    for(var j = 0;j<li.length;j++){
        if(li[j].className == 'background' && li[j].innerHTML < num2){  //* && 写最后一页的总数*/
            if(j+1 < li.length-2){
                Background(j+1);
                getData($,li[j+1].innerHTML);
            }
            break;
        }
    }
    if(j+1 == li.length-2){
        num1++;
        content(num1);
        getData($,li[j].innerHTML);
    }
}        
//分页的点击事件
for(var i = 0;i<li.length-4;i++){
    li[i+2].index = i+2;
    li[i+2].onclick = function(){
        Background(this.index);
        getData($,this.index);
    }
}
//跳转事件       
btn.onclick = function(){

	if(type.value>2&&type.value<num2-1){
		Background(2);
		content(type.value);
        getData($,type.value);
	}

	else if(type.value == 1){
		Background(2);
        getData($,1);
		content(1);
	}

	else if(type.value == 2){
		Background(3);
        getData($,2);
		content(2);
	}

	else if(type.value == num2){
		Background(4);
        getData($,num2-1);
		content(num2-2);
	}

	else if(type.value == num2 - 1){
		Background(3);
        getData($,num2-2);
		content(num2-2);
	}
}

   