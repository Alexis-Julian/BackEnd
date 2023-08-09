import path from 'path';
import { fileURLToPath } from 'url';
const url = fileURLToPath(import.meta.url);

export const file = path.dirname(url);

export default (app) => {
  app.set('views', file + '/views');
  app.set('view engine', 'handlebars');
};
