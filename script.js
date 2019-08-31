const table = document.getElementById("fire-container");
const fireWidth = 40;
const fireHeight = 40;
let dataStructure = [];

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
  // setInterval(calculateFirePropagation, 1000);
  // setInterval(renderFire, 1000);
  setInterval(updateFire, 200);
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
  const setFire = firstRow.map(cell => (cell = { ...cell, intensity: 36 }));
  dataStructure[0] = setFire;
};

const calculateFirePropagation = () => {
  dataStructure.map((row, rowIndex) => {
    row.map((cell, columnIndex) => {
      const decay = Math.floor(Math.random() * 7);
      if (rowIndex === 0 || columnIndex < 0) return null;
      const newIntensity =
        dataStructure[rowIndex - 1][columnIndex].intensity - decay;
      newIntensity >= 0 && columnIndex - Math.floor(Math.random() * 2) > 0
        ? (dataStructure[rowIndex][
            columnIndex - Math.floor(Math.random() * 2)
          ].intensity = newIntensity)
        : null;
    });
  });
};

const renderFire = () => {
  table.innerHTML = "";
  const log = dataStructure.map((nested, rowIndex) => {
    let row = table.insertRow(0);
    nested.map((_, columnIndex) => {
      let cell = row.insertCell(columnIndex);
      // cell.dataset.index = _.index;
      cell.style.backgroundColor = fireColorsPalette[_.intensity];
      // cell.innerHTML = _.intensity;
    });
  });
};

const updateFire = () => {
  calculateFirePropagation();
  renderFire();
};

start();
