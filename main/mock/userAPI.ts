import routes from '../config/routes';
const users = [
  { id: 0, name: 'Umi', nickName: 'U', gender: 'MALE' },
  { id: 1, name: 'Fish', nickName: 'B', gender: 'FEMALE' },
];

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
      errorMessage: '登录失败',
      data: {
        name,
        token: '12345',
        routes,
      },
      errorCode: 0,
    });
  },
};
