export default [{
    _name: 'CSidebarNav',
    _children: [{
            _name: 'CSidebarNavItem',
            name: 'Dashboard',
            to: '/dashboard',
            icon: 'cil-speedometer',
            badge: {
                color: 'primary'
            }
        },

        {
            _name: 'CSidebarNavTitle',
            _children: ['Send Mail']
        },
        {
            _name: 'CSidebarNavItem',
            name: 'Gửi mail cảm ơn',
            route: '/sendmail/mailthank',
            to: '/sendmail/mailthank'
        },
        {
            _name: 'CSidebarNavItem',
            name: 'Gửi mail phỏng vấn',
            route: '/sendmail/MailInter',
            to: '/sendmail/MailInter'
        },
        {
            _name: 'CSidebarNavItem',
            name: 'Gửi mail nhận việc',
            route: '/sendmail/MailOffer',
            to: '/sendmail/MailOffer'
        },
        {
            _name: 'CSidebarNavTitle',
            _children: ['Quản lý']
        },
        {
            _name: 'CSidebarNavItem',
            name: 'Quản lý Template mail',
            route: '/management/templatemail/',
            to: '/management/templatemail/'
        },
        {
            _name: 'CSidebarNavItem',
            name: 'Quản lý lịch sử gửi mail',
            route: '/management/history/',
            to: '/management/history/'
        },
        {
            _name: 'CSidebarNavItem',
            name: 'Quản lý ứng viên',
            route: '/management/candidate/',
            to: '/management/candidate/'
        },
        {
            _name: 'CSidebarNavTitle',
            _children: ['Components']
        },

        {
            _name: 'CSidebarNavTitle',
            _children: ['Extras']
        },
        {
            _name: 'CSidebarNavDropdown',
            name: 'Pages',
            route: '/pages',
            icon: 'cil-star',
            items: [{
                    name: 'Login',
                    to: '/pages/login',
                    icon: 'cil-star'
                },
                {
                    name: 'Register',
                    to: '/pages/register',
                    icon: 'cil-star'
                },
                {
                    name: 'Error 404',
                    to: '/pages/404',
                    icon: 'cil-star'
                },
                {
                    name: 'Error 500',
                    to: '/pages/500',
                    icon: 'cil-star'
                }
            ]
        }
    ]
}]