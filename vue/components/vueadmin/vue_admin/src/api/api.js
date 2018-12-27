import axios from 'axios'

//获取设备信息
export const getDeviceList = () => { return  axios.get('/api/admin/selectGuiAll'); };

//获取柜口信息
export const getCabinetList = params => { return  axios.post('/api/admin/getBoxInfos', params) };