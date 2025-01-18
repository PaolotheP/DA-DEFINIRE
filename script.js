/************************************************************
 * script.js - Gestisce caricamento immagini, audio, testo,
 *             scrolling orizzontale e salvataggio finale.
 ************************************************************/
let isFinal = false;

// Riferimenti
const backgroundBtn    = document.getElementById('backgroundBtn');
const backgroundInput  = document.getElementById('backgroundInput');

const mediaContainer   = document.getElementById('mediaContainer');
const photoPlaceholder = document.getElementById('photoPlaceholder');
const addMediaBtn      = document.getElementById('addMediaBtn');
const mediaInput       = document.getElementById('mediaInput');

const audioContainer   = document.getElementById('audioContainer');
const addAudioBtn      = document.getElementById('addAudioBtn');
const audioInput       = document.getElementById('audioInput');

const fontSelect       = document.getElementById('fontSelect');
const boldBtn          = document.getElementById('boldBtn');
const italicBtn        = document.getElementById('italicBtn');
const underlineBtn     = document.getElementById('underlineBtn');
const colorPicker      = document.getElementById('colorPicker');
const textEditor       = document.getElementById('textEditor');

const saveBtn          = document.getElementById('saveBtn');
const appContainer     = document.querySelector('.app-container');

/**
 * 1) Scegliere uno sfondo globale
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
      appContainer.style.backgroundImage = `url('${ev.target.result}')`;
      appContainer.classList.add('custom-bg');
    };
    reader.readAsDataURL(file);
  }
});

/**
 * 2) Aggiunta Foto/Video con scrolling orizzontale
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
        let element;
        if (file.type.startsWith('image')) {
          element = document.createElement('img');
          element.src = ev.target.result;
          element.style.maxHeight = "200px";
        } else if (file.type.startsWith('video')) {
          element = document.createElement('video');
          element.src = ev.target.result;
          element.controls = true;
          element.style.maxHeight = "200px";
        }

        // Rimuovo il placeholder se presente
        if (photoPlaceholder) {
          photoPlaceholder.remove();
        }
        mediaContainer.appendChild(element);
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
      // Pulisco l'area e inserisco audio
      audioContainer.innerHTML = "";
      const audioEl = document.createElement('audio');
      audioEl.src = ev.target.result;
      audioEl.controls = true;
      audioContainer.appendChild(audioEl);
    };
    reader.readAsDataURL(file);
  }
});

/**
 * 4) Toolbar di formattazione testo
 */
fontSelect.addEventListener('change', () => {
  if (!isFinal) {
    document.execCommand('fontName', false, fontSelect.value);
  }
});
boldBtn.addEventListener('click', () => {
  if (!isFinal) {
    document.execCommand('bold', false, null);
  }
});
italicBtn.addEventListener('click', () => {
  if (!isFinal) {
    document.execCommand('italic', false, null);
  }
});
underlineBtn.addEventListener('click', () => {
  if (!isFinal) {
    document.execCommand('underline', false, null);
  }
});
colorPicker.addEventListener('change', () => {
  if (!isFinal) {
    document.execCommand('foreColor', false, colorPicker.value);
  }
});

/**
 * 5) Salvataggio definitivo
 */
saveBtn.addEventListener('click', () => {
  if (!isFinal) {
    isFinal = true;
    // Disabilita l'editor
    textEditor.contentEditable = false;
    
    // Disabilita i pulsanti
    addMediaBtn.disabled   = true;
    addAudioBtn.disabled   = true;
    backgroundBtn.disabled = true;
    fontSelect.disabled    = true;
    boldBtn.disabled       = true;
    italicBtn.disabled     = true;
    underlineBtn.disabled  = true;
    colorPicker.disabled   = true;
    
    saveBtn.textContent = "Salvato";
    saveBtn.disabled    = true;

    // (Opzionale) Invia i dati a un server per memorizzare in modo permanente.
  }
});
