const loadSession = () => {
  fetch("https://openapi.programming-hero.com/api/levels/all")
    .then((res) => res.json())
    .then((data) => {
      displayLession(data.data);
    });
};
const displayLession = (lessions) => {
  const levelContainer = document.getElementById("level-container")
  levelContainer.innerHTML = ''
  for (let lession of lessions) {
    const lessionDiv = document.createElement("div");
    lessionDiv.innerHTML = `
        <button class="btn btn-outline btn-primary"><i class="fa-solid fa-book-open"></i>Lession-${lession.level_no}</button>
        `;
    levelContainer.append(lessionDiv);
  }
};

loadSession();
