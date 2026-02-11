const loadSession = () => {
  fetch("https://openapi.programming-hero.com/api/levels/all")
    .then((res) => res.json())
    .then((data) => {
      displayLession(data.data);
    });
};
// Load All Lession
const displayLession = (lessions) => {
  const levelContainer = document.getElementById("level-container");
  levelContainer.innerHTML = "";
  for (let lession of lessions) {
    const lessionDiv = document.createElement("div");
    lessionDiv.innerHTML = `
        <button onclick="loadWordContainer(${lession.level_no})" class="btn btn-outline btn-primary"><i class="fa-solid fa-book-open"></i>Lession-${lession.level_no}</button>
        `;
    levelContainer.append(lessionDiv);
  }
};
// Fetch Word
const loadWordContainer = (id) => {
  const url = `https://openapi.programming-hero.com/api/level/${id}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      displayWord(data.data);
    });
};

// Display Word
const displayWord = (words) => {
  const wordContainer = document.getElementById("word-container");
  wordContainer.innerHTML = "";
  words.forEach((word) => {
    const card = document.createElement("div");
    card.innerHTML = `
        <div class="bg-white shadow-sm p-4 rounded-md">
          <div class="text-center space-y-2 my-5">
            <h2 class="text-2xl font-bold">${word.word}</h2>
          <p class="font-medium"> Meaning /Pronounciation </p>
          <h3 class="font-bangla text-2xl font-medium">"${word.meaning}/ ${word.pronunciation}"</h3>
          </div>
          <div class="flex justify-between items-center">
            <button class="btn bg-sky-100"><i class="fa-solid fa-circle-question text-xl"></i></button>
            <button class="btn bg-sky-100"><i class="fa-solid fa-volume-high text-xl"></i></button>
          </div>
        </div>
      `;
    wordContainer.append(card);
  });
};
loadSession();
