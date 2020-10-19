import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Loader } from 'semantic-ui-react';

const PageLoader = () => {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    router.events.on('routeChangeStart', () => setLoading(true));
    router.events.on('routeChangeComplete', () => setLoading(false));
  }, []);

  return <Loader active={loading} id="page-loader" />;
};

export default PageLoader;
