let dataStructure = [];

const sliderInput = document.getElementById("fire-slider");
let fireSource = parseInt(sliderInput.value);
sliderInput.onmouseup = e => updateFireSource(e.target.value);
sliderInput.ontouchend = e => updateFireSource(e.target.value);

console.log(fireSource);

const fireWidth = 120;
const fireHeight = 80;
const pixelSize = 3;
const decayRange = 3;
const windRange = 2;

const canvas = document.getElementById("fire-canvas");
canvas.width = fireWidth * pixelSize;
canvas.height = fireHeight * pixelSize;
const widthPixels = fireWidth * pixelSize;
const heightPixels = fireHeight * pixelSize;

const stopButton = document.getElementById("fire-stop");
stopButton.onclick = () => updateFireSource(0);

const startButton = document.getElementById("fire-start");
startButton.onclick = () => updateFireSource(36);

const decreaseButton = document.getElementById("fire-decrease");
decreaseButton.onclick = () => updateFireSource(fireSource - 1);

const increaseButton = document.getElementById("fire-increase");
increaseButton.onclick = () => updateFireSource(fireSource + 1);

const fireColorsPalette = [
  "rgb(7,7,7)",
  "rgb(31,7,7)",
  "rgb(47,15,7)",
  "rgb(71,15,7)",
  "rgb(87,23,7)",
  "rgb(103,31,7)",
  "rgb(119,31,7)",
  "rgb(143,39,7)",
  "rgb(159,47,7)",
  "rgb(175,63,7)",
  "rgb(191,71,7)",
  "rgb(199,71,7)",
  "rgb(223,79,7)",
  "rgb(223,87,7)",
  "rgb(223,87,7)",
  "rgb(215,95,7)",
  "rgb(215,95,7)",
  "rgb(215,103,15)",
  "rgb(207,111,15)",
  "rgb(207,119,15)",
  "rgb(207,127,15)",
  "rgb(207,135,23)",
  "rgb(199,135,23)",
  "rgb(199,143,23)",
  "rgb(199,151,31)",
  "rgb(191,159,31)",
  "rgb(191,159,31)",
  "rgb(191,167,39)",
  "rgb(191,167,39)",
  "rgb(191,175,47)",
  "rgb(183,175,47)",
  "rgb(183,183,47)",
  "rgb(183,183,55)",
  "rgb(207,207,111)",
  "rgb(223,223,159)",
  "rgb(239,239,199)",
  "rgb(255,255,255)"
];

const start = () => {
  createFireDataStructure();
  createFireSource();
  calculateFirePropagation();
  renderFire();
  setInterval(updateFire, 33);
};

const createFireDataStructure = () => {
  const aH = [...Array(fireHeight)];
  const rows = aH.map((row, index) => (row = { index }));
  const aW = [...Array(fireWidth)];
  const columns = aW.map((column, index) => (column = { index }));
  dataStructure = [
    ...rows.map((row, rowIndex) =>
      columns.map(
        (cell, columnIndex) =>
          (cell = { index: columnIndex + rowIndex * fireWidth, intensity: 0 })
      )
    )
  ];
};

const createFireSource = () => {
  const firstRow = dataStructure[0];
  const setFire = firstRow.map(
    cell => (cell = { ...cell, intensity: fireSource })
  );
  dataStructure[0] = setFire;
};

const updateFireSource = intensity => {
  console.log(intensity);
  if (intensity < 0 || intensity > 36) return null;
  fireSource = intensity;
  sliderInput.value = fireSource;
  createFireSource();
};

const calculateFirePropagation = () => {
  dataStructure.map((row, rowIndex) => {
    row.map((cell, columnIndex) => {
      const decay = Math.floor(Math.random() * decayRange);
      if (rowIndex === 0 || columnIndex < 0) return null;
      const newIntensity =
        dataStructure[rowIndex - 1][columnIndex].intensity - decay;
      newIntensity >= 0 &&
      columnIndex - Math.floor(Math.random() * windRange) > 0
        ? (dataStructure[rowIndex][
            columnIndex - Math.floor(Math.random() * windRange)
          ].intensity = newIntensity)
        : null;
    });
  });
};

const renderFire = () => {
  dataStructure.map((nested, rowIndex) => {
    nested.map((_, columnIndex) => {
      ctx = canvas.getContext("2d");
      ctx.fillStyle = fireColorsPalette[_.intensity];
      ctx.fillRect(
        widthPixels - columnIndex * pixelSize,
        heightPixels - rowIndex * pixelSize,
        pixelSize,
        pixelSize
      );
    });
  });
};

const updateFire = () => {
  calculateFirePropagation();
  renderFire();
};

start();
