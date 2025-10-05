import { useUrl } from "#shared/utils/route/url";

export default defineEventHandler(async (event) => {  
  const config = useRuntimeConfig();
  const { url } = useUrl(config);

  const { secure } = await getUserSession(event);
  const token = secure?.apiToken;

  const body = await readBody(event);
  const { title, description } = body;


  const { id } = event.context.params || {};

  if (!token) {
    throw createError({
      statusCode: 401,
      message: "Unauthorized",
    });
  }

  return await $fetch(url(`posts/${id}`), {
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    method: 'PUT',
    body: {
        title : title ?? '',
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