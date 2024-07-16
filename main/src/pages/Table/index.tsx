import { MICRO_APPS } from '@/constants';
import { MicroAppItem } from '@/serviceMicro';
import { jsonParse } from '@/utils';
import {
  ActionType,
  ProDescriptionsItemProps,
  ProTable,
} from '@ant-design/pro-components';
import { Button, message } from 'antd';
import React, { useRef, useState } from 'react';
import ConfigRoutesForm from './components/ConfigRoutesForm';
import CreateForm from './components/CreateForm';

const disableDeleteApps = ['react', 'vite-project'];
/**
 * 添加节点
 * @param fields
 */
const handleAdd = async (fields: MicroAppItem) => {
  const hide = message.loading('正在添加');
  try {
    const res = jsonParse<MicroAppItem[]>(localStorage.getItem(MICRO_APPS), []);
    localStorage.setItem(
      MICRO_APPS,
      JSON.stringify([
        ...res,
        {
          ...fields,
          new: true,
          routes: [
            {
              path: fields.qiankunBase + fields.base + '/',
              name: fields.name + '-root',
            },
          ],
        },
      ]),
    );
    hide();
    message.success('添加成功');
    return true;
  } catch (error) {
    hide();
    message.error('添加失败请重试！');
    return false;
  }
};

/**
 * 更新节点
 * @param fields
 */
const handleUpdate = async (fields: MicroAppItem) => {
  const hide = message.loading('正在配置');
  console.log(fields);
  try {
    const res = jsonParse<MicroAppItem[]>(localStorage.getItem(MICRO_APPS), []);
    const updateRes = res.map((item) =>
      item.name === fields.name ? { ...item, ...fields } : item,
    );
    console.log(updateRes, 'uuu');

    localStorage.setItem(MICRO_APPS, JSON.stringify(updateRes));
    hide();
    message.success('配置成功');
    return true;
  } catch (error) {
    hide();
    message.error('配置失败请重试！');
    return false;
  }
};

/**
 *  删除节点
 * @param selectedRows
 */
const handleRemove = async (selectedRows: MicroAppItem[]) => {
  const hide = message.loading('正在删除');
  if (!selectedRows) return true;
  try {
    const res = jsonParse<MicroAppItem[]>(localStorage.getItem(MICRO_APPS), []);
    localStorage.setItem(
      MICRO_APPS,
      JSON.stringify(
        res.filter((item) => !selectedRows.find((i) => i.name === item.name)),
      ),
    );
    hide();
    message.success('删除成功');
    return true;
  } catch (error) {
    hide();
    message.error('删除失败，请重试');
    return false;
  }
};

const TableList: React.FC<unknown> = () => {
  const [createModalVisible, handleModalVisible] = useState<boolean>(false);
  const [configRoutesModalVisible, handleConfigRoutesModalVisible] =
    useState<boolean>(false);
  const [currentRow, setCurrentRow] = useState<MicroAppItem>();
  const actionRef = useRef<ActionType>();
  const columns: ProDescriptionsItemProps<MicroAppItem>[] = [
    {
      title: '子应用名称/菜单名称',
      dataIndex: 'name',
      formItemProps: {
        rules: [
          {
            required: true,
            message: '子应用名称',
          },
        ],
      },
    },
    {
      title: '子应用地址',
      dataIndex: 'origin',
      valueType: 'text',
      formItemProps: {
        rules: [
          {
            required: true,
            message: '子应用地址',
          },
        ],
      },
      render(_, row) {
        if (!row.origin) return '-';
        return (
          <a
            href={row.origin + row.base + '/'}
            target="_blank"
            rel="noreferrer"
          >
            {row.origin}
          </a>
        );
      },
    },
    {
      title: '子应用基础路径',
      dataIndex: 'base',
      formItemProps: {
        rules: [
          {
            required: true,
            message: '子应用基础路径',
          },
        ],
      },
      render(base, row) {
        if (!row.origin) return '-';
        return base;
      },
    },
    {
      title: '子应用在主应用的基础路径',
      dataIndex: 'qiankunBase',
      formItemProps: {
        rules: [
          {
            required: true,
            message: '子应用基础路径',
          },
        ],
      },
      render(qiankunBase, row) {
        if (!row.origin) return '-';
        return qiankunBase;
      },
    },
    {
      title: '子应用在主应用的路径',
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
    //   title: '是否被MicroAppWithMemoHistory引用',
    //   dataIndex: '_name_',
    //   hideInForm: true,
    //   render(_, row) {
    //     if (!row.origin) return '-';
    //     return disableDeleteApps.find((i) => i === row.name) ? '是' : '否';
    //   },
    // },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      width: '150px',
      render: (_, row) => {
        if (!row.origin) return;
        return (
          <>
            <Button
              hidden={!row.origin}
              onClick={() => {
                handleConfigRoutesModalVisible(true);
                setCurrentRow(row);
              }}
              type="link"
              size="small"
            >
              配置子应用
            </Button>
            <Button
              hidden={!!row.origin}
              onClick={() => {
                handleConfigRoutesModalVisible(true);
                setCurrentRow(row);
              }}
              type="link"
              size="small"
            >
              配置菜单
            </Button>
            <Button
              hidden={!!row.origin}
              onClick={() => {
                handleConfigRoutesModalVisible(true);
                setCurrentRow(row);
              }}
              type="link"
              size="small"
            >
              添加下级
            </Button>
            <Button
              onClick={async () => {
                const success = await handleRemove([row]);
                if (success && actionRef.current) {
                  actionRef.current.reload();
                }
              }}
              type="link"
              danger
              size="small"
            >
              删除
            </Button>
          </>
        );
      },
    },
  ];
  return (
    <>
      <div style={{ border: '1px solid' }}>
        nginx部署配置
        <code style={{ whiteSpace: 'pre-wrap' }}>{`
          listen       4000;
          server_name  localhost;

        location / {
            root  D:/Desktop/doc/MyGithub/micro-app/build;
            index  index.html index.htm;
            try_files $uri $uri/ /index.html;
            error_page 404 /index.html;
        }
       
        location /react{
            root  D:\\Desktop\\doc\\MyGithub\\micro-app\\build\\child;
            index  index.html index.htm;
            try_files $uri $uri/ /child/react/index.html;
            error_page 404 /child/react/index.html;
        }

        location /vue2{
            root  D:\\Desktop\\doc\\MyGithub\\micro-app\\build\\child;
            index  index.html index.htm;
            try_files $uri $uri/ /child/vue2/index.html;
            error_page 404 /child/vue2/index.html;
        }
        location /vite-project{
            root  D:\\Desktop\\doc\\MyGithub\\micro-app\\build\\child;
            index  index.html index.htm;
            try_files $uri $uri/ /child/vite-project/index.html;
            error_page 404 /child/vite-project/index.html;
        }`}</code>
      </div>
      <ProTable<MicroAppItem>
        size="small"
        search={false}
        headerTitle="子应用列表"
        actionRef={actionRef}
        rowKey="name"
        // search={{
        //   labelWidth: 120,
        // }}
        expandable={{
          childrenColumnName: 'routes',
        }}
        toolBarRender={() => [
          <Button
            key="1"
            type="primary"
            onClick={() => handleModalVisible(true)}
          >
            新建
          </Button>,
        ]}
        request={async () => {
          const data: MicroAppItem[] = await new Promise((resolve) => {
            setTimeout(() => {
              resolve(
                jsonParse(localStorage.getItem(MICRO_APPS) as string, []),
              );
            }, 500);
          });
          return {
            success: true,
            data,
          };
        }}
        //@ts-ignore
        columns={columns}
      />

      <CreateForm
        onCancel={() => handleModalVisible(false)}
        modalVisible={createModalVisible}
      >
        <ProTable<MicroAppItem, MicroAppItem>
          onSubmit={async (value) => {
            const success = await handleAdd(value);
            if (success) {
              handleModalVisible(false);
              if (actionRef.current) {
                actionRef.current.reload();
              }
            }
          }}
          rowKey="name"
          type="form"
          //@ts-ignore
          columns={columns}
        />
      </CreateForm>
      <ConfigRoutesForm
        onSubmit={async (value) => {
          const success = await handleUpdate(value);
          if (success) {
            handleConfigRoutesModalVisible(false);
            setCurrentRow(undefined);
            if (actionRef.current) {
              actionRef.current.reload();
            }
          }
        }}
        onCancel={() => {
          handleConfigRoutesModalVisible(false);
          setCurrentRow(undefined);
        }}
        open={configRoutesModalVisible}
        values={currentRow}
      />
    </>
  );
};

export default TableList;
