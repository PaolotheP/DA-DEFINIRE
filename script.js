// Se vogliamo gestire uno stato "modificabile" o "definitivo", possiamo usare una variabile
let isFinal = false;

// Riferimenti a vari elementi
const backgroundBtn  = document.getElementById('backgroundBtn');
const backgroundInput = document.getElementById('backgroundInput');
const pageContainer  = document.getElementById('pageContainer');

const mediaCard      = document.getElementById('mediaCard');
const addMediaBtn    = document.getElementById('addMediaBtn');
const mediaInput     = document.getElementById('mediaInput');
const mediaContainer = document.getElementById('mediaContainer');

const audioCard      = document.getElementById('audioCard');
const addAudioBtn    = document.getElementById('addAudioBtn');
const audioInput     = document.getElementById('audioInput');
const audioContainer = document.getElementById('audioContainer');

const fontSelect     = document.getElementById('fontSelect');
const boldBtn        = document.getElementById('boldBtn');
const italicBtn      = document.getElementById('italicBtn');
const underlineBtn   = document.getElementById('underlineBtn');
const colorPicker    = document.getElementById('colorPicker');
const textEditor     = document.getElementById('textEditor');

const saveBtn        = document.getElementById('saveBtn');

/**
 * 1) Selezione sfondo
 */
backgroundBtn.addEventListener('click', () => {
  if (!isFinal) {
    backgroundInput.click();
  }
});
backgroundInput.addEventListener('change', (e) => {
  if (!isFinal && e.target.files && e.target.files[0]) {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = function(ev) {
      pageContainer.style.backgroundImage = `url('${ev.target.result}')`;
      pageContainer.classList.add('custom-background');
    };
    reader.readAsDataURL(file);
  }
});

/**
 * 2) Aggiunta Media (Foto/Video)
 */
addMediaBtn.addEventListener('click', () => {
  if (!isFinal) {
    mediaInput.click();
  }
});
mediaInput.addEventListener('change', (e) => {
  if (!isFinal) {
    const files = e.target.files;
    for (let file of files) {
      const reader = new FileReader();
      reader.onload = function(ev) {
        // Crea un elemento immagine o video a seconda del tipo
        let mediaElement;
        if (file.type.startsWith('image')) {
          mediaElement = document.createElement('img');
          mediaElement.src = ev.target.result;
          mediaElement.classList.add('uploaded-image');
          mediaElement.style.maxHeight = "100px";
        } else if (file.type.startsWith('video')) {
          mediaElement = document.createElement('video');
          mediaElement.src = ev.target.result;
          mediaElement.controls = true;
          mediaElement.style.maxHeight = "100px";
        }
        mediaContainer.appendChild(mediaElement);
      };
      reader.readAsDataURL(file);
    }
  }
});

/**
 * 3) Aggiunta Audio
 */
addAudioBtn.addEventListener('click', () => {
  if (!isFinal) {
    audioInput.click();
  }
});
audioInput.addEventListener('change', (e) => {
  if (!isFinal && e.target.files && e.target.files[0]) {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = function(ev) {
      const audio = document.createElement('audio');
      audio.controls = true;
      audio.src = ev.target.result;
      audioContainer.innerHTML = ""; // Se volessi sostituire il file precedente
      audioContainer.appendChild(audio);
    };
    reader.readAsDataURL(file);
  }
});

/**
 * 4) Toolbar di formattazione testo
 *    Usiamo document.execCommand() o range selection (per dimostrazione semplice).
 */

// Cambio font
fontSelect.addEventListener('change', () => {
  if (!isFinal) {
    document.execCommand('fontName', false, fontSelect.value);
  }
});

// Grassetto
boldBtn.addEventListener('click', () => {
  if (!isFinal) {
    document.execCommand('bold', false, null);
  }
});

// Corsivo
italicBtn.addEventListener('click', () => {
  if (!isFinal) {
    document.execCommand('italic', false, null);
  }
});

// Sottolineato
underlineBtn.addEventListener('click', () => {
  if (!isFinal) {
    document.execCommand('underline', false, null);
  }
});

// Colore
colorPicker.addEventListener('change', () => {
  if (!isFinal) {
    document.execCommand('foreColor', false, colorPicker.value);
  }
});

/**
 * 5) Salvataggio definitivo
 */
saveBtn.addEventListener('click', () => {
  // Una volta cliccato, blocchiamo ogni ulteriore modifica
  if (!isFinal) {
    isFinal = true;
    
    // Rimuoviamo la possibilità di modificare il textEditor
    textEditor.contentEditable = false;
    
    // Disabilitiamo i pulsanti di caricamento
    addMediaBtn.disabled  = true;
    addAudioBtn.disabled  = true;
    backgroundBtn.disabled = true;
    
    // Opzionalmente, potremmo nascondere la toolbar testo
    document.getElementById('toolbar').style.display = 'none';

    // Disabilitiamo il pulsante di salvataggio (o modifichiamo il testo)
    saveBtn.innerText = "Salvato";
    saveBtn.disabled = true;

    // In un contesto reale, qui potremmo inviare i dati su un server
    // (immagini, audio e testo) per un salvataggio permanente.
    // Ad esempio, potremmo serializzare i contenuti in un oggetto e fare una fetch() POST:

    // let pageData = {
    //   background: pageContainer.style.backgroundImage,
    //   media: [...document.querySelectorAll('#mediaContainer img, #mediaContainer video')].map(el => el.src),
    //   audio: document.querySelector('#audioContainer audio')?.src,
    //   text: textEditor.innerHTML
    // };

    // fetch('/api/savePage', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(pageData)
    // }).then( ... ).catch( ... );

    // Nel contesto di un prototipo locale, potremmo usare localStorage:
    // localStorage.setItem('pageData', JSON.stringify(pageData));
  }
});

/**
 * 6) Caricamento della pagina in modalità “visualizzazione”
 *    - Se volessimo, potremmo leggere da localStorage o da server i dati
 *      e mostrare direttamente i contenuti salvati se la pagina è già finalizzata.
 *    - In un vero ambiente, l’URL sarebbe univoco per ogni orsacchiotto/NFC.
 *      L’NFC punterebbe a un URL con un ID che carica i dati corrispondenti dal DB.
 */
