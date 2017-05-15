import Account from './view/Account';
import Confirm from './view/Confirm';
import ErrorPage from './view/ErrorPage';
import Home from './view/Home';
import Manage from './view/Manage';
import Product from './view/Product';
import Profile from './view/Profile';
import Register from './view/Register';
import ResetPassword from './view/ResetPassword';
import Setting from './view/Setting';

export default [
	{
		path: '/',
		component: Home
	},
	{
		path: '/email',
		component: Confirm
	},
	{
		path: '/product',
		component: Product
	},
	{
		path: '/error',
		component: ErrorPage
	},
	{
		path: '/reset_password/:token',
		component: ResetPassword
	},
	{
		path: '/reset_password',
		component: ResetPassword
	},
	{
		path: '/register',
		component: Register
	},
	{
		path: '/account',
		component: Account,
		children: [
			{
				path: 'setting',
				component: Setting
			},
			{
				path: 'profile',
				component: Profile
			},
			{
				path: 'manage',
				component: Manage
			}
		]
	}
];

