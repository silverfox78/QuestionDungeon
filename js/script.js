let informacion = {
    cantidadPiezas: 5,
    anchoPieza: 50,
    seccionInicio: "",
    seccionTermino: "",
    sinsalida: 10,
    inicio: {
        x: 0,
        y: 0,
    },
    inicioSalida: {
        lado: "",
        x: 0,
        y: 0,
    },
    inicioRuta: new Array(),
    termino: {
        lado: "",
        x: 0,
        y: 0,
    },
    terminoEntrada: {
        lado: "",
        x: 0,
        y: 0,
    },
    terminoRuta: new Array(),
};

function shuffle(array) {
    let currentIndex = array.length,
        randomIndex;
    while (currentIndex != 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex],
            array[currentIndex],
        ];
    }

    return array;
}

function informacionBase() {
    let rndPuerta = Math.floor(Math.random() * informacion.cantidadPiezas) + 1;
    let rndLado = Math.random() >= 0.5;

    let rndPuertaEntrada =
        Math.floor(Math.random() * informacion.cantidadPiezas) + 1;
    let rndLadoEntrada = Math.random() >= 0.5;

    switch (informacion.seccionTermino) {
        case "A":
            informacion.termino.lado = rndLado ? "ARRIBA" : "IZQUIERDA";
            informacion.termino.x = rndLado ? rndPuerta : 1;
            informacion.termino.y = rndLado ? 1 : rndPuerta;
            informacion.terminoEntrada.lado = rndLadoEntrada ? "ABAJO" : "DERECHA";
            informacion.terminoEntrada.x = rndLadoEntrada
                ? rndPuertaEntrada
                : informacion.cantidadPiezas;
            informacion.terminoEntrada.y = rndLadoEntrada
                ? informacion.cantidadPiezas
                : rndPuertaEntrada;
            break;

        case "B":
            informacion.termino.lado = rndLado ? "ARRIBA" : "DERECHA";
            informacion.termino.x = rndLado ? rndPuerta : informacion.cantidadPiezas;
            informacion.termino.y = rndLado ? 1 : rndPuerta;
            informacion.terminoEntrada.lado = rndLadoEntrada ? "ABAJO" : "IZQUIERDA";
            informacion.terminoEntrada.x = rndLadoEntrada ? rndPuertaEntrada : 1;
            informacion.terminoEntrada.y = rndLadoEntrada
                ? informacion.cantidadPiezas
                : rndPuertaEntrada;
            break;

        case "C":
            informacion.termino.lado = rndLado ? "ABAJO" : "IZQUIERDA";
            informacion.termino.x = rndLado ? rndPuerta : 1;
            informacion.termino.y = rndLado ? informacion.cantidadPiezas : rndPuerta;
            informacion.terminoEntrada.lado = rndLadoEntrada ? "ARRIBA" : "DERECHA";
            informacion.terminoEntrada.x = rndLadoEntrada
                ? rndPuertaEntrada
                : informacion.cantidadPiezas;
            informacion.terminoEntrada.y = rndLadoEntrada ? 1 : rndPuertaEntrada;
            break;

        default:
            informacion.termino.lado = rndLado ? "ABAJO" : "DERECHA";
            informacion.termino.x = rndLado ? rndPuerta : informacion.cantidadPiezas;
            informacion.termino.y = rndLado ? informacion.cantidadPiezas : rndPuerta;
            informacion.terminoEntrada.lado = rndLadoEntrada ? "ARRIBA" : "IZQUIERDA";
            informacion.terminoEntrada.x = rndLadoEntrada ? rndPuertaEntrada : 1;
            informacion.terminoEntrada.y = rndLadoEntrada ? 1 : rndPuertaEntrada;
            break;
    }

    rndPuerta = Math.floor(Math.random() * informacion.cantidadPiezas) + 1;
    rndLado = Math.random() >= 0.5;

    switch (informacion.seccionInicio) {
        case "A":
            informacion.inicio.x = 1;
            informacion.inicio.y = 1;
            informacion.inicioSalida.lado = rndLado ? "ABAJO" : "DERECHA";
            informacion.inicioSalida.x = rndLado
                ? rndPuerta
                : informacion.cantidadPiezas;
            informacion.inicioSalida.y = rndLado
                ? informacion.cantidadPiezas
                : rndPuerta;
            break;

        case "B":
            informacion.inicio.x = informacion.cantidadPiezas;
            informacion.inicio.y = 1;
            informacion.inicioSalida.lado = rndLado ? "ABAJO" : "IZQUIERDA";
            informacion.inicioSalida.x = rndLado ? rndPuerta : 1;
            informacion.inicioSalida.y = rndLado
                ? informacion.cantidadPiezas
                : rndPuerta;
            break;

        case "C":
            informacion.inicio.x = 1;
            informacion.inicio.y = informacion.cantidadPiezas;
            informacion.inicioSalida.lado = rndLado ? "ARRIBA" : "DERECHA";
            informacion.inicioSalida.x = rndLado
                ? rndPuerta
                : informacion.cantidadPiezas;
            informacion.inicioSalida.y = rndLado ? 1 : rndPuerta;
            break;

        default:
            informacion.inicio.x = informacion.cantidadPiezas;
            informacion.inicio.y = informacion.cantidadPiezas;
            informacion.inicioSalida.lado = rndLado ? "ARRIBA" : "IZQUIERDA";
            informacion.inicioSalida.x = rndLado ? rndPuerta : 1;
            informacion.inicioSalida.y = rndLado ? 1 : rndPuerta;
            break;
    }
}

function determinaOpciones(puntoX, puntoY) {
    let opciones = ["ARRIBA", "ABAJO", "DERECHA", "IZQUIERDA"];
    let index = 0;

    if (puntoX == 1) {
        index = opciones.indexOf("IZQUIERDA");
        opciones.splice(index, 1);
    }

    if (puntoX == informacion.cantidadPiezas) {
        index = opciones.indexOf("DERECHA");
        opciones.splice(index, 1);
    }

    if (puntoY == 1) {
        index = opciones.indexOf("ARRIBA");
        opciones.splice(index, 1);
    }

    if (puntoY == informacion.cantidadPiezas) {
        index = opciones.indexOf("ABAJO");
        opciones.splice(index, 1);
    }

    return shuffle(opciones);
}

function proseguirRuta(inicioX, inicioY, finX, finY) {
    let salir = inicioX == finX && inicioY == finY;
    return !salir;
}

function generaRuta(inicioX, inicioY, finX, finY) {
    let sinsalida = 0;
    let actualX = inicioX;
    let actualY = inicioY;
    let sendero = new Array();
    let debeTerminar = proseguirRuta(inicioX, inicioY, finX, finY);

    sendero.push({ X: inicioX, Y: inicioY });
    while (debeTerminar) {

        let seguir = true;
        while (seguir) {
            let tmpX = actualX;
            let tmpY = actualY;
            let opciones = determinaOpciones(tmpX, tmpY);

            switch (opciones.shift()) {
                case "ARRIBA":
                    tmpY -= 1;
                    break;
                case "ABAJO":
                    tmpY += 1;
                    break;
                case "DERECHA":
                    tmpX += 1;
                    break;
                default:
                    tmpX -= 1;
                    break;
            }

            seguir = false;
            sendero.forEach((item) => {
                if (item.X == tmpX && item.Y == tmpY) {
                    seguir = true;
                    sinsalida++;
                }
            });

            if (sinsalida > informacion.sinsalida) {
                console.error("EXPLOTO - REINTENTAR....");
                sendero = new Array();
                actualX = inicioX;
                actualY = inicioY;
                tmpX = actualX;
                tmpY = actualY;
                sinsalida = 0;
                sendero.push({ X: actualX, Y: actualY });
                seguir = true;
            }

            if (!seguir) {
                actualX = tmpX;
                actualY = tmpY;
                sinsalida = 0;
            }
        }
        sendero.push({ X: actualX, Y: actualY });
        debeTerminar = proseguirRuta(actualX, actualY, finX, finY);
    }

    return sendero;
}

function inicializa() {
    let dimension = informacion.anchoPieza * (informacion.cantidadPiezas * 2 + 3);
    document.getElementById("contenido").innerHTML =
        "<svg id='maze' width='" +
        dimension +
        "' height='" +
        dimension +
        "'></svg>";

    for (let i = 0; i < informacion.cantidadPiezas * 2 + 3; i++) {
        for (let j = 0; j < informacion.cantidadPiezas * 2 + 3; j++) {
            document
                .getElementById("maze")
                .insertAdjacentHTML(
                    "beforeend",
                    "<image href='img/earth.jpg' x='" +
                    i * informacion.anchoPieza +
                    "' y='" +
                    j * informacion.anchoPieza +
                    "'/>"
                );
        }
    }

    for (let index = 0; index < informacion.cantidadPiezas * 2 + 3; index++) {
        document
            .getElementById("maze")
            .insertAdjacentHTML(
                "beforeend",
                "<image href='img/floor.jpg' x='" +
                informacion.anchoPieza * (informacion.cantidadPiezas + 1) +
                "' y='" +
                index * informacion.anchoPieza +
                "'/>"
            );
        document
            .getElementById("maze")
            .insertAdjacentHTML(
                "beforeend",
                "<image href='img/floor.jpg' x='" +
                index * informacion.anchoPieza +
                "' y='" +
                informacion.anchoPieza * (informacion.cantidadPiezas + 1) +
                "'/>"
            );
    }

    for (let index = 0; index < informacion.cantidadPiezas * 2 + 3; index++) {
        document
            .getElementById("maze")
            .insertAdjacentHTML(
                "beforeend",
                "<image href='img/lava.jpg' x='" +
                index * informacion.anchoPieza +
                "' y ='0'/>"
            );
        document
            .getElementById("maze")
            .insertAdjacentHTML(
                "beforeend",
                "<image href='img/lava.jpg' x='0' y='" +
                index * informacion.anchoPieza +
                "'/>"
            );
        document
            .getElementById("maze")
            .insertAdjacentHTML(
                "beforeend",
                "<image href='img/lava.jpg' x='" +
                index * informacion.anchoPieza +
                "' y ='" +
                (dimension - informacion.anchoPieza) +
                "'/>"
            );
        document
            .getElementById("maze")
            .insertAdjacentHTML(
                "beforeend",
                "<image href='img/lava.jpg' x='" +
                (dimension - informacion.anchoPieza) +
                "' y='" +
                index * informacion.anchoPieza +
                "'/>"
            );
    }

    document
        .getElementById("maze")
        .insertAdjacentHTML(
            "beforeend",
            "<rect width='" +
            informacion.anchoPieza * (informacion.cantidadPiezas * 2 + 1) +
            "' height='" +
            informacion.anchoPieza * (informacion.cantidadPiezas * 2 + 1) +
            "' fill='#FFFFFF' fill-opacity='0.1' style='stroke-width:4;stroke:rgb(0,0,0)' x='" +
            informacion.anchoPieza +
            "' y ='" +
            informacion.anchoPieza +
            "'/>"
        );

    let anchoSeccion = informacion.cantidadPiezas * informacion.anchoPieza;
    document
        .getElementById("maze")
        .insertAdjacentHTML(
            "beforeend",
            "<rect width='" +
            anchoSeccion +
            "' height='" +
            anchoSeccion +
            "' fill='#FFFFFF' fill-opacity='0.2' style='stroke-width:2;stroke:rgb(0,0,0)' x='" +
            informacion.anchoPieza +
            "' y ='" +
            informacion.anchoPieza +
            "'/>"
        );
    document
        .getElementById("maze")
        .insertAdjacentHTML(
            "beforeend",
            "<rect width='" +
            anchoSeccion +
            "' height='" +
            anchoSeccion +
            "' fill='#FFFFFF' fill-opacity='0.2' style='stroke-width:2;stroke:rgb(0,0,0)' x='" +
            (informacion.anchoPieza * 2 + anchoSeccion) +
            "' y ='" +
            informacion.anchoPieza +
            "'/>"
        );
    document
        .getElementById("maze")
        .insertAdjacentHTML(
            "beforeend",
            "<rect width='" +
            anchoSeccion +
            "' height='" +
            anchoSeccion +
            "' fill='#FFFFFF' fill-opacity='0.2' style='stroke-width:2;stroke:rgb(0,0,0)' x='" +
            informacion.anchoPieza +
            "' y ='" +
            (informacion.anchoPieza * 2 + anchoSeccion) +
            "'/>"
        );
    document
        .getElementById("maze")
        .insertAdjacentHTML(
            "beforeend",
            "<rect width='" +
            anchoSeccion +
            "' height='" +
            anchoSeccion +
            "' fill='#FFFFFF' fill-opacity='0.2' style='stroke-width:2;stroke:rgb(0,0,0)' x='" +
            (informacion.anchoPieza * 2 + anchoSeccion) +
            "' y ='" +
            (informacion.anchoPieza * 2 + anchoSeccion) +
            "'/>"
        );

    let secciones = shuffle(["A", "B", "C", "D"]);
    console.log("Secciones", secciones);
    informacion.seccionInicio = secciones[0];
    secciones.shift();

    informacion.seccionTermino = secciones[0];
    informacionBase();
    secciones.shift();

    document
        .getElementById("informacion")
        .insertAdjacentHTML(
            "beforeend",
            "<div class='alert alert-warning' role='alert'>Seccion de inicio: " +
            informacion.seccionInicio +
            "<br/>Entrada" +
            " - X: " +
            informacion.inicio.x +
            " - Y: " +
            informacion.inicio.y +
            "<br/>Salida = Lado: " +
            informacion.inicioSalida.lado +
            " - X: " +
            informacion.inicioSalida.x +
            " - Y: " +
            informacion.inicioSalida.y +
            "</div>"
        );

    document
        .getElementById("informacion")
        .insertAdjacentHTML(
            "beforeend",
            "<div class='alert alert-success' role='alert'>Seccion de termino: " +
            informacion.seccionTermino +
            "<br/>Salida = Lado: " +
            informacion.termino.lado +
            " - X: " +
            informacion.termino.x +
            " - Y: " +
            informacion.termino.y +
            "<br/>Entrada = Lado: " +
            informacion.terminoEntrada.lado +
            " - X: " +
            informacion.terminoEntrada.x +
            " - Y: " +
            informacion.terminoEntrada.y +
            "</div>"
        );
}

function generaMapa(){
    informacion.inicioRuta = generaRuta(informacion.inicio.x, informacion.inicio.y, informacion.inicioSalida.x, informacion.inicioSalida.y);
    informacion.terminoRuta = generaRuta(informacion.termino.x, informacion.termino.y, informacion.terminoEntrada.x, informacion.terminoEntrada.y);
}

function pintaMapa(){
    let baseX = 0;
    let baseY = 0;

    switch (informacion.seccionInicio) {
        case 'A':
            baseX = 0;
            baseY = 0;

            document
                .getElementById("maze")
                .insertAdjacentHTML(
                    "beforeend",
                    "<image href='img/stone.jpg' fill='#FFFFFF' fill-opacity='0' x='0' y='0'/>"
                );

            document
                .getElementById("maze")
                .insertAdjacentHTML(
                    "beforeend",
                    "<image href='img/steps.jpg' fill='#FFFFFF' fill-opacity='0' x='" +
                    informacion.anchoPieza +
                    "' y='0'/>"
                );

            document
                .getElementById("maze")
                .insertAdjacentHTML(
                    "beforeend",
                    "<image href='img/stone.jpg' fill='#FFFFFF' fill-opacity='0' x='" +
                    (informacion.anchoPieza * 2) +
                    "' y='0'/>"
                );
            break;
    
        case 'B':
            baseX = (informacion.anchoPieza * (informacion.cantidadPiezas + 1));
            baseY = 0;

            document
                .getElementById("maze")
                .insertAdjacentHTML(
                    "beforeend",
                    "<image href='img/stone.jpg' fill='#FFFFFF' fill-opacity='0' x='" + (informacion.anchoPieza * ((informacion.cantidadPiezas * 2))) + "' y='0'/>"
                );

            document
                .getElementById("maze")
                .insertAdjacentHTML(
                    "beforeend",
                    "<image href='img/steps.jpg' fill='#FFFFFF' fill-opacity='0' x='" +
                    (informacion.anchoPieza * ((informacion.cantidadPiezas * 2) + 1)) +
                    "' y='0'/>"
                );

            document
                .getElementById("maze")
                .insertAdjacentHTML(
                    "beforeend",
                    "<image href='img/stone.jpg' fill='#FFFFFF' fill-opacity='0' x='" +
                    (informacion.anchoPieza * ((informacion.cantidadPiezas * 2) + 2)) +
                    "' y='0'/>"
                );
            break;

        case 'C':
            baseX = 0;
            baseY = (informacion.anchoPieza * (informacion.cantidadPiezas + 1));

            document
                .getElementById("maze")
                .insertAdjacentHTML(
                    "beforeend",
                    "<image href='img/stone.jpg' fill='#FFFFFF' fill-opacity='0' x='0' y='" + (informacion.anchoPieza * ((informacion.cantidadPiezas * 2) + 2)) + "'/>"
                );

            document
                .getElementById("maze")
                .insertAdjacentHTML(
                    "beforeend",
                    "<image href='img/steps.jpg' fill='#FFFFFF' fill-opacity='0' x='" +
                    informacion.anchoPieza +
                    "' y='" + (informacion.anchoPieza * ((informacion.cantidadPiezas * 2) + 2)) + "'/>"
                );

            document
                .getElementById("maze")
                .insertAdjacentHTML(
                    "beforeend",
                    "<image href='img/stone.jpg' fill='#FFFFFF' fill-opacity='0' x='" +
                    (informacion.anchoPieza * 2) +
                    "' y='" + (informacion.anchoPieza * ((informacion.cantidadPiezas * 2) + 2)) + "'/>"
                );
            break;

        default:
            baseX = (informacion.anchoPieza * (informacion.cantidadPiezas + 1));
            baseY = (informacion.anchoPieza * (informacion.cantidadPiezas + 1));

            document
                .getElementById("maze")
                .insertAdjacentHTML(
                    "beforeend",
                    "<image href='img/stone.jpg' fill='#FFFFFF' fill-opacity='0' x='" + (informacion.anchoPieza * ((informacion.cantidadPiezas * 2))) + "' y='" + (informacion.anchoPieza * ((informacion.cantidadPiezas * 2) + 2)) + "'/>"
                );

            document
                .getElementById("maze")
                .insertAdjacentHTML(
                    "beforeend",
                    "<image href='img/steps.jpg' fill='#FFFFFF' fill-opacity='0' x='" +
                    (informacion.anchoPieza * ((informacion.cantidadPiezas * 2) + 1))  +
                    "' y='" + (informacion.anchoPieza * ((informacion.cantidadPiezas * 2) + 2)) + "'/>"
                );

            document
                .getElementById("maze")
                .insertAdjacentHTML(
                    "beforeend",
                    "<image href='img/stone.jpg' fill='#FFFFFF' fill-opacity='0' x='" +
                    (informacion.anchoPieza * ((informacion.cantidadPiezas * 2) + 2))  +
                    "' y='" + (informacion.anchoPieza * ((informacion.cantidadPiezas * 2) + 2)) + "'/>"
                );
            break;
    }

    let contador = 0;
    informacion.inicioRuta.forEach((item) => {
        contador++;
        document.getElementById("maze")
        .insertAdjacentHTML(
            "beforeend", 
            "<rect width='" + informacion.anchoPieza + "' height='" + informacion.anchoPieza +
            "' fill='#00cc44' fill-opacity='0.4' style='stroke-width:1;stroke:rgb(0,0,0)' x='" +
            (baseX + (informacion.anchoPieza * item.X)) + "' y ='" + (baseY + (informacion.anchoPieza * item.Y)) + "'/>"
        );

        document.getElementById("maze")
        .insertAdjacentHTML(
            "beforeend",
            "<text x='" + (baseX + (informacion.anchoPieza * item.X) + Math.floor(informacion.anchoPieza/2)) + "' y='" + (baseY + (informacion.anchoPieza * item.Y) + Math.floor(informacion.anchoPieza/2)) + "' class=''>" + contador + "</text>"
        );        
    });

    let auxX = informacion.termino.lado == 'ARRIBA' ? (informacion.termino.x * informacion.anchoPieza) : 0;
    let auxY = informacion.termino.lado == 'ARRIBA' ? 0 : (informacion.termino.y * informacion.anchoPieza);

    switch (informacion.seccionTermino) {
        case 'A':
            baseX = 0;
            baseY = 0;

            auxX = informacion.termino.lado == 'ARRIBA' ? (informacion.termino.x * informacion.anchoPieza) : 0;
            auxY = informacion.termino.lado == 'ARRIBA' ? 0 : (informacion.termino.y * informacion.anchoPieza);

            document
                .getElementById("maze")
                .insertAdjacentHTML(
                    "beforeend",
                    "<image href='img/stone.jpg' fill='#FFFFFF' fill-opacity='0' x='" + (informacion.termino.lado == 'ARRIBA' ? (auxX - informacion.anchoPieza) : 0) + "' y='" + (informacion.termino.lado == 'ARRIBA' ? 0 : (auxY - informacion.anchoPieza)) + "'/>"
                );

            document
                .getElementById("maze")
                .insertAdjacentHTML(
                    "beforeend",
                    "<image href='img/grass.jpg' fill='#FFFFFF' fill-opacity='0' x='" + auxX + "' y='" + auxY + "'/>"
                );

            document
                .getElementById("maze")
                .insertAdjacentHTML(
                    "beforeend",
                    "<image href='img/stone.jpg' fill='#FFFFFF' fill-opacity='0' x='" + (informacion.termino.lado == 'ARRIBA' ? (auxX + informacion.anchoPieza) : 0) + "' y='" + (informacion.termino.lado == 'ARRIBA' ? 0 : (auxY + informacion.anchoPieza)) + "'/>"
                );
            break;
    
        case 'B':
            baseX = (informacion.anchoPieza * (informacion.cantidadPiezas + 1));
            baseY = 0;

            auxX = baseX + (informacion.termino.lado == 'ARRIBA' ? (informacion.termino.x * informacion.anchoPieza) : (informacion.anchoPieza * (informacion.cantidadPiezas + 1)));
            auxY = baseY + (informacion.termino.lado == 'ARRIBA' ? 0 : (informacion.termino.y * informacion.anchoPieza));

            document
                .getElementById("maze")
                .insertAdjacentHTML(
                    "beforeend",
                    "<image href='img/stone.jpg' fill='#FFFFFF' fill-opacity='0' x='" + (informacion.termino.lado == 'ARRIBA' ? (auxX - informacion.anchoPieza) : auxX) + "' y='" + (informacion.termino.lado == 'ARRIBA' ? 0 : (auxY - informacion.anchoPieza)) + "'/>"
                );

            document
                .getElementById("maze")
                .insertAdjacentHTML(
                    "beforeend",
                    "<image href='img/grass.jpg' fill='#FFFFFF' fill-opacity='0' x='" + auxX + "' y='" + auxY + "'/>"
                );

            document
                .getElementById("maze")
                .insertAdjacentHTML(
                    "beforeend",
                    "<image href='img/stone.jpg' fill='#FFFFFF' fill-opacity='0' x='" + (informacion.termino.lado == 'ARRIBA' ? (auxX + informacion.anchoPieza) : auxX) + "' y='" + (informacion.termino.lado == 'ARRIBA' ? 0 : (auxY + informacion.anchoPieza)) + "'/>"
                );
            break;

        case 'C':
            baseX = 0;
            baseY = (informacion.anchoPieza * (informacion.cantidadPiezas + 1));

            auxX = baseX + (informacion.termino.lado == 'ABAJO' ? (informacion.termino.x * informacion.anchoPieza) : 0);
            auxY = baseY + (informacion.termino.lado == 'ABAJO' ? baseY : (informacion.termino.y * informacion.anchoPieza));

            document
                .getElementById("maze")
                .insertAdjacentHTML(
                    "beforeend",
                    "<image href='img/stone.jpg' fill='#FFFFFF' fill-opacity='0' x='" + (informacion.termino.lado == 'ABAJO' ? (auxX - informacion.anchoPieza) : 0) + "' y='" + (informacion.termino.lado == 'ABAJO' ? auxY : (auxY - informacion.anchoPieza)) + "'/>"
                );

            document
                .getElementById("maze")
                .insertAdjacentHTML(
                    "beforeend",
                    "<image href='img/grass.jpg' fill='#FFFFFF' fill-opacity='0' x='" + auxX + "' y='" + auxY + "'/>"
                );

            document
                .getElementById("maze")
                .insertAdjacentHTML(
                    "beforeend",
                    "<image href='img/stone.jpg' fill='#FFFFFF' fill-opacity='0' x='" + (informacion.termino.lado == 'ABAJO' ? (auxX + informacion.anchoPieza) : 0) + "' y='" + (informacion.termino.lado == 'ABAJO' ? auxY : (auxY + informacion.anchoPieza)) + "'/>"
                );
            break;

        default:
            baseX = (informacion.anchoPieza * (informacion.cantidadPiezas + 1));
            baseY = (informacion.anchoPieza * (informacion.cantidadPiezas + 1));

            auxX = baseX + (informacion.termino.lado == 'ABAJO' ? (informacion.termino.x * informacion.anchoPieza) : baseX);
            auxY = baseY + (informacion.termino.lado == 'ABAJO' ? baseY : (informacion.termino.y * informacion.anchoPieza));

            document
                .getElementById("maze")
                .insertAdjacentHTML(
                    "beforeend",
                    "<image href='img/stone.jpg' fill='#FFFFFF' fill-opacity='0' x='" + (informacion.termino.lado == 'ABAJO' ? (auxX - informacion.anchoPieza) : auxX) + "' y='" + (informacion.termino.lado == 'ABAJO' ? auxY : (auxY - informacion.anchoPieza)) + "'/>"
                );

            document
                .getElementById("maze")
                .insertAdjacentHTML(
                    "beforeend",
                    "<image href='img/grass.jpg' fill='#FFFFFF' fill-opacity='0' x='" + auxX + "' y='" + auxY + "'/>"
                );

            document
                .getElementById("maze")
                .insertAdjacentHTML(
                    "beforeend",
                    "<image href='img/stone.jpg' fill='#FFFFFF' fill-opacity='0' x='" + (informacion.termino.lado == 'ABAJO' ? (auxX + informacion.anchoPieza) : auxX) + "' y='" + (informacion.termino.lado == 'ABAJO' ? auxY : (auxY + informacion.anchoPieza)) + "'/>"
                );
            break;
    }

    contador = 0;
    informacion.terminoRuta.reverse().forEach((item) => {
        contador++;
        document.getElementById("maze")
        .insertAdjacentHTML(
            "beforeend", 
            "<rect width='" + informacion.anchoPieza + "' height='" + informacion.anchoPieza +
            "' fill='#800000' fill-opacity='0.4' style='stroke-width:1;stroke:rgb(0,0,0)' x='" +
            (baseX + (informacion.anchoPieza * item.X)) + "' y ='" + (baseY + (informacion.anchoPieza * item.Y)) + "'/>"
        );

        document.getElementById("maze")
        .insertAdjacentHTML(
            "beforeend",
            "<text x='" + (baseX + (informacion.anchoPieza * item.X) + Math.floor(informacion.anchoPieza/2)) + "' y='" + (baseY + (informacion.anchoPieza * item.Y) + Math.floor(informacion.anchoPieza/2)) + "' class=''>" + contador + "</text>"
        );        
    });
}

console.clear();
console.log("Start Question Dungeon");

inicializa();
generaMapa();
pintaMapa();
