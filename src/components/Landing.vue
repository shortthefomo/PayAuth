<template>
    <div v-if="challenge" class="p-5 mb-4 bg-light rounded-3">
        <div class="container-fluid py-5">
            <div v-if="challenge && !failed">
                <div class="stepwizard mb-2">
                    <a href="#step-1" type="button" :class="step === 1 ? 'btn bg-green rounded-circle': 'btn btn-secondary rounded-circle'" :disabled="step === 1 ? '':'disabled'">1</a>
                    <a href="#step-2" type="button" :class="step === 2 ? 'btn bg-green rounded-circle ms-2': 'btn btn-secondary rounded-circle ms-2'" :disabled="step === 2 ? '':'disabled'">2</a>
                    <a href="#step-3" type="button" :class="step === 3 ? 'btn bg-green rounded-circle ms-2': 'btn btn-secondary rounded-circle ms-2'" :disabled="step === 3 ? '':'disabled'">3</a>
                    <a href="#step-4" type="button" :class="step === 4 ? 'btn bg-green rounded-circle ms-2': 'btn btn-secondary rounded-circle ms-2'" :disabled="step === 4 ? '':'disabled'">4</a>
                </div>

                <div v-if="step === 1" class="card">
                    <!-- img src="https://placehold.co/400" class="card-img-top" alt="..." -->
                    <div class="card-body">
                        <h5 class="card-title">{{ $t('challenge_1') }}</h5>
                        <p class="card-text" v-html="$t('challenge_body_1')"></p>
                        <ol type="A">
                            <li>{{ $t('challenge_1_ans_a') }}</li>
                            <li>{{ $t('challenge_1_ans_b') }}</li>
                            <li>{{ $t('challenge_1_ans_c') }}</li>
                        </ol>
                        <a href="#" @click="advanceStep()" class="btn btn-primary">A</a>
                        <a href="#" @click="advanceStep(true)" class="btn btn-primary ms-2">B</a>
                        <a href="#" @click="advanceStep()" class="btn btn-primary ms-2">C</a>
                    </div>
                </div>
                <div v-if="step === 2" class="card">
                    <!-- img src="https://placehold.co/400" class="card-img-top" alt="..." -->
                    <div class="card-body">
                        <h5 class="card-title">{{ $t('challenge_2') }}</h5>
                        <p class="card-text" v-html="$t('challenge_body_2')"></p>
                        <ol type="A">
                            <li>{{ $t('challenge_2_ans_a') }}</li>
                            <li>{{ $t('challenge_2_ans_b') }}</li>
                            <li>{{ $t('challenge_2_ans_c') }}</li>
                        </ol>
                        <a href="#" @click="advanceStep(true)" class="btn btn-primary">A</a>
                        <a href="#" @click="advanceStep()" class="btn btn-primary ms-2">B</a>
                        <a href="#" @click="advanceStep()" class="btn btn-primary ms-2">C</a>
                    </div>
                </div>
                <div v-if="step === 3" class="card">
                    <!-- img src="https://placehold.co/400" class="card-img-top" alt="..." -->
                    <div class="card-body">
                        <h5 class="card-title">{{ $t('challenge_3') }}</h5>
                        <p class="card-text" v-html="$t('challenge_body_3')"></p>
                        <ol type="A">
                            <li>{{ $t('challenge_3_ans_a') }}</li>
                            <li>{{ $t('challenge_3_ans_b') }}</li>
                            <li>{{ $t('challenge_3_ans_c') }}</li>
                        </ol>
                        <a href="#" @click="advanceStep()" class="btn btn-primary">A</a>
                        <a href="#" @click="advanceStep()" class="btn btn-primary ms-2">B</a>
                        <a href="#" @click="advanceStep(true)" class="btn btn-primary ms-2">C</a>
                    </div>
                </div>
                <div v-if="step === 4" class="card">
                    <!-- img src="https://placehold.co/400" class="card-img-top" alt="..." -->
                    <div class="card-body">
                        <h5 class="card-title">{{ $t('challenge_4') }}</h5>
                        <p class="card-text" v-html="$t('challenge_body_4')"></p>
                        <ol type="A">
                            <li>{{ $t('challenge_4_ans_a') }}</li>
                            <li>{{ $t('challenge_4_ans_b') }}</li>
                        </ol>
                        <a href="#" @click="advanceStep(true)" class="btn btn-primary">A</a>
                        <a href="#" @click="advanceStep()" class="btn btn-primary ms-2">B</a>
                    </div>
                </div>
            </div>
            <div v-if="failed">
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">{{ $t('fail_heading') }}</h5>
                        <p class="card-text">{{ $t('fail_body') }} <button class="btn btn-sm btn-primary" @click="failedTest()">XRPL.org</button></p>
                    </div>
                </div>
            </div>
        </div>
    </div>
            

    <div v-if="!challenge" class="p-5 mb-4 bg-light rounded-3">
        <div class="container-fluid py-5">
            <img class="bog-roll" src="/zap.jpeg">
            <div class="col-md-8 fs-4">                
                <p class="text-muted text-end fs-6"><span class="fancy-font">PayAuth</span>  by three</p>
            </div>
            <div class="col-12 fs-6 mb-5">
                <h3>{{ $t('app_title') }}</h3>
                <p v-if="depositAuth" v-html="$t('main_description')"></p><p v-if="depositAuth" v-html="$t('trouble_shoot')"></p>
                <p v-if="!depositAuth">{{ $t('not_enabled') }}</p>
            </div>

            <div v-if="alert !== undefined" class="alert alert-warning" role="alert">
                {{ alert }}
            </div>


            <div v-if="accountObjects !== null && Object.keys(accountObjects).length > 0" class="col-12 fs-6 mt-5 mb-5">
                <h5>{{ $t('list_title') }}</h5>
                
                <div v-for="account in accountObjects"> <button class="mt-2 btn btn-sm btn btn-outline-primary" @click="removeButton(account.Authorize)">{{ account.Authorize }}</button></div>
                <small>{{ $t('list_helper') }}</small>
            </div>
            <div v-if="accountObjects === null || Object.keys(accountObjects).length === 0" class="col-12 fs-6 mt-5 mb-5">
                <h5>{{ $t('list_title') }}</h5>
                <p v-if="depositAuth" class="text-danger">{{ $t('warning') }}</p>
                <p v-if="!depositAuth">{{ $t('list_information') }}</p>
            </div>

            <div class="col-12 fs-6 mb-5">
                <button :class="depositAuth ? 'btn btn-sm btn-danger':'btn btn-sm btn-primary'" @click="authEnableButton()">{{ depositAuth ? $t('main_button_dis'): $t('main_button_en') }}</button>
            </div>
        </div>
    </div>
</template>

<script>
    import decimal from 'decimal.js'
    import api from 'ripple-address-codec'
    const xapp = window.xAppSdk

    export default {
        name: 'Landing',
        props: ['client', 'Sdk', 'nodetype', 'qr_scan'],
        emits: ['clear'],
        data() {
            return {
                alert: undefined,
                auth: undefined,
                isLoading: true,
                depositAuth: false,
                challenge: true,
                step: 1,
                score: 0,
                failed: false,
                accountObjects: {}
            }
        },
        async mounted() {
            console.log('landing mounted...')
            console.log('fetching old score', this.$store.getters.getScore)
            this.score = this.$store.getters.getScore
            if (this.score >= 3) {
                this.challenge = false
            }
            // await this.fetchStorage()
            if (this.$store.getters.getAccount != '') {
                console.log('getAccount', this.$store.getters.getAccount)
                await this.getAccountInfo()
                await this.getAccountObjects()
            }
            this.isLoading = false
        },
        computed: {
            ledger() {
                return this.$store.getters.getLedger
            },
            account() {
                return this.$store.getters.getAccount
            },
            columns() {
                if (this.TokenOffers.length == 0) {
                    return []
                }
                return ['Side', 'NFT']
                //return Object.keys(this.TokenOffers[0]).filter( code => code !== 'ledger')
            }
        },
        watch: {
            async account() {
                if (this.$store.getters.getAccount != '') {
                    console.log('account loaded', this.$store.getters.getAccount)
                }
            },
            async qr_scan() {
                console.log('qr_scan passed', this.qr_scan)
                if (this.qr_scan !== undefined) {
                    const account = this.qr_scan
                    console.log('isValidAddress', api.isValidClassicAddress(account))
                    if (!api.isValidClassicAddress(account)) {
                        this.addAlert('Invalid rAddress')
                        this.$emit('clear', true)
                    }

                    for (let index = 0; index < this.accountObjects.length; index++) {
                        const whitelisted = this.accountObjects[index]
                        if (whitelisted.Authorize !== account) { continue }
                        console.log('Account already is Authorized')
                        this.addAlert('Account already is Authorized')
                        this.$emit('clear', true)
                        return
                    }

                    this.authButton(account)
                    this.$emit('clear', true)
                }
            }
        },
        methods: {
            failedTest() {
                xapp.openBrowser({ url: 'https://xrpl.org/docs/concepts/accounts/depositauth' })
            },
            advanceStep(correct) {
                this.step ++
                this.score = (correct) ? this.score + 1 : this.score
                if (this.step > 4 && this.score >= 3) {
                   this.challenge = false 
                }
                if (this.step > 4 && this.score < 3) {
                    this.failed = true
                }
                this.$store.dispatch('setTestScore', this.score)
            },
            htmlToText: function (html) {
                this.utilityEl.innerHTML = html
                return this.utilityEl.textContent
            },
            async addAlert(message) {
                this.alert = message
                await this.pause(10_000)
                this.alert = undefined
            },
            async pause(milliseconds = 1000) {
                return new Promise(resolve => {
                    // console.log('pausing....')
                    setTimeout(resolve, milliseconds)
                })
            },
            async getAccountObjects() {
                const acc_payload = {
                    'id': 0,
                    'command': 'account_objects',
                    'account': this.$store.getters.getAccount,
                    'ledger_index': 'validated',
                    'type': 'deposit_preauth',
                    'deletion_blockers_only': false,
                    'limit': 100
                }
                const account_objects = await this.client.send(acc_payload)
                this.accountObjects = (account_objects.account_objects !== undefined) ? account_objects.account_objects : {}
            },
            async getAccountInfo() {
                const acc_payload = {
                    'id': 1,
                    'command': 'account_info',
                    'account': this.$store.getters.getAccount,
                    'ledger_index': 'validated'
                }
                const account_info = await this.client.send(acc_payload)
                if ('error' in account_info) { return }
                this.depositAuth = account_info.account_flags.depositAuth
            },
            async removeButton(account) {
                const acc_payload = {
                    'id': 1,
                    'command': 'account_info',
                    'account': this.$store.getters.getAccount,
                    'ledger_index': 'validated'
                }
                const account_info = await this.client.send(acc_payload)
                const tx_json = {
                    'TransactionType' : 'DepositPreauth',
                    'Account' : this.$store.getters.getAccount,
                    'Unauthorize' : account,
                    'Fee': await this.Fee(),
                    'Sequence': account_info.account_data.Sequence
                }
                console.log('auth', tx_json)


                const request = { custom_meta: { instruction: `Authorize Account for Deposits`}, txjson: tx_json, signers: this.$store.getters.getAccount }
                
                console.log('request', request)
                const payload = await this.Sdk.payload.createAndSubscribe(request, async event => {
                    console.log('New payload event:', event.data)

                    if (event.data.signed === true) {
                        console.log('Woohoo! The sign request was signed :)')
                        await this.pause(5_000)
                        await this.getAccountInfo()
                        await this.getAccountObjects()
                        return event.data
                    }

                    if (event.data.signed === false) {
                        console.log('The sign request was rejected :(')
                        return false
                    }
                })
                console.log('payload', payload)

                console.log('payload', payload)


                xapp.openSignRequest({ uuid: payload.created.uuid })
            },
            async authButton(account) {
                const acc_payload = {
                    'id': 1,
                    'command': 'account_info',
                    'account': this.$store.getters.getAccount,
                    'ledger_index': 'validated'
                }
                const account_info = await this.client.send(acc_payload)

                console.log('isValidAddress', api.isValidClassicAddress(this.auth))
                if (account === undefined && !api.isValidClassicAddress(this.auth)) {
                    this.addAlert('Invalid rAddress')
                    return
                }

                const tx_json = {
                    'TransactionType' : 'DepositPreauth',
                    'Account' : this.$store.getters.getAccount,
                    'Authorize' : account === undefined ? this.auth: account,
                    'Flags' : 2147483648,
                    'Fee': await this.Fee(),
                    'Sequence': account_info.account_data.Sequence
                }
                console.log('auth', tx_json)


                const request = { custom_meta: { instruction: `Authorize Account for Deposits`}, txjson: tx_json, signers: this.$store.getters.getAccount }
                
                console.log('request', request)
                const payload = await this.Sdk.payload.createAndSubscribe(request, async event => {
                    console.log('New payload event:', event.data)

                    if (event.data.signed === true) {
                        console.log('Woohoo! The sign request was signed :)')
                        await this.pause(5_000)
                        await this.getAccountInfo()
                        await this.getAccountObjects()
                        return event.data
                    }

                    if (event.data.signed === false) {
                        console.log('The sign request was rejected :(')
                        return false
                    }
                })
                console.log('payload', payload)

                xapp.openSignRequest({ uuid: payload.created.uuid })
            },

            async authEnableButton() {
                const acc_payload = {
                    'id': 1,
                    'command': 'account_info',
                    'account': this.$store.getters.getAccount,
                    'ledger_index': 'validated'
                }
                const account_info = await this.client.send(acc_payload)
                const tx_json = {
                    'TransactionType' : 'AccountSet',
                    'Account' : this.$store.getters.getAccount,
                    'Fee': await this.Fee(),
                    'Sequence': account_info.account_data.Sequence
                }

                if (this.depositAuth) {
                    tx_json.ClearFlag = 9
                }
                else {
                    tx_json.SetFlag = 9
                }
                console.log('auth', tx_json)

                const request = { custom_meta: { instruction: `Enable Deposit Authorization`}, txjson: tx_json, signers: this.$store.getters.getAccount }
                
                console.log('request', request)
                const payload = await this.Sdk.payload.createAndSubscribe(request, async event => {
                    console.log('New payload event:', event.data)

                    if (event.data.signed === true) {
                        console.log('Woohoo! The sign request was signed :)')
                        await this.pause(5_000)
                        await this.getAccountInfo()
                        await this.getAccountObjects()
                        return event.data
                    }

                    if (event.data.signed === false) {
                        console.log('The sign request was rejected :(')
                        return false
                    }
                })
                console.log('payload', payload)

                xapp.openSignRequest({ uuid: payload.created.uuid })
            },
            async Fee() {
                const server_info = await this.client.send({ 'command': 'server_info' })
                if ('error' in server_info) {
                    log('error server_info', server_info)
                    return
                }
                if (server_info.load_factor == null) {
                    // https://github.com/ripple/rippled/issues/3812#issuecomment-816871100
                    server_info.load_factor = 1
                }
                const FEE_CUSHION = 1.2
                const base_fee = new decimal(server_info.info.validated_ledger.base_fee_xrp).mul(server_info.load_factor).mul(FEE_CUSHION).mul(1_000_000).toFixed(0)
                console.log('FEE', base_fee)
                return base_fee
            },
            ledgerEpoch() {
                const unix_time = Date.now() 
                return Math.floor((unix_time) / 1000) - 946684800
            },
            currencyHexToUTF8(code) {
				if (code.length === 3)
					return code

				let decoded = new TextDecoder()
					.decode(this.hexToBytes(code))
				let padNull = decoded.length

				while (decoded.charAt(padNull - 1) === '\0')
					padNull--

				return decoded.slice(0, padNull)
			},
            hexToBytes(hex) {
				let bytes = new Uint8Array(hex.length / 2)

				for (let i = 0; i !== bytes.length; i++) {
					bytes[i] = parseInt(hex.substr(i * 2, 2), 16)
				}

				return bytes
			}
        },
    }
</script>
<style scoped>
    .fancy-font {
        font-family: 'Permanent Marker', serif;
    }

    .bog-roll {
        width: 100%;
    }
    .main-text {
        color: #753ee2;
        -webkit-text-stroke-width: 1px;
        -webkit-text-stroke-color: black;
    }
    .btn-purple {
        background-color: #753ee2;
        color: #ffffff;
    }

    .btn-yellow {
        background-color: #ffc107;
        color: #ffffff;
    }
    .btn-pink {
        background-color: #ff1a8b;
        color: #ffffff;
    }

    .btn-green {
        background-color: #00e56a;
        color: #ffffff;
    }

    .table-warning {
        --bs-table-bg: #f6da86;
        color: #000;
        border-color: #e6dbb9;
    }

    .bg-green {
        background-color: #00e56a !important;
    }
    
</style>
