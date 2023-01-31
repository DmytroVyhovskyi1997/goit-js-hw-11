const  API_KEY = '33274070-f9f176f3b3b7b71ec712df31b';

export const fetchImages = async inputValue => {
  return await fetch(
    `https://pixabay.com/api/?key=${API_KEY}&q=${inputValue}&orientation=horizontal&safesearch=true&image_type=photo&per_page=40`
  )
    .then(async response => {
      if (!response.ok) {
      
        throw new Error(response.statusText);
      }
      return await response.json();
    })
};