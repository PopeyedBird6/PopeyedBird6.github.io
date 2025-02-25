function validar(form) {
    var Etiquetas = /<[^>]+>/g;

    // Validar nombre
    var nombre = form.nombre.value.trim();
    if (Etiquetas.test(nombre)) {
        alert("El nombre no puede contener etiquetas HTML.");
        form.nombre.value = ""; // Borrar contenido inválido
        return false;
    }
    if (nombre === "") {
        alert("Por favor, ingrese su nombre.");
        return false;
    }

    // Validar edad
    var edad = form.edad.value.trim();
    if (Etiquetas.test(edad)) {
        alert("La edad no puede contener etiquetas HTML.");
        form.edad.value = ""; 
        return false;
    }
    if (edad === "" || isNaN(edad) || edad <= 0) {
        alert("Por favor, ingrese una edad válida.");
        return false;
    }

    // Validar selección de sexo
    var sexo = form.sexo.value;
    if (Etiquetas.test(sexo)) {
        alert("El campo de sexo no puede contener etiquetas HTML.");
        return false;
    }
    if (sexo === "") {
        alert("Por favor, seleccione su sexo.");
        return false;
    }

    // Validar deporte favorito
    var deporte = form.deporte.value;
    if (Etiquetas.test(deporte)) {
        alert("El campo de deporte no puede contener etiquetas HTML.");
        return false;
    }
    if (deporte === "ninguno") {
        alert("Por favor, seleccione un deporte favorito.");
        return false;
    }

    //Validación
    alert("Registro exitoso. Nombre: " + nombre);
    return true;
}


