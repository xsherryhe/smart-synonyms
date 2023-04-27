interface ErrorMainProps {
  error: string | string[];
}

export default function ErrorMain({ error }: ErrorMainProps) {
  if (Array.isArray(error))
    return (
      <ul className="error">
        {error.map((message, i) => (
          <li key={i}>{message}</li>
        ))}
      </ul>
    );

  return <div className="error">{error}</div>;
}
