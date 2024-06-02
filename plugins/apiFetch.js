export default defineNuxtPlugin(async () => {
  const config = useRuntimeConfig()

  const apiFetch = $fetch.create({
    baseURL: config.public.backendBaseUrl,
  })

  return {
    provide: {
      apiFetch,
    },
  }
})
