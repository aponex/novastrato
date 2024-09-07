import { adminAuth } from "$lib/server/firebaseAdmin";

export const handle = async ({ event, resolve }) => {
    const { cookies, locals } = event;
    const sessionCookie = cookies.get('__session');
        try {
            const { uid } = await adminAuth.verifySessionCookie(sessionCookie!);
            locals.userId = uid;
        } catch (error) {
            locals.userId = null;
            return resolve(event);
        }
    return resolve(event);
};


// import { adminAuth } from "$lib/server/firebaseAdmin";

// export const handle = async ({ event, resolve }) => {
//     const sessionCookie = event.cookies.get('__session');
//     if (sessionCookie) {
//         try {
//             const { uid } = await adminAuth.verifySessionCookie(sessionCookie!);
//             event.locals.userId = uid;
//         } catch (error) {
//             event.locals.userId = null;
//         }
//     } else {
//         event.locals.userId = null;
//     }

//     return resolve(event);
// };
