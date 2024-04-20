import Guide from '@/components/Guide';
import { trim } from '@/utils/format';
import { useModel } from '@umijs/max';
import styles from './index.less';

const HomePage: React.FC = () => {
  const { name } = useModel('global');
  const masterProps = useModel('@@qiankunStateFromMaster');
  console.log(masterProps);

  return (
    // <PageContainer ghost>
    <div className={styles.container}>
      <Guide name={trim(name)} />
    </div>
    // {/* </PageContainer> */}
  );
};

export default HomePage;
