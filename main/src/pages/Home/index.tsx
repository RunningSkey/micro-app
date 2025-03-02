// import Guide from '@/components/Guide';
// import { trim } from '@/utils/format';
// import { history as H, MicroAppWithMemoHistory, useModel } from '@umijs/max';
// import { Button, Col, Drawer, Modal, Row, Tabs, TabsProps } from 'antd';
// import { useState } from 'react';
// import styles from './index.less';

// const HomePage: React.FC = () => {
//   const { name } = useModel('global');
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const showModal = () => {
//     setIsModalOpen(true);
//   };

//   const handleOk = () => {
//     setIsModalOpen(false);
//   };

//   const handleCancel = () => {
//     setIsModalOpen(false);
//   };

//   const items: TabsProps['items'] = [
//     {
//       key: '1',
//       label: 'MicroAppWithMemoHistory-react',
//       children: (
//         <div>
//           使用 MicroAppWithMemoHistory 引入，地址栏不会发生变化,同时存在2个组件
//           <Row>
//             <Col span={12}>
//               <MicroAppWithMemoHistory
//                 key={'MicroAppWithMemoHistory-react1'}
//                 url={'/react/table'}
//                 name="react"
//                 autoSetLoading
//                 masterHistory={H}
//               />
//             </Col>
//             <Col span={12}>
//               <MicroAppWithMemoHistory
//                 key={'MicroAppWithMemoHistory-react2'}
//                 url={'/react/table'}
//                 name="react"
//                 autoSetLoading
//                 masterHistory={H}
//               />
//             </Col>
//           </Row>
//         </div>
//       ),
//     },
//     {
//       key: '2',
//       label: 'MicroAppWithMemoHistory-vue2.0',
//       children: (
//         <div>
//           <a
//             target="_blank"
//             rel="noreferrer"
//             href="https://github.com/umijs/qiankun/issues/1942"
//           >
//             使用MicroAppWithMemoHistory加载vue2子应用无效
//           </a>
//         </div>
//       ),
//     },
//     {
//       key: '3',
//       label: 'MicroAppWithMemoHistory-vite-project',
//       children: (
//         <div>
//           使用 MicroAppWithMemoHistory 引入，地址栏不会发生变化
//           <MicroAppWithMemoHistory
//             key={'MicroAppWithMemoHistory--vite-project---1'}
//             url={'/access'}
//             name="vite-project"
//             autoSetLoading
//             masterHistory={H}
//             memoryHistory
//           />
//         </div>
//       ),
//     },
//   ];
//   const [o, sO] = useState(false);
//   const [open, setOpen] = useState(false);

//   const showDrawer = () => {
//     setOpen(true);
//   };

//   const onClose = () => {
//     setOpen(false);
//   };
//   return (
//     // <PageContainer ghost>
//     <div className={styles.container}>
//       <div style={{ position: 'relative' }}>
//         <Button type="primary" onClick={showModal}>
//           Open Modal
//         </Button>
//         <Modal
//           // title="Basic Modal"
//           open={isModalOpen}
//           onOk={handleOk}
//           onCancel={handleCancel}
//           width={800}
//         >
//           <div>Modal content</div>
//           <Button
//             onClick={() => {
//               sO(!o);
//             }}
//             style={{ zIndex: 111, position: 'relative' }}
//           >
//             show MicroAppWithMemoHistory{' '}
//           </Button>
//           <div>
//             {o && (
//               <MicroAppWithMemoHistory
//                 key={'MicroAppWithMemoHistory-react1'}
//                 url={'/react/access'}
//                 name="react"
//                 autoSetLoading
//                 masterHistory={H}
//               />
//             )}
//           </div>
//         </Modal>
//         <Button onClick={showDrawer}>showDrawer</Button>
//         <Drawer width={800} title="Basic Drawer" onClose={onClose} open={open}>
//           <MicroAppWithMemoHistory
//             key={'MicroAppWithMemoHistory-react1'}
//             url={'/react/home'}
//             name="react"
//             autoSetLoading
//             masterHistory={H}
//           />
//         </Drawer>

//         <Tabs
//           tabBarStyle={{
//             zIndex: 11,
//           }}
//           defaultActiveKey="1"
//           items={items}
//         />
//       </div>
//       <Guide name={trim(name)} />
//     </div>
//     // </PageContainer>
//   );
// };

// export default HomePage;
import { MICRO_APPS } from '@/constants';
import { jsonParse } from '@/utils';
import type { ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { useModel } from '@umijs/max';
import { Tag } from 'antd';

export type Status = {
  color: string;
  text: string;
};

const statusMap = {
  0: {
    color: 'blue',
    text: '进行中',
  },
  1: {
    color: 'green',
    text: '已完成',
  },
  2: {
    color: 'volcano',
    text: '警告',
  },
  3: {
    color: 'red',
    text: '失败',
  },
  4: {
    color: '',
    text: '未完成',
  },
};

export type TableListItem = {
  key: number;
  name: string;
  containers: number;
  creator: string;
  status: Status;
  createdAt: number;
};
const tableListDataSource: TableListItem[] = [];

const creators = ['付小小', '曲丽丽', '林东东', '陈帅帅', '兼某某'];

for (let i = 0; i < 5; i += 1) {
  tableListDataSource.push({
    key: i,
    name: 'AppName',
    containers: Math.floor(Math.random() * 20),
    creator: creators[Math.floor(Math.random() * creators.length)],
    status: statusMap[((Math.floor(Math.random() * 10) % 5) + '') as '0'],
    createdAt: Date.now() - Math.floor(Math.random() * 100000),
  });
}

const columns: ProColumns<TableListItem>[] = [
  {
    title: '子应用名称',
    // width: 120,
    dataIndex: 'name',
  },
  {
    title: '权限',
    // width: 120,
    dataIndex: 'status',
    render: (_, record) => {
      const error =
        record.name === 'react' && record.initialState?.name !== 'admin';
      return (
        <Tag color={error ? 'error' : 'success'}>
          {error ? '无权限' : '有权限'}
        </Tag>
      );
    },
  },
  {
    title: '子应用地址',
    dataIndex: 'origin',
    valueType: 'text',
    render(_, row) {
      if (!row.origin) return '-';
      return (
        <a href={row.origin + row.base + '/'} target="_blank" rel="noreferrer">
          {row.origin}
        </a>
      );
    },
  },
  {
    title: '主应用基础路径',
    dataIndex: 'qiankunBase',
    render(qiankunBase, row) {
      if (!row.origin) return '-';
      return qiankunBase;
    },
    hideInSearch: true,
  },
  {
    title: '子应用基础路径',
    dataIndex: 'base',
    render(base, row) {
      if (!row.origin) return '-';
      return base;
    },
    hideInSearch: true,
  },
];

// const expandIcon = (props) => {
//   const { expanded, onExpand, record } = props;
//   if (!record.routes || record.routes.length === 0) {
//     return null; // 如果没有子数据，不显示展开图标
//   }
//   return (
//     <a onClick={(e) => onExpand(record, e)}>
//       {expanded ? <CaretDownOutlined /> : <CaretRightOutlined />}
//     </a>
//   );
// };

const expandedRowRender = (props) => {
  console.log(props, 'propsprops');

  const data = props.routes || [];
  return (
    <ProTable
      columns={[
        { title: '路由名称', dataIndex: 'name', key: 'name' },

        {
          title: '路由地址',
          dataIndex: 'path',
          hideInForm: true,
          render(href, row) {
            if (row.origin) return '-';
            return (
              <a href={href} target="_blank" rel="noreferrer">
                {href}
              </a>
            );
          },
        },
        // {
        //   title: 'Action',
        //   dataIndex: 'operation',
        //   key: 'operation',
        //   valueType: 'option',
        //   render: () => [<a key="Pause">Pause</a>, <a key="Stop">Stop</a>],
        // },
      ]}
      expandable={{
        childrenColumnName: 'routes',
        // expandIcon,
      }}
      rowKey={'path'}
      headerTitle={'路由菜单'}
      search={false}
      options={false}
      dataSource={data}
      pagination={false}
    />
  );
};

export default () => {
  const { initialState } = useModel('@@initialState');
  // console.log(initialState, 'initialState');

  return (
    <ProTable<TableListItem>
      columns={columns}
      request={async (params, sorter, filter) => {
        // 表单搜索项会从 params 传入，传递给后端接口。
        console.log(params, sorter, filter);
        // await new Promise((r) => {
        //   setTimeout(() => {
        //     r(r);
        //   }, 1000);
        // });

        return Promise.resolve({
          data: jsonParse(localStorage.getItem(MICRO_APPS) as string, []).map(
            (i) => ({
              ...i,
              initialState,
            }),
          ),
          success: true,
        });
      }}
      rowKey="qiankunBase"
      pagination={{
        showQuickJumper: true,
      }}
      expandable={{ expandedRowRender }}
      // search={false}
      dateFormatter="string"
      headerTitle="子应用列表"
      options={false}
      // toolBarRender={() => [
      //   <Button key="show">查看日志</Button>,
      //   <Button key="out">
      //     导出数据
      //     <DownOutlined />
      //   </Button>,
      //   <Button key="primary" type="primary">
      //     创建应用
      //   </Button>,
      // ]}
    />
  );
};
