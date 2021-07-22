/**
 * 
 * @param {Object} target // 需要矫正的对象 
 */
export function formatTags(target) {
    target.forEach(element => {
        element.ll_tags = element.ll_tags.split(',');
    });
    return target;
}