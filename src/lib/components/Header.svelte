<script lang='ts' >
	import Logo from "./Logo.svelte";
    import * as Avatar from "$lib/components/ui/avatar";
    import { Button } from "$lib/components/ui/button";
	import ToggleMode from "./ToggleMode.svelte";
	import { signOut } from "firebase/auth";
	import { auth } from "$lib/firebaseConfig";
	import { goto } from "$app/navigation";
    import { page } from "$app/stores";
    async function logOut (){
        await fetch('/', {
            method: "DELETE",
        })
        await signOut(auth)
        goto('/')
    }
    
</script>
<header class="flex items-center justify-between bg-background sticky top-0 left-0">
    <Logo />
    <div class="flex items-center gap-4">
        <ToggleMode />
        {#if $page.data.user}
            <Avatar.Root>
                <Avatar.Image 
                    src={$page.data.user.profilePic} 
                    alt={`${$page.data.user.name} profile pic`}
                />
                <Avatar.Fallback>CN</Avatar.Fallback>
            </Avatar.Root>
            <Button on:click={logOut} variant="ghost">Sign out</Button>
        {/if}
        

    </div>
</header>