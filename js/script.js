const celeste = document.getElementById('celeste')
const violeta = document.getElementById('violeta')
const naranja = document.getElementById('naranja')
const verde = document.getElementById('verde')
const btnEmpezar = document.getElementById('btnEmpezar')
const gamebuttons = document.getElementById('game-buttons')
const gameState = document.getElementById('game-state')
const copa = document.getElementById('copa')
const corazon = document.getElementById('corazon')
const nivel = document.getElementById('nivel')

const ULTIMO_NIVEL = 10;


class Juego {
    constructor() {
        this.inicializar()
        this.generarSecuencia()
        this.siguienteNivel()

    }
    inicializar() {
        this.elegirColor = this.elegirColor.bind(this);
        this.siguienteNivel = this.siguienteNivel.bind(this);
        this.toggleBoton();
        this.nivel = 1;
        this.colores = {
            celeste,
            violeta,
            naranja,
            verde
        }
    }
    toggleBoton(){
        if(btnEmpezar.classList.contains('hide')){
            
            btnEmpezar.classList.remove('hide')
            gamebuttons.classList.add("pause");
        }else{
            
            btnEmpezar.classList.add('hide')
            gamebuttons.classList.remove("pause");

        }  

    }
    generarSecuencia() {
        this.secuencia = new Array(ULTIMO_NIVEL).fill(0).map(n => Math.floor(Math.random() * 4));

    }
    siguienteNivel() {
        this.subnivel =0;
        console.log(this.nivel)
        this.iluminarSecuencia()
        nivel.innerText = this.nivel
    }
    transformarNumeroAColor(numero) {
        switch (numero) {
            case 0:
                return 'celeste'
            case 1:
                return 'violeta'
            case 2:
                return 'naranja'
            case 3:
                return 'verde'
            default:
                return ''

        }
    }
    transformarColorANumero(color) {
        switch (color) {
            case 'celeste':
                return 0
            case 'violeta':
                return 1
            case 'naranja':
                return 2
            case 'verde':
                return 3
            default:
                return ''

        }
    }
    apagarColor(color) {
        this.colores[color].classList.remove('light');
    }
    iluminarColor(color) {
        this.colores[color].classList.add("light");
        setTimeout(() => this.apagarColor(color), 350);
    };
    

    agregarEventosClick() {
        this.colores.celeste.addEventListener('click', this.elegirColor)
        this.colores.verde.addEventListener('click', this.elegirColor)
        this.colores.violeta.addEventListener('click', this.elegirColor)
        this.colores.naranja.addEventListener('click', this.elegirColor)

        this.colores.verde.style = 'cursor:pointer';
        this.colores.celeste.style = 'cursor:pointer';
        this.colores.naranja.style = 'cursor:pointer';
        this.colores.violeta.style = 'cursor:pointer';

    }
    eliminarEventosClick(){
        this.colores.celeste.removeEventListener('click', this.elegirColor)
        this.colores.verde.removeEventListener('click', this.elegirColor)
        this.colores.violeta.removeEventListener('click', this.elegirColor)
        this.colores.naranja.removeEventListener('click', this.elegirColor)

        this.colores.verde.style = 'cursor:default';
        this.colores.celeste.style = 'cursor:default';
        this.colores.naranja.style = 'cursor:default';
        this.colores.violeta.style = 'cursor:default';
    }
    ganaJuego(){
        
        this.eliminarEventosClick();
        this.inicializar();
        gameState.classList.add('cambiaStatus');
        copa.classList.add('showCopa');
        
        setTimeout(() => {
            gameState.classList.remove('cambiaStatus');
            copa.classList.remove('showCopa');
        }, 2700);
       

    }
    pierdeJuego(){
        
        this.eliminarEventosClick();
        this.inicializar();
        gameState.classList.add('cambiaStatus');
        corazon.classList.add('showCorazon');
        
        setTimeout(() => {
            gameState.classList.remove('cambiaStatus');
            corazon.classList.remove('showCorazon');
        }, 2500);

        

    };
    elegirColor(ev) {
        const nombreColor = ev.target.dataset.color;
        const numeroColor = this.transformarColorANumero(nombreColor)
        this.iluminarColor(nombreColor);

        if(numeroColor === this.secuencia[this.subnivel]){
            this.subnivel++;
            if(this.subnivel === this.nivel){
                this.nivel++;
                this.eliminarEventosClick();
                if(this.nivel == ULTIMO_NIVEL+1){
                    this.ganaJuego()
                }else{
                    setTimeout(this.siguienteNivel, 1500);
                }
            }
        }else{
            this.pierdeJuego();
        };
    }
    
    iluminarSecuencia() {
        for (var i = 0; i < this.nivel; i++) {
            const color = this.transformarNumeroAColor(this.secuencia[i]);
            setTimeout(() => {
                this.iluminarColor(color);
            }, (1000 * i)+1000);
        }
        setTimeout(() => {
            this.agregarEventosClick();
        }, (1000 * i)+500);


    }

}
function empezarJuego() {
    window.juego = new Juego()
}