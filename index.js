
const err = document.querySelector('.alerta');
const alertas = document.createElement('SPAN');
alertas.classList.add('alert');


async function buscarPaises(query = ['pe']) {

    try {

        //const respuesta = await fetch(`https://restcountries.com/v3.1/all`);
        const respuesta = await fetch(`https://restcountries.com/v3.1/name/${query}`);

        const contenedorPrincipal = document.getElementById('principal');
        contenedorPrincipal.classList.add('principal');
        contenedorPrincipal.innerHTML = '';


        if (respuesta.ok) {

            const datos = await respuesta.json();


            datos.forEach(pais => {

                const listaPaises = document.createElement('DIV');
                listaPaises.classList.add('paises');

                const contInfo = document.createElement('DIV');
                contInfo.classList.add('paises-info');

                const contDatos = document.createElement('DIV');
                contDatos.classList.add('paises-datos');

                // Extrae los idiomas del objeto y conviértelos en una cadena
                const idiomasPais = Object.values(pais.languages).join(', ');
                const nombre = document.createElement('H3');

                nombre.innerHTML = 'Pais: ' + pais.name.common;

                const banderaImg = document.createElement('IMG');
                banderaImg.classList.add('bandera');

                banderaImg.src = pais.flags.png;
                banderaImg.alt = `Bandera de ${pais.name.common}`;


                const capital = document.createElement('P');
                capital.innerHTML = 'Capital: ' + pais.capital;

                const continente = document.createElement('P');

                continente.innerHTML = 'Continente: <SPAN>' + pais.continents + '</SPAN>';



                const idiomas = document.createElement('P');
                idiomas.textContent = `Idiomas: ${idiomasPais}`;


                const poblacion = document.createElement('p');
                poblacion.textContent = `Población: ${pais.population.toLocaleString()}`;


                contInfo.appendChild(nombre);
                contInfo.appendChild(capital);
                contInfo.appendChild(continente);


                contDatos.appendChild(idiomas);
                contDatos.appendChild(poblacion);

                listaPaises.appendChild(contInfo);

                listaPaises.appendChild(banderaImg);
                listaPaises.appendChild(contDatos);


                contenedorPrincipal.appendChild(listaPaises);


            });

        } else {
            //  buscarPaises(query);

            alertas.textContent = "Ingrese datos validos";
            err.appendChild(alertas);
            removAlert();

        }

    } catch (err) {
        console.log(err);
    }

}


const btnBuscar = document.getElementById('buscarBoton');
const inpBuscar = document.getElementById('buscar');



btnBuscar.addEventListener('click', () => {
    const query = inpBuscar.value.trim();


    if (query.trim() === "") {

        alertas.textContent = "Por favor, ingrese el nombre de el pais";
        err.appendChild(alertas);
        removAlert();

    } else {
        buscarPaises(query);
    }
});


function removAlert() {
    setTimeout(() => {
        err.removeChild(alertas);
    }, 3000);

}

buscarPaises();







