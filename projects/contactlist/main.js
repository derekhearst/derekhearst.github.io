let contacts = [];

/**
 * Called when submitting the new Contact Form
 * This method will pull data from the form
 * use the provided function to give the data an id
 * then add that data to the contacts list.
 * Then reset the form
 * *** hints:
 * *** push: resources/push.jpg
 */
function addContact(event) {
  event.preventDefault();
  let name = event.target.name.value;
  let number = event.target.phone.value;
  let emergency = event.target.emergencyc.checked;
  let id = generateId();
  let contact = {
    name: name,
    number: number,
    emergency: emergency,
    id: id,
  };
  contacts.push(contact);
  saveContacts();
  drawContacts();
}

/**
 * Converts the contacts array to a JSON string then
 * Saves the string to localstorage at the key contacts
 */
function saveContacts() {
  localStorage.setItem("contacts", JSON.stringify(contacts));
}

/**
 * Attempts to retrieve the contacts string from localstorage
 * then parses the JSON string into an array. Finally sets
 * the contacts array to the retrieved array
 */
function loadContacts() {
  contacts = JSON.parse(localStorage.getItem("contacts"));
  if (!contacts) {
    contacts = [];
  }
}

/**
 * This function targets the contacts-list on the
 * DOM and adds a new div element for each of the
 * contacts in the contacts array
 */
function drawContacts() {
  let html = "";
  contacts.forEach((contact) => {
    let emergencystring = "";
    if (contact.emergency == true) {
      emergencystring = "emergency-contact";
    }
    html += `<div class="card mt-1 mb-1 ${emergencystring}">
  <h3 class="mt-1 mb-1">${contact.name}</h3>
  <div class="d-flex space-between">
    <p>
      <i class="fa fa-fw fa-phone"></i>
      <span>${contact.number}</span>
    </p>
    <i class="action fa fa-trash text-danger" onclick="removeContact(${contact.id})")></i>
  </div>
</div>`;
  });

  document.getElementById("contact-list").innerHTML = html;
}

/**
 * This function is called with a contact id
 * and will use the id to find and remove the
 * contact by their id from the list of contacts
 * *** hints:
 * *** findIndex: resources/findIndex.jpg
 * *** splice: resources/splice.jpg
 * @param {string} contactId
 */
function removeContact(contactId) {
  let deletedContact = contacts.find((contact) => contact.id == contactId);
  contacts.pop(deletedContact);
  saveContacts();
  drawContacts();
}

/**
 * Toggles the visibility of the AddContact Form
 */
let addContactVisible = true;
function toggleAddContactForm() {
  if (addContactVisible) {
    document.getElementById("new-contact-form").classList.add("hidden");
    addContactVisible = false;
  } else {
    document.getElementById("new-contact-form").classList.remove("hidden");
    addContactVisible = true;
  }
}

/**
 * Used to generate a random string id for mocked
 * database generated Id
 * @returns {string}
 */
function generateId() {
  return (
    Math.floor(Math.random() * 10000000) +
    "-" +
    Math.floor(Math.random() * 10000000)
  );
}

loadContacts();
drawContacts();
