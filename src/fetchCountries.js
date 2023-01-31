export const fetchImages = async (value, page) => {
  return await fetch(
    `https://pixabay.com/api/?key=d7a56b06d492630f1b3baa112539babcaef7fb785e6b17da4be60f5d16e79cd4&q=${value}&orientation=horizontal&safesearch=true&image_type=photo&per_page=40&page=${page}`
  )
    .then(async response => {
      if (!response.ok) {
      
        throw new Error(response.statusText);
      }
      return await response.json();
    })
};