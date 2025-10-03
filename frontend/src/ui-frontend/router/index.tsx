import { Routes, Route, useLocation } from "react-router-dom";
import { HomeTest } from "@/ui-frontend/pages/hometest";
import { Home } from "@/ui-frontend/pages/home";
import { Article } from "@/ui-frontend/pages/article";
import { Header } from "@/ui-frontend/pages/header";
import { Error } from "@/components/error";

export const RouterFrontend = () => {
  const location = useLocation();

  // 只有在匹配已知路由时才显示Header
  const showHeader = ["/", "/test", "/article/"].some(
    (path) =>
      location.pathname === path ||
      (path === "/article/" && location.pathname.startsWith(path))
  );

  return (
    <>
      {showHeader && <Header />}
      <Routes>
        <Route path="/test" element={<HomeTest />} />
        <Route path="/" element={<Home />} />
        <Route path="/article/:id" element={<Article />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </>
  );
};
