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
    var imagesDiv = document.getElementsByTagName("div")[0];
    $.getJSON("./data/imageDatas.json",function(data){
        data.forEach(function(value){
            var image1 = document.createElement("img");
            image1.setAttribute("src","./images/"+value.fileName);
            image1.setAttribute("id","image"+(i++));
            imagesDiv.appendChild(image1);
        })
    })
    // 布局图片初始化
    rearrange(1);
    // 设置图片角度
})
// 翻转行为

/**
 * 重新布局所有图片
 * @param 指定居中排布哪个图片
 */
function rearrange(centerIndex){

}