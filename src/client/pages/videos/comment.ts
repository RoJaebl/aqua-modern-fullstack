import $ from "jquery";

const videoId = $("#videoContainer").data("id");

const handleRemove = async (e) => {
  const id = $(e.target).parent().data("id");
  const res = await fetch(`/api/videos/${videoId}/comment`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id }),
  });
  res.status === 201 && $(e.target).parent().remove();
};

const addComment = (text: string, newCommentId: string) => {
  const icon = $("<i>").prop({ className: "fas fa-comment" });
  const comment = $("<span>").prop({ innerText: text });
  const remover = $("<i>").prop({ className: "fas fa-x" }).on({
    click: handleRemove,
  });
  const commentItem = $("<li>")
    .data({ id: newCommentId })
    .prop({ className: "video__comment" })
    .append([icon, comment, remover]);
  $(".video__comments ul").prepend(commentItem);
};

const handleSubmit = async (e) => {
  e.preventDefault();
  const text = $(e.target).children("textarea").prop("value");
  if (!text) return;

  const res = await fetch(`/api/videos/${videoId}/comment`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ text }),
  });
  res.status === 201 && addComment(text, (await res.json()).id);
  $(e.target).children("textarea").prop({ value: "" });
};

$(function () {
  $("ul li >:nth-child(3)").on({ click: handleRemove });
  $("#commentForm").on({ submit: handleSubmit });
});
