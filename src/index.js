fetchDog();

function fetchDog(){
    fetch('http://localhost:3000/pups')
    .then(resp => resp.json())
    .then(data => {
        data.forEach(dog => addDogs(dog))
    })
}

function addDogs(dog){
    const dogBar = document.querySelector('#dog-bar');
    const span = document.createElement('span');
    span.style.cursor = 'pointer';
    span.textContent = dog.name;

    span.addEventListener('click', e => {
        addDetials(dog);
    })

    dogBar.append(span);
}

function addDetials(dog){
    const dogInfo = document.querySelector('#dog-info');
    dogInfo.innerHTML = '';

    const dogImage = document.createElement('img');
    const dogName = document.createElement('h2');
    const button = document.createElement('button');

    dogImage.setAttribute('src', dog.image);
    dogName.textContent = dog.name;
    button.textContent = (dog.isGoodDog) ? 'Good Dog!' : "Bad Dog!";

    button.addEventListener('click', e => {
        dog.isGoodDog = !dog.isGoodDog;
        let newValue;

        if(!dog.isGoodDog){
            button.textContent = 'Bad Dog!';
            newValue = false;
        } else{
            button.textContent = 'Good Dog!'
            newValue = true;
        }

        patchDog(dog.id, newValue);
    })

    dogInfo.append(dogImage, dogName, button)

}

function patchDog(id, newValue){
    fetch(`http://localhost:3000/pups/${id}`,{
        method: 'PATCH',
        headers: {
            'Content-Type' : 'application/json',
        },
        body: JSON.stringify(
            {
            isGoodDog: newValue,
          }
        )
    })
}