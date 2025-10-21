import { useUrl } from "#shared/utils/route/url";

export default defineEventHandler(async (event) => {
    
    const config = useRuntimeConfig();
    const { url } = useUrl(config);
    const { id } = event.context.params || {};

    return await $fetch(url(`/frontend/posts/${id}`), {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        method: 'GET',
    });
});