const sectionOneH3 = document.createElement("h3");
sectionOneH3.textContent = "Our History";
const sectionOneP = document.createElement("p");
sectionOneP.textContent = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt velit dicta in, labore molestias quibusdam libero? Nisi veritatis accusamus pariatur!";
const sectionOne = document.createElement("div");
sectionOne.appendChild(sectionOneH3);
sectionOne.appendChild(sectionOneP);
sectionOne.classList.add("card");

const sectionTwoH3 = document.createElement("h3");
sectionTwoH3.textContent = "Opening Hours";
const sectionTwoP = document.createElement("p");
const weekday = document.createElement("p");
weekday.textContent = "Weekday: 6am - 10pm";
const weekend = document.createElement("p");
weekend.textContent = "Weekend: 6am - 12pm";
const sectionTwo = document.createElement("div");
sectionTwo.appendChild(sectionTwoH3);
sectionTwo.appendChild(weekday);
sectionTwo.appendChild(weekend);
sectionTwo.classList.add("card");

const sectionThreeH3 = document.createElement("h3");
sectionThreeH3.textContent = "Contact Us";
const sectionThreeP = document.createElement("p");
sectionThreeP.textContent = "+1 234 567 890"
const sectionThree = document.createElement("div");
sectionThree.appendChild(sectionThreeH3);
sectionThree.appendChild(sectionThreeP);
sectionThree.classList.add("card");

const heading = document.createElement("h2");
heading.textContent = "About Us";
const hr = document.createElement("hr");
hr.classList.add("hr");
const about = document.createElement("div");
about.appendChild(heading);
about.appendChild(hr);
about.appendChild(sectionOne);
about.appendChild(sectionTwo);
about.appendChild(sectionThree);
about.classList.add("flex");

export default about;