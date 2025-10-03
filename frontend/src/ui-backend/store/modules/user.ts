import { createSlice } from "@reduxjs/toolkit";
import type { FieldValues } from "react-hook-form";
import type { AppDispatch } from "@/ui-backend/store";
import {
  getToken,
  setToken as _setToken,
  removeToken as clearToken,
} from "@/ui-backend/utils";
import { loginAPI } from "@/ui-backend/apis/user";

const userStore = createSlice({
  name: "user",
  // 数据状态
  initialState: {
    token: getToken() || "",
  },
  // 同步修改方法
  reducers: {
    setToken(state, action) {
      state.token = action.payload;
      // 本地存一份
      _setToken(action.payload); //防止与方法同名
    },
    clearUserInfo(state) {
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      (state.token = ""), clearToken();
    },
  },
});

//异步方法
const fetchLogin = (loginForm: FieldValues) => {
  return async (dispatch: AppDispatch) => {
    const res = await loginAPI(loginForm);
    dispatch(setToken(res.data.token));
  };
};

const { setToken, clearUserInfo } = userStore.actions;

const userReducer = userStore.reducer;

export { fetchLogin, setToken, clearUserInfo };

export default userReducer;
