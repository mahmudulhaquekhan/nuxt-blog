import { useUrl } from "#shared/utils/route/url";

export default defineEventHandler(async (event) => {
    
    const config = useRuntimeConfig();
    const { url } = useUrl(config);

    return await $fetch(url('/frontend/home/posts'), {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        method: 'GET',
    });
});