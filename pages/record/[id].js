//import fs from 'fs';
//import path from 'path';
import View from '@/pages/view';

//const getDataDir = () => path.join(process.cwd(), 'data/records');

// export async function getStaticPaths() {
//   if (Boolean(process.env.NO_STATIC_EXPORT)) {
//     return { paths: [], fallback: false };
//   }

//   const dataDir = getDataDir();
//   const filenames = fs.readdirSync(dataDir);
//   const recIds = filenames.map(name => name.split('.json')[0]);

//   return {
//     paths: recIds.map((id) => {
//       return { params: { id } }
//     }),
//     fallback: false
//   }
// }

// export async function getStaticProps({ params }) {
//   const dataDir = getDataDir();
//   let data = null;
//   try {
//      data = JSON.parse(fs.readFileSync(`${dataDir}/${params.id}.json`));
//   } catch (e) {
//   }
//   return { props: { id: params.id, data } };
// }

export default function Record({ data, id }) {
  return <View recordData={{ resultCount: 1, records: [data]}} id={id} />;
};
