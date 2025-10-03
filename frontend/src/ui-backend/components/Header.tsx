import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { TbLogout } from "react-icons/tb";

import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearUserInfo } from "../store/modules/user";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { BreadcrumbModule } from "./BreadcrumbList";
import { Button } from "@/components/ui/button";
import type { BreadCrumbItems } from "../interface/Common";

export function Header({ href, title, pagename }: BreadCrumbItems) {
  const dispatch = useDispatch();

  //退出登录
  const navigator = useNavigate();
  const LoginOut = () => {
    dispatch(clearUserInfo());
    navigator("/backend/login");
  };

  return (
    <div className="flex h-16 shrink-0 items-center gap-2 border-b px-6">
      <SidebarTrigger className="-ml-1" />
      <BreadcrumbModule href={href} title={title} pagename={pagename} />
      <div className="flex-1 flex justify-end">
        <span>
          <Popover>
            <PopoverTrigger asChild>
              <TbLogout className="w-4 h-4" title="是否确认退出" />
            </PopoverTrigger>
            <PopoverContent className="w-60 p-4">
              <div className="space-y-2">
                <p className="font-medium">是否确认退出？</p>
                <p className="text-sm text-muted-foreground">
                  此操作不可撤销。
                </p>
                <div className="flex justify-end gap-2 mt-2">
                  <Button
                    variant="outline"
                    size="sm"
                    // TODO 点击取消按钮，触发键盘事件，关闭弹窗
                    onClick={() =>
                      document.dispatchEvent(
                        new KeyboardEvent("keydown", { key: "Escape" })
                      )
                    }
                  >
                    取消
                  </Button>
                  <Button size="sm" onClick={LoginOut}>
                    退出
                  </Button>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </span>
      </div>
    </div>
  );
}
