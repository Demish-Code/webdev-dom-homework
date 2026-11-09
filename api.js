const host = "https://wedev-api.sky.pro/api/v1/danya-demish/comments";

export function getCommentsApi() {
  return fetch(host, {
    method: "GET",
  }).then(function (response) {
    return response.json();
  });
}

export function postCommentApi(name, text) {
  return fetch(host, {
    method: "POST",
    body: JSON.stringify({
      name: name,
      text: text,
    }),
  });
}