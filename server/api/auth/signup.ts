import { useUrl } from "#shared/utils/route/url";

export default defineEventHandler(async (event) => {
    const body = await readBody(event);

    const config = useRuntimeConfig();

    const { url } = useUrl(config);

    const res = await $fetch<{
        user: {
            name: string;
            email: string;
            profile_picture: string;
        },
        token: string,
    }>(url('signup'), {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        method: 'POST',
        body,   
    }).then((data) => {
        return data
    }).catch((error:any) => {
        console.log('error', error)
        throw createError({
            statusCode: error?.response?.status || 500,
            data: error?.data?.errors || {}
        }) 
    });


    if(res) {
        await setUserSession(event, {
            user: {
                name: res.user.name,
                email: res.user.email,
                profile_picture: res.user.profile_picture,
            },
            secure: {
                apiToken: res.token,
            },
        })

        return {}
    }
});