import { getCommentsApi } from "./api.js";
import { setComments } from "./comments.js";
import { renderComments } from "./renderComments.js";
import { initFormListeners } from "./listeners.js";

export function fetchAndRenderComments() {
  getCommentsApi().then(function (responseData) {
    const appComments = responseData.comments.map(function (comment) {
      return {
        name: comment.author.name,
        date: comment.date,
        text: comment.text,
        likes: comment.likes,
        isLiked: false,
      };
    });

    setComments(appComments);
    renderComments();
  });
}

fetchAndRenderComments();
initFormListeners(fetchAndRenderComments);