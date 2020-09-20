const dogBar = document.querySelector("#dog-bar")

fetch("http://localhost:3000/pups")
    .then(res => res.json())
    .then(pupsArray => {
        pupsArray.forEach(pup => {
            let nameSpan = document.createElement("span")
            nameSpan.innerText = pup.name
            dogBar.append(nameSpan)
        }) 
    })