<script lang="ts">
	import { invalidateAll } from "$app/navigation";
	import { page } from "$app/stores"; // Importing the page store
	import { db, storage } from "$lib/firebaseConfig";
	import { cn } from "$lib/utils";
	import { addDoc, collection, serverTimestamp, updateDoc } from "firebase/firestore";
	import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
	import toast from "svelte-french-toast";

	let isDragging = false;
	let fileInput: HTMLInputElement;
	let maxSize = 1024 * 1024 * 100;
	let uid: string | undefined;

	// Use a reactive statement to track changes to the page data
	$: uid = $page.data.user?.uid;  // Access uid reactively

	// Display a toast if uid is undefined
	$: if (!uid) {
		toast.error("UID is undefined, please log in.");
	} else {
		toast(`UID: ${uid}`);
	}

	function handleClick() {
		fileInput.click();
	}

	function handleDragEnter() {
		isDragging = true;
	}

	function handleDragLeave() {
		isDragging = false;
	}

	function handleDrop(event: DragEvent) {
		isDragging = false;
		if (event.dataTransfer?.files) {
			const droppedFiles = Array.from(event.dataTransfer.files);
			checkFileSizeAndUpload(droppedFiles);
		}
	}

	function handeFileSelect(event: Event) {
		if (fileInput.files) {
			const selectedFiles = Array.from(fileInput.files);
			checkFileSizeAndUpload(selectedFiles);
		}
	}

	async function checkFileSizeAndUpload(files: File[]) {
		const allFilesValid = files.every((file) => {
			if (file.size > maxSize) {
				toast(`Error: ${file.name} size is too large. It exceeds ${maxSize}`);
				return false;
			}
			return true;
		});

		if (allFilesValid) {
			// Upload all files
			await toast.promise(
				Promise.all(files.map(handleUploads)),
				{
					loading: "Uploading file(s) ...",
					success: "Files uploaded successfully",
					error: "Error uploading files",
				}
			);
			await invalidateAll();
		}
	}

	async function handleUploads(file: File) {
		if (!uid) {
			toast.error("UID is undefined. Cannot upload files.");
			return;
		}

		const docRef = await addDoc(collection(db, "files"), {
			uid,
			fileName: file.name,
			size: file.size,
			type: file.type,
			timestamp: serverTimestamp(),
		});

		const fileRef = ref(storage, `files/${docRef.id}`);
		await uploadBytes(fileRef, file);
		const downloadUrl = await getDownloadURL(fileRef);
		await updateDoc(docRef, {
			downloadUrl,
		});
	}
</script>
