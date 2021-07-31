import OSS from "ali-oss";
import { errorMessage } from "@/common/message"

let client = null; // aliyun实例

/**
 * 判断阿里云是否存在当前文件
 * @param {String 文件名} name 
 * @param {Object 配置项} options 
 */
async function isExistObject(name, options = {}) {
    try {
        const file = await client.head(name, options);
        return Promise.resolve(file)
    } catch (error) {
        if (error.code === 'NoSuchKey') {
            return Promise.reject(null);
        } else {
            errorMessage(error.message)
        }
    }
}

/**
 * alioss图片直传
 * @param {File 需要上传的文件} file 
 * @param {Object Alioss的配置项} config 
 * @returns 
 */
export default async function aliossFileUpload(file, config) {
    client = new OSS({
        region: config.region,
        accessKeyId: config.AccessKeyId,
        accessKeySecret: config.AccessKeySecret,
        stsToken: config.SecurityToken,
        bucket: config.bucket,
    })
    try {
        const res = await isExistObject(file.name)
        // console.log("图片存在 秒传");
        return Promise.resolve(res);
    } catch {
        // console.log("图片不存在");
        return new Promise((resolve, reject) => {
            client.multipartUpload(file.name, file, {
                progress: (p, checkpoint) => {
                    console.log(p, checkpoint);
                },
                mime: file.type,
            })
                .then((res) => {
                    resolve(res);
                })
                .catch((err) => {
                    reject(err)
                });
        })
    }
}