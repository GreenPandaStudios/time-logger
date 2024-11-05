export async function streamText<TRequest>(
	path: string,
	body: TRequest,
	callback: (message: string) => void
): Promise<void> {
	// Make sure the path starts with /
	if (!path.startsWith("/")) {
		path = "/" + path;
	}

	// Construct the URL from a path
	const url =
		process.env.REACT_APP_API_URL ?? "http://localhost:8080/api" + path;

	const response = await fetch(url, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			"Access-Control-Allow-Origin": "*",
		},
		body: body ? JSON.stringify(body) : undefined,
	});
	const decoder = new TextDecoder("utf-8");

	const reader = response.body?.getReader();

	if (!reader) {
		throw new Error("Failed to get response body reader");
	}

	let result = "";
	while (true) {
		const { done, value } = await reader.read();

		if (done) break; // End of stream

		result += decoder.decode(value, { stream: true });
		callback(result);
	}
}
/*
export async function streamText<TRequest>(
	path: string,
	body: TRequest,
	callback: (message: string) => void
): Promise<void> {
	let result = "";
	const apples =
		"I really like apples, and this is a lot of text to try to test something.\n ** Apples ** are the best fruit in the world. \n";

	let index = 0;
	const done = false;

	while (index < apples.length) {
		result += apples[index];
		callback(result);
		index++;
		await new Promise((resolve) => setTimeout(resolve, 25));
	}
}
*/
