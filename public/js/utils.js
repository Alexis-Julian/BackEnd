export default function getPageQuery(url, callback) {
  let page;
  url.searchParams.forEach((key, value) => {
    if (value == "page") page = key;
  });
  if (!page) page = 1;
  callback(parseInt(page));
}

export const ConfirmPassword = (password, confpass) => {
  return password.value == confpass.value;
};

/* export const Fetch = async (url) => {
  let url = url;
  let data = await fetch(url, {
    method: verb,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(register),
  });
  let json = await data.json();
  return json;
}; */
