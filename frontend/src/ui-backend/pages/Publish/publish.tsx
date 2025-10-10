/**
 * 发布文章
 * 需要有上传表单
 * 要有上传文章封面 目测用单图和无图即可，其中无图可以用随机图片
 * 必须有文章标题和类别
 * 使用富文本插件，由于react版本为19，与react-quill不兼容，使用react-quill-new
 * 参考链接
 * https://www.npmjs.com/package/react-quill-new
 */

"use client";

// import RichTextEditor from "@/ui-backend/components/Editor";
import { useEffect, useState } from "react";
import {
  getArticleById,
  getChannelAPI,
  addArticleAPI,
  editArticleAPI,
  getChannelById,
} from "@/ui-backend/apis/article";

import type { ChannelItem } from "@/ui-backend/interface/Publish";
import { useSearchParams } from "react-router-dom";

import {
  Button,
  Form,
  Input,
  Select,
  Space,
  Breadcrumb,
  Radio,
  Card,
  type UploadFile,
} from "antd";
import ReactQuill from "react-quill-new";
import "./index.css";
import { Upload, message, notification } from "antd";
import { getUploadKeyAPI } from "@/ui-backend/apis/upload";
import COS from "cos-js-sdk-v5";
import { PlusOutlined } from "@ant-design/icons";

const { Option } = Select;

const layout = {
  labelCol: { span: 1 },
  wrapperCol: { span: 24 },
};

const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

export function PublishArticle() {
  const [form] = Form.useForm();
  const [cos, setCos] = useState<COS | null>(null);
  const [fileValue, setFileValue] = useState<UploadFile[]>([]);
  const [imageType, setImageType] = useState<number>(0);

  const [channelList, setChannelList] = useState<ChannelItem[]>([]);
  useEffect(() => {
    const getChannelList = async () => {
      const res = await getChannelAPI();
      setChannelList(res.data.data);
    };
    getChannelList();
  }, []);

  /**
   *
   * 提交表格
   *
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any

  //提交成功提示
  const [notify, contextHolder] = notification.useNotification();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onFinish = (values: any) => {
    const { title, channel, content } = values;
    const reqData = {
      title,
      content,
      channel,
      image_type: imageType,
      image_url: fileValue.map((item) => item.response.Location)[0],
    };
    if (articleId) {
      editArticleAPI(articleId, reqData);
    } else {
      addArticleAPI(reqData);
    }
    notify.success({
      message: "提交成功",
      description: "文章已保存",
      placement: "bottomRight",
    });
  };

  const onReset = () => {
    form.resetFields();
  };

  /**
   * 上传图像部分 + 腾讯云COS
   */
  useEffect(() => {
    const fetchdata = async () => {
      const res = await getUploadKeyAPI();
      const SecretId = res.data.data.secretId;
      const SecretKey = res.data.data.secretKey;
      const Bucket = res.data.data.bucket;
      const Region = res.data.data.region;

      //初始化COS实例
      const cosInstance = new COS({
        SecretId,
        SecretKey,
      });

      // 保存实例 + bucket/region 信息
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (cosInstance as any).bucket = Bucket;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (cosInstance as any).region = Region;

      setCos(cosInstance);
    };
    fetchdata();
  }, []);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const customRequest = async (options: any) => {
    if (!cos) {
      message.error("COS 未初始化");
      return;
    }

    const { file, onSuccess, onError, onProgress } = options;

    try {
      cos.uploadFile(
        {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          Bucket: (cos as any).bucket,
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          Region: (cos as any).region,
          Key: `images/${Date.now()}_${file.name}`, // 保存路径
          Body: file,
          SliceSize: 1024 * 1024 * 5, // 5MB 分片
          onProgress: (progressData) => {
            onProgress({ percent: progressData.percent * 100 });
          },
        },
        (err, data) => {
          if (err) {
            // console.error("上传失败:", err);
            onError(err);
          } else {
            onSuccess(data);
            message.success("上传成功");
          }
        }
      );
    } catch (err) {
      console.error("上传异常:", err);
      onError(err);
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onUploadChange = (value: any) => {
    setFileValue(value.fileList);
  };

  /**
   *
   * 单图与无图的判断和相应处理方式
   * maxCount是控制图像的添加此数
   * 单图时候，利用条件表达式实现
   * 无图的时候，利用后端处理，添加随机图像就行，或者添加404图
   */

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onImageTypeChange = (e: any) => {
    setImageType(e.target.value);
  };

  //实现编辑文章的逻辑
  //TODO 查询id是否存在-》即是否需要编辑文章
  //回填数据
  //需要使用form.setFieldValue()来实现回填
  //TODO 回调封面类型时（单图 无图）必须用number，如果用string就有可能识别不了
  const [searchParams] = useSearchParams();
  const articleId = searchParams.get("id");
  //获取实例
  useEffect(() => {
    /** TODO 关键修改点：
      1. 添加了channelList加载完成的检查
      2. 确保channel_name在channelList中存在
      3. 添加了channelList作为依赖项
      4. 添加了数据有效性检查
      这样修改后，当刷新页面时，会等待channelList加载完成后再尝试回填数据。
    **/
    async function getArticleDetail() {
      if (articleId && channelList.length > 0) {
        // 确保channelList已加载
        const res = await getArticleById(articleId.toString());
        const res_channel = await getChannelById(res.data.data.channel_id);
        const channel_name = res_channel.data.data.name;
        if (res.data.data) {
          form.setFieldsValue({
            title: res.data.data.title,
            content: res.data.data.content,
            channel: channel_name,
            image_type: res.data.data.image_type,
          });
          setImageType(res.data.data.image_type);
          if (res.data.data.image_url) {
            // 构建回显 fileList
            const fileList: UploadFile[] = [
              {
                uid: "-1",
                name: res.data.data.image_url.split("/").pop() || "image.jpg",
                status: "done",
                url: `https://${res.data.data.image_url}`,
                response: { Location: res.data.data.image_url }, // 保持和上传成功一致
              },
            ];
            setFileValue(fileList);
          }
          // 确保channel_name在channelList中存在
          const channelExists = channelList.some(
            (c) => c.name === res.data.data.channel_name
          );
          if (channelExists) {
            form.setFieldValue("channel", res.data.data.channel_name);
          }
          form.setFieldValue("content", res.data.data.content);
        }
      }
    }
    getArticleDetail();
  }, [articleId, form, channelList]); // 添加channelList依赖

  return (
    <div>
      {contextHolder}
      <Breadcrumb
        separator=">"
        items={[
          {
            title: "首页",
            href: "/backend/",
          },
          {
            title: `${articleId ? "编辑文章" : "发布文章"}`,
            href: "/backend/publish",
          },
        ]}
        style={{ marginBottom: "36px" }}
      />
      <Card
        style={{
          width: "100%",
          marginTop: 20,
          borderRadius: 12,
          boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
        }}
      >
        <Form
          {...layout}
          form={form}
          name="control-hooks"
          onFinish={onFinish}
          labelCol={{ span: 3 }}
          wrapperCol={{ span: 20 }}
        >
          <Form.Item name="title" label="标题" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="channel" label="类别" rules={[{ required: true }]}>
            <Select allowClear placeholder="请选择文章类别">
              {channelList.map((channel) => (
                <Option key={channel.id} value={channel.name}>
                  {channel.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item name="content" label="内容" rules={[{ required: true }]}>
            <ReactQuill
              theme="snow"
              className="publish-quill"
              value={form.getFieldValue("content") || ""}
              onChange={(value) => form.setFieldValue("content", value)}
            />
          </Form.Item>
          <Form.Item label="封面">
            <Form.Item name="image_type">
              <Radio.Group onChange={onImageTypeChange}>
                <Radio value={1}>单图</Radio>
                <Radio value={0}>无图</Radio>
              </Radio.Group>
            </Form.Item>
            {/**
             * listType: 决定选择文件框的外观样式
             * showUploadList: 是否展示已上传文件列表
             */}
            {imageType > 0 && (
              <Upload
                name="image"
                listType="picture-card"
                accept="image/*"
                customRequest={customRequest}
                showUploadList
                maxCount={imageType}
                onChange={onUploadChange}
                fileList={fileValue}
              >
                <div>
                  <PlusOutlined />
                </div>
              </Upload>
            )}
          </Form.Item>
          <Form.Item {...tailLayout}>
            <Space>
              <Button type="primary" htmlType="submit">
                提交
              </Button>
              <Button htmlType="button" onClick={onReset}>
                重置
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}
