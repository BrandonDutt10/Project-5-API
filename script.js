const CLIENT_ID = "56feebe97d9943f2a65bb0b3f5f397fd";
const CLIENT_SECRET = "df0c82541ab8487d89c04e6892e9b3bf";

const searchBtn = document.getElementById("searchBtn");

searchBtn.addEventListener("click", searchArtist);

async function getToken() {
const res = await fetch("https://accounts.spotify.com/api/token", {
method: "POST",
headers: {
"Content-Type": "application/x-www-form-urlencoded",
"Authorization": "Basic " + btoa(CLIENT_ID + ":" + CLIENT_SECRET)
},
body: "grant_type=client_credentials"
});

const data = await res.json();
return data.access_token;
}


async function searchArtist() {
const query = document.getElementById("searchInput").value;
if (!query) return;

const token = await getToken();

const res = await fetch(`https://api.spotify.com/v1/search?q=${query}&type=artist`, {
headers: {
"Authorization": "Bearer " + token
}
});

const data = await res.json();
displayResults(data.artists.items);
}


function displayResults(artists) {
const container = document.getElementById("results");
container.innerHTML = "";

artists.forEach((artist, index) => {
const card = document.createElement("div");
card.className = "card";


const img = artist.images[0]?.url || "";
card.innerHTML = `
  <img src="${img}">
  <h3>${artist.name}</h3>
`;

container.appendChild(card);

const { decay } = window.popmotion;

decay({
  from: -200,
  velocity: 200 + index * 50
}).start(v => {
  card.style.transform = `translateX(${v}px)`;
});
```

});
}
