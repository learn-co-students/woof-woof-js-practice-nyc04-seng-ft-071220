

let dogBar = document.querySelector("div#dog-bar")
let dogInfo = document.querySelector("div#dog-info")

fetch("http://localhost:3000/pups")
    .then(res => res.json())
    .then(pupsObj => {
        pupsObj.forEach(pupObj => {
            turnObjToHTML(pupObj)
        })
    })

let turnObjToHTML = (pup) => {
    let pupSpan = document.createElement('span')
    pupSpan.innerText = pup.name
    dogBar.append(pupSpan)
    pupSpan.style.cursor = "pointer"

    let pupImg = document.createElement('img')
    let pupNameH2 = document.createElement('h2')
    let pupButton = document.createElement('button')

  
    pupSpan.addEventListener("click", (evt)=>{
        pupImg.src = pup.image
        pupNameH2.innerText = pup.name
        pupButton.innerText = pup.isGoodDog ? "Good Dog" : "Bad Dog"
        dogInfo.append(pupImg)
        dogInfo.append(pupNameH2)
        dogInfo.append(pupButton)
    })

    pupButton.addEventListener("click", (evt)=>{
        let newGoodOrBad = !pup.isGoodDog 
        //update the backend
        fetch(`http://localhost:3000/pups/${pup.id}`,{
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                isGoodDog: newGoodOrBad
            })
        })
        .then(res => res.json())
        .then(pupObj => {
            //update the obj memory 
            pup.isGoodDog = pupObj.isGoodDog 

            //update the DOM / Front End
            pupButton.innerText = pupObj.isGoodDog ? "Good Dog" : "Bad Dog"
        })
    })



}    


