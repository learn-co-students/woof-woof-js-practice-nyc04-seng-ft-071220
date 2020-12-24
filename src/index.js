const dogBarDiv = document.querySelector("div#dog-bar")
const mainDogInfo = document.querySelector("div#dog-info")

// console.log(dogBarDiv)

fetch("http://localhost:3000/pups")
.then(res => res.json())
.then(arrOfPups => {
    arrOfPups.forEach((singlePup) => {
        turnObjToHTML(singlePup)
    })
    renderMainDog(arrOfPups[0])
})

let turnObjToHTML = (pup) => {
    let pupSpan = document.createElement("span")
    pupSpan.innerText = pup.name

    dogBarDiv.append(pupSpan)

    pupSpan.addEventListener("click", (evt)=>{
        renderMainDog(pup)
    })
}

const renderMainDog = (pup) => {
    let pupImg = document.createElement("img")
        pupImg.src = pup.image
        pupImg.alt = pup.name
    
    let pupName = document.createElement("h2")
        pupName.innerText = pup.name

    let pupBtn = document.createElement("button")
        pupBtn.innerText = pup.isGoodDog ? "Good Dog!" : "Bad Dog!"

    mainDogInfo.innerHTML = ""
    mainDogInfo.append(pupImg, pupName, pupBtn)

    pupBtn.addEventListener("click", (evt)=>{
        let theOppositeBoolean = !pup.isGoodDog

        fetch(`http://localhost:3000/pups/${pup.id}`, {
            method: "PATCH",
            headers: {
                "content-type": "Application/json"
            },
            body: JSON.stringify({
                isGoodDog: theOppositeBoolean
            })
        })
        .then(res => res.json())
        .then((updatedPup) => {
            // Manipulating the DOM
            pupBtn.innerText = updatedPup.isGoodDog ? "Bad Dog!" : "Good Dog!"
            // UPDATE the POJO in MEMORY
            pup.isGoodDog = updatedPup.isGoodDog
        })
    })
}