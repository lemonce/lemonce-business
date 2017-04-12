import Home from './view/Home';
import Product from './view/Product';
import Account from './view/Account';
import Setting from './view/Setting';
import Manage from './view/Manage';
import Register from './view/Register';

export default [
    {
        path: '/',
        component: Home
    },
    // {
    //     path: '/product',
    //     component: Product
    // },
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
]

