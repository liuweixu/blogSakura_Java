// 导入HomePage组件，并指定其类型为React.FC
import HomePage from "./home";

const Home = () => {
  return <HomePage />;
};

export default Home;

// 这样做的好处是将HomePage组件的实现细节隐藏在home.tsx文件中，使得index.tsx文件更简洁，
// 同时也方便以后对HomePage组件进行独立的修改和维护。
