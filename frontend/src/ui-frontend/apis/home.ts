import { request } from "@/ui-frontend/utils";

//1. 获取文章列表
export function getArticleHomeAPI() {
  return request({
    url: "/api/home",
    method: "GET",
  });
}
