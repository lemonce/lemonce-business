import Account from './view/Account';
import Confirm from './view/Confirm';
import ErrorPage from './view/ErrorPage';
import Home from './view/Home';
import Manage from './view/Manage';
import Register from './view/Register';
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
		path: '/error',
		component: ErrorPage
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
				path: 'manage',
				component: Manage
			}
		]
	}
];

