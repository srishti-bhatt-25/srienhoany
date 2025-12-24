/* =======================
   POEM DATA
======================= */

const poems = [
  {
    id: 1,
    title: "Almost Lovers",
    category: "Unrequited Love",
    body: `
Why do we meet someone if we can’t keep them?
A perfect story, a dreamy face…!
Butterflies in the stomach…!
And endless chats…!
Only to watch it all fade away…??
What is the point of meeting the right person,
When the timing is always wrong?
How do you hold on to something,
That was never meant to stay for long…!
If meeting you was destiny,
Was losing you my fate?
Or was it just a chapter?
Teaching me not to fall for fate…!`
  },
  {
    id: 2,
    title: "I Swear I Tried",
    category: "Unsaid Feelings",
    body: `I tried to unlove you,
I swear I tried…!
But how can I forget,
Forget the eyes, that feels like ocean to me…!
That drowns me deep inside them…!

Forget your glance,
That makes me shiver!
How can I avoid the urge,
Urge to find you in the hall, full of people…!
And when finally, I get to see you!
I just can’t take my eyes off you…!

“If it stays, it’s love
If it ends, it’s a love story…!”

And if it never begins,
It’s a poetry!”`
  },
  {
    id: 3,
    title: "When The Elder Daughter Cries",
    category: "Womanhood",
    body: `When the daughter finally cries,
It’s just not tears, it’s a fear…!
It’s the breaking of that dam,
That has kept the floodgates for so long…!

She cried finally, she did it,
Asking why she had been punished…!
Her cries are questions, sharp and deep,
Why this burden she’s forced to keep?

The cry was not normal,
It was not just a cry,
It’s a lioness’s roar, fierce and high…!

Not mere tears, but rivers of pain,
A storm that’s been held back in vain…!
Why is the question she has been asking…!
When the daughter cries, the world should hear,
Not just her pain, but her story persevere…!
For from her roar, the world will learn,
A daughter’s strength can the tides turn…!`
  },
  {
    id: 4,
    title: "Self Love",
    category: "Self Love",
    body: `
I stopped waiting to be chosen,
And learned to choose myself.
Every scar became a lesson,
Every fall, a step ahead.

I am not who I was yesterday
And that is my quiet victory...!`
  }
];


/* =======================
   PAGE NAVIGATION
======================= */
function showPage(pageId) {
  document.querySelectorAll(".page").forEach(p => p.classList.add("hidden"));
  const target = document.getElementById(pageId);

  if (target) target.classList.remove("hidden");
  else console.error("Page not found:", pageId);

  window.scrollTo(0, 0);

  if (pageId === "poetry") renderPoems(poems);
}

function toggleSidebar() {
  document.getElementById("sidebar").classList.toggle("hidden");
}

function navigate(pageId) {
  toggleSidebar();
  showPage(pageId);
}


/* =======================
   POETRY LIST + FILTER
======================= */
function renderPoems(list) {
  const container = document.getElementById("poem-list");
  container.innerHTML = "";

  list.forEach(poem => {
    const card = document.createElement("div");
    card.className = "poem-card";
    card.innerHTML = `
      <h3>${poem.title}</h3>
      <p>${poem.category}</p>
    `;
    card.onclick = () => openPoem(poem.id);
    container.appendChild(card);
  });
}

function filterPoems(category) {
  if (category === "all") renderPoems(poems);
  else renderPoems(poems.filter(p => p.category === category));
}

function openPoem(id) {
  const poem = poems.find(p => p.id === id);
  if (!poem) return;

  document.getElementById("poem-title").innerText = poem.title;
  document.getElementById("poem-body").innerText = poem.body;

  showPage("poem-detail");
}


/* =======================
   SHOP / PRODUCT
======================= */
function openProduct() {
  showPage("product-detail");
}

function buyNow() {
  window.open("https://www.amazon.in/dp/9368681384", "_blank");
}

function addToCart() {
  const isLoggedIn = localStorage.getItem("loggedIn");
  if (!isLoggedIn) return openAuth();
  alert("Added to cart 🤍");
}


/* =======================
   BASIC ACTIONS
======================= */
function subscribe() {
  alert("Thank you for subscribing 🤍\nSrien will write to you soon.");
}

function openInstagram() {
  window.open("https://instagram.com/sri._.krise", "_blank");
}


/* =======================
   AUTH MODAL + FIREBASE
======================= */
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut
} from "https://www.gstatic.com/firebasejs/12.7.0/firebase-auth.js";

const auth = getAuth();
let authMode = "login";

function openAuth() {
  document.getElementById("auth-modal").classList.remove("hidden");
}

function closeAuth() {
  document.getElementById("auth-modal").classList.add("hidden");
}

function toggleAuthMode() {
  authMode = authMode === "login" ? "register" : "login";
  document.getElementById("auth-title").innerText =
    authMode === "login" ? "Login" : "Register";
}

async function authSubmit() {
  const email = document.getElementById("auth-email-input").value;
  const pass = document.getElementById("auth-pass-input").value;

  try {
    if (authMode === "register") {
      await createUserWithEmailAndPassword(auth, email, pass);
      alert("Account created ✨");
    } else {
      await signInWithEmailAndPassword(auth, email, pass);
      alert("Logged in 🤍");
    }

    localStorage.setItem("loggedIn", true);
    closeAuth();
  } catch (err) {
    alert(err.message);
  }
}

function logout() {
  signOut(auth);
  localStorage.removeItem("loggedIn");
  alert("Logged out");
}


/* =======================
   INIT
======================= */
lucide.createIcons();
showPage("home");
window.showPage = showPage;
window.toggleSidebar = toggleSidebar;
window.navigate = navigate;
window.filterPoems = filterPoems;
window.openPoem = openPoem;
window.openProduct = openProduct;
window.buyNow = buyNow;
window.addToCart = addToCart;
window.subscribe = subscribe;
window.openInstagram = openInstagram;
window.openAuth = openAuth;
window.closeAuth = closeAuth;
window.toggleAuthMode = toggleAuthMode;
window.authSubmit = authSubmit;
window.logout = logout;
