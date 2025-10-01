import { useUrl } from "#shared/utils/route/url";

export default defineEventHandler(async (event) => {
    
    const config = useRuntimeConfig();
    const { url } = useUrl(config);

    const { secure } = await getUserSession(event);

    const token = secure?.apiToken;

    if (!token) {
        throw createError({
            statusCode: 401,
            message: 'Unauthorized'
        });
    }

    return await $fetch(url('posts'), {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        method: 'GET',
    });
});