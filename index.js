const authorName = document.getElementById("author");

fetch(
  "https://api.unsplash.com/photos/random?client_id=kSz-T1a0U_D5i3lBSZM0Ho9n-UtaWb0PLczj0axsKNs&query=nature"
)
  .then((res) => res.json())
  .then((data) => {
    document.body.style.backgroundImage = `url(${data.urls.full})`;
    authorName.textContent = `By: ${data.user.name}`;
  });
