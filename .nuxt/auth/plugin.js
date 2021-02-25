import Auth from './auth'

import './middleware'

// Active schemes
import scheme_3e2123be from './schemes/local.js'
import scheme_6ce4fcca from './schemes/oauth2.js'

export default function(ctx, inject) {
    // Options
    const options = { "resetOnError": false, "scopeKey": "scope", "rewriteRedirects": true, "fullPathRedirect": false, "watchLoggedIn": true, "redirect": { "login": "/login", "logout": "/", "home": "/", "callback": "/dashboard" }, "vuex": { "namespace": "auth" }, "cookie": { "prefix": "auth.", "options": { "path": "/" } }, "localStorage": { "prefix": "auth." }, "token": { "prefix": "_token." }, "refresh_token": { "prefix": "_refresh_token." }, "defaultStrategy": "local" }

    // Create a new Auth instance
    const $auth = new Auth(ctx, options)

    // Register strategies
    // local
    $auth.registerStrategy('local', new scheme_3e2123be($auth, { "endpoints": { "login": { "url": "/login", "method": "post", "propertyName": "meta.token" }, "logout": false, "user": { "url": "/user", "method": "post", "propertyName": "data" } }, "_name": "local" }))

    // facebook
    $auth.registerStrategy('facebook', new scheme_6ce4fcca($auth, { "endpoints": { "userInfo": "https://graph.facebook.com/v10.0/me?fields=id,name,picture{url}" }, "clientId": "2548093105485263", "scope": ["public_profile", "email"], "_name": "facebook", "authorization_endpoint": "https://facebook.com/v2.12/dialog/oauth", "userinfo_endpoint": "https://graph.facebook.com/v2.12/me?fields=about,name,picture{url},email" }))


    // google
    $auth.registerStrategy('google', new scheme_6ce4fcca($auth, { "client_id": "1038999090260-j6vqc9ocqqelsaop901obbcdfd7n4h6q.apps.googleusercontent.com", "_name": "google", "authorization_endpoint": "https://accounts.google.com/o/oauth2/auth", "userinfo_endpoint": "https://www.googleapis.com/oauth2/v3/userinfo", "scope": ["openid", "profile", "email"] }))

    // Inject it to nuxt context as $auth
    inject('auth', $auth)
    ctx.$auth = $auth

    // Initialize auth
    return $auth.init().catch(error => {
        if (process.client) {
            console.error('[ERROR] [AUTH]', error)
        }
    })
}