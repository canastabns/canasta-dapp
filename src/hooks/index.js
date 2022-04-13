import { useEffect, useState } from 'react';

export function useBeforeFirstRender(f) {
  const [hasRendered, setHasRendered] = useState(false);
  useEffect(() => {
    if (!hasRendered) {
      setHasRendered(true);
      f();
    }
  }, [hasRendered]);
}
