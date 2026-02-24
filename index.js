let state = {
  numberBank: [],
  odds: [],
  evens: [],
};

// Function to update state and trigger a rerender
function setState(newState) {
  state = { ...state, ...newState };
  render();
}

function addNumber(value) {
  const num = parseInt(value, 10);
  if (!isNaN(num)) {
    setState({ numberBank: [...state.numberBank, num] });
  }
}

function sortOne() {
  if (state.numberBank.length === 0) return;

  const newBank = [...state.numberBank];
  const num = newBank.shift(); // Remove the first number

  if (num % 2 === 0) {
    setState({
      numberBank: newBank,
      evens: [...state.evens, num],
    });
  } else {
    setState({
      numberBank: newBank,
      odds: [...state.odds, num],
    });
  }
}

function sortAll() {
  const newEvens = [...state.evens];
  const newOdds = [...state.odds];

  state.numberBank.forEach((num) => {
    if (num % 2 === 0) newEvens.push(num);
    else newOdds.push(num);
  });

  setState({
    numberBank: [],
    evens: newEvens,
    odds: newOdds,
  });
}

function NumberInputForm() {
  const form = document.createElement("form");
  form.innerHTML = `
    <label>
      Add a number to the bank
    </label>
    `;
  const input = document.createElement("input");
  input.type = "number";

  const button = document.createElement("button");
  button.textContent = "Add Number";
  button.type = "submit";

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    addNumber(input.value);
  });

  form.append(input, button);
  return form;
}

function Section(title, numbers) {
  const container = document.createElement("section");
  const h2 = document.createElement("h2");
  const textBox = document.createElement("textarea");
  textBox.value = numbers.join(" ");
  textBox.readOnly = true;
  h2.textContent = `${title}`;
  container.append(h2, textBox);
  return container;
}

function render() {
  document.body.innerHTML = ""; // Clear the UI

  const main = document.createElement("main");
  const title = document.createElement("h1");
  title.textContent = "Odds and Events";
  const controlsContainer = document.createElement("div");

  // Control Buttons
  const sortOneBtn = document.createElement("button");
  sortOneBtn.textContent = "Sort 1";
  sortOneBtn.onclick = sortOne;

  const sortAllBtn = document.createElement("button");
  sortAllBtn.textContent = "Sort All";
  sortAllBtn.onclick = sortAll;

  controlsContainer.append(NumberInputForm(), sortOneBtn, sortAllBtn);

  // Assembly
  main.append(
    title,
    controlsContainer,
    Section("Bank", state.numberBank),
    Section("Odds", state.odds),
    Section("Evens", state.evens)
  );

  document.body.appendChild(main);
}

render();
