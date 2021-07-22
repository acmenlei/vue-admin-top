import moment from "moment";

function filterDateFormat(v) {
    return moment(v).format('YYYY-MM-DD HH:mm:ss');
}

export { filterDateFormat }