const items = [
    { username: 'Samppa Nori', registered: { date: '2012/01/01', timestamp: 1325376000000 }, role: 'Member', status: 'Active' },
    { username: 'Estavan Lykos', registered: { date: '2012/02/01', timestamp: 1328054400000 }, role: 'Staff', status: 'Banned' },
    { username: 'Chetan Mohamed', registered: { date: '2012/02/01', timestamp: 1328054400000 }, role: 'Admin', status: 'Inactive' },
    { username: 'Derick Maximinus', registered: { date: '2012/03/01', timestamp: 1330560000000 }, role: 'Member', status: 'Pending' },
    { username: 'Friderik Dávid', registered: { date: '2012/01/21', timestamp: 1327104000000 }, role: 'Staff', status: 'Active' }
]

const fields = [
    'username',
    { key: 'registeredTimestamp', label: 'Registered' },
    'role',
    'status'
]

export default {
    name: 'itemsComputationTable',
    data() {
        return {
            fields,
            startDate: 1325376000000,
            endDate: 1330560000000
        }
    },
    computed: {
        computedItems() {
            return items.map((item) => {
                return {
                    ...item,
                    registeredTimestamp: item.registered.timestamp,
                    registeredDate: item.registered.date
                }
            })
        },
        dateFilteredItems() {
            return this.computedItems.filter((item) => {
                const date = item.registeredTimestamp
                return date >= this.startDate && date <= this.endDate
            })
        }
    },
    methods: {
        setDateFilter(e, end) {
            if (end) {
                this.endDate = new Date(e.target.value).getTime()
            } else {
                this.startDate = new Date(e.target.value).getTime()
            }
        }
    }

}