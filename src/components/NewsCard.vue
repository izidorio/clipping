<template>
    <article>
        <div class="card">
            <div class="content">
                <span v-if="news.urlShort">
                    <i class="fa fa-share-square-o"></i>
                    <a :href="news.urlShort" target="_blank">{{news.urlShort}}</a>
                </span>
                <span v-else>
                    <i class="fa fa-share-square"></i>
                    <a :href="news.url" target="_blank">{{news.url}}</a>
                </span>
                <p>{{news.description}}</p>
            </div>
            <div class="action">
                <i class="fa fa-pencil" @click="onEdit"></i>
                <i class="fa fa-trash" @click="onDelete"></i>
            </div>
        </div>
    </article>
</template>

<script>
    export default {
        name: "NewsCard",
        props: {
            news: {
                type: Object,
                required: true,
                default: () => ({})
            }
        },
        methods:{
            onEdit (){
                this.$emit('edit', this.news.id)
            },
            onDelete (){
                this.$emit('delete', this.news.id)
            }
        }
    }
</script>

<style scoped>
    article{
        width: 100%;
        padding: 8px;
    }
    .card{
        display: flex;
        flex-direction: row;
        align-content: space-between;
        align-items: start;
        text-align: left;
        padding: 10px 5px;
        border-radius: 3px;
        border: 1px #cccccc solid;
    }
    .content{
        width: calc(100% - 40px);
        display: flex;
        flex-direction: column;
        padding: 0 8px;
        border-right: 1px #ebebeb solid;
    }
    .content span{
        width: 100%;
        margin-bottom: 8px;
    }
    .content span i{
        margin: 0 8px 8px 0;
    }
    .action{
        width: 40px;
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    .action i{
        cursor: pointer;
        margin-bottom: 8px;
        padding: 8px 10px;
    }
    .action i:hover{
        background: #ebebeb;
        border-radius: 3px;
    }
</style>