let themeButton = document.getElementById("theme-button");
let headercontainer= document.querySelector('.header-container');
let headeritem = document.querySelector('.header-item');

let animation = {
  revealDistance: 150,
  initialOpacity: 0,
  transitionDelay: 0,
  transitionDuration:'2s',
  transitionProperty: 'all',
  transitionTimingFunction: 'ease',
};

let revealableContainers = document.querySelectorAll('.revealable');

function reveal() {
    for (let i = 0; i < revealableContainers.length; i++) {
        let container = revealableContainers[i];

        // Get the window height
        let windowHeight = window.innerHeight;

        // Get the top position of the current container
        let topOfRevealableContainer = container.getBoundingClientRect().top;

        // Check if the container should be revealed
        if (topOfRevealableContainer < windowHeight - animation.revealDistance) {
            // Add the active class if the container is in the right position
            container.classList.add('active');
        } else {
            // Optionally, remove the active class if the container is not in the right position
            container.classList.remove('active');
        }
    }
}

// Call the reveal function on scroll or other events
window.addEventListener('scroll', reveal);

// Initial check in case some elements are in view on page load
reveal();

const toggleDarkMode = () => {

    // Write your code to manipulate the DOM here
  document.body.classList.toggle("dark-mode");
  headercontainer.classList.toggle("dark-mode");
  headeritem.classList.toggle("dark-mode");
  themeButton.classList.toggle("dark-mode");
  if (themeButton.innerText === 'Toggle Dark Mode')
  {
    themeButton.innerText = 'Toggle Light Mode';
  
  }
  else
  {
    themeButton.innerText = 'Toggle Dark Mode';

  }
}

themeButton.addEventListener("click", toggleDarkMode);

// Add your query for the sign now button here
let signNowButton = document.querySelector('#sign-now-button');

let count = 3;
const addSignature = (person) => {
  
  let signature = document.createElement('p');
  signature.className = "signature"; // Add a class if necessary
  signature.textContent = `🖊️ ${person.name} from ${person.hometown} supports this.`;
  document.querySelector('.signatures').appendChild(signature);

  // Update the counter logic
  document.querySelector('#counter').remove();
  count++;
  let counter = document.createElement('p');
  counter.id = "counter";
  counter.textContent = `️🖊️ ${count} people have signed this petition and support this cause.`;
  document.querySelector('.signatures').appendChild(counter);
  toggleModal(person);
}

const validateForm = () => {
  let containsErrors = false;
  let petitionInputs = document.getElementById("sign-petition").elements;

  let person = {
    name: document.getElementById("name").value,
    hometown: document.getElementById("hometown").value,
    email: document.getElementById("email").value
  };

  for (let i = 0; i < petitionInputs.length; i++) {
    if (petitionInputs[i].value.length < 2) {
      petitionInputs[i].classList.add('error');
      containsErrors = true;
    } else {
      petitionInputs[i].classList.remove('error');
    }
  }

  if (!person.email.includes('.com')) {
    email.classList.add('error');
    containsErrors = true;
  } else {
    email.classList.remove('error');
  }

  if (!containsErrors) {
    addSignature(person); 
    for (let i = 0; i < petitionInputs.length; i++) {
      petitionInputs[i].value = "";
    }
  }
}

// Add a click event listener to the sign now button here
signNowButton.addEventListener('click', validateForm);

// Function to toggle the modal
function toggleModal(person) {
    const modal = document.querySelector('#thanks-modal');
    const modalContent = document.querySelector('#thanks-modal-content');

    // Display the modal
    modal.style.display = 'flex';
    modalContent.textContent = `Thank you so much ${person.name}!`;

    // Start the heart-beat animation
    let intervalId = setInterval(scaleImage, 500);

    // Set a timeout to hide the modal and stop the animation
    setTimeout(() => {
        modal.style.display = 'none';

        // Stop the heart-beat animation
        clearInterval(intervalId);
    }, 4000);
}

let scaleFactor = 1;
let modalImage = document.querySelector('#modal-image'); 

function scaleImage() {
    // Toggle scaleFactor between 1 and 0.8
    scaleFactor = scaleFactor === 1 ? 0.8 : 1;

    // Apply scaleFactor to modalImage
    modalImage.style.transform = `scale(${scaleFactor})`;
}
