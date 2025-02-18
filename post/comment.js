function loadComments(postId, token) {
    fetch(`${API_BASE_URL}/comments/post/${postId}`, {
        headers: { "Authorization": `Bearer ${token}` }
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            displayComments(postId, data.response.comments, token);
        }
    });
}

function displayComments(postId, comments, token) {
    const commentsContainer = document.getElementById("comments");
    commentsContainer.innerHTML = "";

    comments.forEach(comment => {
        let commentElement = document.createElement("div");
        commentElement.classList.add("comment");
        commentElement.innerHTML = `
            <p>${comment.username}: ${comment.content}</p>
            <button onclick="toggleReplies(${comment.id}, '${token}')">Show Replies</button>
            <div class="replies" id="replies-${comment.id}" style="display: none;"></div>
        `;
        commentsContainer.appendChild(commentElement);
    });
}

function toggleReplies(commentId, token) {
    const repliesContainer = document.getElementById(`replies-${commentId}`);
    if (repliesContainer.style.display === "none") {
        loadReplies(commentId, token);
        repliesContainer.style.display = "block";
    } else {
        repliesContainer.style.display = "none";
    }
}

function loadReplies(commentId, token) {
    fetch(`${API_BASE_URL}/comments/${commentId}/replies`, {
        headers: { "Authorization": `Bearer ${token}` }
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            displayReplies(commentId, data.response.comments, token);
        }
    });
}

function displayReplies(commentId, replies) {
    const repliesContainer = document.getElementById(`replies-${commentId}`);
    repliesContainer.innerHTML = "";

    replies.forEach(reply => {
        let replyElement = document.createElement("div");
        replyElement.classList.add("reply");
        replyElement.innerHTML = `<p>${reply.username}: ${reply.content}</p>`;
        repliesContainer.appendChild(replyElement);
    });
}