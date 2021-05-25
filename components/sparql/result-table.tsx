import { useState } from 'react';
import { Segment, Table, Pagination } from 'semantic-ui-react';
import SparqlResultCell from '@/components/sparql/result-cell';
import { ROWS_IN_SPARQL_RESULT_TABLE } from '@/lib/constants';
import type { SparqlResult } from '@/lib/types';

type Props = {
  result: SparqlResult;
};

const SparqlResultTable = ({ result }: Props) => {
  const [page, setPage] = useState<number>(1);
  const narrowPagination = document.body.clientWidth < 600;

  const variables = result.head.vars;
  const bindings = result.results.bindings;

  return (
    <Segment
      attached="bottom"
      style={{
        borderBottom: result ? undefined : 'none',
        padding: '0',
        overflow: 'auto',
      }}
    >
      <Table
        celled
        striped
        compact
        unstackable
        style={{ border: '0', whiteSpace: 'pre-wrap' }}
      >
        <Table.Header>
          <Table.Row>
            {variables.map((variable, index) => (
              <Table.HeaderCell key={index}>{variable}</Table.HeaderCell>
            ))}
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {bindings
            .slice(
              ROWS_IN_SPARQL_RESULT_TABLE * (page - 1),
              ROWS_IN_SPARQL_RESULT_TABLE * page
            )
            .map((binding, index) => (
              <Table.Row key={index}>
                {variables.map((variable, index) => (
                  <Table.Cell key={index}>
                    <SparqlResultCell data={binding[variable]} />
                  </Table.Cell>
                ))}
              </Table.Row>
            ))}
        </Table.Body>

        {bindings.length > ROWS_IN_SPARQL_RESULT_TABLE && (
          <Table.Footer>
            <Table.Row>
              <Table.HeaderCell colSpan={variables.length}>
                <Pagination
                  floated="right"
                  activePage={page}
                  totalPages={Math.ceil(
                    bindings.length / ROWS_IN_SPARQL_RESULT_TABLE
                  )}
                  onPageChange={(e, { activePage }) =>
                    setPage(Number(activePage))
                  }
                  size={narrowPagination ? 'mini' : 'tiny'}
                  siblingRange={narrowPagination ? 0 : 2}
                  firstItem={narrowPagination ? null : undefined}
                  lastItem={narrowPagination ? null : undefined}
                />
              </Table.HeaderCell>
            </Table.Row>
          </Table.Footer>
        )}
      </Table>
    </Segment>
  );
};

export default SparqlResultTable;
