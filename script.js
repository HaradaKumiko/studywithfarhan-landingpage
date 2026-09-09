/*
 * ============================
 * DARK MODE
 * ============================
 */

const root =
  document.documentElement;

const toggle =
  document.getElementById(
    "themeToggle"
  );

const savedTheme =
  localStorage.getItem(
    "theme"
  );

if (savedTheme) {
  root.dataset.theme =
    savedTheme;
} else if (
  window.matchMedia(
    "(prefers-color-scheme: dark)"
  ).matches
) {
  root.dataset.theme =
    "dark";
}

function updateThemeIcon() {
  toggle.textContent =
    root.dataset.theme === "dark"
      ? "☀"
      : "☾";
}

updateThemeIcon();

toggle.addEventListener(
  "click",
  () => {
    const nextTheme =
      root.dataset.theme === "dark"
        ? "light"
        : "dark";

    root.dataset.theme =
      nextTheme;

    localStorage.setItem(
      "theme",
      nextTheme
    );

    updateThemeIcon();
  }
);

/*
 * ============================
 * CONSOLE EASTER EGG
 * ============================
 */

console.log(
  "%cHey, curious developer 👀",
  "font-size: 18px; font-weight: bold;"
);

console.log(
  "%cYou found the console.\nNow go build something.\n\n— Farhan\nhttps://studywithfarhan.id/",
  "font-size: 14px; line-height: 1.7;"
);

function wait(milliseconds) {
  return new Promise((resolve) => {
    setTimeout(resolve, milliseconds);
  });
}

/*
 * ============================
 * TERMINAL CAPTION
 * ============================
 */

const fallbackCaptions = [
  "keep learning.",
  "build things. break things. fix things.",
  "stay curious.",
  "learn in public.",
  "ship small. improve daily."
];

const captionText =
  document.getElementById(
    "captionText"
  );

const cursor =
  document.getElementById(
    "cursor"
  );

let cursorVisible = true;

setInterval(() => {
  cursor.style.opacity =
    cursorVisible
      ? "0"
      : "1";

  cursorVisible = !cursorVisible;
}, 650);

async function typeCaption(caption) {
  captionText.textContent = "";

  for (const character of caption) {
    captionText.textContent +=
      character;

    await wait(55);
  }
}

async function loadCaptions() {
  try {
    const response =
      await fetch("captions.json");

    if (!response.ok) {
      throw new Error("Failed to load captions.");
    }

    return await response.json();
  } catch (error) {
    return fallbackCaptions;
  }
}

async function rotateCaptions() {
  const captions =
    await loadCaptions();

  let index = 0;

  while (captions.length > 0) {
    await typeCaption(
      captions[index]
    );

    await wait(5000);

    index =
      (index + 1) % captions.length;
  }
}

rotateCaptions();
