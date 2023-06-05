import { globSync } from 'glob';
import { promises as fs } from 'fs';
import { mkdirp } from 'mkdirp';
import path from 'path';

/**
 * src上のpath一覧を取得する
 * @return {string[]} path一覧 (ex. ['src/index.ts', 'src/xxx.ts'])
 */
const getSrcPaths = (): string[] => {
  const paths = globSync('./dist/**/*.js', { ignore: [__filename] });
  return paths;
};

const createBookmarklets = async () => {
  const HOSTNAME = 'example.com';

  const paths = getSrcPaths();

  const promises: Promise<void>[] = [];
  paths.map((filepath) => {
    const filepathWithoutDist = filepath.replace('dist/', '');
    const savePath = `bookmarklets/${filepathWithoutDist}`;
    const template = `javascript:(function () {
  document.body
    .appendChild(document.createElement('script'))
    .src = "https://${HOSTNAME}/${filepathWithoutDist}";
})();`;

    mkdirp.sync(`./${path.dirname(savePath)}`);
    const p = fs.writeFile(`./${savePath}`, template);
    promises.push(p);
  });
  await Promise.all(promises);
  console.log('create bookmarklets');
};

createBookmarklets();
