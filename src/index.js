url = "http://localhost:3000/pups";
const dogBar = document.querySelector("#dog-bar");
const dogInfo = document.querySelector("#dog-info");
const dogOnOffButton = document.querySelector("#good-dog-filter");

fetch(url)
  .then((res) => res.json())
  .then((dogs) => {
    dogs.forEach((dog) => {
      let dogObj = document.createElement("span");
      dogObj.innerText = dog.name;
      dogObj.setAttribute("data-on-off", dog.isGoodDog);
      dogBar.append(dogObj);

      //   #############################
      //   let dogname = dogBar.querySelector("span");
      dogObj.addEventListener("click", () => {
        const dogImg = document.createElement("img");
        dogImg.src = dog.image;
        const dogName = document.createElement("h2");
        dogName.innerText = dog.name;
        const dogButton = document.createElement("button");
        if (dog.isGoodDog === true) {
          dogButton.innerText = "Good Dog!";
        } else {
          dogButton.innerText = "Bad Dog!";
        }
        dogInfo.append(dogImg, dogName, dogButton);

        // ####################################
        dogButton.addEventListener("click", (e) => {
          fetch(`http://localhost:3000/pups/${dog.id}`, {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
            body: JSON.stringify({
              isGoodDog: !dog.isGoodDog,
            }),
          })
            .then((res) => res.json())
            .then((doggy) => {
              if (e.target.innerText == "Good Dog!") {
                e.target.innerText = "Bad Dog!";
              } else {
                e.target.innerText = "Good Dog!";
              }
              dog.isGoodDog = doggy.isGoodDog;
              console.log(dog.isGoodDog);
            });
        });
      });
    });
    const badDog = document.querySelectorAll("[data-on-off=false]");
    dogOnOffButton.addEventListener("click", (e) => {
      if (e.target.innerText === "Filter good dogs: OFF") {
        e.target.innerText = "Filter good dogs: ON";
      } else {
        e.target.innerText = "Filter good dogs: OFF";
      }
      badDog.forEach((bad) => {
        bad.classList.toggle("hidden");
      });
    });
  });
