<template>
    <b-modal id="bv-modal-preferences" centered hide-footer :no-close-on-backdrop="true" >
        <template v-slot:modal-title>
            Preferências
        </template>
        <form @submit.prevent="onSubmit">
            <div class="row">
                <div class="form-group col-12">
                    <label>Bitly Token</label>
                        <b-form-input
                                type="password"
                                v-model="form.bitlyToken"
                                 />

                </div>
                <div class="form-group col-12">
                    <label>Cabeçalho</label>
                    <div class="input-group mb-2">
                        <b-form-textarea
                                id="text"
                                v-model="form.cabecalho"
                                rows="3"
                                max-rows="6"
                                required
                        >
                        </b-form-textarea>
                    </div>
                </div>

                <div class="form-group col-6">
                    <label>Emoji link</label>
                    <div class="input-group mb-2">
                        <b-form-input
                                type="text"
                                v-model="form.linkEmoji"
                                required />
                    </div>
                </div>

                <div class="form-group col-6">
                    <label>Emoji Resumo</label>
                    <div class="input-group mb-2">
                        <b-form-input
                                type="text"
                                v-model="form.resumeEmoji"
                                required />
                    </div>
                </div>

                <div class="form-group col-12">
                    <label v-b-tooltip.hover
                           title="Para fazer o scrape é preciso utilizar um Proxy para contornar O CORS (Cross-origin Resource Sharing). Por padrão utilizamos o https://cors-anywhere.herokuapp.com ">
                        Proxy
                        <i class="fa fa-info-circle" ></i>
                    </label>
                    <b-form-input
                            type="url"
                            v-model="form.proxy"
                    />

                </div>

            </div>


            <b-button type="submit" class="float-right px-5" >Salvar</b-button>

        </form>
    </b-modal>
</template>

<script>
    import session from "../utils/session";
    export default {
        name: "FormPreferences",
        data () {
            return {
                form: {}
            }
        },
        created() {
           this.getPreferences()
        },
        methods:{
            onShow(){
                this.$bvModal.show('bv-modal-preferences')
            },
            onSubmit(){
                session.setObject('preferences', this.form)
                this.$bvModal.hide('bv-modal-preferences')
            },
            getPreferences (){
                this.form = session.getObject('preferences') || {
                    bitlyToken: '',
                    cabecalho: `✂️ Clipping ✂️`,
                    linkEmoji: `🌐`,
                    resumeEmoji: `💬`,
                    proxy: 'https://cors-anywhere.herokuapp.com'
                }
            }
        }

    }
</script>