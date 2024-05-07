import Guide from '@/components/Guide';
import { trim } from '@/utils/format';
import { history as H, MicroAppWithMemoHistory, useModel } from '@umijs/max';
import { Button, Col, Drawer, Modal, Row, Tabs, TabsProps } from 'antd';
import { useState } from 'react';
import styles from './index.less';

const HomePage: React.FC = () => {
  const { name } = useModel('global');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const items: TabsProps['items'] = [
    {
      key: '1',
      label: 'MicroAppWithMemoHistory-react1',
      children: (
        <div>
          使用 MicroAppWithMemoHistory 引入，地址栏不会发生变化,同时存在2个组件
          <Row>
            <Col span={12}>
              <MicroAppWithMemoHistory
                key={'MicroAppWithMemoHistory-react1--1-'}
                base={'/react1'}
                url={'/react1/access'}
                name="react1"
                autoSetLoading
                masterHistory={H}
              />
            </Col>
            <Col span={12}>
              <MicroAppWithMemoHistory
                key={'MicroAppWithMemoHistory-react1--2-'}
                base={'/react1'}
                url={'/react1/access'}
                name="react1"
                autoSetLoading
                masterHistory={H}
              />
            </Col>
          </Row>
        </div>
      ),
    },
    {
      key: '2',
      label: 'MicroAppWithMemoHistory-vue2.0',
      children: (
        <div>
          <a
            target="_blank"
            rel="noreferrer"
            href="https://github.com/umijs/qiankun/issues/1942"
          >
            使用MicroAppWithMemoHistory加载vue2子应用无效
          </a>
        </div>
      ),
    },
    {
      key: '3',
      label: 'MicroAppWithMemoHistory-vite-project',
      children: (
        <div>
          使用 MicroAppWithMemoHistory 引入，地址栏不会发生变化
          <MicroAppWithMemoHistory
            key={'MicroAppWithMemoHistory--vite-project---1'}
            // base={'/react1'}
            url={'/vite-project/access'}
            name="vite-project"
            autoSetLoading
            masterHistory={H}
            memoryHistory
          />
        </div>
      ),
    },
  ];
  const [o, sO] = useState(false);
  const [open, setOpen] = useState(false);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };
  return (
    // <PageContainer ghost>
    <div className={styles.container}>
      <div style={{ position: 'relative' }}>
        <Button
          style={{
            zIndex: 11,
          }}
          type="primary"
          onClick={showModal}
        >
          Open Modal
        </Button>
        <Modal
          title="Basic Modal"
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
          width={800}
        >
          <div>Modal content</div>
          <Button
            onClick={() => {
              sO(!o);
            }}
            style={{ zIndex: 111, position: 'relative' }}
          >
            show MicroAppWithMemoHistory{' '}
          </Button>
          <div>
            {o && (
              <MicroAppWithMemoHistory
                key={'MicroAppWithMemoHistory-react12---Modal'}
                base={'/react1'}
                url={'/react1/home'}
                name="react1"
                autoSetLoading
                masterHistory={H}
              />
            )}
          </div>
        </Modal>
        <Button onClick={showDrawer}>showDrawer</Button>
        <Drawer width={800} title="Basic Drawer" onClose={onClose} open={open}>
          <MicroAppWithMemoHistory
            key={'MicroAppWithMemoHistory-react13---Modal'}
            base={'/react1'}
            url={'/react1/table'}
            name="react1"
            autoSetLoading
            masterHistory={H}
          />
        </Drawer>

        <Tabs
          tabBarStyle={{
            zIndex: 11,
          }}
          defaultActiveKey="1"
          items={items}
        />
      </div>
      <Guide name={trim(name)} />
    </div>
    // </PageContainer>
  );
};

export default HomePage;
