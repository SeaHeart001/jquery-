function pageInit(pageWeb,pagenNum,btnNumsView,callback) {
            if(btnNumsView>10||btnNumsView<1){
                alert("显示按钮默认最小为3个，最大为"+ pagenNum +"个");
                return
            }
            var curruntIndex = 0; //当前默认第一页
        
            //dom结构START
            //创建分页按钮整体wrap
            var pageElement = $('<div id="page"></div>')
            $(pageWeb).append(pageElement);
            //前btn
            var inputF = $('<input name="toggleBtn" class="toggleBtn" id="forword" type="button" value="上一页">')
            pageElement.append(inputF);
            //前省略号
            var fesDiv = $('<div class="f_espllise">...</div>')
            pageElement.append(fesDiv);
            //数字按钮整体
            var numWrap = $('<div id="num"></div>')
            pageElement.append(numWrap);
            //后省略号
            var besDiv = $('<div class="h_espllise">...</div>')
            pageElement.append(besDiv);
            //后btn
            var inputB = $('<input name="toggleBtn" class="toggleBtn" id="back" type="button" value="下一页">')
            pageElement.append(inputB);
            //创建数字按钮wrap
            var numBtnWrap = $('<div class="numBtn" name="numBtn"></div>')
            numWrap.append(numBtnWrap);
            //创建10个数字按钮;
            for (var i = 0; i < pagenNum; i++) {
                var inputElement = $('<input type="button" value="' + (i + 1) + '">')
                numBtnWrap.append(inputElement);
            }
            //创建输入数字的div
            var enterInput = $('<div id="enterInput">第<input type="text" />页<input type="button" value="确定" /></div>')
            pageElement.append(enterInput);
            var totalDiv = $('<div id="totolNum">共'+ pagenNum +'页</div>')
            pageElement.append(totalDiv)
            //dom结构END

            //dom结构的css, START
            var btnWidth = parseInt(inputElement.css('width'))+10;//一个按钮的width
            var btnWrap = btnWidth * pagenNum;
            var numBtnWidth = btnWidth * btnNumsView + 10;
            numBtnWrap.css('width', btnWrap);
            numWrap.css('width', numBtnWidth);
            pageFenye();
            //dom结构的css，END

            //所有逻辑全部由当前的页数curruntIndex进行交互(索引值从0开始，代表第一页)

            //分页按钮
            $('[name="numBtn"] input').click(function () {
                curruntIndex = $(this).val() - 1;
                pageFenye();
            })

            //前进后退按钮
            $('[name="toggleBtn"]').click(function (e) {
                var targetId = $(e.target).attr('id');
                console.log(targetId);
                if (targetId === 'forword') {
                    curruntIndex = curruntIndex > 0 ? curruntIndex - 1 : 0;
                    pageFenye();

                } else if (targetId === 'back') {
                    curruntIndex = curruntIndex < (pagenNum - 1) ? curruntIndex + 1 : (pagenNum - 1);
                    pageFenye();
                }
            })

            //输入数字input
            $('#enterInput input[type="button"]').click(function () {
                var pageValue = $('#enterInput input[type="text"]').val();
                if(pageValue<1||pageValue>pagenNum||pageValue==''){
                    $('#enterInput input[type="text"]').val('');
                    alert('请输入合理的数字')
                }else{
                    curruntIndex = pageValue-1;
                    pageFenye();
                    $('#enterInput input[type="text"]').val(curruntIndex+1);
                }
            })

            //逻辑处理函数
            function pageFenye() {
                $('#enterInput input[type="text"]').val(curruntIndex+1)
                //$('#num').scrollLeft(40 * (curruntIndex - 1))
                //滑动的距离系数
                var scrollLeftX = Math.floor(btnNumsView/2);
                $('#num').animate({
                    scrollLeft: btnWidth * (curruntIndex - scrollLeftX)
                },100)
                var inputAddClass = $('[name="numBtn"] input')[curruntIndex];
                $(inputAddClass).addClass('active').siblings().removeClass('active');
                if(curruntIndex - scrollLeftX>0){ //比较系数控制省略号的显示
                    $('.f_espllise').show();
                }else{
                    $('.f_espllise').hide();
                }
                if((curruntIndex - scrollLeftX)>=(pagenNum - btnNumsView)){
                    $('.h_espllise').hide();
                }else{
                    $('.h_espllise').show();
                }
                callback(curruntIndex);//调用回调函数，传入实参
            } 
        }