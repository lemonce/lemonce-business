import Home from './view/Home';
import Confirm from './view/Confirm';
import Account from './view/Account';
import Setting from './view/Setting';
import Manage from './view/Manage';
import Register from './view/Register';

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

