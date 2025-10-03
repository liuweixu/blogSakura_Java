import { Banner } from "./components/bannertest";
import { Feature } from "./components/featuretest";
import { ListWrapper } from "./components/listtest";
import { HomeWrapper, MainWrapper } from "./components/style";
function App() {
  return (
    <HomeWrapper>
      <Banner />
      <div
        className="w-full max-w-[900px] p-[0_10px] ml-auto mr-auto bg-white/80"
        id="content"
        style={{
          animation: "main 1s",
        }}
      >
        <MainWrapper id="content">
          <Feature />
          <ListWrapper />
        </MainWrapper>
      </div>
    </HomeWrapper>
  );
}

export default App;
