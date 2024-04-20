export function getURLParameters() {
  // 获取完整的地址栏 URL
  const urlString = window.location.href;

  // 获取问号后面的参数部分
  const queryString = urlString.split('?')[1];

  // 如果没有参数，返回一个空对象
  if (!queryString) {
    return {};
  }

  // 将参数字符串拆分成参数键值对
  const parameters: Record<string, string> = {};
  const pairs = queryString.split('&');
  for (let i = 0; i < pairs.length; i++) {
    const pair = pairs[i].split('=');
    const key = decodeURIComponent(pair[0]);
    const value = decodeURIComponent(pair[1] || '');
    parameters[key] = value;
  }

  return parameters;
}
