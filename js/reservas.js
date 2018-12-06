const Reserva = function (horario, cantPersonas, precioXPersona, codigoDesc) {
  
    this.horario =  horario;
    this.cantPersonas = cantPersonas;
    this.precioXPersona = precioXPersona;
    this.codigoDesc = codigoDesc;
};

Reserva.prototype.calcularPrecioBase = function () {
    if(isNaN(this.cantPersonas) || isNaN(this.precioXPersona) ) {
        return 0;
    }
    if(this.cantPersonas<0 || this.precioXPersona<0){
        return 0;
    } 
    return this.cantPersonas * this.precioXPersona;
};
Reserva.prototype.calcularAdicionales = function () { 
    const base = this.calcularPrecioBase();
    const diaSemana = this.horario.getDay();
    const hora = this.horario.getHours();
    let adicional = 0;
    if(diaSemana > 4) {
        adicional += 0.10 * base;
    }
    switch (hora) {
        case 13:
        case 14:
        case 20:
        case 21:
            adicional +=  0.05 * base;
            break;
    }

    return adicional;
};
Reserva.prototype.calcularDescuentos = function () {
    const base = this.calcularPrecioBase();
    let descuento = 0;
    // Descuentos por grupos grandes
    if(this.cantPersonas > 8) {
        descuento += 0.15 * base;
    } else if (this.cantPersonas >= 7) {
        descuento += 0.10 * base;
    } else  if (this.cantPersonas >= 4) {
        descuento += 0.05 * base;
    }
    
    // Descuentos por codigo
    switch (this.codigoDesc) {
        case 'DES15': // 15% de descuento
            descuento += 0.15 * base;
            break;
        case 'DES200': // $200 de descuento
            descuento += 200;
            break;
        case 'DES1': // Descuenta 1 persona
            descuento += this.precioXPersona;
            break;
    }
    return descuento;
};
Reserva.prototype.calcularPrecioFinal = function () {
    return this.calcularPrecioBase() + this.calcularAdicionales() - this.calcularDescuentos();
};
