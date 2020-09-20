const dogBar = document.querySelector('#dog-bar')
const dogInfo = document.querySelector('#dog-info')
const filterBtn = document.querySelector('#good-dog-filter')

const turnDoggosIntoObjects = (doggoArray) => {
    doggoArray.forEach(dog => {
        let dogSpan = document.createElement('span')
        dogSpan.innerText = dog.name
        dogBar.append(dogSpan)

        dogSpan.addEventListener('click', event => {
            if (dogInfo.hasChildNodes()) {
                dogInfo.removeChild(dogInfo.childNodes[0])
            }

            let dogContainer = document.createElement('div')
            let dogH2 = document.createElement('h2')
            dogH2.innerText = dog.name
            let dogImg = document.createElement('img')
            dogImg.src = dog.image
            let doggoBtn = document.createElement('button')
            dog.isGoodDog ? doggoBtn.innerText = 'Good Dog' : doggoBtn.innerText = 'Bad Dog'

            doggoBtn.addEventListener('click', event => {
                let doggoBoolean = !dog.isGoodDog
                fetch(`http://localhost:3000/pups/${dog.id}`, {
                        method: "PATCH",
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            isGoodDog: doggoBoolean
                        })
                    })
                    .then(response => response.json())
                    .then((updatedObj) => {
                        dog.isGoodDog = updatedObj.isGoodDog
                        dog.isGoodDog ? doggoBtn.innerText = 'Good Dog' : doggoBtn.innerText = 'Bad Dog'
                    })
            })

            dogContainer.append(dogH2, doggoBtn, dogImg)
            dogInfo.append(dogContainer)

        })

    })

}

fetch('http://localhost:3000/pups')
    .then(response => response.json())
    .then(turnDoggosIntoObjects)


