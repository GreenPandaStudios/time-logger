export async function makeRequest<TRequest,TResponse>(path: string, body: TRequest): Promise<TResponse | void> {


    // Make sure the path starts with /
    if (!path.startsWith('/')) {
        path = '/' + path;
    }

    // Construct the URL from a path
    const url = process.env.REACT_APP_API_URL ?? "http://localhost:8080/api" + path;

    return fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
        body: body ? JSON.stringify(body) : undefined
    }).then(async (response) => {
        if (!response.ok) {
            throw new Error(`Failed to fetch data: ${response.statusText}`);
        }
        const data = await response.json();
        return data as TResponse;
    }).catch((error) => {
    // Do nothing for now
    });
}