整个插件建立在监视索引值的变化，
所有交互都是根据索引值的变化完成的，
第一次自己封装插件，肯定会有很多不足的地方，会慢慢改正和尝试

//初始化分页插件
//需传四个参数，分别为:
                //分页插件所在的dom，
                //总页数，
                //按钮可见数，
                //回调函数(回调函数需要一个参数，pIndex，对应调用时传入的curruntIndex)，
            
            pageInit(pageWeb,pagenNum,btnNumsView,function (pIndex) {
                //此处可通过pIndex发送请求，
                console.log(pIndex)//pIndex为当前页数(索引值从0开始)
            }) 
        })
