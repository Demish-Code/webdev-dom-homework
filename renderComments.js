import { comments } from "./comments.js";
import { sanitizeHtml } from "./sanitize.js";
import { formatDate } from "./formatDate.js";
import {
  initLikeListeners,
  initCommentReplyListeners,
} from "./listeners.js";

export function renderComments() {
  const commentsListElement = document.querySelector(".comments");

  const commentsHtml = comments
    .map(function (comment, index) {
      return `
        <li data-index="${index}" class="comment">
          <div class="comment-header">
            <div>${sanitizeHtml(comment.name)}</div>
            <div>${formatDate(comment.date)}</div>
          </div>
          <div class="comment-body">
            <div class="comment-text">
              ${sanitizeHtml(comment.text)}
            </div>
          </div>
          <div class="comment-footer">
            <div class="likes">
              <span class="likes-counter">${comment.likes}</span>
              <button data-index="${index}" class="like-button ${
                comment.isLiked ? "-active-like" : ""
              }"></button>
            </div>
          </div>
        </li>
      `;
    })
    .join("");

  commentsListElement.innerHTML = commentsHtml;

  initLikeListeners();
  initCommentReplyListeners();
}