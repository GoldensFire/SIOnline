type PressedKey = Pick<KeyboardEvent, 'key' | 'code'>;

// Characters of the layout-dependent keys in the US layout (letter and digit keys are handled separately)
const layoutKeyNames: Record<string, string> = {
	Backquote: '`',
	Backslash: '\\',
	BracketLeft: '[',
	BracketRight: ']',
	Comma: ',',
	Equal: '=',
	IntlBackslash: '\\',
	Minus: '-',
	Period: '.',
	Quote: '\'',
	Semicolon: ';',
	Slash: '/',
};

/**
 * Gets the display name of a physical key whose character depends on the keyboard layout.
 * Returns the character of this key in the US layout or undefined for other keys.
 */
export function getLayoutKeyName(code: string): string | undefined {
	if (/^(Key[A-Z]|Digit[0-9])$/.test(code)) {
		return code.charAt(code.length - 1);
	}

	return layoutKeyNames[code];
}

/**
 * Gets the key value to store in settings.
 * Layout-dependent keys are stored as physical key codes, so they work in any layout and regardless of Shift or Caps Lock.
 * Other keys (Space, arrows, function keys, numpad, etc.) are stored as key values.
 */
export function getPressedKey(e: PressedKey): string {
	return getLayoutKeyName(e.code) !== undefined ? e.code : e.key;
}

/**
 * Checks whether the pressed key matches the key stored in settings.
 * Supports both physical key codes and key values (including the ones saved by previous versions).
 */
export function matchesKey(e: PressedKey, key: string | null): boolean {
	return !!key && (e.code === key || e.key === key);
}
