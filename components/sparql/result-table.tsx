import { Table, Segment } from 'semantic-ui-react';
import SparqlResultCell from '@/components/sparql/result-cell';
import type { SparqlResult } from '@/lib/types';

type Props = {
  result: SparqlResult | null;
};

const SparqlResultTable = ({ result }: Props) => {
  if (!result) return null;

  const variables = result.head.vars;
  const bindings = result.results.bindings;

  return (
    <Segment
      attached="bottom"
      style={{
        borderBottom: result ? 'inherit' : 'none',
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
          {bindings.map((binding, index) => (
            <Table.Row key={index}>
              {variables.map((variable, index) => (
                <Table.Cell key={index}>
                  <SparqlResultCell data={binding[variable]} />
                </Table.Cell>
              ))}
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </Segment>
  );
};

export default SparqlResultTable;
