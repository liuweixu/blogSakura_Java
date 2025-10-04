import React, { useState } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
  LoginOutlined,
} from "@ant-design/icons";
import { Button, Layout, Menu, Popconfirm, theme } from "antd";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
const { Header, Sider, Content } = Layout;

const App: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  //路由跳转
  const navigate = useNavigate();
  //高亮
  //获取当前路径
  const location = useLocation();
  const selectedKey = location.pathname;

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          mode="inline"
          // defaultSelectedKeys={['1']}
          selectedKeys={[selectedKey]}
          items={[
            {
              key: "/backend/home",
              icon: <UserOutlined />,
              label: "首页",
              onClick: () => navigate("/backend/home"),
            },
            {
              key: "/backend/publish",
              icon: <VideoCameraOutlined />,
              label: "发布文章",
              onClick: () => navigate("/backend/publish"),
            },
            {
              key: "/backend/articlelist",
              icon: <UploadOutlined />,
              label: "文章列表",
              onClick: () => navigate("/backend/articlelist"),
            },
            {
              key: "/backend/setting",
              icon: <UploadOutlined />,
              label: "设置",
              onClick: () => navigate("/backend/setting"),
            },
            {
              key: "/backend/test",
              icon: <UploadOutlined />,
              label: "测试",
              onClick: () => navigate("/backend/test"),
            },
          ]}
        />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }}>
          <div style={{ display: "flex" }}>
            <div>
              <Button
                type="text"
                icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                onClick={() => setCollapsed(!collapsed)}
                style={{
                  fontSize: "16px",
                  width: 64,
                  height: 64,
                }}
              />
            </div>
            <div style={{ marginLeft: "auto" }}>
              <Popconfirm
                title="退出"
                description="是否退出？"
                okText="Yes"
                cancelText="No"
                onConfirm={() => navigate("/backend/login")}
              >
                <Button
                  type="text"
                  icon={<LoginOutlined />}
                  style={{
                    fontSize: "16px",
                    width: 64,
                  }}
                />
              </Popconfirm>
            </div>
          </div>
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: "100vh",
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default App;
