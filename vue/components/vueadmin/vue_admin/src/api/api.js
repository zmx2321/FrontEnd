import axios from 'axios'

const base = '/api/admin/';

//获取设备信息
export const getDeviceList = () => { return  axios.get(base + 'selectGuiAll'); };

//获取柜口信息
export const getCabinetList = params => { return  axios.post(base + 'getBoxInfos', params) };

//获取记录信息
export const getRecordInfo = params => { return  axios.post(base + 'getPackageList', params); };

//获取用户信息
export const geUserList = params => { return  axios.post(base + 'getUserList', params); };

//获取骑手信息
export const getRiderList = params => { return  axios.post(base + 'getPostmanList', params); };