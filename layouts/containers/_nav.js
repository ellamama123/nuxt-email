export default [{
    _name: 'CSidebarNav',
    _children: [{
            _name: 'CSidebarNavItem',
            name: 'Dashboard',
            to: '/dashboard',
            icon: 'cil-speedometer',
            badge: {
                color: 'primary'
            },
        },

        {
            _name: 'CSidebarNavTitle',
            _children: ['Send Mail']
        },
        {
            _name: 'CSidebarNavItem',
            name: 'Send Thank Mail',
            route: '/sendmail/mailthank',
            to: '/sendmail/mailthank'
        },
        {
            _name: 'CSidebarNavItem',
            name: 'Send Mail Intern',
            route: '/sendmail/MailInter',
            to: '/sendmail/MailInter'
        },
        {
            _name: 'CSidebarNavItem',
            name: 'Send Mail Offer',
            route: '/sendmail/MailOffer',
            to: '/sendmail/MailOffer'
        },
        {
            _name: 'CSidebarNavTitle',
            _children: ['Manage']
        },
        {
            _name: 'CSidebarNavItem',
            name: 'Manage Mail Template',
            route: '/templatemail/',
            to: '/templatemail/'
        },
        {
            _name: 'CSidebarNavItem',
            name: 'Manage Mail History',
            route: '/history/',
            to: '/history/'
        },
        {
            _name: 'CSidebarNavItem',
            name: 'Manage Candidate',
            route: '/candidate/',
            to: '/candidate/'
        },
    ]
}]