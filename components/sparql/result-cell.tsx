import { RDFTerm } from '@/lib/types';

type Props = {
  data?: RDFTerm;
};

const SparqlResultCell = ({ data }: Props) => {
  if (!data) return null;

  if (data.type === 'uri') {
    return (
      <a href={data.value} target="_blank" rel="noopener noreferrer">
        {data.value}
      </a>
    );
  } else {
    return <>{data.value}</>;
  }
};

export default SparqlResultCell;
