import { BannerWrapper, Center, Focusinfo } from "./style";
import "@fortawesome/fontawesome-free/css/all.min.css";
export const Banner = () => {
  return (
    <BannerWrapper>
      <div className="waveWrapper waveAnimation">
        <div className="waveWrapperInner bgTop">
          <div className="wave waveTop" />
        </div>
        <div className="waveWrapperInner bgMiddle">
          <div className="wave waveMiddle" />
        </div>
        <div className="waveWrapperInner bgBottom">
          <div className="wave waveBottom" />
        </div>
      </div>
      <div className="headertop-down animated">
        <span>
          <i className="iconfont icon-chevrondown" />
        </span>
      </div>
      <Center
        style={{
          backgroundImage: "url('statics/images/banner-2.png')",
          height: innerHeight + "px",
        }}
      >
        <Focusinfo>
          <h1 className="glitch" data-text="Helloblog!">
            Helloblog!
          </h1>
          <div className="header-info">
            <p className="ellipsis">
              <span>
                {"You got to put the past behind you before you can move on."}
              </span>
            </p>
            <div className="top-social_v2">
              <li>
                <img className="flipx" src="statics/images/next-b.svg" alt="" />
              </li>
              <li>
                <img src="statics/images/next-b.svg" alt="" />
              </li>
            </div>
          </div>
        </Focusinfo>
      </Center>
    </BannerWrapper>
  );
};
