let dogBarDiv = document.querySelector("div#dog-bar")
let dogInfoDiv = document.querySelector("div#dog-info")
let dogFilterButton = document.querySelector("button#good-dog-filter")

fetch("http://localhost:3000/pups")
    .then(response => response.json())
    .then(dogArray => {
        dogArray.forEach(dogObj => {
            turnDogToSpan(dogObj)
        })
    })

let turnDogToSpan = (dog) => {
    let dogSpan = document.createElement("span")
        dogSpan.innerText = dog.name
        dogBarDiv.append(dogSpan)

    dogSpan.addEventListener("click", (evt) => {
        dogInfoDiv.innerHTML = ""
        let dogImg = document.createElement("img")
        dogImg.src = dog.image
        dogImg.alt = `Image of ${dog.name}`

        let dogName = document.createElement("h2")
        dogName.innerText = dog.name

        let goodDogButton = document.createElement("button")
        if (dog.isGoodDog === true) {
            goodDogButton.innerText = "Good Dog!"
        } else {
            goodDogButton.innerText = "Bad Dog!"
        }

        dogInfoDiv.append(dogImg, dogName, goodDogButton)

        goodDogButton.addEventListener("click", (evt) => {
            let newIsGoodDog = !dog.isGoodDog
            //updates the backend
            fetch(`http://localhost:3000/pups/${dog.id}`, {
                method: "PATCH",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    isGoodDog: newIsGoodDog
                })
            })
            .then(response => response.json())
            .then(updatedDogObj => {
                // debugger
                //updates the DOM
                if (updatedDogObj.isGoodDog === true) {
                    goodDogButton.innerText = "Good Dog!"
                } else {
                    goodDogButton.innerText = "Bad Dog!"
                }
                //updates in memory
                dog.isGoodDog = updatedDogObj.isGoodDog
            })
            
        })
    })
}

dogFilterButton.addEventListener("click", (evt) => {
    if (dogFilterButton.innerText === "Filter good dogs: OFF") {
        dogFilterButton.innerText = "Filter good dogs: ON"
        fetch("http://localhost:3000/pups")
        .then(response => response.json())
        .then(dogArray => {
            let filteredDogArray = dogArray.filter(dogObj => {
                return dogObj.isGoodDog === true})
            dogBarDiv.innerHTML = ""
            filteredDogArray.forEach(dogObj => {
                turnDogToSpan(dogObj)
            })
        })
    } else if (dogFilterButton.innerText === "Filter good dogs: ON") {
        dogFilterButton.innerText = "Filter good dogs: OFF"
        fetch("http://localhost:3000/pups")
        .then(response => response.json())
        .then(dogArray => {
            dogBarDiv.innerHTML = ""
            dogArray.forEach(dogObj => {
                turnDogToSpan(dogObj)
            })
        })
    }
})