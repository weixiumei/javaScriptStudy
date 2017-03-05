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
        top:0
    },
    //水平方向左右区域的取值范围。
    hPosRange:{
        leftSecX: [0,0],//左分区x的取值范围
        rightSecX: [0,0],//右分区的x取值范围
        y: [0,0]//左右分区y的取值范围
    },
    //垂直方向上侧区域的取值范围
    vPosRange:{
        x:[0,0],
        topY:[0,0]
    },
    imgArrangeArr:
        [
            {   //css object style
                pos:{
                    left:'0',
                    top:'0'
                },
                rotate:0,   //旋转角度
                isInverse:false,  //正反面 默认正面
                isCenter:false   //图片是否居中 默认不居中
            }
        ]
}
$(document).ready(function(){
    //循环显示文件夹里的图片
    //$.getJSON(url,[data],[callback])
    var i = 1;
    var imagesSec = document.getElementsByClassName("img-sec");
    $.getJSON("./data/imageDatas.json",function(data){//--allow-file-access-from-files
        data.forEach(function(value, index){
            var figure = document.createElement("figure");
            figure.setAttribute("class","img-figure");
            figure.setAttribute("id","img-figure"+(i++));

            var img = document.createElement("img");
            img.setAttribute("src","./images/"+value.fileName);
            img.setAttribute("alt",value.title);
            var figcaption = document.createElement("figcaption");
            var h2 = document.createElement("h2");
            h2.setAttribute("class","img-title");
            h2.innerHTML = value.title;
            figcaption.appendChild(h2);

            figure.appendChild(img);
            figure.appendChild(figcaption);
            imagesSec[0].appendChild(figure);

            //图片状态
            Constant.imgArrangeArr[index] = {
                //css object style
                pos:{
                    left:0,
                    top:0
                },
                rotate:0    //图片旋转角度
                //isInverse:false,  //正反面 默认正面
                //isCenter:false   //图片是否居中 默认不居中
            }
        });
        // 布局图片初始化
        init();
    });

    // 设置图片角度
});

// 翻转行为

function init(){
    //加载以后，为每张图片计算其位置的范围。
    //首先拿到舞台的大小
    var stageDom = document.getElementsByClassName("stage")[0],
        stageWidth = stageDom.scrollWidth,
        stageHeight = stageDom.scrollHeight,
        halfStageWidth = Math.ceil(stageWidth/2),
        halfStageHeight = Math.ceil(stageHeight/2);

    //拿到一个图片的大小
    var imageDom = document.getElementsByClassName("img-figure")[0],
        imageWidth = imageDom.scrollWidth,
        imageHeight = imageDom.scrollHeight,
        halfImageWidth = Math.ceil(imageWidth/2),
        halfImageHeight = Math.ceil(imageHeight/2);

    //计算中心图片的位置点
    Constant.centerPos = {
        left:halfStageWidth - halfImageWidth,
        top:halfStageHeight - halfImageHeight
    }
    //左侧区域排布位置x的取值范围
    //右侧区域排布位置x的取值范围
    //左右侧区域排布位置y的取值范围
    Constant.hPosRange = {
        leftSecX:[-halfImageWidth, halfStageWidth - 3 * halfImageWidth],
        rightSecX:[halfStageWidth + halfImageWidth, stageWidth - halfImageWidth],
        y:[- halfImageHeight, stageHeight - halfImageHeight]
    }
    //上测区域排布位置的取值范围
    Constant.vPosRange = {
        x:[halfStageWidth - imageWidth, halfStageWidth],
        topY:[-halfImageHeight, halfStageHeight - 3 * halfImageHeight]
    }

    //重新布局所有图片
    rearrange(0);

        var imgFigures = document.getElementsByClassName("img-figure");
        //[].forEach.call()是一种快速的方法访问forEach，并将空数组的this换成想要遍历的list。
        [].forEach.call(imgFigures, function(value, index){
            if(Constant.imgArrangeArr[index].pos){
                value.style.left = Constant.imgArrangeArr[index].pos.left + "px";
                value.style.top = Constant.imgArrangeArr[index].pos.top  + "px";
            }
            if(Constant.imgArrangeArr[index].rotate){
                //transform:rotate(7deg);
                //value.style = "-Webkit-transform: rotate(" + Constant.imgArrangeArr[index].rotate + ")deg";
                value.style.transform = "rotate(" + Constant.imgArrangeArr[index].rotate + "deg)";
            }
        });
}
/**
 * 重新布局所有图片
 * @param 指定居中排布哪个图片
 */
function rearrange(centerIndex){
    // 布局中间图片
    // 保存居中图片的状态信息
    var imgArrangeCenterArr = Constant.imgArrangeArr.splice(centerIndex, 1);
    imgArrangeCenterArr[0] =
    {
        pos:Constant.centerPos,
        rotate:0   //图片旋转角度
        //isInverse:false,  //正反面 默认正面
        //isCenter:false   //图片是否居中 默认不居中
    }

    // 上侧布局[0,1）个图片
    var topImgNum = Math.ceil(Math.random() * 1);
    // 上侧布局图片的状态信息
    var imgArrangeTopArr = [];
    // 上侧布局的图片是从数组对象的哪个位置拿来的
    var topImgIndex = Math.ceil(Constant.imgArrangeArr.length * Math.random() - topImgNum);
    imgArrangeTopArr = Constant.imgArrangeArr.splice(topImgIndex, topImgNum);

    imgArrangeTopArr.forEach(function (value, index) {
        imgArrangeTopArr[index] = {
            pos:{
                left:getRangeRandom(Constant.vPosRange.x[0], Constant.vPosRange.x[1]),
                top:getRangeRandom(Constant.vPosRange.topY[0], Constant.vPosRange.topY[1])
            },
            rotate:get30DegRandom() //图片旋转角度
        }
    });

    //左右侧图片分布
    for(var i = 0, j = Constant.imgArrangeArr.length, k = j/2; i < j; i++){
        //左区域或右区域x的取值范围
        var hPosRangeLORX = null;
        //前半部分取布局左边，后半部分布局右边
        if(i<k){
            hPosRangeLORX = Constant.hPosRange.leftSecX;
        }else{
            hPosRangeLORX = Constant.hPosRange.rightSecX;
        }
        Constant.imgArrangeArr[i] = {
            pos:{
                left:getRangeRandom(hPosRangeLORX[0], hPosRangeLORX[1]),
                top:getRangeRandom(Constant.hPosRange.y[0], Constant.hPosRange.y[1])
            },
            rotate:get30DegRandom() //图片旋转角度
        }
    }

    //把上侧图片塞回去
    if(imgArrangeTopArr && imgArrangeTopArr[0]){
        Constant.imgArrangeArr.splice(topImgIndex, 0, imgArrangeTopArr[0]);
    }
    //把中心图片塞回去
    Constant.imgArrangeArr.splice(centerIndex, 0, imgArrangeCenterArr[0]);

}

function getRangeRandom(low, high){
    return Math.ceil(low + Math.random() * (high - low));
}
function get30DegRandom(){
    return (Math.random()>0.5 ? '': '-') + Math.ceil(Math.random() * 30);
}