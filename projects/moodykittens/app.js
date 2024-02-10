let kittens = [];
let moods = {
  happy: "&#x1F638;",
  angry: "&#x1F63E;",
  sad: "&#x1F63F;",
  normal: "&#x1F63A;",
};
/**
 * Called when submitting the new Kitten Form
 * This method will pull data from the form
 * use the provided function to give the data an id
 * then add that data to the kittens list.
 * Then reset the form
 */
function addKitten(event) {
  event.preventDefault();
  let name = event.target.name.value;
  if (kittens.find((kitten) => kitten.name == name)) {
    alert("Can't add a kitten with the same name");
    return;
  }

  let id = generateId();
  let kitten = {
    name: name,
    mood: "happy",
    affection: 4,
    id: id,
  };
  kittens.push(kitten);
  drawKittens();
  event.target.reset();
}

/**
 * Converts the kittens array to a JSON string then
 * Saves the string to localstorage at the key kittens
 */
function saveKittens() {
  localStorage.setItem("kittens", JSON.stringify(kittens));
}

/**
 * Attempts to retrieve the kittens string from localstorage
 * then parses the JSON string into an array. Finally sets
 * the kittens array to the retrieved array
 */
function loadKittens() {
  kittens = JSON.parse(localStorage.getItem("kittens"));
  if (!kittens) {
    kittens = [];
  }
}

/**
 * Draw all of the kittens to the kittens element
 */
function drawKittens() {
  let html = "";
  kittens.forEach((kitten) => {
    html += `<div class="kitten">
    <h3 class="kittendeets">${kitten.name}</h3>
    <p class="kittenface">${moods[kitten.mood]}</p>
    <p class="kittendeets">Mood: <span>${kitten.mood}</span> | Affection: <span>${kitten.affection}</span> </p>
    <div class="kittenbuttons">
      <button class="kittenbutton" onclick="pet(${kitten.id})">Pet</button>
      <button class="kittenbutton" onclick="catnip(${kitten.id})">Catnip</button>
      <button class="kittenbutton" onclick="kill(${kitten.id})">Kill >:(</button>
    </div>
  </div>`;
  });
  document.getElementById("kittens").innerHTML = html;
  saveKittens();
}

/**
 * Find the kitten in the array by its id
 * @param {string} id
 * @return {Kitten}
 */
function findKittenById(id) {
  return kittens.find((kitten) => kitten.id == id);
}

/**
 * Find the kitten in the array of kittens
 * Generate a random Number
 * if the number is greater than .5
 * increase the kittens affection
 * otherwise decrease the affection
 * @param {string} id
 */
function pet(id) {
  let kitten = kittens.find((kitten) => kitten.id == id);
  if (Math.random() > 0.5) {
    kitten.affection++;
  } else {
    kitten.affection--;
  }
  setKittenMood(kitten);
  drawKittens();
}

/**
 * Find the kitten in the array of kittens
 * Set the kitten's mood to tolerant
 * Set the kitten's affection to 5
 * @param {string} id
 */
function catnip(id) {
  let kitten = kittens.find((kitten) => kitten.id == id);
  kitten.affection = 5;
  kitten.mood = "normal";
  drawKittens();
}

/**
 * Removes the kitten
 * poor child :(
 * @param {string} id
 */
function kill(id) {
  let kitten = kittens.find((kitten) => kitten.id == id);
  kittens.pop(kitten);
  drawKittens();
}

/**
 * Sets the kittens mood based on its affection
 * @param {Kitten} kitten
 */
function setKittenMood(kitten) {
  switch (kitten.affection) {
    case 0:
      kittens.pop(kitten);
      break;
    case 1:
      kitten.mood = "sad";
      break;
    case 2:
      kitten.mood = "angry";
      break;
    case (3, 4):
      kitten.mood = "normal";
      break;
    case (5, 6, 7, 8):
      kitten.mood = "happy";
      break;
  }
  drawKittens();
}

/**
 * Removes all of the kittens from the array
 * remember to save this change
 */
function clearKittens() {
  kittens = [];
  saveKittens();
}

/**
 * Removes the welcome content and should probably draw the
 * list of kittens to the page. Good Luck
 */
function getStarted() {
  document.getElementById("welcome").remove();
  console.log("Good Luck, Take it away");
}

// --------------------------------------------- No Changes below this line are needed

/**
 * Defines the Properties of a Kitten
 * @typedef {{name: string, mood: string, affection: number, ID: string}} Kitten
 */

/**
 * Used to generate a random string id for mocked
 * database generated Id
 * @returns {string}
 */
function generateId() {
  return Math.floor(Math.random() * 10000000);
}

loadKittens();
drawKittens();
