export function renderCountry(users) {
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