const dogBar = document.querySelector("#dog-bar")
const dogInfo=document.querySelector("#dog-info")
const filterButton = document.querySelector("#good-dog-filter")



//GET REQUEST
fetch("http://localhost:3000/pups")
    .then(res => res.json())
    .then(pupsArray => {

        pupsArray.forEach(pup => {
            let nameSpan = document.createElement("span")
            nameSpan.innerText = pup.name
            nameSpan.setAttribute('data-on-off', pup.isGoodDog)
            dogBar.append(nameSpan)


        nameSpan.addEventListener("click", (e) => {
            let imgTag=document.createElement("img")
            let h2Tag=document.createElement("h2")
            let buttonBoolean=document.createElement("button")

            imgTag.src=pup.image
            h2Tag.innerText=pup.name
            
            if(pup.isGoodDog == true) {
               buttonBoolean.innerText = "Good Dog!"
            } else {
                buttonBoolean.innerText = "Bad Dog!"
            }
        
           dogInfo.innerText = ""
         
            dogInfo.append(imgTag, h2Tag, buttonBoolean)



            //PATCH REQUEST
            buttonBoolean.addEventListener("click", (e) => {

             fetch(`http://localhost:3000/pups/${pup.id}`, {
                 method: "PATCH",
                 headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                  },
                  body: JSON.stringify({
                      isGoodDog: !pup.isGoodDog
                  })
                })
                  .then(resp => resp.json())
                  .then(updatedPup => {
                   
                     if(updatedPup.isGoodDog == true) {
                        buttonBoolean.innerText = "Good Dog!"
                     } else {
                         buttonBoolean.innerText = "Bad Dog!"
                     }
                     
                  pup.isGoodDog = updatedPup.isGoodDog
                  })
             })
            })   
        })

        filterButton.addEventListener("click", (evt) => {
            let nameSpan = document.querySelectorAll("span")

            if (filterButton.innerText === "Filter good dogs: OFF") {
                filterButton.innerText = "Filter good dogs: ON"
                nameSpan.forEach( (dog) =>{
                    //inner if statement
                    if(dog.dataset.onOff === "false"){
                        dog.style.visibility = "hidden"
                    }
                })
            } else if (filterButton.innerText === "Filter good dogs: ON") {
                filterButton.innerText = "Filter good dogs: OFF"
                nameSpan.forEach( (dog) =>{
                    //inner if statement
                    if(dog.dataset.onOff === "false"){
                        dog.style.visibility = "visible"
                    }
                })
            }
            
            })            
        }) 
    
    