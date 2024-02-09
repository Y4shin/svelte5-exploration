<script lang="ts">
  import SelectCanvas from '$lib/components/select/SelectCanvas.svelte';
  const data = "Hello World This Is A Test Sentence.".split(" ");
</script>

<SelectCanvas tokens={data} />

