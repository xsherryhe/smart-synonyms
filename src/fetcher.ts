import server from './server';
import ErrorResponse from './interfaces/ErrorResponse';

const errorMessage = 'Sorry, something went wrong.';
const statusErrorMessage = (status: number) =>
  ({ 404: 'Page not found.' }[status] || 'Sorry, something went wrong.');

function duration(milliseconds: number, promise: Promise<any>) {
  const timeout: Promise<Error> = new Promise((_, reject) =>
    setTimeout(
      () => reject(new Error('Timed out. Please try again.')),
      milliseconds
    )
  );

  return Promise.race([promise, timeout]);
}

export default async function fetcher(
  path: string = '',
  {
    headers = {},
    query = '',
    ...options
  }: { headers?: {}; query?: string } = {}
) {
  let response: Response;
  try {
    response = await duration(
      5000,
      fetch(`${server}/${path}.json${query ? `?${query}` : ''}`, {
        mode: 'cors',
        headers,
        ...options,
      })
    );
  } catch {
    const errorResponse: ErrorResponse = { data: { error: errorMessage } };
    return errorResponse;
  }

  const status = response.status;
  let data: unknown;
  try {
    data = await response.json();
  } catch {
    data = {};
  }

  if (status < 400) return { status, data };
  else {
    const errorResponse: ErrorResponse = {
      status,
      data: { error: statusErrorMessage(status) },
    };
    return errorResponse;
  }
}
