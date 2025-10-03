import { request } from "@/ui-frontend/utils";

//1. 按照id获取文章内容
export function getArticleById(id: string) {
  return request({
    url: `/api/article/${id}`,
    method: "GET",
  });
}
