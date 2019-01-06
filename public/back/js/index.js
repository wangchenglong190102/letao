$(function () {
      // 左侧的柱状图
    // 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(document.querySelector(".echarts_left"));

    // 指定图表的配置项和数据
    var option1 = {
        title: {
            text: '2019年注册人数'
        },
        tooltip: {},
        legend: {
            data: ['人数','销量']
        },
        xAxis: {
            data: ["1月", "2月", "3月", "4月", "5月", "6月"]
        },
        yAxis: {},
        series: [{
            name: '人数',
            type: 'bar',
            data: [50, 200, 360, 100, 120, 240]
        }, {
                name: '销量',
                type: 'bar',
                data: [150, 230, 350, 160, 100, 220]
            }]
    };

    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option1);





    //右侧的饼状图
    // 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(document.querySelector(".echarts_right"));

    // 指定图表的配置项和数据
    var option2 = {
        title: {
            text: '热门品牌销售',
            subtext: '2019年1月',
            x: 'center'
        },
        tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
            orient: 'vertical',
            left: 'left',
            data: ['耐克', '阿迪', '老北京', '特步', '老奶奶']
        },
        series: [
            {
                name: '访问来源',
                type: 'pie',
                radius: '55%',
                center: ['50%', '60%'],
                data: [
                    { value: 335, name: '耐克' },
                    { value: 310, name: '阿迪' },
                    { value: 234, name: '老北京' },
                    { value: 135, name: '特步' },
                    { value: 1548, name: '老奶奶' }
                ],
                itemStyle: {
                    emphasis: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            }
        ]
    };

    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option2);
})
