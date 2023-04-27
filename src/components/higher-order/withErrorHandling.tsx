import { ComponentType, useCallback, useState } from 'react';
import { ErrorResponse } from '../../interfaces/FetcherResponse';
import ErrorMain from '../ErrorMain';
import Header from '../Header';

export interface WithErrorHandlingProps {
  handleErrors(response: ErrorResponse): void;
}

export function withErrorHandling<P>(ComponentBase: ComponentType<P>) {
  return function Component(props: Omit<P, 'handleErrors'>) {
    const [error, setError] = useState<string | string[] | null>(null);

    const handleErrors = useCallback(function (response: ErrorResponse) {
      setError(response.data.error);
    }, []);

    if (error)
      return (
        <>
          <Header />
          <main>
            <ErrorMain error={error} />
          </main>
        </>
      );
    return <ComponentBase handleErrors={handleErrors} {...(props as P)} />;
  };
}
