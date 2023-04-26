import { wait } from './wait';

export const retryPromiseWithDelay = async <T>(
	promise: () => Promise<T>,
	delay: number,
	retries = 3
): Promise<T> => {
	try {
		return await promise();
	} catch (error) {
		if (retries === 0) throw error;
		await wait(delay);
		console.log(`Retrying ${retries} more times...`);
		return await retryPromiseWithDelay(promise, delay, retries - 1);
	}
};
