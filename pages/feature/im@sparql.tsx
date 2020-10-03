import Layout from '@/components/common/layout';
import Head from '@/components/common/head';
import Hero from '@/components/common/hero';
import QuerySearchList from '@/components/query/search-list';

const endpoint = 'https://sparql.crssnky.xyz/spql/imas/query';

const Imasparql = () => {
  const hero = (
    <Hero
      title="im@sparql"
      description="広がるアイドルマスターの世界をオープンデータ化。300人以上のアイドルのデータを収録。LODチャレンジ2018 データセット部門 優秀賞受賞。"
      endpoint={endpoint}
      website="https://sparql.crssnky.xyz/imas/"
      style={{ backgroundColor: '#ffe4e1' }}
    />
  );

  return (
    <Layout hero={hero}>
      <Head subtitle="im@sparql" />

      <QuerySearchList searchOptions={{ endpoint }} />
    </Layout>
  );
};

export default Imasparql;
