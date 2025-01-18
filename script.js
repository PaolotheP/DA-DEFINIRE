/* RESET DI BASE */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

/* BODY */
body {
  background: #f5f5f5;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  font-family: Arial, sans-serif;
}

/* RIQUADRO PRINCIPALE */
.outer-card {
  position: relative; 
  width: 90%;
  max-width: 400px;
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.15);
  padding: 20px;
  overflow: hidden; /* per mascherare eventuali sfondo in eccesso */
}

/* PULSANTE + (SFONDO) in alto a destra */
.plus-btn {
  position: absolute;
  top: 20px;
  right: 20px;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  border: none;
  background: #666;
  color: #fff;
  font-size: 20px;
  cursor: pointer;
}

/* BOX DELLE FOTO */
.photo-box {
  margin-top: 20px; /* distanziamento dall'alto */
  text-align: center;
}

/* L'area che mostra la foto (o il carousel) */
.photo-view {
  position: relative;
  width: 100%;
  height: 200px; 
  border: 2px solid #ccc;
  border-radius: 8px;
  overflow: hidden;
  display: flex;      /* con un carousel semplice, mostriamo 1 elemento alla volta */
  align-items: center;
  justify-content: center;
}

/* Segnaposto iniziale (se non ci sono foto) */
.photo-placeholder {
  color: #888;
  font-size: 1.1rem;
}

/* Pulsante per caricare foto */
.file-btn {
  margin-top: 10px;
  background: #007bff;
  color: #fff;
  border: none;
  padding: 8px 14px;
  border-radius: 5px;
  cursor: pointer;
}

/* Dots per il carousel */
.dots-container {
  margin-top: 8px;
  display: flex;
  justify-content: center;
  gap: 6px;
}
.dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #ccc;
  cursor: pointer;
}
.dot.active {
  background: #333;
}

/* AUDIO BOX */
.audio-box {
  margin-top: 20px;
  text-align: center;
}
.audio-inner {
  border: 2px solid #ccc;
  height: 50px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #888;
  margin-bottom: 10px;
}

/* TEXT BOX (bordo nero) */
.text-box {
  margin-top: 20px;
  text-align: center;
  border: 2px solid #000; /* bordo nero */
  border-radius: 8px;
  padding: 10px;
}
.text-area {
  width: 100%;
  min-height: 80px;
  border: none;
  outline: none;
  resize: vertical;
  font-size: 1rem;
  font-family: inherit;
}

/* SALVA */
.save-container {
  text-align: center;
  margin-top: 20px;
}
.save-btn {
  background: #28a745;
  color: #fff;
  border: none;
  padding: 10px 14px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
}

/* CLASSE DI SFONDO PERSONALIZZATO */
.outer-card.custom-bg {
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}
