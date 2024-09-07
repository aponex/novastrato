<script lang='ts' >
    import * as Table from "$lib/components/ui/table";
    let files = []
</script>
<div class="" >
    <div class="border rounded-md my-10 shadow-md">
        <h1 class="py-5 capitalize font-medium pl-5">
            Files(5)
        </h1>
        {#if files.length==0 }
            <div class="flex justify-center items-center h-[200px]" >
                <p class="text-gray-400 text-sm">No files uploaded</p>
            </div>
        {:else}
            <Table.Root>
                <Table.Caption>A list of your recent uploads.</Table.Caption>
                <Table.Header>
                <Table.Row>
                    <Table.Head class="w-[100px]">Type</Table.Head>
                    <Table.Head>File name</Table.Head>
                    <Table.Head>File size</Table.Head>
                    <Table.Head>Date added</Table.Head>
                    <Table.Head>Link</Table.Head>
                    <Table.Head class='sr-only'>Delete</Table.Head>
                </Table.Row>
                </Table.Header>
                <Table.Body>
                    {#each {length:5} as _}
                <Table.Row>
                    <Table.Cell class="font-medium">{'invoice.invoice'}</Table.Cell>
                    <Table.Cell>{'invoice.paymentStatus'}</Table.Cell>
                    <Table.Cell>{'invoice.paymentMethod'}</Table.Cell>
                    <Table.Cell class="text-right">{'invoice.totalAmount'}</Table.Cell>
                </Table.Row>
                {/each}
                </Table.Body>
            </Table.Root> 
      {/if}
    </div>
</div>