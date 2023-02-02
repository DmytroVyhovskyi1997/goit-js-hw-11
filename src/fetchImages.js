const  API_KEY = '33274070-f9f176f3b3b7b71ec712df31b';
export const fetchImages = async (name, page = 1) => {
  const response = await fetch(`https://pixabay.com/api/?key=${API_KEY}&q=${name}&orientation=horizontal&safesearch=true&image_type=photo&per_page=40&page=${page}`);
  const pages = await response.json();
  return pages;
};



