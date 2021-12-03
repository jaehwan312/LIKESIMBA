window.onload = function () {
    var elm = ".mainfullbox";
    var boxcount= $(elm).length;
    var wheelflag = false; //휠 동작중인지 아닌지 체크
    var wheelindex = 0; //첫번째 전체화면 엘리먼트 인덱스값
    
    $(elm).each(function (index) {
        // 개별적으로 Wheel 이벤트 적용
        $(this).on("mousewheel DOMMouseScroll", function (e) {
            e.preventDefault();
            console.log($(this).index());  
            //alert($(this).index());
            //엘리먼트 인덱스값 확인하여 wheelindex 변수에 대입
            var delta = 0;
            if (!event) event = window.event;
            if (event.wheelDelta) {
                delta = event.wheelDelta / 120;
                if (window.opera) delta = -delta;
            } 
            else if (event.detail)
                delta = -event.detail / 3;
            var moveTop = $(window).scrollTop();

            var elmSelecter = $(elm).eq(index);
            // 마우스휠을 위에서 아래로
            if (delta < 0) {
                if ($(elmSelecter).next() != undefined) {
                    try{

                        if($(this).index() == (boxcount-1)) {
                        moveTop = $(elmSelecter).offset().top;
                        
                        } else {
                        moveTop = $(elmSelecter).next().offset().top;
                        $('#mainfull_navi p').removeClass('on');
                        $('#mainfull_navi'+$(elmSelecter).next().index()).addClass('on');
                        }

                    }catch(e){}
                }
            // 마우스휠을 아래에서 위로
            } else {
                if ($(elmSelecter).prev() != undefined) {
                    try{

                        if($(this).index() == wheelindex) { //index값 조정 필요. 기본 0이어야 되는데 ㅜㅜ
                        moveTop = $(elmSelecter).offset().top;
                        } else {
                        moveTop = $(elmSelecter).prev().offset().top;
                        $('#mainfull_navi p').removeClass('on');
                        $('#mainfull_navi'+$(elmSelecter).prev().index()).addClass('on');
                        }
                    }catch(e){

                    }
                }
            }
             
            // 화면 이동 0.8초(800)
            //if (wheelflag == false) {
                //wheelflag = true;
                $("html,body").stop().animate({
                scrollTop: moveTop + 'px'
                }, {
                    duration: 800, complete: function () {
                    wheelflag = false;
                }
                });
            //}
        });
    });
}

//네비게이션용 함수
function fnMove(div, num){
    var offset = $(div).offset();
    $('html, body').animate({scrollTop : offset.top}, 400);
    $('#mainfull_navi p').removeClass('on');
    $('#mainfull_navi'+num).addClass('on');
}
