<script>
export default defineNuxtRouteMiddleware((to, from) => {
  return navigateTo('/blog/page/1', {redirectCode: 301})
})
</script>