// import { pixabayApi } from "./api";

// export default class NewSearchesImages {
//   constructor() {
//     this.searchQuery = '';
//   }

//   fetchImages() {
//     const options = {
//       headers: {
//         key: '38122432-d1b8f090b8220c22915483b4c',
//       },
//     };
//     const url = `https://pixabay.com/api/?q=${this.searchQuery}&per_page=5`;

//     fetch(url, options)
//       .then(resp => resp.json())
//       .then(console.log);
//   }
//   get query() {
//     return this.searchQuery;
//   }

//   set query(newQuery) {
//     this.searchQuery = newQuery;
//   }

// }

// export default class NewSearchesImages {
//   constructor() {
//     this.searchQuery = '';
//   }

//   fetchImages() {
//     const options = {
//       // headers: {
//       //   key: '38122432-d1b8f090b8220c22915483b4c',
//       // },
//       param: {
//         per_page: '40',
//         image_type: 'photo',
//         orientation: 'horizontal',
//         safesearch: true,
//       },
//     };
//     const url = `https://pixabay.com/api/?key=38122432-d1b8f090b8220c22915483b4c&q=${this.searchQuery}`;

//     fetch(url, options)
//       .then(resp => {
//         if (!resp.ok) {
//           throw new Error(`Request failed with status ${resp.status}`);
//         }
//         return resp.json();
//       })
//       .then(data => console.log(data))
//       .catch(error => console.log('Error:', error));
//   }

//   get query() {
//     return this.searchQuery;
//   }

//   set query(newQuery) {
//     this.searchQuery = newQuery;
//   }
// }

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
  console.log(response.data)
  return response.data;
}
