<script lang='ts'>
	import { goto } from "$app/navigation";
    import { Button } from "$lib/components/ui/button";
	import { auth, db } from "$lib/firebaseConfig";
	import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
	import { doc, setDoc } from "firebase/firestore";
    import { ArrowRight } from "lucide-svelte";
    import toast from 'svelte-french-toast';

    const provider = new GoogleAuthProvider();

    async function signInWithGoogle() {
        try {
            const { user } = await signInWithPopup(auth, provider);
            const idToken = await user.getIdToken();
            const response = await fetch('/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(idToken)
            });
            if(!response.ok){
                const errorResponse = await response.json();
                toast.error(errorResponse.message);
            }

            await setDoc(doc(db, 'users', user.uid),{
                name: user.displayName,
                email: user.email,
                profilePic: user.photoURL,
                uid: user.uid
            });

            toast.success('Login successful! Redirecting ...');
            goto('/dashboard');

        } catch (error) {
            const errorMessage = (error as Error).message;
            toast.error(errorMessage);
            // console.error("Error during sign in:", errorMessage);
        }
    }
</script>

<div class="bg-[#1e1919]">
    <div class="text-white text-center pt-[72px] max-w-[777px] mx-auto">
        <h1 class="text-3xl md:text-6xl">
            Securely collaborate on your projects from anywhere!
        </h1>
        <p class="text-sm md:text-lg mt-5">
            Novastrato brings your files and cloud content together, so that your documents can live alongside each other. Whatever tools your team needs and wants are easily accessible anytime, anywhere!
        </p>
        <Button on:click={signInWithGoogle} class="p-6 text-black capitalize font-semibold mt-10 bg-[#d1d4d7]">
            Get Started Now <ArrowRight class="w-5 h-5" />
        </Button>
    </div>
    <video class="mt-10 w-full h-full" autoplay playsinline loop muted> 
        <track kind="captions" />
        <source type="video/mp4" src="https://cdn.dribbble.com/userupload/14785537/file/original-f5bd2ad8343c659cb19ad5bcd7eac9ed.mp4">
        Your browser does not support the video tag.
    </video>
</div>
