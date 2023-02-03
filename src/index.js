import './css/styles.css';
import { fetchImages } from './fetchImages';
import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

let gallerySimpleLightbox = new SimpleLightbox('.gallery a');

const form = document.getElementById("search-form");
const gallery = document.querySelector('.gallery');
const button = document.querySelector('.Load-more');


button.style.display = 'none';
form.addEventListener('submit', handleSubmit);
button.addEventListener('click', clickBtn);
let page = 1;
function handleSubmit(e){
  e.preventDefault();
  cleanGallary();
  
  let inputValue = form.elements.searchQuery.value.trim();
 
if(inputValue === ''){
  return
}
  fetchImages(inputValue, page).then(pages =>{
let count = pages.totalHits
    if(inputValue < count){
       Notiflix.Notify.failure("We're sorry, but you've reached the end of search results.");
       button.style.display = 'none';
    };
    renderCountry(pages.hits)
    gallerySimpleLightbox.refresh();
    button.style.display = 'block';
    Notiflix.Notify.success(`Hooray! We found ${inputValue} images.`);
  })
  .catch(error => {
    Notiflix.Notify.failure("Sorry, there are no images matching your search query. Please try again.");
  });
 
};


function clickBtn(){
  page ++
  button.style.display = 'none';
  let inputValue = form.elements.searchQuery.value.trim();
    fetchImages(inputValue, page).then(pages =>{
      let count = pages.totalHits
    if(inputValue < count){
       Notiflix.Notify.failure("We're sorry, but you've reached the end of search results.");
       button.style.display = 'none';
    }
      renderCountry(pages.hits)
      gallerySimpleLightbox.refresh();
      button.style.display = 'block';
      
     
    })
    .catch(error => {
      Notiflix.Notify.failure("Sorry, there are no images matching your search query. Please try again.");
    });
}

function renderCountry(users) {
  const markup = users
    .map((image) => {
      return `<div class="photo-card">
      <a href="${image.largeImageURL}"><img class="photo" src="${image.webformatURL}" alt="${image.tags}" loading="lazy" width='200'/>
      <div class="info">
      <p class="info-item">
<b>Likes</b> <span class="info-item-api"> ${image.likes} </span>
</p>
       <p class="info-item">
           <b>Views</b> <span class="info-item-api">${image.views}</span>  
       </p>
       <p class="info-item">
           <b>Comments</b> <span class="info-item-api">${image.comments}</span>  
       </p>
       <p class="info-item">
           <b>Downloads</b> <span class="info-item-api">${image.downloads}</span> 
       </p>
    </div>
      </a>
    
    </div>
    `;
    })
    .join("");
    return gallery.insertAdjacentHTML('beforeend', markup)
}



function cleanGallary(){
  gallery.innerHTML = '';
  button.style.display = 'none';
}

