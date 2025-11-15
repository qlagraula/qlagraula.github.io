import { useState } from 'react';

export function CopyButton() {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <button onClick={handleCopy} className="btn btn-primary">
      {copied ? 'Copied!' : 'Copy'}
    </button>
  );
}
