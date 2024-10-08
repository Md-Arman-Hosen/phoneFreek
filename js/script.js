const loadPhone = async (searchText) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
    const data = await res.json();
    const phones = data.data;
    // console.log(phones);
    displayPhones(phones);
}

const displayPhones = phones => {
    // console.log(phones);
    const phoneContainer = document.getElementById('phone-container')
    //clear phone container card before adding new card
    phoneContainer.textContent= '';
    // display show all btn if there are more than 6 phones
    const showAllContainer = document.getElementById('show-all-container')
    if(phones.length > 6){
     showAllContainer.classList.remove('hidden');
    }
    else{
        showAllContainer.classList.add('hidden');
    }

    // display only first 6 phones
    phones = phones.slice(0,6);

    phones.forEach(phone => {
        console.log(phone);
        // 2: create a div
        const phoneCard = document.createElement('div');
        phoneCard.classList = `card bg-gray-100 p-4 shadow-xl`;
        // 3: set inner html
        phoneCard.innerHTML = `
         
                <figure>
                    <img src="${phone.image}" alt="phones" />
                </figure>
                <div class="card-body">
                    <h2 class="card-title">${phone.phone_name}</h2>
                    <p>If a dog chews shoes whose shoes does he choose?</p>
                    <div class="card-actions justify-end">
                        <button class="btn btn-accent">Buy Now</button>
                    </div>
                </div>
        `;
        // 4:append child
        phoneContainer.appendChild(phoneCard);
    });
    // hide loading spinner
    toggleLoadingSpinner(false);
}

// handle search button

const handleSearch = () =>{
    // console.log('search');
    toggleLoadingSpinner(true);
const searchField = document.getElementById('search-field');
const searchText = searchField.value;
console.log (searchText);
loadPhone(searchText);
}

// spinner
const toggleLoadingSpinner = (isloading)=>{
    const loadingSpinner = document.getElementById('loading-spinner');
  if(isloading){
    loadingSpinner.classList.remove('hidden');
  }
  else{
    loadingSpinner.classList.add('hidden');
  }
}

loadPhone("iphone");