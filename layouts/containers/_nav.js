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
            route: '/management/TemplateMail',
            to: '/management/TemplateMail'
        },
        {
            _name: 'CSidebarNavItem',
            name: 'Quản lý lịch sử gửi mail',
            route: '/management/HistoryMail',
            to: '/management/HistoryMail'
        },
        {
            _name: 'CSidebarNavItem',
            name: 'Quản lý ứng viên',
            route: '/management/Candidate',
            to: '/management/Candidate'
        },
        {
            _name: 'CSidebarNavTitle',
            _children: ['Components']
        },
        {
            _name: 'CSidebarNavDropdown',
            name: 'Buttons',
            route: '/buttons',
            icon: 'cil-cursor',
            items: [{
                    name: 'Buttons',
                    to: '/buttons/standard-buttons',
                    icon: 'cil-cursor'
                },
                {
                    name: 'Button Dropdowns',
                    to: '/buttons/dropdowns',
                    icon: 'cil-cursor'
                },
                {
                    name: 'Button Groups',
                    to: '/buttons/button-groups',
                    icon: 'cil-cursor'
                },
                {
                    name: 'Brand Buttons',
                    to: '/buttons/brand-buttons',
                    icon: 'cil-cursor'
                }
            ]
        },
        {
            _name: 'CSidebarNavDropdown',
            name: 'Icons',
            route: '/icons',
            icon: 'cil-star',
            items: [{
                    name: 'CoreUI Icons',
                    to: '/icons/coreui-icons',
                    icon: 'cil-star',
                    badge: {
                        color: 'info',
                        text: 'NEW'
                    }
                },
                {
                    name: 'Brands',
                    to: '/icons/brands',
                    icon: 'cil-star'
                },
                {
                    name: 'Flags',
                    to: '/icons/flags',
                    icon: 'cil-star'
                }
            ]
        },
        {
            _name: 'CSidebarNavDropdown',
            name: 'Notifications',
            route: '/notifications',
            icon: 'cil-bell',
            items: [{
                    name: 'Alerts',
                    to: '/notifications/alerts',
                    icon: 'cil-bell'
                },
                {
                    name: 'Badges',
                    to: '/notifications/badges',
                    icon: 'cil-bell'
                },
                {
                    name: 'Modals',
                    to: '/notifications/modals',
                    icon: 'cil-bell'
                }
            ]
        },
        {
            _name: 'CSidebarNavItem',
            name: 'Widgets',
            to: '/widgets',
            icon: 'cil-calculator',
            badge: {
                color: 'primary',
                text: 'NEW',
                shape: 'pill'
            }
        },
        {
            _name: 'CSidebarNavDivider',
            _class: 'm-2'
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
        },
        {
            _name: 'CSidebarNavItem',
            name: 'Download CoreUI',
            href: 'http://coreui.io/vue/',
            icon: { name: 'cil-cloud-download', class: 'text-white' },
            _class: 'bg-success text-white',
            target: '_blank'
        },
        {
            _name: 'CSidebarNavItem',
            name: 'Try CoreUI PRO',
            href: 'http://coreui.io/pro/vue/',
            icon: { name: 'cil-layers', class: 'text-white' },
            _class: 'bg-danger text-white',
            target: '_blank'
        }
    ]
}]