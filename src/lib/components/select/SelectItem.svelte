<script lang="ts">
  import { getSelectState, type SelectItemProps } from './util.svelte';

  const { text, idx } = $props<SelectItemProps>();

  const state = getSelectState();
  const uiState = $derived(state.getItemState(idx));
</script>

<button
  class="token"
  onclick={() => state.onClick(idx)}
  onmouseenter={() => state.onHover(idx)}
  class:token-current={uiState && uiState.type === 'current'}
  class:token-selection={uiState && uiState.type === 'selection'}
  class:token-left={uiState && uiState.pos === 'left'}
  class:token-right={uiState && uiState.pos === 'right'}
  class:token-only={uiState && uiState.pos === 'only'}
>
  {text}
</button>

<style>
  .token {
    all: unset;
    color: wheat;
    padding-left: 2px;
    padding-right: 2px;
    padding-top: 1px;
    padding-block: 1px;
    cursor: pointer;
  }
  .token-left {
    border-top-left-radius: 8px;
    border-bottom-left-radius: 8px;
  }
  .token-right {
    border-top-right-radius: 8px;
    border-bottom-right-radius: 8px;
  }
  .token-only {
    border-radius: 8px;
  }
  .token-selection {
    background-color: aqua;
    color: black;
  }
  .token-current {
    background-color: magenta;
    color: black;
  }
</style>
