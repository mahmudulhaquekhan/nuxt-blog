
export default defineEventHandler(async (event) => {
  const token = (await getUserSession(event))?.secure?.apiToken;

    if (!token) {
        throw createError({
            statusCode: 401,
            message: 'Unauthorized'
        });
    }

    const res = await $fetch("https://api.mohammudullaha.com/api/posts", {
        headers: {
            'Authorization': `Bearer ${token}`,
        },
        method: 'GET',
    }).then((data) => {
        return data
    }).catch(async (error) => {
        
    });
})