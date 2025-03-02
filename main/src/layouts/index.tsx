import { Route } from '@/serviceMicro';
import { initTheme } from '@/utils/theme';
import {
  DoubleRightOutlined,
  GithubFilled,
  InfoCircleFilled,
  LogoutOutlined,
  PlusCircleFilled,
  QuestionCircleFilled,
  RedoOutlined,
  SearchOutlined,
} from '@ant-design/icons';
import {
  ProConfigProvider,
  ProLayout,
  SettingDrawer,
} from '@ant-design/pro-components';
import { Outlet, history, useLocation, useModel } from '@umijs/max';
import {
  Button,
  Col,
  ConfigProvider,
  Dropdown,
  Input,
  Result,
  Row,
  theme,
} from 'antd';
import React, { useEffect, useMemo } from 'react';
import routes from '../../config/routes';

const Item: React.FC<{ children: React.ReactNode }> = (props) => {
  return (
    <div>
      {props.children}
      <DoubleRightOutlined
        style={{
          marginInlineStart: 4,
        }}
      />
    </div>
  );
};

const List: React.FC<{ title: string; style?: React.CSSProperties }> = (
  props,
) => {
  const { token } = theme.useToken();

  return (
    <div
      style={{
        width: '100%',
        ...props.style,
      }}
    >
      <div
        style={{
          fontSize: 16,
          color: token.colorTextHeading,
          lineHeight: '24px',
          fontWeight: 500,
          marginBlockEnd: 16,
        }}
      >
        {props.title}
      </div>
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
        }}
      >
        {new Array(6).fill(1).map((_, index) => {
          return <Item key={index}>具体的解决方案-{index}</Item>;
        })}
      </div>
    </div>
  );
};

const MenuCard = () => {
  const { token } = theme.useToken();
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
      }}
    >
      {/* <Divider
        style={{
          height: '1.5em',
        }}
        type="vertical"
      />
      <Popover
        placement="bottom"
        overlayStyle={{
          width: 'calc(100vw - 24px)',
          padding: '24px',
          paddingTop: 8,
          height: '307px',
          borderRadius: '0 0 6px 6px',
        }}
        content={
          <div style={{ display: 'flex', padding: '32px 40px' }}>
            <div style={{ flex: 1 }}>
              <List title="金融解决方案" />
              <List
                title="其他解决方案"
                style={{
                  marginBlockStart: 32,
                }}
              />
            </div>

            <div
              style={{
                width: '308px',
                borderInlineStart: '1px solid ' + token.colorBorder,
                paddingInlineStart: 16,
              }}
            >
              <div>热门产品</div>
              {new Array(3).fill(1).map((name, index) => {
                return (
                  <div key={index}>
                    <img src="https://gw.alipayobjects.com/zos/antfincdn/6FTGmLLmN/bianzu%25252013.svg" />
                    <div
                      style={{
                        marginInlineStart: 14,
                      }}
                    >
                      <div>Ant Design</div>
                      <div>杭州市较知名的 UI 设计语言</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        }
      >
        <div
          style={{
            color: token.colorTextHeading,
            fontWeight: 500,
            cursor: 'pointer',
            display: 'flex',
            gap: 4,
            paddingInlineStart: 8,
            paddingInlineEnd: 12,
            alignItems: 'center',
          }}
        >
          <span> 企业级资产中心</span>
          <CaretDownFilled />
        </div>
      </Popover> */}
    </div>
  );
};

const SearchInput = () => {
  const { token } = theme.useToken();
  return (
    <div
      key="SearchOutlined"
      aria-hidden
      style={{
        display: 'flex',
        alignItems: 'center',
        marginInlineEnd: 24,
      }}
      onMouseDown={(e) => {
        e.stopPropagation();
        e.preventDefault();
      }}
    >
      <Input
        style={{
          borderRadius: 4,
          marginInlineEnd: 12,
          backgroundColor: token.colorBgTextHover,
        }}
        prefix={
          <SearchOutlined
            style={{
              color: token.colorTextLightSolid,
            }}
          />
        }
        placeholder="搜索方案"
        variant="borderless"
      />
      <PlusCircleFilled
        style={{
          color: token.colorPrimary,
          fontSize: 24,
        }}
      />
    </div>
  );
};

export default () => {
  const { initialState, setInitialState } = useModel('@@initialState');
  const { pathname } = useLocation();
  const { settings, name } = initialState;

  const colorPrimary = settings?.colorPrimary;

  const allRoutes = useMemo(() => {
    const apps = JSON.parse(localStorage.getItem('MICRO_APPS')) || [];
    const r = routes.concat(...apps.map((i) => i.routes));
    if (name !== 'admin') {
      return r.filter((i) => i.name !== 'react-root(admin微应用)');
    }
    return r;
  }, [routes, name]);

  console.log(allRoutes, 'allRoutes', routes);

  const hasAuthRoute = useMemo(() => {
    let auth = false;
    const find = (listRoutes: Route[]) => {
      listRoutes.forEach((item) => {
        if (item.path === pathname) {
          auth = true;
        } else if (item.routes) {
          find(item.routes);
        }
      });
    };
    find(allRoutes);
    return auth;
  }, [pathname, allRoutes]);

  console.log(hasAuthRoute);

  useEffect(() => {
    if (colorPrimary) {
      initTheme(colorPrimary);
    }
  }, [colorPrimary]);

  return (
    <div
      id="workbench-container"
      style={{
        height: '100vh',
        overflow: 'auto',
      }}
    >
      <ProConfigProvider
        // token={{
        //   colorLink: settings?.colorPrimary,
        //   colorPrimary: settings?.colorPrimary,

        // }}

        hashed={false}
      >
        <ConfigProvider
          getTargetContainer={() => {
            return (
              document.getElementById('workbench-container') || document.body
            );
          }}
          theme={
            settings
              ? {
                  token: {
                    colorLink: settings?.colorPrimary,
                    colorPrimary: settings?.colorPrimary,
                  },
                }
              : undefined
          }
        >
          <Row>
            <Col span={24}>
              <ProLayout
                route={{
                  routes: allRoutes,
                  path: '/',
                }}
                location={{
                  pathname,
                }}
                contentStyle={{
                  height: `calc(100vh - 56px)`,
                  background: `#f5f5f5`,
                  overflowY: 'auto',
                  padding: `16px`,
                }}
                token={{
                  // header: {
                  //   // 菜单选中颜色
                  //   colorBgMenuItemSelected: token.colorPrimary,
                  //   colorBgMenuItemCollapsedElevated: settings?.colorPrimary,
                  // },
                  sider: {
                    colorMenuBackground: settings?.colorPrimary + ' !important',
                    // colorBgMenuItemCollapsedElevated: settings?.colorPrimary,
                    colorTextMenu: '#fff',
                    colorTextMenuSelected: '#fff',
                    colorTextMenuItemHover: '#fff',
                    colorBgMenuItemHover: 'rgba(255, 255, 255, 0.08)',
                    colorBgMenuItemActive: 'rgba(255, 255, 255, 0.2)',
                    colorBgMenuItemSelected: 'rgba(255, 255, 255, 0.2)',
                    colorTextSubMenuSelected: 'rgba(255, 255, 255, 0.2)',
                    // paddingBlockLayoutMenu: 0,
                    paddingInlineLayoutMenu: 0,
                  },
                  pageContainer: {
                    paddingInlinePageContainerContent: 0,
                  },
                }}
                // siderMenuType="group"
                menu={{
                  collapsedShowGroupTitle: true,
                }}
                avatarProps={{
                  src: 'https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg',
                  size: 'small',
                  title: initialState?.name,
                  render: (props, dom) => {
                    return (
                      <Dropdown
                        menu={{
                          items: [
                            {
                              key: 'clear',
                              icon: <RedoOutlined />,
                              label: '清空缓存',
                              onClick() {
                                window.localStorage.clear();
                                history.push('/login');
                                window.location.reload();
                                // localStorage.removeItem('initialState');
                              },
                            },
                            {
                              key: 'logout',
                              icon: <LogoutOutlined />,
                              label: '退出登录',
                              onClick() {
                                history.push('/login');
                                // localStorage.removeItem('initialState');
                              },
                            },
                          ],
                        }}
                      >
                        {dom}
                      </Dropdown>
                    );
                  },
                }}
                actionsRender={(props) => {
                  if (props.isMobile) return [];
                  if (typeof window === 'undefined') return [];
                  return [
                    props.layout !== 'side' &&
                    document.body.clientWidth > 1400 ? (
                      <SearchInput />
                    ) : undefined,
                    <InfoCircleFilled key="InfoCircleFilled" />,
                    <QuestionCircleFilled key="QuestionCircleFilled" />,
                    <GithubFilled key="GithubFilled" />,
                  ];
                }}
                headerTitleRender={(logo, title, _) => {
                  const defaultDom = (
                    <a>
                      {logo}
                      {title}
                    </a>
                  );
                  if (typeof window === 'undefined') return defaultDom;
                  if (document.body.clientWidth < 1400) {
                    return defaultDom;
                  }
                  if (_.isMobile) return defaultDom;
                  return (
                    <>
                      {defaultDom}
                      <MenuCard />
                    </>
                  );
                }}
                // menuFooterRender={(props) => {
                //   if (props?.collapsed) return undefined;
                //   return (
                //     <div
                //       style={{
                //         textAlign: 'center',
                //         paddingBlockStart: 12,
                //       }}
                //     >
                //       <div>© 2021 Made with love</div>
                //       <div>by Ant Design</div>
                //     </div>
                //   );
                // }}
                onMenuHeaderClick={(e) => console.log(e)}
                menuItemRender={(item, dom) => (
                  <div
                    onClick={() => {
                      history.push(item.path!);
                    }}
                  >
                    {dom}
                  </div>
                )}
                {...settings}
              >
                <>
                  {hasAuthRoute ? (
                    <Outlet />
                  ) : (
                    <Result
                      status="403"
                      title="403"
                      subTitle="页面暂无权限"
                      style={{
                        background: '#fff',
                        height: '100%',
                      }}
                      extra={
                        <Button
                          type="primary"
                          onClick={() => {
                            history.push('/');
                          }}
                        >
                          Back Home
                        </Button>
                      }
                    />
                  )}
                </>

                <SettingDrawer
                  themeOnly
                  settings={settings}
                  onSettingChange={(changeSetting) => {
                    // setSetting(changeSetting);
                    const val = {
                      ...initialState,
                      settings: changeSetting,
                    };
                    setInitialState(val);
                    localStorage.setItem('initialState', JSON.stringify(val));
                  }}
                  disableUrlParams={true}
                />
              </ProLayout>
            </Col>
          </Row>
        </ConfigProvider>
      </ProConfigProvider>
    </div>
  );
};
