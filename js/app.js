function Seguro(marca, year, tipo) {
    this.marca = marca;
    this.year = year;
    this.tipo = tipo;
}

Seguro.prototype.cotizarSeguro = function () {
    

    /*
    Americano : 1.15
    Asiatico: 1.05
    Europeo: 1.35
    */
    let cantidad;
    const base = 2000;
    switch (this.marca) {
        case '1':
            cantidad = base * 1.15;
            break;
        
        case '2':
            cantidad = base * 1.05;
            break;
        
        case '3':
            cantidad = base * 1.35;
            break;
    
        default:
            break;
    }

    //Leer el año

    const diferencia = new Date().getFullYear() - this.year;
    
    //Calcular el nuevo precio, si por cada año que pasa se descuenta el 3%

    cantidad -= ((diferencia * 3 ) * cantidad) / 100;

    /*
    Si el seguro es básico, se aumenta un 30%
    Si el seguro es completo, se aumenta un 50%
    */
    if (this.tipo === 'basico') {
        cantidad *= 1.30;
    }else{
        cantidad *= 1.50;
    }
    return cantidad;

}

function UI() {}

UI.prototype.llenarFecha = () => {

    const max = new Date().getFullYear();
    const min = max - 20;

    const llenarYear = document.getElementById('year');

    for (let i = max; i >= min; i--) {
        
        let option = document.createElement('option');
        option.value = i;
        option.textContent = i;

        llenarYear.appendChild(option);
        
    }

}

UI.prototype.mostrarMensaje = (mensaje, tipo) =>{

    const div = document.createElement('div');
    if (tipo === 'error') {
        div.classList.add('mensaje', 'error');

    }
    else{
        div.classList.add('mensaje', 'correcto');
    }
    div.classList.add('mensaje', 'mt-10');
    div.textContent = mensaje;

    const formulario = document.getElementById('cotizar-seguro');
    formulario.insertBefore(div, document.getElementById('resultado'));

    setTimeout(() => {
        div.remove();
    }, 3000);
}

const ui = new UI();

UI.prototype.mostrarResultado = (total, seguro)=>{

    const {marca, year, tipo} = seguro;

    const div = document.createElement('div');
    div.classList.add('mt-10');

    //Establecemos el nombre a las marcas, por defecto nos marcaría '1' '2' y '3'; utilizaremos Switch//
    let textoMarca;
    switch (marca) {
        
        case '1':
            textoMarca = 'Americano';
            break;

        case '2':
            textoMarca = 'Asiático';
            break;

        case '3':
            textoMarca = 'Europeo';

            break;
    
    
        default:
            break;
    }

    div.innerHTML = `
    <p class='header'>TU RESUMEN</p>
    <p class='font-bold'>Año: <span class='font-normal'>${textoMarca}</span></p>
    <p class='font-bold'>Año: <span class='font-normal'>${year}</span></p>
    <p class='font-bold'>Tipo: <span class='font-normal'>${tipo}</span></p>
    <p class='font-bold'>Total: <span class='font-normal'>$ ${total}</span></p>
    `
    const resultadoDiv = document.getElementById('resultado');


    //Mostrar el spinner
    const spinner = document.getElementById('cargando');
    spinner.style.display ='block';

    setTimeout(() => {
        spinner.style.display = 'none'; //Se muestra junto con el spinner
        resultadoDiv.appendChild(div); //Se muestra luego de los 3 segundos
    }, 3000);
}

document.addEventListener('DOMContentLoaded', ()=>{
    ui.llenarFecha();
});


eventListeners();

function eventListeners() {
    const formulario = document.getElementById('cotizar-seguro');
    formulario.addEventListener('submit', cotizarSeguro);
}

function cotizarSeguro(e){
    e.preventDefault();
    const marca = document.getElementById('marca').value;
    const year = document.getElementById('year').value;
    const tipo = document.querySelector('input[name="tipo"]:checked').value;

    if (marca === '' || year === '' || tipo === '')  {
        ui.mostrarMensaje('Todos los campos son obligatorios', 'error');
        return;
        //No pasa la validación
    }
    ui.mostrarMensaje('Cotizando...', 'correcto');
    
    //Ocultando los divs anteriores de resultados

    const resultados = document.querySelector('#resultado div')

    if (resultados != null) {
        resultados.remove();
    }


    
    //Instanciando el seguro 
    const seguro = new Seguro(marca, year, tipo);
    const total = seguro.cotizarSeguro();

    //Utilizar el proptype que va a cotizar

    ui.mostrarResultado(total, seguro);
}
