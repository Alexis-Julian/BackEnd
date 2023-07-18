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

export class Alert {
  Warning(txt) {
    Toastify({
      text: txt,
      duration: 1500,
      newWindow: true,
      close: true,
      gravity: "top",
      position: "center",
      stopOnFocus: true,
      style: {
        background: "yellow",
      },
    }).showToast();
  }
  Success(txt) {
    Toastify({
      text: txt,
      duration: 1500,
      newWindow: true,
      close: true,
      gravity: "top",
      position: "center",
      stopOnFocus: true,
      style: {
        background: "green",
      },
    }).showToast();
  }
  Error(txt) {
    Toastify({
      text: txt,
      duration: 1500,
      newWindow: true,
      close: true,
      gravity: "top",
      position: "center",
      stopOnFocus: true,
      style: {
        background: "red",
      },
    }).showToast();
  }
}
