export default function getPageQuery(url, callback) {
  let page;
  url.searchParams.forEach((key, value) => {
    if (value == "page") page = key;
  });
  callback(parseInt(page));
}
