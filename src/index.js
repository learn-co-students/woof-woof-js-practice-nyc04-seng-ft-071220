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
            dogBar.append(nameSpan)


        nameSpan.addEventListener("click", (e) => {
            // dogInfo.children.forEach((child) => {
            //     child.remove()
            // })
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
            // console.log(evt.target)
            let nameSpan = document.querySelectorAll("span")

            if (filterButton.innerText === "Filter good dogs: OFF") {
                filterButton.innerText = "Filter good dogs: ON"
            } else if (filterButton.innerText === "Filter good dogs: ON") {
                filterButton.innerText = "Filter good dogs: OFF"
            }

            const badPups = pupsArray.filter(pup => {
                return pup.isGoodDog === false
            })
             console.log(nameSpan)
            // nameSpan.style.visibility = "hidden"

            // badPups.forEach(singlePup => {
            //     console.log(singlePup)
            //     singlePup.style.display = "none"
            // }) 
            
        })
    }) 
    
    