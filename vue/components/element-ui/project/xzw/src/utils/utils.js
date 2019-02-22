import md5 from 'js-md5'

export default class Utils {
  constructor(params) {}

  md5(value) {
    // 密码MD5处理
    value = md5(value);
    return value;
  }
};
