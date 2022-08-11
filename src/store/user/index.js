import { getUserInfoApi } from "@/api/user";
const state = {
  userInfo: {},
  token: "",
};
const mutations = {
  SET_TOKEN(state, token) {
    localStorage.setItem("token", token);
    state.token = token;
  },
  SET_USER(state, userInfo) {
    localStorage.setItem("userInfo", JSON.stringify(userInfo));
    state.userInfo = userInfo;
  },
};
const actions = {
  async getUserInfo({ commit }, query) {
    const res = await getUserInfoApi(
      query.userCode,
      query.userName,
      query.areaId,
      query.timestamp,
      query.signature
    );
    const _token = res.token;
    const _data = res.data;
    if (_token && _token !== "") {
      const userInfo = {
        userCode: query.userCode,
        userName: query.userName,
        areaId: _data.id,
        id: _data.id,
        areaCode: _data.areaCode,
        areaName: _data.areaName,
        areaType: _data.areaType,
        zxAreaId: _data.zxAreaId,
        zxAreaCode: _data.zxAreaCode,
        zxParentId: _data.zxParentId,
        mapCenterLongitude: _data.mapCenterLongitude,
        mapCenterLatitude: _data.mapCenterLatitude,
      };
      commit("SET_TOKEN", _token);
      commit("SET_USER", userInfo);
      return true;
    } else {
      return false;
    }
  },
};
const getters = {};
export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
