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
form.addEventListener("submit", handleSubmit);
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
    
    renderCountry(pages.hits)
    gallerySimpleLightbox.refresh();
    button.style.display = 'block';
  })
  .catch(error => {
    Notiflix.Notify.failure("Sorry, there are no images matching your search query. Please try again.");
  });
 
}


function clickBtn(){
  page ++
  let inputValue = form.elements.searchQuery.value.trim();
    fetchImages(inputValue, page).then(pages =>{
      
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
    .map((user) => {
      return `<div class="photo-card">
      <a href="${user.largeImageURL}"><img class="photo" src="${user.webformatURL}" alt="${user.tags}" loading="lazy"/></a>
      <div class="info">
        <p class="info-item">
          <b>${user.likes}</b>
        </p>
        <p class="info-item">
          <b>${user.views}</b>
        </p>
        <p class="info-item">
          <b>${user.comments}</b>
        </p>
        <p class="info-item">
          <b>${user.downloads}</b>
        </p>
      </div>
    </div>`;
    })
    .join("");
    gallery.innerHTML = markup;
}



function cleanGallary(){
  gallery.innerHTML = '';
  button.style.display = 'none';
}