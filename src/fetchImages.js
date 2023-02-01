const  API_KEY = '33274070-f9f176f3b3b7b71ec712df31b';

export const fetchImages = async (name, page = 1) => {
  return await(
    `https://pixabay.com/api/?key=${API_KEY}&q=${name}&orientation=horizontal&safesearch=true&image_type=photo&per_page=40&page=${page}`
  )
    .then(async response => {
      if (!response.ok) {
      
        throw new Error(response.statusText);
      }
      return await response.json();
    })
};
// async function fetchImages (name, page =1){
//   let res = axios.get(`https://pixabay.com/api/?key=${API_KEY}&q=${name}&orientation=horizontal&safesearch=true&image_type=photo&per_page=40&page=${page}`)
//   return await res;
// }
