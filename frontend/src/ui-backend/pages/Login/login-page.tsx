import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { loginAPI } from "@/ui-backend/apis/user";
import { useForm, type FieldValues } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export function LoginPage() {
  const form = useForm();
  const navigate = useNavigate();
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(async (fromValue: FieldValues) => {
          //触发异步
          const res = await loginAPI(fromValue);
          console.log(res);
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          if ((res as any).data.msg == "success") {
            navigate("/backend/home"); //跳转至首页
            toast.success("登录成功", {
              description: "Sunday, December 03, 2023 at 9:00 AM",
              action: {
                label: "关闭",
                onClick: () => console.log("Undo"),
              },
            });
          }
        })}
      >
        <Card>
          <CardHeader>
            <CardTitle>登录</CardTitle>
            <CardDescription>请输入手机号和验证码</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="mobile">手机号</Label>
                <Input
                  id="mobile"
                  placeholder="请输入您的手机号"
                  {...form.register("mobile")}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="code">验证码</Label>
                <Input
                  id="code"
                  placeholder="请输入验证码"
                  maxLength={6}
                  {...form.register("code")}
                />
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button type="submit">确认</Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
}
