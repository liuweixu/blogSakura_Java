import { Breadcrumb, Card } from "antd";
import { useEffect, useState } from "react";
import { getChannelAPI } from "@/ui-backend/apis/article";
import type { ChannelItem } from "@/ui-backend/interface/Publish";

import { Table } from "antd";
import { getArticleHomeAPI } from "@/ui-frontend/apis/home";
import type { ArticleItem } from "@/ui-backend/interface/Article";

export const Channel = () => {
  //获取频道信息
  const [channelList, setChannelList] = useState<ChannelItem[]>([]);
  const [articleList, setArticleList] = useState<ArticleItem[]>([]);
  const [count, setCount] = useState(0);
  useEffect(() => {
    const getChannelList = async () => {
      const res_channel = await getChannelAPI();
      setChannelList(res_channel.data.data);
      setCount(res_channel?.data.data.length);
      const res_article_list = await getArticleHomeAPI();
      setArticleList(res_article_list?.data.data);
    };
    getChannelList();
  }, []);
  // 列表头
  // 准备列数据
  // 定义状态枚举
  const columns = [
    {
      title: "标题",
      dataIndex: "name",
      width: 220,
    },
    {
      title: "文章个数",
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      render: (_: any, record: any) => {
        const count = articleList.filter(
          (item) => item?.channel_id === record.id
        ).length;
        return count;
      },
    },
    // {
    //   title: "操作",
    //   // eslint-disable-next-line @typescript-eslint/no-explicit-any
    //   render: (data: any) => {
    //     return (
    //       <Space size="middle">
    //         <Button
    //           type="primary"
    //           shape="circle"
    //           icon={<EditOutlined />}
    //           onClick={() => navigate(`/backend/publish?id=${data.id}`)}
    //         />
    //         <Popconfirm
    //           title="删除频道"
    //           description="确认要删除当前频道吗?"
    //           onConfirm={() => onConfirm(data)}
    //           okText="Yes"
    //           cancelText="No"
    //         >
    //           <Button
    //             type="primary"
    //             danger
    //             shape="circle"
    //             icon={<DeleteOutlined />}
    //           />
    //         </Popconfirm>
    //       </Space>
    //     );
    //   },
    // },
  ];
  return (
    <div>
      <Breadcrumb
        separator=">"
        items={[
          {
            title: "首页",
            href: "/backend/",
          },
          {
            title: "频道列表",
            href: "/backend/channellist",
          },
        ]}
      />
      {/**表格区域 */}
      <Card
        style={{
          width: "100%",
          marginTop: 20,
          borderRadius: 12,
          boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
          fontFamily: "'KaiTi', 'KaiTi_GB2312', 'STKaiti', serif",
        }}
        title={`共计 ${count} 个频道`}
      >
        <Table
          rowKey="id"
          columns={columns}
          dataSource={channelList}
          pagination={{
            total: count,
            pageSize: 5,
          }}
        />
      </Card>
    </div>
  );
};
