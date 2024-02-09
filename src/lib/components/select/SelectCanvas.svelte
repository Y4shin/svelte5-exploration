<script lang="ts">
  import { createSelectState, type SelectCanvasProps } from './util.svelte';
  import SelectItem from './SelectItem.svelte';

  const state = createSelectState();
  const { tokens } = $props<SelectCanvasProps>();

  $inspect(state.selections);
  $inspect(state.state);
</script>
<div class="select-canvas">
  {#each tokens as text, idx}
    <SelectItem {text} {idx} />
  {/each}
</div>

<style>
  .select-canvas {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    padding: 16px;
    border-radius: 8px;
    background-color: hsl(220 10% 16%);
  }
</style>