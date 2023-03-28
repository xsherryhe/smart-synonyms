import { ComponentType, useCallback, useState } from 'react';
import { ErrorResponse } from '../../interfaces/FetcherResponse';

export interface WithErrorHandlingProps {
  handleErrors(response: ErrorResponse): void;
}

export function withErrorHandling<P>(ComponentBase: ComponentType<P>) {
  return function Component(props: Omit<P, 'handleErrors'>) {
    const [error, setError] = useState<string | null>(null);

    const handleErrors = useCallback(function (response: ErrorResponse) {
      setError(response.data.error);
    }, []);

    if (error) return <div className="error">{error}</div>;

    return <ComponentBase handleErrors={handleErrors} {...(props as P)} />;
  };
}
