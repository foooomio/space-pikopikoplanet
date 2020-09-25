import React from 'react';
import { isUrl } from '@/lib/util';

type Props = {
  data: any;
};

const SparqlResultCell: React.FC<Props> = ({ data }) => {
  if (!data) return null;

  const value = data?.value ?? null;
  if (isUrl(value)) {
    return (
      <>
        {'<'}
        <a href={value}>{value}</a>
        {'>'}
      </>
    );
  } else {
    return value;
  }
};

export default SparqlResultCell;
