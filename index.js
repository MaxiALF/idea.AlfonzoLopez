//datos del html
const RegistroLuchador = document.querySelector ("#RegistroLuchador"); 
const inputNombre = document.querySelector ("#inputNombre");
const inputcombatesDisputados = document.querySelector ("#inputcombatesDisputados");
const inputcalcular = document.querySelector ("#calcular");
const inputAgregar = document.querySelector ("#agregar");
const inputrespuesta = docment.querySelector ('#respuesta');

//clase persona con funcion constructora
class Persona {
    constructor(nombre, combatesDisputados, porcentajeDeVictorias) {
        this.nombre = nombre;
        this.combatesDisputados = combatesDisputados;
        this.porcentajeDeVictorias = porcentajeDeVictorias;
    }
}

function calcularPorcentaje() {
    const nombre = document.getElementById("nombre").value;
    const combatesDisputados = parseInt(document.getElementById("combatesDisputados").value);
    
    let combatesVictorias = 0;
    for (let num = 1; num <= combatesDisputados; num++) {
        const resp = document.getElementById(`combate${num}`).checked;
        if (resp) {
            combatesVictorias++;
        }
    }

    const porcentajeDeVictorias = (combatesVictorias * 100) / combatesDisputados;

    // Mostrar resultado en HTML
    const resultadoDiv = document.getElementById("resultado");
    resultadoDiv.innerHTML = `El porcentaje de victoria es del ${porcentajeDeVictorias.toFixed(2)}% para ${nombre}.`;

    // Almacenar datos en Local.Storage
    const persona = new Persona(nombre, combatesDisputados, porcentajeDeVictorias);
    let personas = JSON.parse(localStorage.getItem("peleadores")) || [];
    personas.push(persona);
    localStorage.setItem("peleadores", JSON.stringify(personas));
}

// Mostrar los resultados 
window.addEventListener("load", function() {
    const personas = JSON.parse(localStorage.getItem("peleadores")) || [];
    const resultadoDiv = document.getElementById("resultado");

    if (personas.length > 0) {
        const mejorPeleador = personas.reduce((max, persona) => {
            return persona.porcentajeDeVictorias > max.porcentajeDeVictorias ? persona : max;
        }, personas[0]);

        resultadoDiv.innerHTML = `El luchador con el mayor porcentaje de peleas ganadas es ${mejorPeleador.nombre} con un ${mejorPeleador.porcentajeDeVictorias.toFixed(2)}%.`;
    } else {
        resultadoDiv.innerHTML = "Ingrese un luchador";
    }
});
