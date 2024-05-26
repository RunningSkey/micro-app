import { history, useModel } from '@umijs/max';
const useHistoryFromMaster = () => {
  const masterProps = useModel('@@qiankunStateFromMaster');
  return {
    push(url: string) {
      if (masterProps) {
        masterProps?.masterHistory.push((masterProps?.base || '') + url);
        return;
      }
      history.push(url);
    },
    pushMaster(url: string) {
      masterProps?.masterHistory.push(url);
    },
    pushSlave(url: string, slaveName: string) {
      masterProps?.masterHistory.push('/' + slaveName + url);
    },
  };
};

export default useHistoryFromMaster;
