//用户所有请求
import { request } from "@/ui-backend/utils";
import type { FieldValues } from "react-hook-form";

//登录请求
export function loginAPI(formData: FieldValues) {
  return request({
    url: "/api/backend/users",
    method: "POST",
    data: formData,
  });
}
