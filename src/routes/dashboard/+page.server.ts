import getUser from '$lib/queries/getUser.js';
import getUserFiles from '$lib/queries/getUserFiles.js';
import { redirect } from '@sveltejs/kit';

export const load = async ({ locals }) => {
    const { userId } = locals;
    if(!userId){
        throw redirect(307, '/');
    }
    
    return{
        user:getUser(userId),
        files:getUserFiles(userId)
    }
}; 