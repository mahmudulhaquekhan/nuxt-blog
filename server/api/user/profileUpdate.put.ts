import { useUrl } from "#shared/utils/route/url";

export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig();
    const { url } = useUrl(config);

    const session = await getUserSession(event);
    const token = session?.secure?.apiToken;

    const body = await readBody(event);
    const { name, email } = body;

    if (!token) {
        throw createError({
            statusCode: 401,
            message: "Unauthorized",
        });
    }

    const res = await $fetch<{
        user: {
            name: string;
            email: string;
            profile_picture: string;
        },
    }>(url(`profile`), {
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
        },
        method: "PUT",
        body: {
            name,
            email,
            profile_picture: null,
        },
    })
        .then(async (data) => {
            await setUserSession(event, {
                user: {
                    ...session.user,
                    name: data.user?.name ?? name,
                    email: data.user?.email ?? email,
                },
                secure: session.secure,
            });

            return {
                user: data.user,
            };
        })
        .catch((error: any) => {
            throw createError({
                statusCode: error?.response?.status || 500,
                data: error?.data?.errors || {},
            });
        });

    return res;
});
