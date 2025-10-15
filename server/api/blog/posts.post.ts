import { useUrl } from "#shared/utils/route/url";

export default defineEventHandler(async (event) => {
    
    const config = useRuntimeConfig();
    const { url } = useUrl(config);

    const { secure } = await getUserSession(event);

    const body = await readMultipartFormData(event);
    const forwardForm = new FormData()

    for (const field of body) {
    if (field.filename) forwardForm.append(field.name!, new Blob([field.data]), field.filename)
    else forwardForm.append(field.name!, field.data.toString())
    }

    const token = secure?.apiToken;

    if (!token) {
        throw createError({
            statusCode: 401,
            message: 'Unauthorized'
        });
    }

    console.log(forwardForm.get('image'));
    console.log(forwardForm.get('title'));
    console.log(forwardForm.get('description'));

    return await $fetch(url('posts'), {
        headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        method: 'POST',
        body: forwardForm,
    }).then((data) => {
        return data
    }).catch((error:any) => {
        throw createError({
            statusCode: error?.response?.status || 500,
            data: error?.data?.errors || {}
        }) 
    });
});