import { Affix } from "antd";
import { Link } from "react-router-dom";

function App() {
  return (
    <div>
      <Affix>
        <div
          id="nav-wrapper"
          className="fixed w-full h-19 px-7.5 transition-all duration-400 ease-in-out bg-white/90 shadow-[0_1px_40px_-8px_rgba(0,0,0,.5)]"
        >
          <div
            id="nav-left"
            className="float-left h-19 leading-19 max-w-40 text-ellipsis"
          >
            <a
              href="https://www.bilibili.com"
              className="text-[#464646] text-[20px] font-extrabold hover:text-[#fe9600]"
            >
              bilibili
            </a>
          </div>
          <div id="nav-right" className="float-right">
            <div id="flex-item">
              <ul id="nav">
                <li id="nav-item" className="p-[0_15px] float-left">
                  <Link
                    to={"/articlelist"}
                    id="nav-item"
                    className="block text-[#666666] text-base h-10 leading-20 relative
                    after:contentt-[''] after:block after:absolute after:-bottom-4.5 after:h-1.5 after:bg-[#fe9600] after:w-0
                    hover:text-[#fe9600] hover:after:w-full"
                  >
                    <i className="iconfont icon-icon_file mr-1.5" />
                    <span>首页</span>
                  </Link>
                </li>
                <li id="nav-item" className="p-[0_15px] float-left">
                  <Link
                    to={"/articlelist"}
                    id="nav-item"
                    className="block text-[#666666] text-base h-10 leading-20 relative
                    after:contentt-[''] after:block after:absolute after:-bottom-4.5 after:h-1.5 after:bg-[#fe9600] after:w-0
                    hover:text-[#fe9600] hover:after:w-full"
                  >
                    <i className="iconfont icon-icon_file mr-1.5" />
                    <span>首页1111</span>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </Affix>
    </div>
  );
}

export default App;
