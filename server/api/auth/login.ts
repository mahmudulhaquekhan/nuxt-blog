import { useUrl } from "#shared/utils/route/url";
import { useAsyncData } from "nuxt/app";


export default defineEventHandler(async (event) => {
    
    const config = useRuntimeConfig();

    const { url } = useUrl(config);

    const body = await readBody(event);
    const { email, password } = body;

    const res = await $fetch<{
        user: {
            name: string;
            email: string;
            profile_picture: string;
        },
        token: string,
        message: 'Login successful'
    }>(url('login'), {
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

    throw createError({
        statusCode: 401,
        message: 'Bad credentials'
    }) 

});
