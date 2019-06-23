const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#errorMessage');
const messageTwo = document.querySelector('#forecastMessage')



weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();  

    const location = search.value.trim();
    if (!location) return;


    messageOne.textContent = 'Loading...';
    messageTwo.textContent = '';

    fetch(`/weather?address=${location}`).then((response)=>{
    response.json().then((data)=>{
            if(data.error) {                      
                return messageOne.textContent = data.error;
            }

            messageOne.textContent = data.location;
            messageTwo.textContent = data.forecast;
        });
    });
});



