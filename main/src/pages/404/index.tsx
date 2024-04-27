import { history } from '@umijs/max';
import { Button, Result } from 'antd';

export default () => {
  return (
    <Result
      status="404"
      title="404"
      subTitle="页面不存在"
      extra={
        <Button
          type="primary"
          onClick={() => {
            history.push('/home');
          }}
        >
          回到首页
        </Button>
      }
    />
  );
};
