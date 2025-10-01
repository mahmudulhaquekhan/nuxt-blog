import { useUrl } from "#shared/utils/route/url";

export default defineEventHandler(async (event) => {  
  const config = useRuntimeConfig();
  const { url } = useUrl(config);

  const { secure } = await getUserSession(event);
  const token = secure?.apiToken;

  const { id } = event.context.params || {};

  if (!token) {
    throw createError({
      statusCode: 401,
      message: "Unauthorized",
    });
  }

  const post = await $fetch(url(`posts/${id}`), {
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    method: 'GET',
  });

  const updatePost = await $fetch(url(`posts/${id}`), {
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    method: 'PUT',
  });

  return { post, updatePost };
});