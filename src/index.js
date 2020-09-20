

let dogBar = document.querySelector("div#dog-bar")
let dogInfo = document.querySelector("div#dog-info")
let filterButton = document.querySelector("button#good-dog-filter")

function getAllpups () {
    fetch("http://localhost:3000/pups")
        .then(res => res.json())
        .then(pupsObj => {
            pupsObj.forEach(pupObj => {
                turnObjToHTML(pupObj)
            })
        })
}

getAllpups()


  
let turnObjToHTML = (pup) => {
    let pupSpan = document.createElement('span')
    pupSpan.innerText = pup.name
    pupSpan.className = "pupNameSpanBar"
    dogBar.append(pupSpan)
    pupSpan.style.cursor = "pointer"


    pupSpan.addEventListener("click", (evt)=>{
        let pupImg = document.createElement('img')
        pupImg.classList.add("profile")
        let pupNameH2 = document.createElement('h2')
        pupNameH2.classList.add("profile")
        let pupButton = document.createElement('button')
        pupButton.classList.add("profile")

        let profile = document.querySelectorAll(".profile")
        profile.forEach(ele => ele.remove())
        // dogInfo.innerHTML = ""
        fetch(`http://localhost:3000/pups/${pup.id}`)
        .then(res => res.json())
        .then(pupShowObj => {
            pupImg.src = pupShowObj.image
            pupNameH2.innerText = pupShowObj.name
            pupButton.innerText = pupShowObj.isGoodDog ? "Good Dog" : "Bad Dog"
            dogInfo.append(pupImg, pupNameH2, pupButton)  
        })
        changeButton(pupButton)
    })

    // pupSpan.addEventListener("click", (evt)=>{
    //     pupImg.src = pup.image
    //     pupNameH2.innerText = pup.name
    //     pupButton.innerText = pup.isGoodDog ? "Good Dog" : "Bad Dog"
    //     dogInfo.append(pupImg, pupNameH2, pupButton)  
    // })
    function changeButton(pupButton) {
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
}    



function removeSpan() {
    let pupNameSpanBar = document.querySelectorAll(".pupNameSpanBar")
    pupNameSpanBar.forEach(ele => ele.remove())
}

filterButton.addEventListener("click", (evt)=> {
    butontext = filterButton.innerText 
    removeSpan()
    if (butontext === "Filter good dogs: OFF") {
        filterButton.innerText = "Filter good dogs: ON"
        fetch("http://localhost:3000/pups")
        .then(res => res.json())
        .then(pupsObj => {
            pupsObj.forEach(pupObj => {
                if(pupObj.isGoodDog === true){
                    turnObjToHTML(pupObj)  
                }
            })
        })
            
    } else {
        filterButton.innerText = "Filter good dogs: OFF"
        getAllpups()
    }
})
















