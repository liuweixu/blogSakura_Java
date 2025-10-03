import type { ArticleContent } from "@/ui-backend/interface/Article";
import { getArticleById } from "@/ui-frontend/apis/article";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { marked } from "marked";
import 'github-markdown-css/github-markdown.css';
import './mainwrapper_style.css';

function App() {
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  const [data, setData] = useState<ArticleContent>();
  useEffect(() => {
    const getArticleContent = async () => {
      try {
        const res = await getArticleById(id);
        console.log(res.data.data); // 打印响应数据，以便检查是否正确获取了文章列表
        // 确保data是数组，否则使用空数组
        setData(res.data.data); // 注意这个，后台上因为添加拦截中，加上res.data，而这个是没加上，所以要多一个data
      } catch (error) {
        console.error("获取文章列表失败:", error);
      }
    };
    getArticleContent();
  }, [id]);
  return (
    //ArticleWrapper
    <div>
      <div className="pt-[75px] bg-white" />
      {/**ArticleTop */}
      <div className="relative overflow-hidden">
        <div className="bg-no-repeat bg-cover bg-center h-100 bg-origin-border">
          <img
            className="w-full h-full object-cover"
            src={"/statics/images/list_14.png"}
            alt=""
          />
        </div>
        <div className="max-w-[850px] p-[0_10px] m-auto text-left top-auto bottom-5 absolute left-0 right-0 text-white text-shadow-[2px_2px_10px_#000] z-[1]">
          <h1 className="text-4xl font-bold">测试</h1>
          {data && (
            <p className="text-[14px] p-[18px_0_0] leading-[39px]">
              <span>
                <img
                  className="w-[35px] h-[35px] rounded-full float-left mr-3"
                  src="/statics/images/list_01.png"
                ></img>
              </span>
              <span>{data.channel_name}</span>
              <span className="mx-1.5">·</span>
            </p>
          )}
        </div>
      </div>
      {/**MainWrapper 正文内容 */}
      <div className="min-h-[600px] max-w-[850px] p-[0_10px] ml-auto mr-auto pt-[50px] bg-white-80">
        {data ?
          <div className='flex-items'>
            <div className='cell'>
              <div className='entry-content'
                id='content'
                dangerouslySetInnerHTML={{ __html: marked(data.content) }}
              />
            </div>
          </div> : <div>Loading...</div>
        }
      </div>
    </div>
  );
}

export default App;
