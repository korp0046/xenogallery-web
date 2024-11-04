import fs from 'fs';
import path from 'path';

// Cache files are stored inside ./next folder
//const CACHE_PATH = path.join(__dirname, 'globalData.json');
const CACHE_DURATION = 300;

const DELAY_DURATION = 10;

function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export default async function getGlobalData(fetchFunc: Function, key: string) {
  let cachedData;
  let cacheStat;
  let seconds = 99999;

  const cachePath = path.join(__dirname, `${key}.json`);
  const lockPath = path.join(__dirname, `${key}.lock`);
  
  let locked = fs.existsSync(lockPath);
  while(locked){
    await sleep(10000);
    locked = fs.existsSync(lockPath);
  }


  // #1 - Look for cached data first
  try {
    cachedData = JSON.parse(fs.readFileSync(cachePath, 'utf8'));
    cacheStat = fs.statSync(cachePath);
    seconds = (new Date().getTime() - new Date(cacheStat.mtime).getTime()) / 1000;

  } catch (error) {
    console.log(`❌ CACHE ${key} NOT INITIALIZED`);
  }

  // #2 - Create Cache file if it doesn't exist
  if (!cachedData || seconds > CACHE_DURATION) {
    // Call your APIs to-be-cached here
    
    fs.writeFileSync(
      lockPath,
      'lock'
    );
    const res = await fetchFunc();

    // Store data in cache files
    // this always rewrites/overwrites the previous file
    try {
      fs.writeFileSync(
        cachePath,
        JSON.stringify(res.data)
      );
      console.log(`💾 CACHE ${key} WRITTEN SUCCESSFULLY`);
    } catch (error) {
      console.log(`❌ ERROR WRITING ${key} CACHE TO FILE\n`, error);
    }
    try {
      fs.unlinkSync(lockPath);
    } catch (error) {
      console.log(`❌ ERROR UNLOCKING ${key} CACHE\n`, error);
    }
    cachedData = res.data;
  }

  return cachedData;
}
