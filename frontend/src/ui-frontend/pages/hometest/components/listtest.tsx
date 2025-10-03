import type { ArticleItem } from "@/ui-backend/interface/Article";
import { getArticleHomeAPI } from "@/ui-frontend/apis/home";
import { useEffect, useState } from "react";
import { FeatureTitle, HomeList, BlogList } from "./style";
import { Link } from "react-router-dom";
import "../../../../../public/statics/iconfont/iconfont.css";

export function ListWrapper() {
  const [data, setData] = useState<ArticleItem[]>([]);
  useEffect(() => {
    const getArticleList = async () => {
      try {
        const res = await getArticleHomeAPI();
        // 确保data是数组，否则使用空数组
        setData(res.data.data); // 注意这个，后台上因为添加拦截中，加上res.data，而这个是没加上，所以要多一个data
      } catch (error) {
        console.error("获取文章列表失败:", error);
      }
    };
    getArticleList();
  }, []);

  function listtest() {
    const Class = [
      "blog-item post-list-show left",
      "blog-item post-list-show right",
    ];
    return (
      <BlogList>
        {data.map((invoice, index) => {
          return (
            <div className={Class[index % Class.length]} key={invoice.id}>
              <div className="post-thumb">
                <Link to={"/backend/articlelist"}>
                  <img src={"statics/images/list_02.png"} alt="" />
                </Link>
              </div>
              <div className="post-content-wrap">
                <div className="post-content">
                  <div className="post-date">
                    <i className="iconfont icon-time" />
                    发布于
                  </div>
                  <Link to={"/backend/articlelist"} className="post-title">
                    <h3>{invoice.title}</h3>
                  </Link>
                  <div className="post-meta">
                    <span>
                      <i className="iconfont icon-attention" />
                      热度
                    </span>
                    <span className="comments-number">
                      <i className="iconfont icon-mark" />
                      评论
                    </span>
                    {invoice.channel_name && (
                      <span>
                        <i className="iconfont icon-file" />
                        {invoice.channel_name}
                      </span>
                    )}
                  </div>
                  <div className="float-content">
                    <p>{invoice.channel_name}</p>
                    <div className="post-bottom">
                      <Link to={"/article/"}>
                        <i className="iconfont icon-caidan" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </BlogList>
    );
  }
  return (
    <HomeList>
      <FeatureTitle>
        <h1>
          <span> Discovery</span>
        </h1>
      </FeatureTitle>
      {listtest()}
    </HomeList>
  );
}
