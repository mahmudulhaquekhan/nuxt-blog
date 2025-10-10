import { useUrl } from "#shared/utils/route/url";

export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig();
    const { url } = useUrl(config);

    const session = await getUserSession(event);
    const token = session?.secure?.apiToken;

    const body = await readMultipartFormData(event);
    const forwardForm = new FormData()

    for (const field of body) {
    if (field.filename) forwardForm.append(field.name!, new Blob([field.data]), field.filename)
    else forwardForm.append(field.name!, field.data.toString())
    }

    forwardForm.append('_method', 'PUT');

    if (!token) {
        throw createError({
            statusCode: 401,
            message: "Unauthorized",
        });
    }

    console.log(forwardForm.get('name'));
    console.log(forwardForm.get('email'));
    console.log(forwardForm.get('profile_picture'));

    const res = await $fetch<{
        user: {
            name: string;
            email: string;
            profile_picture: string | null;
        },
    }>(url(`profile`), {
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
        },
        method: "POST",
        body: forwardForm,
    })
        .then(async (data) => {
            await setUserSession(event, {
                user: {
                    name: data.user?.name ?? null,
                    email: data.user?.email ?? null,
                    profile_picture: data.user?.profile_picture ?? null,
                },
                secure: session.secure,
            });

            return {
                user: data.user,
            };
        })
        .catch((error: any) => {
            console.log(error);
            throw createError({
                statusCode: error?.response?.status || 404,
                data: error?.data?.errors || {},
            });
        });

    return res;
});
