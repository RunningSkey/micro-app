import { MicroAppItem } from '@/serviceMicro';
import { Button, Drawer, Form, Input, Space } from 'antd';
import React, { PropsWithChildren, useEffect, useMemo, useState } from 'react';

export type FormValueType = MicroAppItem;

export interface ConfigRoutesFormProps {
  onCancel: (flag?: boolean, formVals?: FormValueType) => void;
  onSubmit: (values: FormValueType) => Promise<void>;
  open: boolean;
  values?: MicroAppItem;
}

const ConfigRoutesForm: React.FC<PropsWithChildren<ConfigRoutesFormProps>> = (
  props,
) => {
  const { onCancel, onSubmit, values, open } = props;
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const handleClose = () => {
    onCancel();
  };
  const handleSubmit = async () => {
    const value = await form.validateFields();
    setLoading(true);
    await onSubmit(value).finally(() => {
      setLoading(false);
    });
  };
  const isMicro = !!values?.origin;
  useEffect(() => {
    if (open) {
      form.setFieldsValue(values);
    }
  }, [open]);
  const renderItem = useMemo(() => {
    if (isMicro)
      return (
        <>
          <Form.Item
            name="name"
            label="子应用名称"
            rules={[
              {
                required: true,
                message: '请输入',
              },
            ]}
          >
            <Input disabled placeholder="请输入" />
          </Form.Item>
          <Form.Item
            name="origin"
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
            name="base"
            label="子应用基础路径	"
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
            name="qiankunBase"
            label="子应用在主应用的基础路径"
            rules={[
              {
                required: true,
                message: '请输入',
              },
            ]}
          >
            <Input placeholder="请输入" />
          </Form.Item>
        </>
      );

    return (
      <>
        <Form.Item
          name="name"
          label="子应用菜单名称"
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
          name="path"
          label="子应用在主应用的路径	"
          rules={[
            {
              required: true,
              message: '请输入',
            },
          ]}
        >
          <Input placeholder="请输入" />
        </Form.Item>
      </>
    );
  }, [isMicro]);
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
      <Form form={form}>
        {renderItem}
        {/* <Form.Item
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
        </Form.Item> */}
        {/* <Form.Item
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
        </Form.Item> */}
      </Form>
    </Drawer>
  );
};

export default ConfigRoutesForm;
