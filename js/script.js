const loadPhone = async (searchText, isShowAll) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
    const data = await res.json();
    const phones = data.data;
    // console.log(phones);
    displayPhones(phones,isShowAll);
}

const displayPhones = (phones,isShowAll) => {
    // console.log(phones);
    const phoneContainer = document.getElementById('phone-container')
    //clear phone container card before adding new card
    phoneContainer.textContent= '';
    // display show all btn if there are more than 8 phones
    const showAllContainer = document.getElementById('show-all-container')
    if(phones.length > 8 && !isShowAll){
     showAllContainer.classList.remove('hidden');
    }
    else{
        showAllContainer.classList.add('hidden');
    }

    // display only first 8 phones if not show all
    if (!isShowAll){
        phones = phones.slice(0,8);
    }

    phones.forEach(phone => {
        // console.log(phone);
        // 2: create a div
        const phoneCard = document.createElement('div');
        phoneCard.classList = `card bg-gray-80 p-4 shadow-xl`;
        // 3: set inner html
        phoneCard.innerHTML = `
         
                <figure>
                    <img src="${phone.image}" alt="phones" />
                </figure>
                <div class="card-body">
                    <h2 class="card-title">${phone.phone_name}</h2>
                    <div class="card-actions justify-end">
                        <button onclick="handleShowDetails('${phone.slug}')" class="btn btn-accent">Show Details</button>
                    </div>
                </div>
        `;
        // 4:append child
        phoneContainer.appendChild(phoneCard);
    });
    // hide loading spinner
    toggleLoadingSpinner(false);
}
// handle show details and modal
 const handleShowDetails= async (id)=>{
//   console.log('btnclick',id)
//   load single phone data
const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`);
const data = await res.json();
const phone = data.data;
showPhoneDetails(phone);
 }

//  modal section
const showPhoneDetails = (phone) =>{
    console.log(phone);

const showDetailContainer = document.getElementById('show-detail-container');
showDetailContainer.innerHTML=`
<div class="grid place-content-center">
<h3 class="text-3xl font-bold">${phone.name}</h3>
<img src="${phone.image}" alt="">
</div>
<p><span class="font-bold text-lg">Storage: </span>${phone.mainFeatures.storage}</p>
<p><span class="font-bold text-lg">Display Size: </span>${phone.mainFeatures.displaySize}</p>
<p><span class="font-bold text-lg">Chipset: </span>${phone.mainFeatures.chipSet}</p>
<p><span class="font-bold text-lg">memory: </span>${phone.mainFeatures.memory}</p>
<p><span class="font-bold text-lg">releaseDate: </span>${phone?.releaseDate}</p>
<p><span class="font-bold text-lg">Slug: </span>${phone.slug}</p>
<p><span class="font-bold text-lg">Band: </span>${phone.brand}</p>
<p><span class="font-bold text-lg">Gps: </span>${phone.others.GPS}</p>

`;
    //show the modal
    show_details_modal.showModal()
}
// handle search button

const handleSearch = (isShowAll) =>{
    // console.log('search');
toggleLoadingSpinner(true);
const searchField = document.getElementById('search-field');
const searchText = searchField.value;
console.log (searchText);
loadPhone(searchText, isShowAll);
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

// handle show all btn
const handleShowAll = () =>{
 handleSearch(true);
}

// footer container
const displayNav = () =>{
    const footerContainer = document.getElementById('footer-container');
    const footerDiv = document.createElement('div');
    footerDiv.innerHTML= ` 
    <p>Copyright © Arman - All right reserved by MAHP Ltd</p>
    `;
    footerContainer.appendChild(footerDiv);
}
displayNav();

loadPhone("iphone");