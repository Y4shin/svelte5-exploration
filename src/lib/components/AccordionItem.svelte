<script lang="ts">
  import { getAccordionState, type AccordionItemProps } from "./util.svelte";
	import { slide } from "svelte/transition";

  let { body = defaultBody, title, open = false } = $props<AccordionItemProps>();

  const componentId = crypto.randomUUID();

  let state = getAccordionState();
  
  function setActive() {
    state.value = componentId;
  }

  function toggleOpen() {
    open = !open;
  }

  function handleClick() {
    state.collapse ? setActive() : toggleOpen()
  }

  $effect(() => {open && state.collapse && setActive()});
  const isActive = $derived(state.value === componentId);
  const isOpen = $derived(state.collapse ? isActive : open);
</script>

{#snippet defaultBody()}
{/snippet}

<div class="accordion-item">
  <button
    onclick={toggleOpen}
    class="accordion-toggle"
    aria-expanded={isOpen}
    aria-controls="accordion-{componentId}"
  >
    <div class="accordion-title">
      {@render title()}
    </div>

    <div class="accordion-caret" class:open={isOpen}>👉️</div>
  </button>
  {#if isOpen}
    <div
      transition:slide|local
      class="accordion-content"
      role="region"
      aria-hidden={!isOpen}
      aria-labelledby="accordion-{componentId}"
    >
      {@render body()}
    </div>
  {/if}
</div>

<style>
	.accordion-toggle {
		width: 100%;
		display: flex;
		justify-content: space-between;
		padding: var(--accordion-padding, 1rem);
		color: var(--accordion-color, inherit);
		font: inherit;
		font-weight: 600;
		border: none;
		background: none;
		cursor: pointer;
		border-radius: var(--accordion-radius, 4px);
		transition: background-color 0.1s ease;
	}

	.accordion-toggle:hover {
		background-color: var(--accordion-hover, hsl(220 20% 20%));
	}

	.accordion-caret {
		transition: rotate 0.3s ease;
	}

	.accordion-content {
		padding: var(--accordion-content-padding, 1rem);
	}

	.open {
		rotate: 90deg;
	}
</style>