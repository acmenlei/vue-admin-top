import moment from "moment";

function filterDateFormat(v) {
    return moment(v).format('YYYY-MM-DD HH:mm:ss');
}

function filterCategory(val) {
    switch (val) {
        case "technic":
            return "技术文章";
        case "study":
            return "学习笔记";
        case "share":
            return "开源项目";
        case "live":
            return "生活分享";
    }
}
export { filterDateFormat, filterCategory }