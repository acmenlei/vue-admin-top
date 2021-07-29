const OSS = require('ali-oss');
const fs = require('fs');

// 1. 创建OSS对象
const client = new OSS({
    region: process.env.VUE_APP_REGION,
    accessKeyId: process.env.VUE_APP_ACCESS_KEY_ID,
    accessKeySecret: process.env.VUE_APP_ACCESS_KEY_SECRET,
    bucket: process.env.VUE_APP_BUCKET,
});

/**
 * 阿里云对象OSS--文件上传
 * @param {String 需要上传的本地图片路径} url 
 * @param {String 文件名} origin 
 * @returns 
 */
export async function putStream(localUrl, origin) {
    return new Promise((resolve, reject) => {
        try {
            let stream = fs.createReadStream(localUrl);
            // 返回阿里云图片地址
            let { url } = await client.putStream(origin, stream);
            resolve(url);
        } catch (e) {
            reject(e.message);
        }
    })
}