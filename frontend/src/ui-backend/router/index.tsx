import { Login } from "@/ui-backend/pages/Login";
import { Layout } from "@/ui-backend/pages/Layout";
import { Routes, Route } from "react-router-dom";
import { Home } from "@/ui-backend/pages/Home";
import { ArticleList } from "@/ui-backend/pages/ArticleList";
import { Publish } from "@/ui-backend/pages/Publish";
import { Setting } from "@/ui-backend/pages/Setting";
import { Test } from "@/ui-backend/pages/Test";
import { Error } from "@/components/error";

export const RouterBackend = () => {
  return (
    <Routes>
      <Route path="/backend/login" element={<Login />} />
      <Route path="/backend/" element={<Layout />}>
        <Route path="" element={<Home />} />
        <Route path="publish" element={<Publish />} />
        <Route path="articlelist" element={<ArticleList />} />
        <Route path="setting" element={<Setting />} />
        <Route path="test" element={<Test />} />
      </Route>
      <Route path="*" element={<Error />} />
    </Routes>
  );
};
