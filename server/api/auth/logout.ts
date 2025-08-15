import { useUrl } from "#shared/utils/route/url";
import { useAsyncData } from "nuxt/app";


export default defineEventHandler(async (event) => {
    
    
    const config = useRuntimeConfig();
    const { url } = useUrl(config);

    const token = (await getUserSession(event))?.secure?.apiToken;

    if (!token) {
        throw createError({
            statusCode: 401,
            message: 'Unauthorized'
        });
    }

    const res = await $fetch(url('logout'), {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`, // Assuming you need to pass an API token or similar
        },
        method: 'POST',
    }).then((data) => {
        return data
    }).catch(async (error) => {
        
    });


    await clearUserSession(event); // Clear the user session

    return {}

});
