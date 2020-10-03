import { isUrl } from '@/lib/util';

type Props = {
  data?: {
    value?: string;
  };
};

const SparqlResultCell = ({ data }: Props) => {
  if (!data) return null;

  const value = data?.value ?? null;
  if (typeof value === 'string' && isUrl(value)) {
    return <a href={value}>{value}</a>;
  } else {
    return <>{value}</>;
  }
};

export default SparqlResultCell;
