// variables
const formulario = document.querySelector('#formulario');
const listatweets = document.querySelector('#list-tweets');
let tweets = [];

// eventListeners
eventListeners();
function eventListeners() {
  // cuando el usuario agrega un nuevo tweet
  formulario.addEventListener('submit', agregarTweets);
  //   cuando el documento esta listo
  document.addEventListener('DOMContentLoaded', () => {
    tweets = JSON.parse(localStorage.getItem('tweets')) || [];
    crearHtml();
  });
}
// funciones
function agregarTweets(e) {
  e.preventDefault();
  const tweet = document.querySelector('#tweet').value;

  // vañidacion
  if (tweet === '') {
    mostrarError('Un twwet no puede ir vacio');

    return; //evita que se ejecuten mas lineas de codigo
  }
  const tweetObj = {
    id: Date.now(),
    texto: tweet,
  };
  // añadir elrreglo de tweets
  tweets = [...tweets, tweetObj];
  //   una vez agregado se crea el html
  crearHtml();
  formulario.reset();
}

function mostrarError(error) {
  const mensajeError = document.createElement('p');
  mensajeError.textContent = error;
  mensajeError.classList.add('error');
  //   inserta en el contenido
  const contenido = document.querySelector('.container-myTweets');
  contenido.appendChild(mensajeError);
  // elimina mensaje de error despues de 3seg
  setTimeout(() => {
    mensajeError.remove();
  }, 3000);
}

function crearHtml() {
  limpiarHtml();
  if (tweets.length > 0) {
    tweets.forEach((tweet) => {
      // agregar boton eliminar
      const btnEliminar = document.createElement('a');
      btnEliminar.classList.add('borrar-tweet');
      btnEliminar.textContent = 'X';
      // añadir la fincion eliminar
      btnEliminar.onclick = () => {
        borrarTweet(tweet.id);
      };
      const li = document.createElement('li');
      li.textContent = tweet.texto;
      li.appendChild(btnEliminar);
      listatweets.appendChild(li);
    });
  }
  sincronizarStorage();
}
function sincronizarStorage() {
  localStorage.setItem('tweets', JSON.stringify(tweets));
}
function borrarTweet(id) {
  tweets = tweets.filter((tweet) => tweet.id !== id);
  crearHtml();
}
function limpiarHtml() {
  while (listatweets.firstChild) {
    listatweets.removeChild(listatweets.firstChild);
  }
}
