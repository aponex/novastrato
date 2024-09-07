<script lang='ts'>
	import { ModeWatcher } from "mode-watcher";
	import Header from '$lib/components/Header.svelte';
	import { Toaster } from 'svelte-french-toast';
	import '../app.css';
</script>
<ModeWatcher />
<Header />
<Toaster />
<slot />
