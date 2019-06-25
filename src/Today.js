Today = {
    data: {
        year: new Date().getFullYear(),
        month: new Date().getMonth(),
        day: new Date().getDate(),
        year_sum: 0,
        today_sum: 0,
        per: 0
    },
    init: function (ele) {
        this.data.year_sum = this.getDayNum()
        this.data.today_sum = this.getDayNum(this.data.month)
        this.data.per = Math.floor(this.data.today_sum / this.data.year_sum * 100) + '%'

        this.createLayout(ele)

        console.log("%c wzblog(惜梦) %c http://github.com/wzblog and https://blog.wz52.cn/project.html", "color: #fff; background-image: linear-gradient(90deg, rgb(47, 172, 178) 0%, rgb(45, 190, 96) 100%); padding:5px 1px;", "background-image: linear-gradient(90deg, rgb(45, 190, 96) 0%, rgb(255, 255, 255) 100%); padding:5px 0;");
    },
    createLayout: function (ele) {
        // 创建容器
        var container = $('<div></div>').addClass('container_today')

        // 创建头部
        var header = $('<div></div>').addClass('header_today')

        // 创建年份
        var year = $('<div></div>').addClass('year_today')

        // 创建进度
        var per = $('<div></div>').addClass('per_today')

        // 创建天数详情
        var detail = $('<div></div>').addClass('detail_today')

        // 创建天数盒子
        var dots = $('<div></div>').addClass('dots_today')


        // 组合布局
        // 插入头部
        year.html(this.data.year)
        header.append(year)

        per.html(this.data.per)
        header.append(per)

        detail.html(this.data.today_sum + '/' + this.data.year_sum)
        header.append(detail)

        container.append(header)

        // 插入点
        
        for (var i = 0; i < this.data.year_sum; i++) {
            var dot

            if (i < this.data.today_sum) {
                dot = this.createDot(true)
                if (i == this.data.today_sum - 1) {
                    dot.addClass('lamp_today')
                }
            } else {
                dot = this.createDot()
            }

            dots.append(dot)
        }

        container.append(dots)

        // 插入容器
        $(ele).append(container)
    },
    // 创建点
    createDot: function (mark) {
        var dot = $('<a></a>').addClass('dot_today')

        if (mark === true) {
            dot.addClass('active_today')
        }

        return dot
    },
    // 获取全年天数
    getDayNum: function (month) {

        // 如果为设置月份则默认获取全年的天数
        if (! month) month = 12

        var days = 0
        for (var i = 1; i <= month; i++) {
            var d = new Date(this.data.year, i, 0)
            days += d.getDate()
        }

        // 如果不是获取全年的则加上当月已过天数, 原因是因为js获取到的月份是以 0 开始代表一月, 所以上面for循环只会计算到上一个月的天数
        if (month != 12) days += this.data.day

        return days
    }
}