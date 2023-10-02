let customSelectArray = document.getElementsByClassName("custom-select");
let select = document.getElementById("selected");
let button = document.getElementById("button");
// init
Array.from(customSelectArray).forEach(function (element) {
  let parent = element.parentNode;
  let customSelectDiv = document.createElement("div");
  let mainDiv = document.createElement("div");
  customSelectDiv.classList.add("custom-select");
  customSelectDiv.setAttribute("value", "");

  let optionDiv = document.createElement("div");
  customSelectDiv.appendChild(mainDiv);
  customSelectDiv.appendChild(optionDiv);

  Array.from(element.children).forEach(function (option) {
    let newOption = document.createElement("div");
    newOption.innerHTML = option.innerHTML;
    newOption.setAttribute("value", option.getAttribute("value"));

    if (option.hasAttribute("selected")) {
      customSelectDiv.setAttribute("value", option.getAttribute("value"));
      mainDiv.innerHTML = option.innerHTML;
      newOption.classList.add("selected");
    }

    let optionsDiv = customSelectDiv.children[1];
    optionsDiv.appendChild(newOption);

    let delta = 0;
    if (element.children.length > 4) delta = 10;
    newOption.style.width = element.offsetWidth - delta + "px";

    optionDiv.addEventListener("click", (event) => {
      customSelectDiv.setAttribute("value", event.target.getAttribute("value"));
      event.target.parentNode.parentNode.children[0].innerHTML =
        event.target.innerHTML;
      Array.from(event.target.parentNode.children).forEach(function (child) {
        child.classList.remove("selected");
      });
      event.target.classList.add("selected");
    });
  });

  parent.appendChild(customSelectDiv);
  customSelectDiv.style.width = element.offsetWidth + "px";
  customSelectDiv.children[0].style.width = element.offsetWidth + "px";
  optionDiv.style.height = 4 * optionDiv.children[0].offsetHeight + "px";
  console.log(4 * optionDiv.children[0].offsetHeight + "px");
  element.remove();

  // Comportement
  mainDiv.addEventListener("click", (event) => {
    if (!mainDiv.parentNode.classList.contains("active"))
      mainDiv.parentNode.classList.add("active");
    else mainDiv.parentNode.classList.remove("active");
  });

  document.addEventListener("click", (event) => {
    if (event.target != mainDiv) mainDiv.parentNode.classList.remove("active");
  });
  button.addEventListener("click", (event) => {
    console.log("hello");
    select.value = customSelectDiv.getAttribute("value");
  });
});
