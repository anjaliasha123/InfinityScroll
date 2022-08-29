const count = 10;
const apiKey = "Xsb300DBiFoGZQtyFs2EQUnElgJujSrDaq6br7olb80";
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

const loader = document.querySelector(".loader");
// Fetch function

let photosArray = [];
let imgCount = 0;
let totalImages = 0;
let ready = false;
let flag = 0;
function imageLoaded() {
  imgCount++;
  if (imgCount >= count) {
    ready = true;
    imgCount = 0;
    flag++;
    if (flag === 1) {
      document.querySelector(".loader").hidden = true;
    }
  }

  console.log(imgCount);
  console.log(ready);
}
function displayPhoto() {
  const imgCont = document.querySelector(".img-container");
  photosArray.forEach((photo) => {
    const aTag = document.createElement("a");
    aTag.setAttribute("href", photo.links.html);
    aTag.setAttribute("target", "_blank");
    const imgTag = document.createElement("img");
    imgTag.setAttribute("src", photo.urls.regular);
    imgTag.setAttribute("alt", photo.description);
    imgTag.setAttribute("title", photo.description);
    imgTag.addEventListener("load", imageLoaded);
    aTag.appendChild(imgTag);
    if (imgCont !== null) {
      imgCont.appendChild(aTag);
    }
  });
}
async function getPhotos() {
  try {
    const response = await fetch(apiUrl);
    photosArray = await response.json();
    // console.log(photosArray);
    // console.log(imgCont);

    displayPhoto();
  } catch (error) {
    //log error
    console.log(error);
  }
}

window.addEventListener("scroll", () => {
  if (
    window.innerHeight + window.scrollY >=
    document.body.offsetHeight - 1000
  ) {
    getPhotos();
  }
  // console.log(document.documentElement.scrollTop);
});
//loader.hidden = true;
getPhotos();
