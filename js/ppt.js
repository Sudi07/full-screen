var ppt = {
    $slider: $('.slider'),
    len: $('.slider').length,
    $ul: $('order ul'),
    $btn: $('.btn'),
    activeIndex: 0,
    lastIndex: undefined,
    flag: false,
    timer: undefined,
    init: function () {
        if (this.len > 1) {
            this.createDom(this.len);
            this.bindEvent();
            this.sliderAuto();
        }
       
    },
    createDom: function (len) {
        var orderStr = ''
        for (var i = 0;i < len; i++) {
            orderStr += '<li>'+ i +'</li>'
        }
        this.$ul.append($('orderStr')).find($('li:eq(0)')).addClass('active');
        var btnStr = '<div class="prev_btn"></div><div class="next_btn"></div>'
        this.$btn.append($(btnStr));
    },
    bindEvent: function () {
        var _this = this;
        $('li').add($('.prev_btn')).add($('.next_btn')).on('click', function () {
            if ($(this).attr('class') == 'prev_btn') {
                _this.tool('prev');
            }else if ($(this).attr('class') == 'next_btn') {
                _this.tool('next');
            }else {
                var index = $(this).index();
                // _this.getIndex(index);
                _this.tool(index);
            }
        })
        this.$slider.on('out', function () {
            $(this).fadeOut(300).find($('img')).animate({width: '0%'}).end().find($('p')).animate({width: '0%'});
        })
        this.$slider.on('in', function () {
            // 此时fadein和animate同时进行，不能看出width的变化，用delay()
            $(this).fadeIn(300).find($('img')).delay(300).animate({width: '40%'}, 300, 'linear').end().find($('p')).delay(300).animate({width: '60%'},400, function () {
                _this.flag = false;
                _this.sliderAuto();
            });  
        })
    },
    tool : function (text) {
        if (!this.flag) {
            this.getIndex(text);
            if (this.lastIndex != this.activeIndex) { 
                this.flag = true;
                this.changeClass(this.activeIndex);
                this.$slider.eq(this.lastIndex).trigger('out');
                //此时的delay为了解决图片淡入淡出效果时滚动条消失
                this.$slider.eq(this.activeIndex).delay(300).trigger('in');
            }
            
        }
        
    },

    getIndex: function (text) {
        console.log(this.lastIndex)
        this.lastIndex = this.activeIndex;
        if (text == 'prev') {
            this.activeIndex = this.activeIndex == 0 ? this.len - 1 : this.activeIndex - 1;
        }else if(text == 'next') {
            this.activeIndex = this.activeIndex == this.len - 1 ? 0 : this.activeIndex + 1;
        }else {
            this.activeIndex = text;
        }
        console.log(this.lastIndex + '-' +this.activeIndex);
    },
    changeClass: function (index) {
        $('.active').removeClass('active');
        $('li').eq(index).addClass('active');
    },
    sliderAuto: function () {
        var _this = this;
         //为了不计入点击后切换动画的时间，用settimeout。
        this.timer = setTimeout(function () {
            clearTimeout(this.timer);
            _this.tool('next');
        }, 30000)
    }                                       
}

ppt.init();




















