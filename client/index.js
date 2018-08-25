'use strict'
{
  const root = document.getElementById('root')
  const search = createAndAppend('input', root, {
    id: 'searchBar',
    type: 'text'
  })
  search.addEventListener('keyup', (event) => {
    const searchBarVal = event.target.value
    const localhostURL = 'http://localhost:3000/api/search/video-query?query=' + searchBarVal
    fetchJSON(localhostURL, main(event))
  })
  
  const videosList = createAndAppend('ul', root)
  function render(content) {
    videosList.innerHTML = ''
    content.forEach(video => {
      const snippet = video.snippet
      const result = createAndAppend('li', videosList, {
        html: snippet.title
      })

      const thumbnails = snippet.thumbnails
       createAndAppend('iframe', result, {
        src: 'https://www.youtube.com/embed/' + video.id.videoId,
        width: thumbnails.medium.width,
        height: thumbnails.medium.height
      })
    })
  }

  function main(event) {
    return function (error, videos) {
      if (error) {
        console.log(error)
        return
      }
      const items = videos.response.items
      if (event.keyCode === 13) { // enter
        render(items)
        console.log('enter pressed')
      }

    }
  }

}
