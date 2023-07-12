import VueGtag from 'vue-gtag-next';

export default defineNuxtPlugin((nuxtApp) => {
    const config = useRuntimeConfig();

    if(config.public.gtagId) {
        nuxtApp.vueApp.use(VueGtag, {
            property: {
                id: config.public.gtagId
            }
        })
    }
})