'use strict'
 /* eslint-disable */ 
export const AppStore = {
    state: () => ({
        version: '0.0.1',
        xumm: {
            tokenData: null
        },
        account: '',
        user_token: '',
        ledger: 0,
        locale: 'en',
        score: 0
    }),
    actions: {
        xummTokenData({commit}, data) {
            commit('TOKEN_DATA', data)
        },
        setUserToken({commit}, user_token) {
            commit('USER_TOKEN', user_token)
        },
        setAccount({commit}, account) {
            commit('ACCOUNT', account)
        },
        setLedger({commit}, ledger) {
            commit('LEDGER', ledger)
        },
        setLocale({commit}, locale) {
            commit('LOCALE', locale)
        },
        setTestScore({commit}, score) {
            commit('SCORE', score)
        }
    },
    mutations: {
        TOKEN_DATA(state, data) {
            state.xumm.tokenData = data
        },
        ACCOUNT(state, account) {
            state.account = account
        },
        USER_TOKEN(state, user_token) {
            state.user_token = user_token
        },
        LEDGER(state, ledger) {
            state.ledger = ledger
        },
        LOCALE(state, locale) {
            state.locale = locale
        },
        SCORE(state, score) {
            state.score = score
            localStorage.setItem('score', JSON.stringify(score))
        }
    },
    getters: {
        getVersion: state => {
            return state.version
        },
        getXummTokenData: state => {
            return state.xumm.tokenData
        },
        getUserToken: state => {
            return state.user_token
        },
        getAccount: state => {
            return state.account
        },
        getLedger: state => {
            return state.ledger
        },
        getLocale: state => {
            return state.locale
        },
        getScore: state => {
            if (state.score === 0 && localStorage.getItem('score')) {
                return JSON.parse(localStorage.getItem('score'))                
            }
            return state.score
        }
    }
}