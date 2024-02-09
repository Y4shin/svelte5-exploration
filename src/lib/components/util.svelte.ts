import { getContext, hasContext, setContext, type Snippet } from 'svelte';

export type ActiveId = string | null;
export type Collapse = boolean;
export type AccordionState = {
	value: ActiveId;
	collapse: boolean;
};
export type AccordionItemProps = {
	body: Snippet;
	title: Snippet;
	open?: boolean;
};
export type AccordionProps = {
	children: Snippet;
	collapse: boolean;
};

export const createAccordionState = (collapse: boolean) => {
	let _currentActiveId: ActiveId = $state(null);
	const state: AccordionState = {
		get value() {
			return _currentActiveId;
		},
		set value(value: ActiveId) {
			_currentActiveId = value;
		},
		collapse
	};
	$inspect(_currentActiveId);
	setContext('accordionState', state);
};

export const getAccordionState = (): AccordionState => {
	if (hasContext('accordionState')) {
		return getContext('accordionState');
	} else {
		throw new Error('AccordionItem outside of Accordion!');
	}
};
