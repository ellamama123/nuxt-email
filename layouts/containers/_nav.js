import { cilPencil, cilTrash, cilSearch } from "@coreui/icons";
export default [{
    cilPencil: cilPencil,
    _name: 'CSidebarNav',
    _children: [{
            _name: 'CSidebarNavItem',
            name: 'Dashboard',
            to: '/dashboard',
            icon: { cilPencil },
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
            to: '/sendmail/mailthank',
            meta: {
                breadcrumb: [
                    { name: 'Area 1' }
                ]
            }
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