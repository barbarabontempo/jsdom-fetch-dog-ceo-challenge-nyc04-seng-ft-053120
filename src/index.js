console.log('%c HI', 'color: firebrick')

let allBreeds = []
const imgUrl = "https://dog.ceo/api/breeds/image/random/4"
const breedUrl = 'https://dog.ceo/api/breeds/list/all'

const dogContainer = document.getElementById("dog-image-container")
const dogBreedList = document.getElementById("dog-breeds")
const dropDown = document.getElementById("breed-dropdown")

//CHALLENGE 1
//data = a hash with a key = message
fetch(imgUrl)
    .then(response => response.json())
    .then(data => {
    data.message.forEach((individualDogImgUrl) => addDogImage(individualDogImgUrl))
    })

//this helper method: we made the element img-src, next we gotta slap it on da DOM
function addDogImage(dogImg) {
    const imgElement = document.createElement("img")
    imgElement.src = dogImg
    imgElement.className="dogphoto"
    dogContainer.append(imgElement)
}

//CHALLENGE 2
fetch(breedUrl)
.then(response => response.json())
.then(data=> {
    for(const dogBreed in data.message) {
        //console.log(data.message[dogBreed])
        if (data.message[dogBreed].length > 0) {    //we are looking at each key, if it has an array length > 0
            data.message[dogBreed].forEach((origin) => { 
                allBreeds.push(`${origin} ${dogBreed}`)
                addBreeds(`${origin} ${dogBreed}`)
            })
        } else {
            allBreeds.push(dogBreed)
            addBreeds(dogBreed)
        }
    }
})

//helper function to help us iterate through data.message 
function addBreeds(dogBreedString){
    const liElement = document.createElement("li")
    liElement.innerText = dogBreedString
    dogBreedList.append(liElement)
}

//Challenge 3 
dogBreedList.addEventListener("click", (event) => {
    event.target.style.color = "red" 
})

//Challenge 4

dropDown.addEventListener("change", (event)=> {
    let userInput = event.target.value
    dogBreedList.innerHTML = ""
    const filteredBreeds = allBreeds.filter((breed) => breed.startsWith(userInput)) 
    filteredBreeds.forEach((breed) => addBreeds(breed))
})


