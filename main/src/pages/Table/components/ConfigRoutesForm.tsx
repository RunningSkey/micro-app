import { APP_TYPE } from '@/constants';
import { Button, Drawer, Form, Input, Select, Space, Tree } from 'antd';
import React, { PropsWithChildren, useState } from 'react';
import { TABLE_API } from '../typings';

export type FormValueType = TABLE_API.SubApp;

export interface ConfigRoutesFormProps {
  onCancel: (flag?: boolean, formVals?: FormValueType) => void;
  onSubmit: (values: FormValueType) => Promise<void>;
  open: boolean;
  values?: TABLE_API.SubApp;
}

const ConfigRoutesForm: React.FC<PropsWithChildren<ConfigRoutesFormProps>> = (
  props,
) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const handleClose = () => props.onCancel();
  const handleSubmit = async () => {
    const value = await form.validateFields();
    setLoading(true);
    await props.onSubmit(value).finally(() => {
      setLoading(false);
    });
  };
  return (
    <Drawer
      width={640}
      destroyOnClose
      title="配置"
      open={props.open}
      onClose={handleClose}
      footer={
        <Space style={{ justifyContent: 'flex-end', width: '100%' }}>
          <Button key={1} onClick={handleClose} loading={loading}>
            关闭
          </Button>
          <Button
            type="primary"
            loading={loading}
            key={2}
            onClick={handleSubmit}
          >
            确认
          </Button>
        </Space>
      }
    >
      <Form form={form} initialValues={props.values}>
        <Form.Item
          name="appName"
          label="子应用名称"
          rules={[
            {
              required: true,
              message: '请输入',
            },
          ]}
        >
          <Input placeholder="请输入" />
        </Form.Item>
        <Form.Item
          name="appEntry"
          label="子应用地址"
          rules={[
            {
              required: true,
              message: '请输入',
            },
          ]}
        >
          <Input placeholder="请输入" />
        </Form.Item>
        <Form.Item
          name="appType"
          label="子应用类型"
          rules={[
            {
              required: true,
              message: '请选择',
            },
          ]}
        >
          <Select
            options={Object.values(APP_TYPE).map((item) => ({
              label: item.text,
              value: item.value,
            }))}
            placeholder="请选择"
          />
        </Form.Item>
        <Form.Item
          name="appRoutes"
          valuePropName="treeData"
          label="子应用路由"
          rules={[
            {
              required: true,
              message: '请选择',
            },
          ]}
        >
          <Tree
            fieldNames={{
              title: 'name',
              key: 'name',
            }}
          ></Tree>
        </Form.Item>
      </Form>
    </Drawer>
  );
};

export default ConfigRoutesForm;
