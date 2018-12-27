// 用于模拟搜索的数据
let allusers = []; // 全部数据

export const searchdata = (k = {}) => {
    let data = [];
    for (let i = 0; i < allusers.length; i++) {
        if (allusers[i].name.indexOf(k.name) !== -1) {
            data.push(allusers[i])
        }
    }
    return Promise.resolve(data)
};