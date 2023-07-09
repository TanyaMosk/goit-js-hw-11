import './common.css';
import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { fetchSearchesImages } from './pixabay-api';
import { renderMarkupImage } from './markup';

const refs = {
  searchForm: document.querySelector('#search-form'),
  gallery: document.querySelector('.gallery'),
  loadMoreBtn: document.querySelector('.load-more'),
};

refs.loadMoreBtn.classList.add('load-more-btn');
refs.searchForm.addEventListener('submit', onSearchForm);
refs.loadMoreBtn.addEventListener('click', onLoadMoreBtn);
refs.loadMoreBtn.classList.add('is-hidden');

let searchQuery = '';
let page = 1;
const pages = 40;

function onSearchForm(evt) {
  evt.preventDefault();

  searchQuery = evt.currentTarget.searchQuery.value.trim();

  page = 1;
  console.log(searchQuery);

  fetchSearchesImages(searchQuery, page)
    .then(data => {
      if (data.totalHits === 0 || searchQuery === '') {
        refs.gallery.innerHTML = '';
        refs.loadMoreBtn.classList.add('is-hidden');

        Notiflix.Notify.failure(
          'Sorry, there are no images matching your search query. Please try again.',
          {
            timeout: 2000,
            width: '260px',
          }
        );
        return;
      } else {
        refs.gallery.innerHTML = '';
        refs.loadMoreBtn.classList.remove('is-hidden');
        const markup = data.hits.map(renderMarkupImage).join('');
        refs.gallery.insertAdjacentHTML('beforeend', markup);

        let lightbox = new SimpleLightbox('.gallery-img a', {
          captionsData: 'alt',
          captionDelay: '250',
        });

        Notiflix.Notify.success(`Hooray! We found ${data.totalHits} images.`, {
          timeout: 2000,
          width: '260px',
        });
      }
      // console.log(data.hits.length);

      if (data.hits.length < pages) {
        refs.loadMoreBtn.classList.add('is-hidden');
        Notiflix.Notify.info(
          "We're sorry, but you've reached the end of search results.",
          {
            timeout: 2000,
            width: '260px',
          }
        );
      }
    })
    .catch(onError);
}

function onLoadMoreBtn() {
  page += 1;
  fetchSearchesImages(searchQuery, page)
    .then(data => {
      refs.gallery.insertAdjacentHTML(
        'beforeend',
        data.hits.map(renderMarkupImage).join('')
      );
      let lightbox = new SimpleLightbox('.gallery-img a', {
        captionsData: 'alt',
        captionDelay: '250',
      });

      if (data.hits.length < pages) {
        refs.loadMoreBtn.classList.add('is-hidden');

        Notiflix.Notify.info(
          "We're sorry, but you've reached the end of search results.",
          {
            timeout: 2000,
            width: '260px',
          }
        );
      }
    })
    .catch(onError);
}

function onError() {
  Notiflix.Notify.failure(
    'Oops, something went wrong 🥺. Please try reloading the page!',
    {
      timeout: 2000,
      width: '260px',
    }
  );
}
