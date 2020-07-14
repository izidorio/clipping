export default {
    namespaced: true,
    state: {
        news: []
    },
    mutations: {
        ADD_NEWS (state, data) {
            state.news = data
        }
    },
    actions: {
        addNews (context, news) {
            const data = context.state.news
            data.push(news)
            context.commit('ADD_NEWS', data)
        },
        editNews (context, news) {

            const data = context.state.news.map( item => {
                if(item.id === news.id){
                    const { id, url, urlShort, description } = news
                    item = {
                      id,
                      url,
                      urlShort,
                      description
                    }
                    return item
                }
                return item
            })

            context.commit('ADD_NEWS', data)

        },
        destroyNews (context, id) {
            const newsFiltered = context.state.news.filter( item => {
                return  item.id !== id
            })
            context.commit('ADD_NEWS', newsFiltered)
        }
    }
}