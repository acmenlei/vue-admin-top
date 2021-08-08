import moment from "moment";

function filterDateFormat(v) {
    return moment(v).format('YYYY-MM-DD HH:mm:ss');
}

function filterCategory(val, origin) {
    let length = origin.length;
    for (let i = 0; i < length; i++) {
        if (origin[i].ll_category_val == val) {
            return origin[i].ll_category_name;
        }
    }
}
export { filterDateFormat, filterCategory }