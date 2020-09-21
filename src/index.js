let dogBar = document.querySelector("#dog-bar");
let dogInfo = document.querySelector("#dog-info");
let goodDogFilterBtn = document.querySelector("#good-dog-filter");

let fetchAllDogs = () => {
    fetch(`http://localhost:3000/pups`)
        .then(res => res.json())
        .then(dogObjs => {
            dogBar.innerHTML = "";
            if (goodDogFilterBtn.innerText === "Filter good dogs: OFF") {
                dogObjs.forEach(dogObj => {createDogDiv(dogObj) 
                })
            }   
            else {
                dogObjs.forEach(dogObj => {
                    if(dogObj.isGoodDog) {
                        createDogDiv(dogObj)
                    }
                })
            }
    });
}
let createDogInfo = (dogObj) => {

    let dogInfoDiv = document.createElement("div");
    dogInfoDiv.classList.add("dog-div");

    let dogImg = document.createElement("img");
    dogImg.src = dogObj.image;
    dogImg.alt = `${dogObj.name}'s Image`

    let dogInfoName = document.createElement("p");
    dogInfoName.classList.add("dog-name");
    dogInfoName.innerText = dogObj.name;
        
    let makeDogBadGoodBtn = document.createElement("button");
    if (dogObj.isGoodDog) {
        makeDogBadGoodBtn.innerText = "Good Doggie!😇";
    }
    else {
        makeDogBadGoodBtn.innerText = "Bad Doggie!👿";
    }

    dogInfoDiv.append(dogInfoName, dogImg, makeDogBadGoodBtn);
    dogInfo.append(dogInfoDiv);
    makeDogBadGoodBtn.addEventListener("click", (evt) => {
         // evt.preventDefault()
        let changeDoggieGoodBad = !dogObj.isGoodDog;
        fetch(`http://localhost:3000/pups/${dogObj.id}`,{
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json"
            },
            body: JSON.stringify({
                isGoodDog: changeDoggieGoodBad
            })
        })
            .then(res => res.json())
            .then(patchedDogObj => {
                // evt.preventDefault()
                dogInfo.innerHTML = "";
                dogObj.isGoodDog = changeDoggieGoodBad;
                createDogInfo(patchedDogObj);
                fetchAllDogs();
            })
    })
}

fetchAllDogs();

goodDogFilterBtn.addEventListener("click", (evt) => {
    // evt.preventDefault()
    if(goodDogFilterBtn.innerText === "Filter good dogs: OFF"){
        goodDogFilterBtn.innerText = "Filter good dogs: ON"
        fetchAllDogs();
    }
    else {
        goodDogFilterBtn.innerText = "Filter good dogs: OFF"
        fetchAllDogs();
    }
})

let createDogDiv = (dogObj) => {
    let dogDiv = document.createElement("div");
    dogDiv.classList.add("dog-div");
    
    let dogName = document.createElement("p");
    dogName.classList.add("dog-name");
    dogName.innerText = dogObj.name;

    dogDiv.append(dogName);
    dogBar.append(dogDiv);

    dogDiv.addEventListener("click", (evt) => {
        dogInfo.innerHTML = "";
        // evt.preventDefault();
        createDogInfo(dogObj);
    })
}

