import { useUrl } from "#shared/utils/route/url";

export default defineEventHandler(async (event) => {
    
    const config = useRuntimeConfig();
    const { url } = useUrl(config);

    const { secure } = await getUserSession(event);

    const body = await readBody(event);
    const { name, email, description } = body;

    const token = secure?.apiToken;

    if (!token) {
        throw createError({
            statusCode: 401,
            message: 'Unauthorized'
        });
    }

    const { id } = event.context.params || {}

    return await $fetch(url(`/posts/${id}/comments`), {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        method: 'POST',
        body: {
            name : name ?? '',
            email : email ?? '',
            description: description ?? ''
        } 
    }).then((data) => {
        return data
    }).catch((error:any) => {
        throw createError({
            statusCode: error?.response?.status || 500,
            data: error?.data?.errors || {}
        }) 
    });
});