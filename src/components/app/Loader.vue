<template>
	<div class="d-flex justify-content-center">
			<b-spinner
			variant="primary"
			style="width: 5rem; height: 5rem;"
			label="Large Spinner"
			type="grow"
		></b-spinner>
	</div>
		
</template>
<script>
export default {
	props: {
		full: Boolean
	}
}
</script>
<style scoped>
	.full {
	}
</style>
