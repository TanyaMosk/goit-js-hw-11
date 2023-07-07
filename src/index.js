import './common.css';
import { fetchSearchesImages } from './pixabay-api';
import { renderMarkupImage } from './markup';

// import NewSearchesImages from './pixabay-api'
const refs = {
  searchForm: document.querySelector('#search-form'),
  gallery: document.querySelector('.gallery'),
  loadMoreBtn: document.querySelector('.load-more'),
};

refs.searchForm.addEventListener('submit', onSearchForm);
refs.loadMoreBtn.addEventListener('click', onLoadMoreBtn);
refs.loadMoreBtn.classList.add('is-hidden');
let searchQuery = '';
let page = 1;

function onSearchForm(evt) {
  evt.preventDefault();
  

  searchQuery = evt.currentTarget.searchQuery.value.trim();

  page = 1;
  console.log(searchQuery);
  if (searchQuery === '') {
    refs.gallery.innerHTML = '';
    return alert("Sorry, there are no images matching your search query. Please try again.");
}
  fetchSearchesImages(searchQuery, page).then((data) => {
    // const hits = data.hits;
    console.log(data.hits);
    if (data.hits.length === 0) {
      refs.gallery.innerHTML = '';
      refs.loadMoreBtn.classList.add('is-hidden');
      console.log(
        'Sorry, there are no images matching your search query. Please try again.'
      );
    } else {
      refs.gallery.innerHTML = '';
      refs.loadMoreBtn.classList.remove('is-hidden');
      const markup = data.hits.map(renderMarkupImage).join('');
      // console.log(markup);
      refs.gallery.insertAdjacentHTML('beforeend', markup);
      console.log(`Hooray! We found ${data.totalHits} images.`);
    }
  });
}

function onLoadMoreBtn() {
  page += 1;
  fetchSearchesImages(searchQuery, page).then(({ hits }) => {
    console.log(hits);
    const markup = hits.map(renderMarkupImage).join('');
    refs.gallery.insertAdjacentHTML('beforeend', markup);
  });
}
