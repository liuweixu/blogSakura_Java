import { Affix } from "antd";
import { Link } from "react-router-dom";

function App() {
  return (
    <div>
      <Affix offsetTop={0}>
        <div
          id="nav-wrapper"
          className="fixed w-full h-19 px-7.5 transition-all duration-400 ease-in-out bg-white/90 shadow-[0_1px_40px_-8px_rgba(0,0,0,.5)]"
        >
          {/* justify-betwenn 是均匀排列每个元素 */}
          <div className="flex justify-between">
            <div
              id="nav-left"
              className="h-19 leading-19 max-w-40 text-ellipsis"
            >
              <a
                href="https://www.bilibili.com"
                className="text-[#464646] text-[20px] font-extrabold hover:text-[#fe9600]"
              >
                bilibili
              </a>
            </div>
            <div id="nav-center" className="flex justify-center flex-1">
              <ul id="nav" className="flex space-x-8">
                <li>
                  <Link
                    to={"/"}
                    id="nav-item"
                    className="block  text-[#666666] text-base h-14.5 leading-20 relative
                    after:content-[''] after:block after:absolute after:-bottom-4.5 after:h-1.5 after:bg-[#fe9600] after:w-0
                    hover:text-[#fe9600] hover:after:w-full"
                  >
                    <i className="iconfont icon-icon_file mr-1.5" />
                    <span>首页</span>
                  </Link>
                </li>
                <li>
                  <Link
                    to={"/backend"}
                    id="nav-item"
                    className="block text-[#666666] text-base h-14.5 leading-20 relative
                    after:content-[''] after:block after:absolute after:-bottom-4.5 after:h-1.5 after:bg-[#fe9600] after:w-0
                    hover:text-[#fe9600] hover:after:w-full"
                  >
                    <i className="iconfont icon-icon_file mr-1.5" />
                    <span>后台</span>
                  </Link>
                </li>
              </ul>
            </div>
            <div id="nav-right" className="w-40"></div>
          </div>
        </div>
      </Affix>
    </div>
  );
}

export default App;
