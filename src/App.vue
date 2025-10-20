<template>
    <header class="container">
        <Landing v-if="components.Landing" :client="client" :Sdk="Sdk" :nodetype="nodetype" :qr_scan="qr_scan" @clear="clearScan"></Landing>
    </header>

    <main>
        <Viewer v-if="components.Viewer" :client="client" :Sdk="Sdk" :nodetype="nodetype"></Viewer>
    </main>

    <footer  v-if="!isLoading && $store.getters.getScore >= 3" class="container bg-black footer fixed-bottom start-50 translate-middle-x text-center">
        <button @click="selectDestination" class="btn btn-default mt-2 mb-4" role="button" id="open-sign">
            <img src="/scan-touch-icon.png" class="border border-0 rounded-3" alt="open sign" width="55" />
        </button>
    </footer>
</template>

<script>
    import Refs from './components/Refs.vue'
    import Landing from './components/Landing.vue'
    import Viewer from './components/Viewer.vue'

    import { XrplClient } from 'xrpl-client'

    const xapp = window.xAppSdk

    import { XummSdkJwt } from 'xumm-sdk'

    export default {
        components: {
            Landing,
            Viewer,
            Refs
        },
        data() {
            return {
                Sdk: new XummSdkJwt(import.meta.env.VITE_APP_KEY),
                nodetype: 'TESTNET',
                pong: false,
                ready: false,
                components: {
                    Landing: false,
                    Viewer: false
                },
                client: null,
                signedIn: false,
                isLoading: true,
                qr_scan: undefined
            }
        },
        async mounted() {
            // this.$store.dispatch('setTestScore', 1) //force test
            console.log('starting...')
            if (this.components.Landing) { return }
            await this.jwtFlow()
            this.components.Landing = true
            this.isLoading = false
            // await this.xAppListeners()
        },
        methods: {
            async jwtFlow() {
                const tokenData = await this.Sdk.getOttData()
                console.log('tokenData', tokenData)
                console.log('locale', tokenData.locale)
                this.$store.dispatch('setLocale', tokenData.locale)
                this.$root.$i18n.locale = tokenData.locale
                this.$store.dispatch('xummTokenData', tokenData)
                console.log('account', tokenData.account)
                this.$store.dispatch('setAccount', tokenData.account)
                this.nodetype = tokenData.nodetype

                const servers = [tokenData.nodewss]
                if (tokenData.nodetype == 'MAINNET') {
                    servers.unshift('wss://xrpl.panicbot.app')
                }
                console.log('wss servers', servers)
                
                this.client = new XrplClient(servers)

                const callback = async (event) => {
                    let request = {
                        'id': 'xrpl-local',
                        'command': 'ledger',
                        'ledger_hash': event.ledger_hash,
                        'ledger_index': 'validated',
                        'transactions': true,
                        'expand': true,
                        'owner_funds': true
                    }
    
                    const ledger_result = await this.client.send(request)
                    if ('error' in ledger_result) {
                        console.log('XRPL error', ledger_result)
                    }
                    
                    if ('ledger' in ledger_result) {
                        // console.log('ledger', ledger_result)
                        this.$store.dispatch('setLedger', ledger_result.ledger.ledger_index)
                    }
                }
                this.client.on('ledger', callback)
            },
            // async jwtSignIn() {
            //     const self = this
            //     const request  = { txjson: { TransactionType: 'SignIn' }}
            //     // const subscription = await this.Sdk.payload.create(request)

            //     const subscription = await this.Sdk.payload.createAndSubscribe(request, async event => {
            //         console.log('New payload event:', event.data)

            //         if (event.data.signed === true) {
            //             console.log('Woohoo! The sign request was signed :)')
            //             self.signedIn = true
            //             self.$store.dispatch('setUserToken', event.data.payload_uuidv4)
            //             // await self.getStoreage()
            //             return event.data
            //         }

            //         if (event.data.signed === false) {
            //             console.log('The sign request was rejected :(')
            //             xapp.close({ refreshEvents: true })
            //                 .then(d => {
            //                     // d (returned value) can be Error or return data:
            //                     console.log('close response:', d instanceof Error ? d.message : d)
            //                 })
            //                 .catch(e => console.log('Error:', e.message))
            //             return false
            //         }
            //     })
            //     console.log('subscription', subscription)

            //     xapp.openSignRequest({ uuid: subscription.created.uuid })
            //         .then(d => {
            //             // d (returned value) can be Error or return data:
            //             console.log('openSignRequest response:', d instanceof Error ? d.message : d)
            //         })
            //         .catch(e => console.log('Error:', e.message))
            // },

            selectDestination() {
                const self = this
                xapp.selectDestination({ ignoreDestinationTag: false })
                xapp.on('destination', data => {
                    console.log('Destination', data.destination)
                    
                    if (data.destination?.address !== undefined) {
                        console.log('address', data.destination.address)
                        self.qr_scan = data.destination?.address
                    }
                })
            },

            // async xAppListeners() {
            //     const self = this
            //     xapp.on('qr', async function (data) {                    
            //         console.log('QR scanned / cancelled', data)
            //         console.log('SCANNED A QR CODE')
            //         console.log('qrContents', data?.qrContents)
            //         self.qr_scan = data?.qrContents
            //     })
            // },
            // async openScan() {
            //     xapp.scanQr()
            //         .then(d => {
            //             console.log('scanQr response:', d instanceof Error ? d.message : d)
            //         })
            //         .catch(e => console.log('Error:', e.message))
            // },
            clearScan() {
                console.log('clear scan')
                this.qr_scan = undefined
            }
        }
    }
</script>