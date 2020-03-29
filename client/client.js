const form = document.querySelector('form');            //load element by using element id
const loadingElement = document.querySelector('.loading');
const mewsElement = document.querySelector('.mews');    //load element by using .class name
const API_URL = 'http://localhost:5000/mews';

loadingElement.style.display = 'none';
listMews();

form.addEventListener('submit', (event) => {
    event.preventDefault(); //prevent page re-loading by default

    // console.log('form was submitted');
    form.style.display = 'none';
    loadingElement.style.display = '';

    //Grab data filled in on the form
    const formData = new FormData(form);
    const name = formData.get('name');
    const content = formData.get('content');
    
    const mew = {
        name,
        content
    };

    //Validate data at client side
    if((name.trim() === '') || (content.trim() === '')){
        alert('Hey! Please fill in your name and mew you want to send.');
        
        //hide loading icon and show form
        form.style.display = '';
        loadingElement.style.display = 'none';
        return;
    }

    fetch(API_URL, {
        method: 'POST',
        body: JSON.stringify(mew),
        headers: {
            'content-type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(createdMew => {
        // console.log(createdMew);

        //reset fields on the form
        form.style.display = '';
        form.reset();
        listMews();
    });
});

function listMews(){
    loadingElement.style.display = '';

    mewsElement.innerHTML = '';

    fetch(API_URL)
    .then(response => response.json())
    .then(mews => {
        mews.forEach(mew => {
            const div = document.createElement('div');
            const header = document.createElement('h4');
            header.textContent = mew.name;

            const content = document.createElement('p');
            content.textContent = mew.content;

            const created = document.createElement('small');
            created.textContent = new Date(mew.created);

            div.appendChild(header);
            div.appendChild(created);
            div.appendChild(content);
            
            mewsElement.appendChild(div);
        });
    });

    loadingElement.style.display = 'none';
}