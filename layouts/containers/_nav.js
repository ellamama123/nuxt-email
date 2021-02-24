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
            route: '/sendmail/MailThank',
            to: '/sendmail/MailThank',
        },
        {
            _name: 'CSidebarNavItem',
            name: 'Send Mail Intern',
            route: '/sendmail/MailInter',
            to: '/SendMail/MailInter'
        },
        {
            _name: 'CSidebarNavItem',
            name: 'Send Mail Offer',
            route: '/sendmail/MailOffer',
            to: '/SendMail/MailOffer'
        },
        {
            _name: 'CSidebarNavTitle',
            _children: ['Manage']
        },
        {
            _name: 'CSidebarNavItem',
            name: 'Manage Mail Template',
            route: '/templatemail/',
            to: '/TemplateMail/'
        },
        {
            _name: 'CSidebarNavItem',
            name: 'Manage Mail History',
            route: '/history/',
            to: '/History/'
        },
        {
            _name: 'CSidebarNavItem',
            name: 'Manage Candidate',
            route: '/candidate/',
            to: '/Candidate/'
        },
    ]
}]