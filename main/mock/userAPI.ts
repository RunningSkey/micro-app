const users = [
  { id: 0, name: 'Umi', nickName: 'U', gender: 'MALE' },
  { id: 1, name: 'Fish', nickName: 'B', gender: 'FEMALE' },
];

const getResultRoutes = (name: string) => {
  return [
    {
      name: 'app1_home',
      path: '/app1/home',
    },
    {
      name: 'app1_access',
      path: '/app1/access',
    },
    {
      name: 'app1_table',
      path: '/app1/table',
    },
    {
      name: '多层级',
      path: '/app1/demo',
      children: [
        {
          name: ' CRUD 示例',
          path: '/app1/demo/table',
        },
      ],
    },
  ].filter((item) => {
    if (name === 'admin') {
      return item;
    }
    return !(item.path === '/app1/access');
  });
};

export default {
  'GET /api/v1/queryUserList': (req: any, res: any) => {
    res.json({
      success: true,
      data: { list: users },
      errorCode: 0,
    });
  },
  'PUT /api/v1/user/': (req: any, res: any) => {
    res.json({
      success: true,
      errorCode: 0,
    });
  },
  'POST /api/v1/login': (req: any, res: any) => {
    const { name, password } = req.body;
    const isSuccess =
      (name === 'admin' && password === 'ant.design') ||
      (name === 'user' && password === 'ant.design');
    res.json({
      success: isSuccess,
      errorMessage: isSuccess ? '' : '登录失败',
      data: {
        name,
        token: '12345',
        routes: getResultRoutes(name),
      },
      errorCode: 0,
    });
  },
  'GET /api/v1/userInfo': (req: any, res: any) => {
    const { token, name } = req.query;
    const isSuccess = token === '12345';
    res.json({
      success: isSuccess,
      errorMessage: isSuccess ? '' : '获取用户信息失败',
      data: {
        name,
        token,
        routes: getResultRoutes(name),
      },
      errorCode: 0,
    });
  },
};
