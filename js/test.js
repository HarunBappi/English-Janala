const createElement = (arr) => {
  const synonymElement = arr.map(
    (synonym) => `<span class="btn">${synonym}</span>`,
  );
  console.log(synonymElement);
};

const name = ["harun", "bappi", "tutul"];
createElement(name);
