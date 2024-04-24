import Guide from '@/components/Guide';
import { trim } from '@/utils/format';
import { useModel } from '@umijs/max';
import styles from './index.less';

const HomePage: React.FC = () => {
  const { name } = useModel('global');
  return (
    // <PageContainer ghost>
    <div className={styles.container}>
      {/* <MicroApp
        key={'vue-admin-template'}
        name={'vue-admin-template'}
        // base={'/vue-admin-template'}
        url={'/vue-admin-template/#example/tree'}
        autoSetLoading
      /> */}
      <Guide name={trim(name)} />
    </div>
    // </PageContainer>
  );
};

export default HomePage;
