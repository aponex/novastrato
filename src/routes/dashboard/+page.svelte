<script lang='ts'>
	import DropZone from "$lib/components/DropZone.svelte"
    import DataGrid from "$lib/components/DataGrid.svelte"
	import { page } from "$app/stores";
    export let data
    console.log(data.files)
    let theName = $page.data.user.name;
</script>
 
{theName}:: ..

<div class="max-w-5xl mx-auto">
     <DropZone />
     <DataGrid />
    <!-- table component -->
</div>