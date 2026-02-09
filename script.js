:root {
    --primary: #ff4d6d;
    --text: #590d22;
    --glass: rgba(255, 255, 255, 0.7);
}

* { margin: 0; padding: 0; box-sizing: border-box; }

body {
    background: linear-gradient(135deg, #ffafbd 0%, #ffc3a0 100%);
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: 'Montserrat', sans-serif;
    overflow: hidden;
}

.container {
    width: 100%;
    max-width: 400px;
    padding: 20px;
    z-index: 10;
}

.glass-card {
    background: var(--glass);
    backdrop-filter: blur(10px);
    border-radius: 30px;
    padding: 30px;
    border: 1px solid rgba(255, 255, 255, 0.3);
    box-shadow: 0 20px 40px rgba(0,0,0,0.1);
    min-height: 550px;
    display: flex;
    flex-direction: column;
}

.text-sequence {
    height: 120px;
    text-align: center;
}

h1, h2 {
    font-family: 'Caveat', cursive;
    color: var(--text);
    line-height: 1.2;
    transition: all 1s ease;
}

h1 { font-size: 1.8rem; }
h2 { font-size: 2rem; color: var(--primary); }

p { font-size: 0.9rem; color: #800f2f; margin: 10px 0; font-weight: 300; }

.canvas-wrapper {
    flex-grow: 1;
    position: relative;
}

canvas {
    width: 100%;
    height: 100%;
}

/* Contador Estilizado */
#counter {
    margin-top: 20px;
    text-align: center;
    border-top: 1px solid rgba(0,0,0,0.05);
    padding-top: 15px;
}

.counter-label { font-size: 0.7rem; text-transform: uppercase; letter-spacing: 2px; color: #c9184a; }

.timer-grid {
    display: flex;
    justify-content: space-around;
    margin-top: 10px;
}

.t-item { display: flex; flex-direction: column; }
.t-item span { font-size: 1.4rem; font-weight: 600; color: var(--text); }
.t-item label { font-size: 0.6rem; color: #ff758f; font-weight: 600; }

/* Animaciones */
.hidden { opacity: 0; transform: translateY(10px); }
.visible { opacity: 1; transform: translateY(0); }

#start-btn {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: white;
    padding: 15px 25px;
    border-radius: 50px;
    cursor: pointer;
    box-shadow: 0 10px 20px rgba(0,0,0,0.1);
    font-weight: 600;
    color: var(--primary);
    z-index: 100;
    animation: pulse 2s infinite;
}

@keyframes pulse {
    0% { transform: translate(-50%, -50%) scale(1); }
    50% { transform: translate(-50%, -50%) scale(1.05); }
    100% { transform: translate(-50%, -50%) scale(1); }
}
