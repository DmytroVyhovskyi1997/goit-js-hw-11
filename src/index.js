import './css/styles.css';
import { fetchImages } from './fetchImages';
import Lodash from 'lodash.debounce';
import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const DEBOUNCE_DELAY = 300;

const form = document.querySelector(".search-form");
const gallery = document.querySelector('.gallery')

form.addEventListener("submit", handleSubmit);

function handleSubmit(e){
  e.preventDefault();
  cleanGallary();

  
  const inputValue = e.currentTarget.elements.searchQuery.value.trim();
if(inputValue === ''){
  return
}
  fetchImages(inputValue).then(pages =>{
   
     if (pages.length === 20) {
      Notiflix.Notify.success(`Hooray! We found images.`);
    }else if (pages.length < 40) {
      Notiflix.Notify.info("We're sorry, but you've reached the end of search results.");
    }
    renderCountry(pages)
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
}