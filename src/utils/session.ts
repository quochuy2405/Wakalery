export function setSessionWithExpiry(
	key: string,
	value: any,
	expirationMinutes: number
) {
	const now = new Date();
	const item = {
		value: value,
		expiry: now.getTime() + expirationMinutes * 60 * 1000,
	};
	sessionStorage.setItem(key, JSON.stringify(item));
}

export function getSessionWithExpiry(key: string) {
	const itemString = sessionStorage.getItem(key);
	if (!itemString) {
		return null;
	}

	const item = JSON.parse(itemString);
	const now = new Date();

	if (now.getTime() > item.expiry) {
		sessionStorage.removeItem(key);
		return null;
	}

	return item.value;
}
