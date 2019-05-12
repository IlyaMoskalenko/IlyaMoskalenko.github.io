const ipcRenderer = require('electron').ipcRenderer

const url = require('url')
const path = require('path')

window.addEventListener('load', () => {
    addImagesEvents()
    searchImagesEvent()
    selectEvent()
    buttonEvent('open-directory', openDirectory)
})
function openDirectory () {
    ipcRenderer.send('open-directory')
    ipcRenderer.on('images-reply', (event, arg) => {
      render(arg)
    })
}

function render (images) {
  let listGroup = document.querySelector('.list-group')
  listGroup.innerHTML = `
    <li class="list-group-header">
      <input id="search-box" class="form-control" type="text" placeholder="Поиск по папке">
    </li>
  `
  for(img of images) {
    listGroup.innerHTML +=`
      <li class="list-group-item">
        <img class=" media-object pull-left" src=${img.src}  height="32">
        <div class="media-body">
        <strong>${img.filename}</strong>
        <p>${img.size}</p>
        </div>
      </li>
    `
  }
  document.querySelector('.list-group-item').classList.add('selected')
  addImagesEvents()
  searchImagesEvent()
  selectEvent()
  selectFirstImage()
}

function buttonEvent (id, func) {
    const openDirectory = document.getElementById(id)
    openDirectory.addEventListener('click', func)
}

function addImagesEvents () {
    const thumbs = document.querySelectorAll('li.list-group-item')
  
    for (let i = 0, length1 = thumbs.length; i < length1; i++) {
      thumbs[i].addEventListener('click', function () {
        changeImage(this)
      })
    }
  }

  function selectEvent () {
    const select = document.getElementById('filters')
  
    select.addEventListener('change', function () {
      applyFilter(this.value, document.getElementById('image-displayed'))
    })
  }
  
  function changeImage (node) {
    if (node) {
      document.querySelector('li.selected').classList.remove('selected')
      node.classList.add('selected')
      document.getElementById('image-displayed').src = node.querySelector('img').src
    } else {
      document.getElementById('image-displayed').src = ''
    }
  }
   
  function searchImagesEvent () {
    const searchBox = document.getElementById('search-box')
  
    searchBox.addEventListener('keyup', function () {
      const regex = new RegExp(this.value.toLowerCase(), 'gi')
  
      if (this.value.length > 0) {
        const thumbs = document.querySelectorAll('li.list-group-item img')
        for (let i = 0, length1 = thumbs.length; i < length1; i++) {
          const fileUrl = url.parse(thumbs[i].src)
          const fileName = path.basename(fileUrl.pathname)
          if (fileName.match(regex)) {
            thumbs[i].parentNode.classList.remove('hidden')
          } else {
            thumbs[i].parentNode.classList.add('hidden')
          }
        }
        selectFirstImage()
      } else { 
        const hidden = document.querySelectorAll('li.hidden')
        for (let i = 0, length1 = hidden.length; i < length1; i++) {
          hidden[i].classList.remove('hidden')
        }
      }
    })
  }
  
  function selectFirstImage () {
    const image = document.querySelector('li.list-group-item:not(.hidden)')
    changeImage(image)
  }