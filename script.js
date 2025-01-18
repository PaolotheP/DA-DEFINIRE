let isFinal = false;

// Selettori
const backgroundBtn  = document.getElementById('backgroundBtn');
const backgroundInput = document.getElementById('backgroundInput');
const mediaContainer = document.getElementById('mediaContainer');
const photoPlaceholder = document.getElementById('photoPlaceholder');
const addMediaBtn    = document.getElementById('addMediaBtn');
const mediaInput     = document.getElementById('mediaInput');

const audioContainer = document.getElementById('audioContainer');
const addAudioBtn    = document.getElementById('addAudioBtn');
const audioInput     = document.getElementById('audioInput');

const fontSelect     = document.getElementById('fontSelect');
const boldBtn        = document.getElementById('boldBtn');
const italicBtn      = document.getElementById('italicBtn');
const underlineBtn   = document.getElementById('underlineBtn');
const colorPicker    = document.getElementById('colorPicker');
const textEditor     = document.getElementById('textEditor');

const saveBtn        = document.getElementById('saveBtn');
const teddyCard      = document.querySelector('.teddy-card');

/* 1) Gestione sfondo */
backgroundBtn.addEventListener('click', () => {
  if (!isFinal) backgroundInput.click();
});
backgroundInput.addEventListener('change', (e) => {
  if (!isFinal && e.target.files && e.target.files[0]) {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = function(ev) {
      // Imposto la card con un bg personalizzato
      teddyCard.style.backgroundImage = `url('${ev.target.result}')`;
      teddyCard.classList.add('custom-bg');
    };
    reader.readAsDataURL(file);
  }
});

/* 2) Aggiunta Media (Foto/Video) */
addMediaBtn.addEventListener('click', () => {
  if (!isFinal) mediaInput.click();
});
mediaInput.addEventListener('change', (e) => {
  if (!isFinal) {
    const files = e.target.files;
    for (let file of files) {
      const reader = new FileReader();
      reader.onload = function(ev) {
        let mediaEl;
        if (file.type.startsWith('image')) {
          mediaEl = document.createElement('img');
          mediaEl.src = ev.target.result;
          mediaEl.style.maxHeight = "100%";
          mediaEl.style.maxWidth = "100%";
          mediaEl.style.objectFit = "cover";
        } else if (file.type.startsWith('video')) {
          mediaEl = document.createElement('video');
          mediaEl.src = ev.target.result;
          mediaEl.controls = true;
          mediaEl.style.maxHeight = "100%";
          mediaEl.style.maxWidth = "100%";
          mediaEl.style.objectFit = "cover";
        }
        // Rimuovo il placeholder se c'era
        if (photoPlaceholder) {
          photoPlaceholder.remove();
        }
        mediaContainer.appendChild(mediaEl);
      };
      reader.readAsDataURL(file);
    }
  }
});

/* 3) Aggiunta Audio */
addAudioBtn.addEventListener('click', () => {
  if (!isFinal) audioInput.click();
});
audioInput.addEventListener('change', (e) => {
  if (!isFinal && e.target.files && e.target.files[0]) {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = function(ev) {
      // Creo elemento audio
      const audio = document.createElement('audio');
      audio.controls = true;
      audio.src = ev.target.result;
      // Sostituisco il placeholder testuale
      audioContainer.innerHTML = "";
      audioContainer.appendChild(audio);
    };
    reader.readAsDataURL(file);
  }
});

/* 4) Formattazione testo */
fontSelect.addEventListener('change', () => {
  if (!isFinal) {
    document.execCommand('fontName', false, fontSelect.value);
  }
});
boldBtn.addEventListener('click', () => {
  if (!isFinal) document.execCommand('bold', false, null);
});
italicBtn.addEventListener('click', () => {
  if (!isFinal) document.execCommand('italic', false, null);
});
underlineBtn.addEventListener('click', () => {
  if (!isFinal) document.execCommand('underline', false, null);
});
colorPicker.addEventListener('change', () => {
  if (!isFinal) {
    document.execCommand('foreColor', false, colorPicker.value);
  }
});

/* 5) Salvataggio finale */
saveBtn.addEventListener('click', () => {
  if (!isFinal) {
    isFinal = true;
    textEditor.contentEditable = false;
    addMediaBtn.disabled   = true;
    addAudioBtn.disabled   = true;
    backgroundBtn.disabled = true;
    fontSelect.disabled    = true;
    boldBtn.disabled       = true;
    italicBtn.disabled     = true;
    underlineBtn.disabled  = true;
    colorPicker.disabled   = true;
    
    saveBtn.innerText = "Salvato";
    saveBtn.disabled  = true;

    // Qui, se vuoi, potresti inviare i dati a un server
    // const pageData = {...}
    // fetch('https://TUO_BACKEND/savePage', { ... })
  }
});
