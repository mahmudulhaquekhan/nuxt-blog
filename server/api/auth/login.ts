import { useUrl } from "#shared/utils/route/url";
import { useAsyncData } from "nuxt/app";


export default defineEventHandler(async (event) => {
    
    const config = useRuntimeConfig();

    const { url } = useUrl(config);

    const body = await readBody(event);
    const { email, password } = body;

    const res = await $fetch(url('login'), {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        method: 'POST',
        body: {
            email,
            password
        }   
    }).then((data) => {
        return data
    }).catch((error:any) => {
        throw createError({
            statusCode: error?.response?.status || 500,
            data: error?.data?.errors || {}
        }) 
    });


    if(res) {
        await setUserSession(event, {
            user: res.user,
            secure: {
                apiToken: res.token,
            },
        })

        return {}
    }

    throw createError({
        statusCode: 401,
        message: 'Bad credentials'
    }) 

});
