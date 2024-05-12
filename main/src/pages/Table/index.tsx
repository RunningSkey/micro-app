import { APP_TYPE, MICRO_APPS } from '@/constants';
import { jsonParse } from '@/utils';
import {
  ActionType,
  ProDescriptionsItemProps,
  ProTable,
} from '@ant-design/pro-components';
import { Button, Divider, Tag, message } from 'antd';
import React, { useRef, useState } from 'react';
import ConfigRoutesForm from './components/ConfigRoutesForm';
import CreateForm from './components/CreateForm';
import { TABLE_API } from './typings';

const disableDeleteApps = ['react1', 'vite-project'];
/**
 * 添加节点
 * @param fields
 */
const handleAdd = async (fields: TABLE_API.SubApp) => {
  const hide = message.loading('正在添加');
  try {
    const res = jsonParse<TABLE_API.SubApp[]>(
      localStorage.getItem(MICRO_APPS),
      [],
    );
    localStorage.setItem(MICRO_APPS, JSON.stringify([...res, fields]));
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
const handleUpdate = async (fields: TABLE_API.SubApp) => {
  const hide = message.loading('正在配置');
  console.log(fields);
  try {
    const res = jsonParse<TABLE_API.SubApp[]>(
      localStorage.getItem(MICRO_APPS),
      [],
    );
    localStorage.setItem(
      MICRO_APPS,
      JSON.stringify(
        res.map((item) => (item.appName === fields.appName ? fields : item)),
      ),
    );
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
const handleRemove = async (selectedRows: TABLE_API.SubApp[]) => {
  const hide = message.loading('正在删除');
  if (!selectedRows) return true;
  try {
    const res = jsonParse<TABLE_API.SubApp[]>(
      localStorage.getItem(MICRO_APPS),
      [],
    );
    localStorage.setItem(
      MICRO_APPS,
      JSON.stringify(
        res.filter(
          (item) => !selectedRows.find((i) => i.appName === item.appName),
        ),
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
  const [currentRow, setCurrentRow] = useState<TABLE_API.SubApp>();
  const actionRef = useRef<ActionType>();
  const columns: ProDescriptionsItemProps<TABLE_API.SubApp>[] = [
    {
      title: '应用类型',
      dataIndex: 'appType',
      valueEnum: APP_TYPE,
      tooltip: '静态应用是在代码中写死的，无法动态修改',
      formItemProps: {
        rules: [
          {
            required: true,
            message: '应用类型',
          },
        ],
      },
      render(text, record) {
        return <Tag color={APP_TYPE[record['appType']]?.color}>{text}</Tag>;
      },
    },
    {
      title: '子应用名称',
      dataIndex: 'appName',
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
      dataIndex: 'appEntry',
      valueType: 'text',
      formItemProps: {
        rules: [
          {
            required: true,
            message: '子应用名称',
          },
        ],
      },
      render(text) {
        return <a onClick={() => window.open(text as string)}>{text}</a>;
      },
    },

    {
      title: '是否被MicroAppWithMemoHistory引用',
      dataIndex: '_appName_',
      hideInForm: true,
      render(_, record) {
        return disableDeleteApps.find((i) => i === record.appName)
          ? '是'
          : '否';
      },
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => {
        if (record.appType !== APP_TYPE.DYNAMIC.value) return null;
        return (
          <>
            <a
              onClick={() => {
                handleConfigRoutesModalVisible(true);
                setCurrentRow(record);
              }}
            >
              配置
            </a>
            <Divider type="vertical" />
            <Button
              hidden={!!disableDeleteApps.find((i) => i === record.appName)}
              onClick={async () => {
                const success = await handleRemove([record]);
                if (success && actionRef.current) {
                  actionRef.current.reload();
                }
              }}
              type="link"
              danger
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
      <ProTable<TABLE_API.SubApp>
        search={false}
        headerTitle="子应用列表"
        actionRef={actionRef}
        rowKey="appName"
        // search={{
        //   labelWidth: 120,
        // }}
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
          const data: TABLE_API.SubApp[] = await new Promise((resolve) => {
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
        <ProTable<TABLE_API.SubApp, TABLE_API.SubApp>
          onSubmit={async (value) => {
            const success = await handleAdd(value);
            if (success) {
              handleModalVisible(false);
              if (actionRef.current) {
                actionRef.current.reload();
              }
            }
          }}
          rowKey="appName"
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
