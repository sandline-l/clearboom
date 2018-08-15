var startBtn=document.getElementsByClassName('startBtn')[0];
var flagWrapper = document.getElementsByClassName('flag-wrapper')[0];
var boxWrapper = document.getElementsByClassName('box-wrapper')[0];
var alertBox = document.getElementsByClassName('alertBox')[0];
var close = document.getElementsByClassName('close')[0];
var score = document.getElementsByClassName('score')[0];
var alertImg = document.getElementsByClassName('alertImg')[0];
var wrapper = document.getElementsByClassName('wrapper')[0];
var time = document.getElementsByClassName('time')[0];

var mineNum = 10;//雷的个数
var mineOver = 10;//剩余雷的个数
var boomList;
var lock=true;

bindEvent();
function bindEvent(){
    //点击开始按钮,显示雷区和计数,并初始化雷区(生成雷)
    startBtn.onclick = function(){
        if(lock){
            flagWrapper.style.display='block';
            boxWrapper.style.display='block';
            init();
            lock=false;
        }
    }
    //取消右键默认事件
    wrapper.oncontextmenu = function () {
        return false;
    }
    //判断点击事件,左键点击,执行leftdown(),右键点击,执行rightdown()
    boxWrapper.onmousedown=function(e){
        var event=e.target;
        if(e.which==1){
            leftdown(event);
        }
        if(e.which==3){
            rightdown(event);
        }
    }
    close.onclick=function(){
        flagWrapper.style.display='none';
        boxWrapper.style.display='none';
        alertBox.style.display='none';
        boxWrapper.innerHTML='';
        lock=true;
    } 
}
function leftdown(dom){
    if(dom.classList.contains('flag')){
        return;
    }
    var isLeiList=document.getElementsByClassName('isLei');
    //如果是雷,就这样处理,不是雷就那样处理
    if(dom && dom.classList.contains('isLei')){
        for(i=0;i<isLeiList.length;i++){
            isLeiList[i].classList.add('show');
        }
        setTimeout(function(){
            alertBox.style.display='block';
        }, 800);    
    }else{
        var num=0;
        var domIndex = dom.getAttribute('id').split('-');
        var domX = dom && +domIndex[0];
        var domY = dom && +domIndex[1];
        dom && dom.classList.add('num');
        //存放四周的格子
        for(var i = domX-1;i <= domX+1;i++){
            for(var j = domY-1;j <= domY+1;j++){
                var aroundBox=document.getElementById(i+'-'+j);
                if(aroundBox && aroundBox.classList.contains('isLei')){
                    num++;
                }
            }
        }
        dom && (dom.innerHTML= num);
        if(num==0){
            for(var i = domX-1;i <= domX+1;i++){
                for(var j = domY-1;j <= domY+1;j++){
                    var nearBox=document.getElementById(i+'-'+j);
                    if(nearBox && nearBox.length!=0){
                        if(!nearBox.classList.contains('check')){
                            nearBox.classList.add('check');
                            leftdown(nearBox);
                        }
                    }
                }
            }
        }
    }
}
function rightdown(dom){
    if(dom.classList.contains('num')){
        return;
    }
    dom.classList.toggle('flag');
    if(dom.classList.contains('isLei') && dom.classList.contains('flag')){
        mineOver--;
    }
    if(dom.classList.contains('isLei') && !dom.classList.contains('flag')){
        mineOver++;
    }
    score.innerHTML = mineOver;
    if(mineOver==0){
        alertBox.style.display='block';
        alertImg.style.backgroundImage='url("../../dist/image/success.png")';
    }
}
function init(){
    mineNum = 10;
    mineOver = 10;
    score.innerHTML = mineOver;
    //生成所有的格子
    for(var i=0;i<10;i++){
        for(var j=0;j<10;j++){
            var smBox=document.createElement('div');
            smBox.classList.add('boom');
            smBox.setAttribute('id',i+'-'+j);
            boxWrapper.appendChild(smBox);
        }
    }
    boomList = document.getElementsByClassName('boom');
    //生成雷
    while(mineNum){
        var mineIndex=Math.floor(Math.random()*100);
        if(!boomList[mineIndex].classList.contains('isLei')){
            boomList[mineIndex].classList.add('isLei');
            mineNum--;
        }
    }
}
// function startTime(){
//     var today = new Date();
//     var h = today.getHours();
//     var m = today.getMinutes();
//     var s = today.getSeconds();
//     m = checkTime(m);
//     s = checkTime(s);
//     time.innerHTML=h+':'+m+':'+s;
//     setTimeout(function(){
//         startTime();
//     },500);
// }
// function checkTime(time){
//     if(time<10){
//         time = '0'+time;
//     }
//     return time;
// }