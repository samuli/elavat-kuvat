import { searchUrl, recordFields } from '@/lib/api.js';
import Fetcher from '@/lib/fetcher';
import fs from 'fs';

global.fetch = require("node-fetch");

const downloadRecords = async () => {
  let page = 1;
  const limit = 100;
  const maxPages = 50;
  let fetchMore = true;
  while(fetchMore && page < maxPages) {
    const url = searchUrl('', page++, null, null, null, limit, recordFields);
    console.log(`page ${page} - ${url}`);
    const data = await Fetcher(url);
    if (data.status === 'OK' && data.records && data.records.length > 0) {
      data.records.forEach(rec => {
        const file = encodeURIComponent(rec.id);
        fs.writeFileSync(`./data/records/${file}.json`, JSON.stringify(rec));
      });
    } else {
      fetchMore = false;
    }
  }
  console.log(`Done. Downloaded ${page-1} pages`);
};

// export default downloadRecords;

downloadRecords();
