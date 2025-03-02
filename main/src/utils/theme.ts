let styleEl: HTMLStyleElement;
export const initTheme = (colorPrimary: string) => {
  const styles = `
  a{color:${colorPrimary} !important} 
  .ant-pro-table .ant-pro-table-list-toolbar-setting-item:hover{color:${colorPrimary}}
  .ant-pro-table-column-setting-overlay .ant-pro-table-column-setting-list-item-option >span >span.anticon{color:${colorPrimary}}
  `;
  if (styleEl) {
    styleEl.innerHTML = styles;
    return;
  }
  styleEl = document.createElement('style');
  styleEl.setAttribute('id', 'theme-config');
  styleEl.innerHTML = styles;
  document.head.appendChild(styleEl);
};
