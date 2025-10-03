import type { ArticleItem } from "@/ui-backend/interface/Article";
import { getArticleHomeAPI } from "@/ui-frontend/apis/home";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Row, Col } from "antd";
import { FeatureWrapper, FeatureTitle } from "./style";
export function Feature() {
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
  const features = data.slice(0, 3);
  function featureList() {
    return (
      <Row gutter={16} className="top-feature-row">
        {features.map((invoice) => (
          <Col
            key={invoice.id}
            xs={24}
            sm={24}
            md={8}
            lg={8}
            xl={8}
            className="top-feature-v2"
          >
            <div className="top-feature-item">
              {/**这部分先瞎改 */}
              <Link to={"/backend/articlelist"}>
                <div className="img-box">
                  <img src="statics/images/list_02.png" alt="" />
                </div>
                <div className="info">
                  <h3>{invoice.title}</h3>
                  <p>{invoice.content}</p>
                </div>
              </Link>
            </div>
          </Col>
        ))}
      </Row>
    );
  }
  return (
    <FeatureWrapper>
      <FeatureTitle>
        <h1>
          <i className="iconfont icon-anchor" />
          <span> START:DASH!!</span>
        </h1>
      </FeatureTitle>
      {featureList()}
    </FeatureWrapper>
  );
}
