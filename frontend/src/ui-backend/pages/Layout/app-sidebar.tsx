import React, { useEffect, useState } from "react";
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
import { isLoginAPI, logoutAPI } from "@/ui-backend/apis/user";
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

  // 实现退出逻辑
  const onLogout = async () => {
    const res = await logoutAPI();
    // console.log("测试", res);
    if (res?.data.msg == "success") {
      navigate("/backend/login");
    }
  };

  //处理未登录时，同样后端界面的情况
  const [isLogin, setIsLogin] = useState(true);
  useEffect(() => {
    const getIsLogin = async () => {
      const res = await isLoginAPI();
      setIsLogin(res?.data.code == 0 ? false : true);
    };
    getIsLogin();
  }, []);
  return (
    <>
      {isLogin ? (
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
                  key: "/backend/",
                  icon: <UserOutlined />,
                  label: "首页",
                  onClick: () => navigate("/backend/"),
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
                  key: "/backend/channellist",
                  icon: <UploadOutlined />,
                  label: "频道列表",
                  onClick: () => navigate("/backend/channellist"),
                },
                {
                  key: "/backend/setting",
                  icon: <UploadOutlined />,
                  label: "设置",
                  onClick: () => navigate("/backend/setting"),
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
                    icon={
                      collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />
                    }
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
                    onConfirm={onLogout}
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
      ) : (
        navigate("/backend/login")
      )}
    </>
  );
};

export default App;
