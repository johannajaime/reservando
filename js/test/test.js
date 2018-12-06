var expect = chai.expect;
describe("eliminar reserva", function () {
    var restaurant;
    beforeEach(function () {
        restaurant = new Restaurant(1, "TAO Uptown", "Asiática", "Nueva York", ["13:00", "15:30", "18:00"], "../img/asiatica1.jpg", [6, 7, 9, 10, 5])
    })
    it("debe eliminar el horario si tomo la reserva", function () {
        restaurant.reservarHorario("13:00")
        expect(restaurant.horarios).to.eql(["15:30", "18:00"])

    })

    it("Cuando se reserva un horario que el restaurant no posee, el arreglo se mantiene igual", function () {
        // reservo las 19hs
        restaurant.reservarHorario("19:00");
    
        // verifico que el array no haya cambiado
        expect(restaurant.horarios).to.eql(["13:00", "15:30", "18:00"])
      })

    it("Cuando se intenta reservar un horario pero no se le pasa ningún parámetro a la función, el arreglo se mantiene igual.", function(){
        restaurant.reservarHorario();
        expect(restaurant.horarios).to.eql(["13:00", "15:30", "18:00"])
    })
})

describe("obtenerPuntuacion",function(){
    var restaurant;
    beforeEach(function () {
        restaurant = new Restaurant(1, "TAO Uptown", "Asiática", "Nueva York", ["13:00", "15:30", "18:00"], "../img/asiatica1.jpg", [6, 7, 9, 10, 5])
    })

    it("Dado un restaurant con determinadas calificaciones, la puntuación (que es el promedio de ellas) se calcula correctamente",function(){
        puntuacion = restaurant.obtenerPuntuacion();
        expect(puntuacion).to.equal(7.4);
    })

   it("Dado un restaurant que no tiene ninguna calificación, la puntuación es igual a 0.",function() {
    restaurant.calificaciones = []; // Setear a vacio las calificaciones
    puntuacion = restaurant.obtenerPuntuacion();
    expect(puntuacion).to.equal(0);

   })
})

describe("calificacion", function () {
    var restaurant;
    beforeEach(function () {
        restaurant = new Restaurant(1, "TAO Uptown", "Asiática", "Nueva York", ["13:00", "15:30", "18:00"], "../img/asiatica1.jpg", [6, 7, 9, 10, 5])
    })
    it("no agrega calificacion si es menor a 0", function () {
        restaurant.calificar(-2);
        expect(restaurant.calificaciones).to.not.include(-2);
    })
    it("que sea un numero sea mayor o igual a 10", function () {
        restaurant.calificar(11);
        expect(restaurant.calificaciones).to.not.include(11);
    })
    it("que no se puede calificar con una cadena", function () {
        const cadena = 'Hola';
        restaurant.calificar(cadena);
        expect(restaurant.calificaciones).to.not.include(cadena);
        restaurant
    })
})
describe("buscarRestaurante(id)", function () {
    var listado;
    beforeEach(function () {
        listado = new Listado ([
            new Restaurant(1, "TAO Uptown", "Asiática", "Nueva York", ["13:00", "15:30", "18:00"], "../img/asiatica1.jpg", [6, 7, 9, 10, 5]),
            new Restaurant(2, "Mandarín", "Pizza", "Londres", ["13:00", "14:30", "12:30"], "../img/asiatica2.jpg", [7, 7, 3, 9, 7]),
            new Restaurant(3, "Burgermeister", "Hamburguesa", "Berlín", ["11:30", "12:00", "22:30"], "../img/hamburguesa4.jpg", [5, 8, 4, 9, 9]),
        ]);
    });

    it("que si existe lo retorne", function () {
        const resto = listado.buscarRestaurante(1);
        expect(resto).to.include({ id: 1 });
    })

    it('que si no existe no lo retorne', function () {
        const resto = listado.buscarRestaurante(9999);
        expect(resto).to.equal("No se ha encontrado ningún restaurant");
    })

    it("Si le paso el id 2 me devueve el restaurant 'mandarin Kitchen'", function () {

        var resto = listado.buscarRestaurante(2);
        expect(resto.id).to.eql(2);

    })
    it("Si le paso el id 6 no debe encontrar un retaurant.", function () {
        var resto = listado.buscarRestaurante(6);
        console.log(resto)
        expect(resto.id).to.not.eql(6);
    })
    it("Dado un Id con el valor -2 de restaurant se busca en el listado de restaurant.", function () {
        var resto = listado.buscarRestaurante(-2);
        expect(resto.id).to.not.eql(-2);
    })
    it("Dado un Id que se paso como valor vacio, se busca en el listado de restaurant un restaurant que no existe.", function () {
        var resto = listado.buscarRestaurante("");
        expect(resto.id).to.not.eql("");
    })

    it("Dado un Id donde se pasa la palabra hola, se busca en el listado de restaurant un restaurant que no existe.", function () {
        expect((listado.buscarRestaurante("hola")).id).to.not.eql("hola");
    })
})  

describe("obtenerRestaurantes()",function (){
    beforeEach(function () {
        listado = new Listado([
            new Restaurant(1, "TAO Uptown", "Asiática", "Nueva York", ["13:00", "15:30", "18:00"], "../img/asiatica1.jpg", [6, 7, 9, 10, 5]),
            new Restaurant(2, "Mandarín Kitchen", "Asiática", "Londres", ["15:00", "14:30", "12:30"], "../img/asiatica2.jpg", [7, 7, 3, 9, 7]),
            new Restaurant(3, "Burgermeister", "Hamburguesa", "Berlín", ["11:30", "12:00", "22:30"], "../img/hamburguesa4.jpg", [5, 8, 4, 9, 9])
        ]);
    });

    it("Dado un rubro, cuidad y horario existente me devuelve un restaurant", function(){
        var restObtenido = listado.obtenerRestaurantes("Asiática", "Nueva York","13:00")
        //validar rubro
        expect(restObtenido[0].rubro).to.eql("Asiática")
        //validar ciudad
        expect(restObtenido[0].ubicacion).to.eql("Nueva York")
        //valido el horario
        expect(restObtenido[0].horarios).to.eql(["13:00", "15:30","18:00"])
    })
    it("Dado un rubro, cuidad y horario igual a vacio no devuelve un restaurant", function(){
        var restObtenido = listado.obtenerRestaurantes(" ", " "," ");
        expect(restObtenido).to.eql([]);
        
    })
    it("Dado un rubro que no existe no devulve restaurant", function(){
        var restObtenido = listado.obtenerRestaurantes(" ","Nueva York","13:00");
        expect(restObtenido).to.eql([]);
        
    })
    it("Dado un rubro que no esta asociado al restaurant no devuelve nada", function(){
        var restObtenido = listado.obtenerRestaurantes("Pizza","Nueva York","13:00");
        expect(restObtenido).to.eql([]);
        
    })
})

describe("calcularpreciobase()", function () {
    var reserva1;
    var reserva2
    beforeEach(function () {
        reserva1 = new Reserva (new Date(2018, 7, 24, 11, 00), 8, 350, "DES1");
        reserva2 = new Reserva (new Date(2018, 7, 27, 14, 100), 2, 150, "DES200");
    });
    
    it("Que una reserva calcule correctamente su precio base", function() {
        expect(reserva1.calcularPrecioBase()).to.equal(2800);
        expect(reserva2.calcularPrecioBase()).to.equal(300);
    })
    it("que no permita numeros negativos",function() {
        var  reserva3 = new Reserva (new Date(2018, 7, 23, 14, 00), -2, 250, "DES1" );    
        expect(reserva3.calcularPrecioBase()).to.eql(0);
    })
    it("que no permita espacios vacios",function() {
        var  reserva4 = new Reserva (new Date(2018, 7, 23, 14, 00),"" , 250, "DES1" );    
        expect(reserva4.calcularPrecioBase()).to.eql(0);
    }) 
    it("que no permita caracteres",function() {
        var  reserva5 = new Reserva (new Date(2018, 7, 23, 14, 00),"a" , 250, "DES1" );    
        expect(reserva5.calcularPrecioBase()).to.eql(0);
    })       

})    
describe("calcularAdicional()", function () {
    var reserva1;
    var reserva2
    beforeEach(function () {
        reserva1 = new Reserva (new Date(2018, 7, 24, 11, 00), 8, 350, "DES1");
        reserva2 = new Reserva (new Date(2018, 7, 27, 14, 100), 2, 150, "DES200");
    });    
    it("Que una reserva  calcule correctamente su precio adicional", function() {
        expect(reserva1.calcularAdicionales()).to.equal(280);
        expect(reserva2.calcularAdicionales()).to.equal(0);
    })

})    

describe("calcularDescuento()", function () {
    var reserva1;
    var reserva2
    beforeEach(function () {
        reserva1 = new Reserva (new Date(2018, 7, 24, 11, 00), 8, 350, "DES1");
        reserva2 = new Reserva (new Date(2018, 7, 27, 14, 100), 2, 150, "DES200");
    });    
    
    it("Que una reserva  calcule correctamente su descuento", function() {
        expect(reserva1.calcularDescuentos()).to.equal(630);
        expect(reserva2.calcularDescuentos()).to.equal(200);
    })
})    
describe("calcularPrecioFinal()", function () {
    var reserva1;
    var reserva2
    beforeEach(function () {
        reserva1 = new Reserva(new Date(2018, 7, 24, 11, 00), 8, 350, "DES1");
        reserva2 = new Reserva(new Date(2018, 7, 27, 14, 100), 2, 150, "DES200");
    });    
    it("Que una reserva calcule correctamente su precio final", function() { 
        expect(reserva1.calcularPrecioFinal()).to.equal(2450);
        expect(reserva2.calcularPrecioFinal()).to.equal(100);
    })

});









