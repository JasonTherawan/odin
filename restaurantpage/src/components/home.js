const sectionOneH3 = document.createElement("h3");
sectionOneH3.textContent = "Our Service";
const sectionOneP = document.createElement("p");
sectionOneP.textContent = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt velit dicta in, labore molestias quibusdam libero? Nisi veritatis accusamus pariatur!";
const sectionOne = document.createElement("div");
sectionOne.appendChild(sectionOneH3);
sectionOne.appendChild(sectionOneP);
sectionOne.classList.add("card");

const sectionTwoH3 = document.createElement("h3");
sectionTwoH3.textContent = "Let's Dine In!";
const sectionTwoP = document.createElement("p");
sectionTwoP.textContent = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt velit dicta in, labore molestias quibusdam libero? Nisi veritatis accusamus pariatur!";
const sectionTwo = document.createElement("div");
sectionTwo.appendChild(sectionTwoH3);
sectionTwo.appendChild(sectionTwoP);
sectionTwo.classList.add("card");

const heading = document.createElement("h2");
heading.textContent = "Welcome to My Restaurant!";
const hr = document.createElement("hr");
hr.classList.add("hr");
const home = document.createElement("div");
home.appendChild(heading);
home.appendChild(hr);
home.appendChild(sectionOne);
home.appendChild(sectionTwo);
home.classList.add("flex");

export default home;