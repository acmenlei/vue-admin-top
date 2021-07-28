import echarts from "echarts";

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