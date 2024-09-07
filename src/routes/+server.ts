import { adminAuth } from '$lib/server/firebaseAdmin.js';
import { error, json } from '@sveltejs/kit';

export const POST = async ({request, cookies}) => {
    const idToken = await request.json();    
    // console.log("! ~ file: +server.ts:3 ~ POST ~idToken:", idToken)
    const expiresIn = 60 * 60 * 24 * 12 * 1000;
    const decodedIdToken = await adminAuth.verifyIdToken(idToken);
    if(new Date().getDate() / 1000 - decodedIdToken.auth_time < 5 * 60){
        const sessionCookie = await adminAuth.createSessionCookie(idToken, { expiresIn });
        const options  = { maxAge: expiresIn, httpOnly: true, secure: true, path: '/'};
        cookies.set('__session', sessionCookie, options)
        return json({ status: 'signedIn' });
    }else{
        throw error(401, 'recent signin is required')
    }
};

export const DELETE = async ({cookies}) => {
    cookies.delete('__session', { path: '/' })
    return json ({ status: 'signedOut'});
};