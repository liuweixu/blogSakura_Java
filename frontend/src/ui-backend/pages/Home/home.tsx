import { Breadcrumb, Card } from "antd";

const App = () => {
  return (
    <div>
      <Breadcrumb
        separator=">"
        items={[
          {
            title: "首页",
            href: "/backend/",
          },
        ]}
      />
      <div>
        <Card style={{ marginTop: 20 }}>
          <img
            src="https://api.r10086.com/樱道随机图片api接口.php?图片系列=动漫综合1"
            alt="Image"
            className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
          />
        </Card>
      </div>
    </div>
  );
};

export default App;
