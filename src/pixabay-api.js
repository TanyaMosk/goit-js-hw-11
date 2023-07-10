import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const KEY = '38122432-d1b8f090b8220c22915483b4c';

export async function fetchSearchesImages(searchQuery, page) {
  const url = `${BASE_URL}?key=${KEY}&q=${searchQuery}&page=${page}`;
  
  const response = await axios.get(url, {
    params: {
      per_page: 40,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
    },
  });
  // console.log(response.data)
  return response.data;
}

// export function fetchSearchesImages(searchQuery, page) {
//   const url = `${BASE_URL}?key=${KEY}&q=${searchQuery}&page=${page}`;

//   return axios
//     .get(url, {
//       params: {
//         per_page: 40,
//         image_type: 'photo',
//         orientation: 'horizontal',
//         safesearch: true,
//       },
//     })
//     .then(response => {
//       console.log(response.data);
//       return response.data;
//     })    
// }

