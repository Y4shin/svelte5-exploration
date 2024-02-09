<script lang="ts">
  import { createAccordionState, type AccordionProps } from "./util.svelte";

	let { children, collapse } = $props<AccordionProps>();

	createAccordionState(collapse);
</script>

<div class="accordion">
	{@render children()}
</div>



<style>
	.accordion {
		width: var(--accordion-width, 100%);
		padding: var(--accordion-padding, 1rem);
		color: var(--accordion-color, hsl(220 10% 98%));
		background-color: var(--accordion-background, hsl(220 10% 16%));
		border-radius: var(--accordion-radius, 4px);
		box-shadow: var(--accordion-shadow, 0px 1px 20px hsl(220 10% 8%));
	}
</style>
