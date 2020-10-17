import Link from 'next/link';
import {
  Segment,
  Container,
  Header,
  Message,
  Table,
  Button,
} from 'semantic-ui-react';
import Layout from '@/components/common/layout';
import Head from '@/components/common/head';

const SparqlGuidePage = () => {
  return (
    <Layout>
      <Head subtitle="SPARQLエンドポイントガイド" />

      <Segment>
        <Container text>
          <Header as="h2">SPARQLエンドポイントガイド</Header>

          <Message
            warning
            icon="exclamation triangle"
            header="この機能は実験的です。以下の制約があります。"
            list={[
              'クエリ形式は SELECT のみに対応しています。',
              'クエリ結果は JSON 形式のみに対応しています。',
              '複雑なクエリは結果を返せない可能性があります。',
            ]}
          />

          <Header as="h3">概要</Header>
          <p>
            ☆ピコピコプラネット☆ SPACE では、SPARQL を用いて、投稿された SPARQL
            クエリを検索することができます。投稿されたクエリは、
            <a href="https://creativecommons.org/licenses/by/4.0/deed.ja">
              CC BY 4.0
            </a>{' '}
            が付与されているため、オープンデータとして利用することができます。
          </p>

          <Header as="h3">エンドポイントURL</Header>
          <p>https://space.pikopikopla.net/sparql</p>

          <Header as="h3">RDFスキーマ</Header>
          <Table celled size="small">
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>プロパティ</Table.HeaderCell>
                <Table.HeaderCell>URI</Table.HeaderCell>
                <Table.HeaderCell>DataType</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              <Table.Row>
                <Table.Cell>タイトル</Table.Cell>
                <Table.Cell>schema:name</Table.Cell>
                <Table.Cell>xsd:string</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>作者</Table.Cell>
                <Table.Cell>schema:creator</Table.Cell>
                <Table.Cell>xsd:string</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>エンドポイント</Table.Cell>
                <Table.Cell>schema:material</Table.Cell>
                <Table.Cell>URI</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>クエリ</Table.Cell>
                <Table.Cell>schema:text</Table.Cell>
                <Table.Cell>xsd:string</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>作成日</Table.Cell>
                <Table.Cell>schema:dateCreated</Table.Cell>
                <Table.Cell>xsd:dateTime</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>更新日</Table.Cell>
                <Table.Cell>schema:dateModified</Table.Cell>
                <Table.Cell>xsd:dateTime</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>タグ</Table.Cell>
                <Table.Cell>schema:keywords</Table.Cell>
                <Table.Cell>xsd:string</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>ライセンス</Table.Cell>
                <Table.Cell>schema:license</Table.Cell>
                <Table.Cell>URI</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>著作年</Table.Cell>
                <Table.Cell>schema:copyrightYear</Table.Cell>
                <Table.Cell>xsd:integer</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>著作者</Table.Cell>
                <Table.Cell>schema:copyrightHolder</Table.Cell>
                <Table.Cell>xsd:string</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>URL</Table.Cell>
                <Table.Cell>schema:url</Table.Cell>
                <Table.Cell>URI</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>フォーク元</Table.Cell>
                <Table.Cell>schema:isBasedOn</Table.Cell>
                <Table.Cell>URI</Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table>

          <Header as="h3">サンプルクエリ</Header>
          <p>
            <Link href="/search?endpoint=https%3A%2F%2Fspace.pikopikopla.net%2Fsparql">
              <a>☆ピコピコプラネット☆ SPACE のクエリの検索結果</a>
            </Link>
          </p>

          <Segment basic textAlign="center">
            <Link href="/compose?endpoint=https%3A%2F%2Fspace.pikopikopla.net%2Fsparql">
              <a>
                <Button
                  color="teal"
                  size="large"
                  content="☆ピコピコプラネット☆ SPACE のクエリを新規作成"
                />
              </a>
            </Link>
          </Segment>
        </Container>
      </Segment>
    </Layout>
  );
};

export default SparqlGuidePage;
