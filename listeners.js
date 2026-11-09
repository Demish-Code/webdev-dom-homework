import { comments } from "./comments.js";
import { renderComments } from "./renderComments.js";
import { formatDate } from "./formatDate.js";

export function initLikeListeners() {
  const likeButtonElements = document.querySelectorAll(".like-button");

  for (const likeButtonElement of likeButtonElements) {
    likeButtonElement.addEventListener("click", function (event) {
      event.stopPropagation();

      const index = likeButtonElement.dataset.index;

      if (comments[index].isLiked) {
        comments[index].likes -= 1;
        comments[index].isLiked = false;
      } else {
        comments[index].likes += 1;
        comments[index].isLiked = true;
      }

      renderComments();
    });
  }
}

export function initCommentReplyListeners() {
  const commentElements = document.querySelectorAll(".comment");
  const commentInputElement = document.querySelector(".add-form-text");

  for (const commentElement of commentElements) {
    commentElement.addEventListener("click", function () {
      const index = commentElement.dataset.index;
      const targetComment = comments[index];

      commentInputElement.value = `> ${targetComment.name}: ${targetComment.text}\n\n`;
    });
  }
}

export function initFormListeners() {
  const nameInputElement = document.querySelector(".add-form-name");
  const commentInputElement = document.querySelector(".add-form-text");
  const addButtonElement = document.querySelector(".add-form-button");

  function addComment() {
    const trimmedName = nameInputElement.value.trim();
    const trimmedComment = commentInputElement.value.trim();

    if (trimmedName === "" || trimmedComment === "") {
      if (trimmedName === "") {
        nameInputElement.classList.add("-error");
        nameInputElement.style.backgroundColor = "#ffb8b8";
      }
      if (trimmedComment === "") {
        commentInputElement.classList.add("-error");
        commentInputElement.style.backgroundColor = "#ffb8b8";
      }
      return;
    }

    const currentDate = formatDate(new Date());

    comments.push({
      name: trimmedName,
      date: currentDate,
      text: trimmedComment,
      likes: 0,
      isLiked: false,
    });

    renderComments();

    nameInputElement.value = "";
    commentInputElement.value = "";
  }

  function handleNameInput() {
    nameInputElement.classList.remove("-error");
    nameInputElement.style.backgroundColor = "";
  }

  function handleCommentInput() {
    commentInputElement.classList.remove("-error");
    commentInputElement.style.backgroundColor = "";
  }

  addButtonElement.addEventListener("click", addComment);
  nameInputElement.addEventListener("input", handleNameInput);
  commentInputElement.addEventListener("input", handleCommentInput);
}