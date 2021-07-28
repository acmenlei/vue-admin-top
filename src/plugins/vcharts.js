import echarts from "echarts";
/* 图表覆盖阴影面积 */
export const areaStyle = {
    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
        {
            offset: 0, // 0% 位置颜色
            color: "#61C2FF",
        },
        {
            offset: 1, // 100% 位置颜色
            color: "#fff",
        },
    ]),
}
/* 坐标轴标签显示格式 */
export const axisLabel = {
    interval: 0,
    rotate: 45,
    textStyle: {
        fontSize: 10,
        color: "#888"
    }
}