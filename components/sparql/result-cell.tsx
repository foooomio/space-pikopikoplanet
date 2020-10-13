type Props = {
  data?: {
    type: 'uri' | 'literal' | 'bnode';
    value: string;
    datatype?: string;
    'xml:lang'?: string;
  };
};

const SparqlResultCell = ({ data }: Props) => {
  if (!data) return null;

  if (data.type === 'uri') {
    return <a href={data.value}>{data.value}</a>;
  } else {
    return <>{data.value}</>;
  }
};

export default SparqlResultCell;
