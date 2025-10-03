// 在新文件中合并store
import { configureStore } from "@reduxjs/toolkit";
import { userReducer as reducer1 } from "@/ui-backend/store";

export const store = configureStore({
  reducer: {
    system1: reducer1,
  },
});
