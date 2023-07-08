
export function renderMarkupImage({
  webformatURL,
  largeImageURL,
  tags,
  likes,
  views,
  comments,
  downloads,
}) {
  return `
  <div class="photo-card">
    <div class="gallery-img">
      <a href="${largeImageURL}" >
      <img src="${webformatURL}" alt="${tags}" loading="lazy" width="240" />
        </a>
        </div class="desc">
      <div class="info">
        <p class="info-item">
        <b>Likes ${likes}</b>
          </p>
        <p class="info-item">
        <b>Views ${views}</b>
          </p>
        <p class="info-item">
        <b>Comments ${comments}</b>
          </p>
        <p class="info-item">
        <b>Downloads ${downloads}</b>
          </p>
      </div>
  </div> `;
}

