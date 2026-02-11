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
        <button id="lession-btn-${lession.level_no}" onclick="loadWordContainer(${lession.level_no})" class="btn btn-outline btn-primary lession-btn"><i class="fa-solid fa-book-open"></i>Lession-${lession.level_no}</button>
        `;
    levelContainer.append(lessionDiv);
  }
};
// Remove Active Class
const removeActive = () => {
  const lessionBtn = document.querySelectorAll(".lession-btn");
  lessionBtn.forEach((btn) => btn.classList.remove("active"));
};
// Fetch Word
const loadWordContainer = (id) => {
  const url = `https://openapi.programming-hero.com/api/level/${id}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      removeActive();
      const clickBtn = document.getElementById(`lession-btn-${id}`);
      clickBtn.classList.add("active");
      displayWord(data.data);
    });
};

// Display Word
const displayWord = (words) => {
  const wordContainer = document.getElementById("word-container");
  wordContainer.innerHTML = "";
  if (words.length == 0) {
    wordContainer.innerHTML = `<div class="rounded-xl col-span-full space-y-5 text-center py-10">
      <img class="mx-auto" src="./assets/alert-error.png">
        <p class="font-bangla text-gray-400 text-sm md:text-xl md:font-medium">
          এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।
        </p>
        <h2 class="font-bangla text-sm md:text-3xl font-semibold">
          নেক্সট Lesson এ যান
        </h2>
      </div>`;
    return;
  }
  words.forEach((word) => {
    const card = document.createElement("div");
    card.innerHTML = `
        <div class="bg-white shadow-sm p-4 rounded-md h-full flex flex-col justify-between">
          <div class="text-center space-y-2 my-5">
            <h2 class="text-2xl font-bold">${word.word ? word.word : "শব্দ খুঁজে পাওয়া যায়নি"}</h2>
          <p class="font-medium"> Meaning /Pronounciation </p>
          <h3 class="font-bangla text-2xl font-medium">"${word.meaning ? word.meaning : "অর্থ খুঁজে পাওয়া যায়নি"}/ ${word.pronunciation ? word.pronunciation : "pronunciation খুঁজে পাওয়া যায়নি"}"</h3>
          </div>
          <div class="flex justify-between items-center">
            <button onclick="loadWordDetails(${word.id})" class="btn bg-sky-100"><i class="fa-solid fa-circle-question text-xl"></i></button>
            <button class="btn bg-sky-100"><i class="fa-solid fa-volume-high text-xl"></i></button>
          </div>
        </div>
      `;
    wordContainer.append(card);
  });
};

//fetch Words Details in Modal
const loadWordDetails = async (id) => {
  const url = `https://openapi.programming-hero.com/api/word/${id}`;
  const res = await fetch(url)
  const details = await res.json()
  displayLoadDetails(details.data)
};

// Display Details 

const displayLoadDetails = (word)=>{
    const modalContainer = document.getElementById('modal-container')
    modalContainer.innerHTML =`
    <div class="">
            <h2 class="text-2xl font-bold">${word.word} (<i class="fa-solid fa-microphone-lines"></i>:${word.pronunciation})</h2>
          </div>
          <div class="">
            <h2 class="font-bold">Meaning</h2>
            <p class="font-bangla">${word.meaning}</p>
          </div>
          <div class="">
            <h2 class="font-bold">Example</h2>
            <p>${word.sentence}</p>
          </div>
          <div class="">
            <h2 class="font-bangla font-bold">সমার্থক শব্দ গুলো</h2>
            <div>
             ${createElement(word.synonyms)}
            </div>
          </div>
    `
    document.getElementById('details_modal').showModal()
}
// synonyms Array integration
const createElement = (arr) => {
  const synonymElement = arr.map(
    (synonym) => `<span class="btn bg-sky-100">${synonym}</span>`,
  );
  return synonymElement.join(" ");
};

loadSession();
