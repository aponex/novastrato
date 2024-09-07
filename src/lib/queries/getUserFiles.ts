import type { TFile } from "$lib/components/types";
import { db } from "$lib/firebaseConfig";
import { collection, getDocs, query, where } from "firebase/firestore";

async function getUserFiles(uid:string){
    const q = query(collection(db, 'files'), where('uid', '==', uid))
    const querySnapshot = await getDocs(q);
    const results: TFile[] = []
    console.log(querySnapshot.docs)
    querySnapshot.forEach((doc) =>{
        results.push({
            fileName: doc.data().fileName,
            size: doc.data().size,
            type: doc.data().type,
            uid: doc.data().uid,
            downloadUrl: doc.data().downloadUrl,
            timestamp: doc.data().timestamp.toDate(),
            id: doc.id
        })
    })
    return results

}

export default getUserFiles