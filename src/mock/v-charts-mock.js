import { areaStyle, axisLabel } from "../plugins/vcharts"

export default {
    pieChartSettings: { type: "pie" },
    pieChartData: {
        columns: ["ll_category", "count"],
        rows: [],
    },
    lineChartData: {
        columns: ["dayTime", "visitedCountBysite", "likedCountBysite", "loginCountBysite"],
        rows: [{
            "articlePublishCountBysite": 1,
            "dayTime": "2021-08-07",
            "likedCountBysite": 5,
            "loginCountBysite": 10,
            "registerCountBysite": 10,
            "visitedCountBysite": 206
        }],
    },
    lineChartSettings: {
        // 值区域填充样式
        areaStyle,
        labelMap: {
            dayTime: '日期',
            visitedCountBysite: '访问量',
            likedCountBysite: '获赞量',
            loginCountBysite: '登陆次数',
        }
    },
    lineChartExtend: {
        xAxis: {
            boundaryGap: false, // 让x轴紧挨着y轴开始
            axisLabel
        },
    },
    lineChartData2: {
        columns: ["dayTime", "registerCountBysite"],
        rows: [
            { dayTime: "2020/1/1", registerCountBysite: 1393 },
            { dayTime: "2020/1/2", registerCountBysite: 3530 },
            { dayTime: "2020/1/3", registerCountBysite: 2923 },
            { dayTime: "2020/1/4", registerCountBysite: 1723 },
            { dayTime: "2020/1/5", registerCountBysite: 3792 },
            { dayTime: "2020/1/6", registerCountBysite: 4593 },
        ],
    },
    lineChartSettings2: {
        // 值区域填充样式
        areaStyle,
        labelMap: {
            dayTime: '日期',
            registerCountBysite: '今日注册人数',
        }
    },
    histogramChartData: {
        columns: ["dayTime", "articlePublishCountBysite"],
        rows: [
            { dayTime: "2020-1-1", articlePublishCountBysite: 1393 },
            { dayTime: "2020-1-2", articlePublishCountBysite: 3530 },
            { dayTime: "2020-1-3", articlePublishCountBysite: 2923 },
            { dayTime: "2020-1-4", articlePublishCountBysite: 1723 },
            { dayTime: "2020-1-5", articlePublishCountBysite: 3792 },
            { dayTime: "2020-1-6", articlePublishCountBysite: 4593 },
        ],
    },
    histogramChartSettings: {
        // 值区域填充样式
        labelMap: {
            dayTime: '日期',
            articlePublishCountBysite: '文章发布数量'
        },
    },
    histogramChartExtend: {
        xAxis: {
            axisLabel
        },
        color: '#FA6E86'
    }
}