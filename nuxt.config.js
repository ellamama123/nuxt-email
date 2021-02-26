export default {
    mode: 'spa',
    /*
     ** Headers of the page
     */
    head: {
        title: 'Manage Email',
        meta: [
            { charset: 'utf-8' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1' },
            { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
        ],
        link: [
            { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
        ]
    },
    /*
     ** Customize the progress-bar color
     */
    loading: { color: '#fff' },
    /*
     ** Global CSS
     */
    css: [
        { src: '~/assets/scss/style.scss', lang: 'scss' }
    ],

    styleResources: {
        scss: [
            '~/assets/scss/_variables.scss',
            '~/assets/scss/_mixins.scss'
        ],
    },
    /*
     ** Plugins to load before mounting the App
     */
    plugins: [
        { src: '~/plugins/coreui' }
    ],
    /*
     ** Nuxt.js dev-modules
     */
    buildModules: [
        // Doc: https://github.com/nuxt-community/eslint-module
    ],
    /*
     ** Nuxt.js modules
     */

    modules: ['@nuxtjs/auth', '@nuxtjs/axios'],
    axios: {
        // API đến server Laravel (nói sau)
        baseURL: 'http://127.0.0.1:8000/api/'
    },
    auth: {
        redirect: {
            callback: '/dashboard' //sau khi login sẽ chuyển hướng về đây
        },
        strategies: {
            local: {
                endpoints: {
                    // các đường dẫn đến API
                    // propertyName: kết quả từ API trả về, nhớ xem kết quả để đặt key cho đúng
                    login: { url: '/login', method: 'post', propertyName: 'meta.token' },
                    user: { url: '/user', method: 'post', propertyName: 'data' },
                    logout: false,
                }
            },
            facebook: {
                client_id: '872294982929508',
                userinfo_endpoint: false,
                scope: ['public_profile', 'email'],
                redirect_uri:'http://localhost:3000/'
              },

            google: {
                client_id: '1038999090260-j6vqc9ocqqelsaop901obbcdfd7n4h6q.apps.googleusercontent.com'
            },
        }
    },
    //dùng cái này để sử dụng middleware xác thực người dùng cho mọi route, tương tự middleware trong Laravel
    router: {
        middleware: ['auth']
    },

}