import { getContext, hasContext, setContext } from 'svelte';

export type SelectCanvasProps = {
	tokens: string[];
};
export type SelectItemProps = {
	text: string;
	idx: number;
};
export type Selection = {
	start: number;
	end: number;
};
export type ItemDisplayState = {
	type: 'selection' | 'current';
	pos: 'left' | 'right' | 'middle' | 'only';
} | null;
export type CurrentSelectedContext = {
	start: number;
	current: number;
} | null;
export type SelectState = {
	readonly state: CurrentSelectedContext;
	readonly selections: Selection[];
	getItemState: (idx: number) => ItemDisplayState;
	onClick: (idx: number) => void;
	onHover: (idx: number) => void;
};

export const createSelectState = (): SelectState => {
	let _state: CurrentSelectedContext = $state(null);
	const _selections: Selection[] = $state([]);
	const res = {
		get state() {
			return _state;
		},
		get selections() {
			return _selections;
		},
		getItemState(idx: number): ItemDisplayState {
			if (_state) {
				if (_state.start < _state.current && _state.start <= idx && idx <= _state.current) {
					if (idx === _state.start) {
						return {
							type: 'current',
							pos: 'left'
						};
					} else if (idx === _state.current) {
						return {
							type: 'current',
							pos: 'right'
						};
					} else {
						return {
							type: 'current',
							pos: 'middle'
						};
					}
				} else if (_state.start >= _state.current && _state.current <= idx && idx <= _state.start) {
					if (_state.current === _state.start) {
						return {
							type: 'current',
							pos: 'only'
						};
					}
					if (idx === _state.current) {
						return {
							type: 'current',
							pos: 'left'
						};
					} else if (idx === _state.start) {
						return {
							type: 'current',
							pos: 'right'
						};
					} else {
						return {
							type: 'current',
							pos: 'middle'
						};
					}
				}
			}
			const selection = _selections.find((x) => {
				return x.start <= idx && idx <= x.end;
			});
			if (selection) {
				if (selection.start === selection.end) {
					return {
						type: 'selection',
						pos: 'only'
					};
				} else if (selection.start === idx) {
					return {
						type: 'selection',
						pos: 'left'
					};
				} else if (selection.end === idx) {
					return {
						type: 'selection',
						pos: 'right'
					};
				} else {
					return {
						type: 'selection',
						pos: 'middle'
					};
				}
			} else {
				return null;
			}
		},
		onClick(idx: number) {
			if (!_state) {
				const removeIdx = _selections.findIndex((x) => {
					return x.start <= idx && idx <= x.end;
				});
				if (removeIdx !== -1) {
					_selections.splice(removeIdx, 1);
				} else {
					_state = { start: idx, current: idx };
				}
			} else {
				if (_state.start < _state.current) {
					_selections.push({ start: _state.start, end: _state.current });
				} else {
					_selections.push({ start: _state.current, end: _state.start });
				}
				_state = null;
			}
		},
		onHover(idx: number) {
			if (
				_state &&
				!(
					(_state.start <= _state.current &&
						_selections.find((x) => _state && _state.start <= x.start && x.start <= idx)) ||
					(_state.start >= _state.current &&
						_selections.find((x) => _state && _state.start >= x.end && x.end >= idx))
				)
			) {
				_state.current = idx;
			}
		}
	};
	setContext('selectState', res);
	return res;
};

export const getSelectState = (): SelectState => {
	if (hasContext('selectState')) {
		return getContext('selectState');
	} else {
		throw new Error('AccordionItem outside of Accordion!');
	}
};
