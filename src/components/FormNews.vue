<template>
    <b-modal id="bv-modal-clipping" centered hide-footer >
        <template v-slot:modal-title>
            {{form.id ? 'Editar notícia': 'Incluir notícia'}}
        </template>
        <form @submit.prevent="onSubmit">
            <div class="form-group col-12">
                <label>Url</label>
                <b-form-input
                        type="url"
                        v-model="form.url"
                        required />
            </div>
            <div class="form-group col-12">
                <label>Url encurtada</label>
                <div class="input-group mb-2">
                    <b-form-input
                            type="url"
                            v-model="form.urlShort"
                             />
                    <div class="input-group-append" v-b-tooltip.hover title="Encurtar a URL">
                        <div class="input-group-text" :class="[(form.url && bitlyToken) ? 'scrap-btn' : '']" @click="onUrlShort">

                            <b-overlay
                                    :show="showLink"
                                    rounded
                                    opacity="0.6"
                                    spinner-small
                                    spinner-variant="primary"
                                    class="d-inline-block"
                            >
                                <i class="fa fa-magic"></i>
                            </b-overlay>
                        </div>
                    </div>
                </div>
            </div>
            <div class="form-group col-12">
                <label>Resumo</label>
                <div class="input-group">
                    <b-form-textarea
                            id="textarea"
                            v-model="form.description"
                            placeholder="Entre com um resumo da notícia..."
                            rows="3"
                            max-rows="6"
                            required
                    ></b-form-textarea>
                    <div class="input-group-append" v-b-tooltip.hover title="Scrape do Título e Descrição do link">
                        <div class="input-group-text" :class="[(form.url && bitlyToken) ? 'scrap-btn' : '']" @click="onScrape">

                            <b-overlay
                                    :show="showScrap"
                                    rounded
                                    opacity="0.6"
                                    spinner-small
                                    spinner-variant="primary"
                                    class="d-inline-block"
                            >
                                <i class="fa fa-magic"></i>
                            </b-overlay>
                        </div>
                    </div>
                </div>
            </div>

            <btn-submit :busy="busy"/>
        </form>
    </b-modal>
</template>

<script>
    import api from '../utils/api';
    import session from "../utils/session";
    import BtnSubmit from "./Submit";
    import { convertHTMLEntity, clearObj } from '../utils/helper'

    import { BitlyClient } from 'bitly';


    async function short(url, token) {
        const bitly = new BitlyClient( token, {});
        try {
            return await bitly.shorten(url);
        }catch (e) {
            console.log('error', e)
            return null
        }

    }

    export default {
        name: "FormNews",
        components: { BtnSubmit },
        props: {
            form: {
                type: Object,
                default: () => ({
                    id: '',
                    url: '',
                    urlShort: '',
                    description: ''
                })
            }
        },
        data () {
            return {
                busy: false,
                showLink: false,
                showScrap: false,
                bitlyToken: '',
                preferences: '',
                errors: {}
            }
        },
        mounted() {
            //
        },
        methods:{
            show (){
                this.preferences = session.getObject('preferences')
                if(! this.preferences){
                    this.$bvToast.toast('Para começar a usar o clipping Você precisa salvar os parâmetros de configuração. Acesse o Menu/Preferência', {
                        title: 'Error',
                        variant: 'danger',
                        toaster: 'b-toaster-bottom-right',
                        autoHideDelay: 5000
                    })
                    return
                }

                this.$bvModal.show('bv-modal-clipping')
            },
            onSubmit (){
                if( this.form.id === undefined || this.form.id === '' ){
                    const id = Date.now()
                    this.$store.dispatch('clipping/addNews',{...this.form, id})
                        .then( () => {
                            this.onReset()
                        })
                }else{

                    this.$store.dispatch('clipping/editNews', this.form)
                        .then( () => {
                            this.onReset()
                            this.$bvModal.hide('bv-modal-clipping')
                        })
                }
            },
            onReset (){
                clearObj(this.form)
            },
            async onScrape (){

                if( this.form.url  === undefined || this.form.url === '' ){
                    this.$bvToast.toast('Você precisa informar uma url válida', {
                        title: 'Error',
                        variant: 'danger',
                        autoHideDelay: 5000
                    })
                    return
                }

                this.showScrap = true;

                api.get(  `${this.preferences.proxy}/${this.form.url}`)
                    .then( result => {

                        //hack para resolver html minificados
                        const html = result.data.replace(/">|"\/>|" \/>/g,'">\n');

                        const rgxTitle = /"og:title" content="(.*)"/;
                        const rgxDesc = /"og:description" content="(.*)"/;

                        const title =  rgxTitle.exec(html);
                        const desc =  rgxDesc.exec(html);
                        this.form.description = convertHTMLEntity(`${title[1]} ${desc[1]}`)
                    })
                    .catch( ()=> {
                        this.$bvToast.toast('É possível que tenha atingido a quantidade de requisições por minuto. Aguarde ou insira o resumo manualmente. Acesse o github do desenvolvedor e saiba como criar um servidor Proxy CORS', {
                            title: 'Erro',
                            variant: 'warning',
                            autoHideDelay: 5000
                        })
                    })
                    .finally( () => {
                        this.showScrap = false;
                    })
            },
            async onUrlShort (){

                if( this.form.url  === undefined || this.form.url === '' ){
                    this.$bvToast.toast('Você precisa informar uma url válida', {
                        title: 'Error',
                        variant: 'danger',
                        toaster: 'b-toaster-bottom-right',
                        autoHideDelay: 5000
                    })
                    return
                }

                if(this.preferences.bitlyToken === undefined || this.preferences.bitlyToken === '' ){
                    this.$bvToast.toast('Para encurtar a url automaticamente você precisa informar o token do Bitly em: Menu/Preferências', {
                        title: 'Error',
                        variant: 'danger',
                        toaster: 'b-toaster-bottom-right',
                        autoHideDelay: 5000
                    })
                    return
                }

                this.showLink = true;
                const urlShort =  await short(this.form.url, this.preferences.bitlyToken);
                this.form.urlShort = urlShort.link;
                this.showLink = false
            }
        }
    }

</script>

<style scoped>
    .scrap-btn{
        cursor: pointer;
        color: #007BFF;
    }


</style>
