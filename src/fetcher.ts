import server from './server';
import {
  ErrorDataFromServer,
  FetcherResponse,
} from './interfaces/FetcherResponse';

const errorMessage = 'Sorry, something went wrong.';
const getErrorMessage = (status: number, data: ErrorDataFromServer) =>
  data.error ||
  data.errors ||
  { 404: 'Page not found.' }[status] ||
  errorMessage;

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
): Promise<FetcherResponse> {
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
    return {
      type: 'error',
      data: { error: errorMessage },
    };
  }

  const status = response.status;
  let data: unknown;
  try {
    data = await response.json();
  } catch {
    data = {};
  }

  if (status < 400) return { type: 'success', status, data };
  else {
    return {
      type: 'error',
      status,
      data: { error: getErrorMessage(status, data as ErrorDataFromServer) },
    };
  }
}
