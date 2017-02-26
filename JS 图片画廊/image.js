// 思路：
// 图片区：
	// 循环显示文件夹里的图片
	// 布局图片
	// 设置图片角度
	// 翻转行为
// 控制区
//...


Constant = {
    // 中心图片位置点。
    centerPos:{
        left:0,
        right:0
    },
    //水平方向的取值范围。
    hPosRange:{
        leftSecX: [0,0],//左分区x的取值范围
        rightSecX: [0,0],//右分区的x取值范围
        y: [0,0]
    },
    //垂直方向的取值范围
    vPosRange:{
        x:[0,0],
        topY:[0,0]
    }
}
$(document).ready(function(){
    //循环显示文件夹里的图片
    //$.getJSON(url,[data],[callback])
    var i = 1;
    var imagesSec = document.getElementsByClassName("img-sec");
    $.getJSON("./data/imageDatas.json",function(data){
        data.forEach(function(value){
            var figure = document.createElement("figure");
            figure.setAttribute("class","img-figure");
            figure.setAttribute("id","img-figure"+(i++));

            var img = document.createElement("img");
            img.setAttribute("src","./images/"+value.fileName);
            img.setAttribute("alt",value.title);

            figure.insertAfter(img);
            imagesSec.appendChild(figure);
        })
    })
    // 布局图片初始化
    init();

    // 设置图片角度
})

// 翻转行为

function init(){
    //加载以后，为每张图片计算其位置的范围。
    //首先拿到舞台的大小

    //拿到一个图片的大小
    //计算中心图片的位置点
    //左侧区域排布位置x的取值范围
    //右侧区域排布位置x的取值范围
    //左右侧区域排布位置y的取值范围
    //上测区域排布位置的取值范围

    //重新布局所有图片
    rearrange(0);
}
/**
 * 重新布局所有图片
 * @param 指定居中排布哪个图片
 */
function rearrange(centerIndex){

}