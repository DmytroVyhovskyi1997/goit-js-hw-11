import './css/styles.css';
import { fetchImages } from './fetchImages';
import {renderCountry} from './renderCountry';
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





function cleanGallary(){
  gallery.innerHTML = '';
  button.style.display = 'none';
}

