<template>
  <div id="app">

        <header class="d-flex justify-content-between align-items-center p-3 content-header">
            <div>
                <b-dropdown variant="icon p-0" right no-caret>
                    <template v-slot:button-content>
                        <i class="fa fa-bars hamburger" />
                    </template>
                    <b-dropdown-item @click="$refs.formPreferences.onShow()">
                        <i class="fa fa-gears mr-1"></i> Preferências
                    </b-dropdown-item>
                </b-dropdown>
            </div>
            <div class="actions">
                <i class="fa fa-plus" @click="onForm" />
                <i class="fa fa-files-o" @click="onCopy" />
            </div>
        </header>

        <form-news ref="form" :form="form" />
        <form-preferences ref="formPreferences"/>
        <div class="wrapper pt-2">
            <div class="px-2 content-news" v-for="item in news" :key="item.id">
                <news-card :news="item" @edit="onEdit" @delete="onDelete" />
            </div>
        </div>

  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import 'font-awesome/css/font-awesome.css'
import { Alert } from './utils/helper'
import moment from 'moment';
import FormPreferences from "./components/FormPreferences";
import FormNews from './components/FormNews'
import NewsCard from "./components/NewsCard";
import session from "./utils/session";

export default {
    name: 'App',
    components: {
        FormPreferences,
        FormNews,
        NewsCard
    },
    data () {
        return {
            form: {}
        }
    },
    computed: {
        ...mapGetters([
            'news'
        ])
    },
    methods: {
        onForm () {
            this.form = {},
            this.$refs.form.show()
        },
        onEdit(id){
            this.form =  {...this.news.filter( item => item.id === id)[0]}
            this.$refs.form.show()
        },
        onDelete(id){
            Alert.warning('Confirma a remoção da notícia?', 'Remover')
                .then( result => {
                    if(result.value){
                        this.$store.dispatch('clipping/destroyNews', id)
                    }
                })
        },
        async onCopy(){
            if( this.news.length ){
                const preferences = session.getObject('preferences');
                let str =  `${preferences.cabecalho}\n🗓️ *${moment(Date.now()).format('DD/MM/YYYY')}*\n\n`
                this.news.forEach( item => {
                    str += `${preferences.linkEmoji} ${item.urlShort}\n${preferences.resumeEmoji} ${item.description}\n\n`
                })

                await this.$copyText(str)
                this.$bvToast.toast('Copiado para área de transferência', {
                    title: 'Sucesso',
                    variant: 'success',
                    autoHideDelay: 5000
                })
            } else {
                this.$bvToast.toast('Não há nenhuma notícia salva', {
                    title: 'Info',
                    variant: 'primary',
                    autoHideDelay: 5000
                })
            }
        }
    }

}
</script>

<style>

    #app {
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: left;
        color: #2c3e50;
        margin: 0;
        padding: 0;
        max-width: 800px;
        margin: 0 auto;
        height: 100vh;
    }

    header{
        background: #2c3e50;
        color: #ffffff;
        font-size: 1.5rem;
    }

    .wrapper{
        height: calc(100vh - 68px);
        border-left: 1px #ebebeb solid;
        border-right: 1px #ebebeb solid;
    }

    .hamburger{
        color: #ffffff;
        font-size: 1.5rem;
        cursor: pointer;
    }
    .actions i{
        padding: 5px 8px;
        cursor: pointer;
        color: #ffffff;
        transition: 0.3s;
        margin-left: 12px;
        border-radius: 3px;
    }
    .actions i:hover{
        background: rgba(255, 255, 255, 0.3);
    }

    .close{
        color: #ffffff !important;
        opacity: .8;
    }
    .close:hover{
        color: #ffffff !important;
        opacity: 1;
    }

</style>
