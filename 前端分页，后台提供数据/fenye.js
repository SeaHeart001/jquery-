function pageFenye(data,pageWeb,pagenNum,btnNumsView,callback) {
            if(btnNumsView>10||btnNumsView<1){
                alert("显示按钮默认最小为3个，最大为"+ pagenNum +"个")
                return
            }
            var pageMsg = Math.ceil(data.length/pagenNum);//每页展现的数据量
            var curruntIndex = 0; //当前默认第一页
            var dataMsg = data.slice(curruntIndex * pageMsg, curruntIndex * pageMsg + pageMsg)//每页的数据
            
            //dom结构START
            //创建分页按钮整体wrap
            var pageElement = $('<div id="page"></div>')
            $(pageWeb).append(pageElement)
            //前btn
            var inputF = $('<input name="toggleBtn" class="toggleBtn" id="forword" type="button" value="上一页">')
            pageElement.append(inputF)
            //前省略号
            var fesDiv = $('<div class="f_espllise">...</div>')
            pageElement.append(fesDiv)
            //数字按钮整体
            var numWrap = $('<div id="num"></div>')
            pageElement.append(numWrap)
            //后省略号
            var besDiv = $('<div class="h_espllise">...</div>')
            pageElement.append(besDiv)
            //后btn
            var inputB = $('<input name="toggleBtn" class="toggleBtn" id="back" type="button" value="下一页">')
            pageElement.append(inputB)
            //创建数字按钮wrap
            var numBtnWrap = $('<div class="numBtn" name="numBtn"></div>')
            numWrap.append(numBtnWrap)
            //创建10个数字按钮
            for (var i = 0; i < pagenNum; i++) {
                var inputElement = $('<input type="button" value="' + (i + 1) + '">')
                numBtnWrap.append(inputElement)
            }
            //创建输入数字的div
            var enterInput = $('<div id="enterInput">第<input type="text" />页<input type="button" value="确定" /></div>')
            pageElement.append(enterInput)
            //dom结构END

            //dom结构css, START
            var btnWidth = 40;//一个按钮的width
            var btnWrap = btnWidth * pagenNum;
            var numBtnWidth = btnWidth * btnNumsView + 10;
            numBtnWrap.css('width', btnWrap)
            numWrap.css('width', numBtnWidth)
            pageHtml()
            //dom结构css，END

            //分页按钮
            $('[name="numBtn"] input').click(function () {
                curruntIndex = $(this).val() - 1
                pageHtml()
            })

            //前进后退按钮
            $('[name="toggleBtn"]').click(function (e) {
                var targetId = $(e.target).attr('id')
                console.log(targetId)
                if (targetId === 'forword') {
                    curruntIndex = curruntIndex > 0 ? curruntIndex - 1 : 0
                    //dataMsg = data.slice(curruntIndex*pageMsg,curruntIndex*pageMsg+pageMsg)
                    pageHtml()

                } else if (targetId === 'back') {
                    curruntIndex = curruntIndex < (pagenNum - 1) ? curruntIndex + 1 : (pagenNum - 1)
                    //dataMsg = data.slice(curruntIndex*pageMsg,curruntIndex*pageMsg+pageMsg)
                    pageHtml()
                }
            })
            //输入数字input
            $('#enterInput input[type="button"]').click(function () {
                var pageValue = $('#enterInput input[type="text"]').val()
                if(pageValue<1||pageValue>10||pageValue==''){
                    $('#enterInput input[type="text"]').val('')
                }else{
                    curruntIndex = pageValue-1
                    pageHtml()
                    $('#enterInput input[type="text"]').val('')
                }
            })

            //逻辑处理函数
            function pageHtml() {
                //$('#num').scrollLeft(40 * (curruntIndex - 1))
                $('#num').animate({
                    scrollLeft: 40 * (curruntIndex - 1)
                },100)
                var inputAddClass = $('[name="numBtn"] input')[curruntIndex]
                $(inputAddClass).addClass('active').siblings().removeClass('active')
                dataMsg = data.slice(curruntIndex * pageMsg, curruntIndex * pageMsg + pageMsg)
                //console.log(curruntIndex, dataMsg)
                callback(dataMsg)
                //处理省略号当前页大于1，前显示，大于9-2=7，后消失
                if(curruntIndex>btnNumsView-2){
                    $('.f_espllise').show()
                }else{
                    $('.f_espllise').hide()
                }

                if(curruntIndex>(pagenNum-btnNumsView)){
                    $('.h_espllise').hide()
                }else{
                    $('.h_espllise').show()
                }
            }
        }