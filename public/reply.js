let response =  document.getElementById('response')
let responseType = window.location.href.slice(window.location.href.lastIndexOf('/') + 1)


if (responseType === 'true') {
  response.innerText = "Hooray you did it!"
} else {
  response.innerText = "Off with your head!"
}
console.log(responseType)