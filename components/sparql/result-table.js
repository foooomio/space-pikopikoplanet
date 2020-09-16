import { Table, Segment } from 'semantic-ui-react';

export default function SparqlResultTable({ result }) {
  if (!result) return null;

  const variables = result.head.vars;
  const bindings = result.results.bindings;

  return (
    <Segment
      attached
      style={{
        borderBottom: result ? 'inherit' : 'none',
        padding: '0',
        overflow: 'auto',
      }}
    >
      <Table celled striped compact unstackable style={{ border: '0' }}>
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
                <Table.Cell key={index}>{binding[variable]?.value}</Table.Cell>
              ))}
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </Segment>
  );
}
