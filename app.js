var app = angular.module('plunker', []);

app.controller('MainCtrl', function($scope, $window) {

  //Directiva ventana confirmar
  app.directive('ngConfirmClick', [
    function() {
      return {
        link: function(scope, element, attr) {
          var msg = attr.ngConfirmClick || "Esta Seguro?";
          var clickAction = attr.confirmedClick;
          element.bind('click', function(event) {
            if (window.confirm(msg)) {
              scope.$eval(clickAction);
            }
          });
        }
      };
    }
  ]);

  var personaPrueba = function() {
    var persona = {
      nombre: 'Juan Perez',

      cuentas: [{
        nombre: 'Para Arreglos Auto',
        saldo: 1000

      }, {
        nombre: 'Caja',
        saldo: 4000
      }],

      tarjetas: [{
        nombre: 'Visa',
        saldoActual: 1000,
        saldoMaximo: 3000
      }, {
        nombre: 'MasterCard',
        saldoActual: 1500,
        saldoMaximo: 6000
      }],

      prestamos: [{
        nombre: 'Super Prestamo',
        cuotas: 4,
        precio_cuota: 200,
        cuota_actual: 1
      }],

      celulares: [{
        nombre: '15 2020 8080',
        saldo: 30,
        vencimiento: new Date("04/16/2017")
      }],

      movimientos: [{
        tipo: 'Pedir Prestamo',
        descripcion: 'Super Prestamo 4 cuotas de 200',
        cantidad: 800,
      }]
    };

    return persona;
  };




  $scope.persona = personaPrueba();
  //$scope.cuentas = personaPrueba().cuentas;
  $scope.ocultarTransferir = true;
  $scope.ocultarPagarTarjeta = true;
  $scope.ocultarDepositar = true;
  $scope.ocultarNuevaCuenta = true;
  $scope.ocultarNuevaTarjeta = true;
  $scope.ocultarPagarPrestamos = true;
  $scope.ocultarNuevaPrestamo = true;
  $scope.ocultarCargaCelular = true;



  $scope.alternarTransferir = function() {
    $scope.ocultarTransferir = !$scope.ocultarTransferir;
  };

  $scope.alternarPagarTarjeta = function() {
    $scope.ocultarPagarTarjeta = !$scope.ocultarPagarTarjeta;
  };

  $scope.alternarDepositar = function() {
    $scope.ocultarDepositar = !$scope.ocultarDepositar;
  };

  $scope.alternarNuevaCuenta = function() {
    $scope.ocultarNuevaCuenta = !$scope.ocultarNuevaCuenta;
  };

  $scope.alternarNuevaTarjeta = function() {
    $scope.ocultarNuevaTarjeta = !$scope.ocultarNuevaTarjeta;
  };

  $scope.alternarPagarPrestamos = function() {
    $scope.ocultarPagarPrestamos = !$scope.ocultarPagarPrestamos;
  };

  $scope.alternarNuevaPrestamo = function() {
    $scope.ocultarNuevaPrestamo = !$scope.ocultarNuevaPrestamo;
  };

  $scope.alternar = function(var_boolean) {
    var_boolean = !var_boolean;
  };

  $scope.buscarElemento = function(arr, val, prop) {
    var l = arr.length,
      k = 0;
    for (k = 0; k < l; k = k + 1) {
      if (arr[k][prop] === val) {
        return arr[k];
      }
    }
    return false;
  };

  $scope.eliminar = function(array, nombreElemento) {
    var item = $scope.buscarElemento(array, nombreElemento, 'nombre');
    var index = array.indexOf(item);
    array.splice(index, 1);
  };

  $scope.modificarCuenta = function(persona, nombreCuenta, valorSumar) {
    //alert("Modificando Cuenta... Persona:" + persona + " Cuenta:" + nombreCuenta + "valorSumar:" + valorSumar);
    var cuenta = $scope.buscarElemento(persona.cuentas, nombreCuenta, 'nombre');
    cuenta.saldo = cuenta.saldo + valorSumar;
    //alert("Cuenta Modificada");
  };

  $scope.modificarTarjeta = function(persona, nombreTarjeta, valorSumar) {
    var tarjeta = $scope.buscarElemento(persona.tarjetas, nombreTarjeta, 'nombre');
    tarjeta.saldoActual = tarjeta.saldoActual + valorSumar;
  };

  $scope.modificarPrestamo = function(persona, nombrePrestamo, valorSumar) {
    //alert(nombrePrestamo);
    var prestamo = $scope.buscarElemento(persona.prestamos, nombrePrestamo, 'nombre');
    //alert(prestamo.nombre + "  " + prestamo.cuota_actual);
    var cantidad_cuotas = Math.floor(valorSumar / prestamo.precio_cuota);
    //alert(cantidad_cuotas);
    prestamo.cuota_actual = prestamo.cuota_actual + cantidad_cuotas;
  };

  $scope.modificarCelular = function(persona, nombreCelular, valorSumar) {
    //alert(nombreCelular);
    var celular = $scope.buscarElemento(persona.celulares, nombreCelular, 'nombre');
    //alert(celular.nombre + "  " + celular.saldo);
    celular.saldo = celular.saldo + valorSumar;
    var oneMonth = 30;
    if (valorSumar > 30) {
      celular.vencimiento.setDate(celular.vencimiento.getDate() + oneMonth);
    }
  };

  $scope.nuevoMovimiento = function(tipoMov, descriptMov, cantMov) {
    var nueva = {
      tipo: tipoMov,
      descripcion: descriptMov,
      cantidad: cantMov
    };
    $scope.persona.movimientos.push(nueva);
  };

  $scope.transferir = function(cuentadesde, cuentahasta, cantidad) {
    //alert('Funcion transferir. Elementos' + cuentadesde + " " + cuentahasta + " " + cantidad);

    $scope.modificarCuenta($scope.persona, cuentadesde, -cantidad);
    $scope.modificarCuenta($scope.persona, cuentahasta, +cantidad);
    $scope.nuevoMovimiento('Transferencia', cuentadesde + ' -> ' + cuentahasta, cantidad);
    $scope.alternarTransferir();
  };


  $scope.depositar = function(cuenta, cantidad) {
    $scope.modificarCuenta($scope.persona, cuenta, +cantidad);
    $scope.nuevoMovimiento('Deposito', cuenta, cantidad);
    $scope.alternarDepositar();
  };

  $scope.nuevacuenta = function(nombreCuenta) {
    var nuevaCuenta = {
      nombre: nombreCuenta,
      saldo: 0
    };
    $scope.persona.cuentas.push(nuevaCuenta);
    $scope.nuevoMovimiento('Nueva Cuenta', nombreCuenta, 0);
    $scope.alternarNuevaCuenta();
  };

  $scope.pagarTarjeta = function(cuentadesde, tarjetahasta, cantidad) {

    $scope.modificarCuenta($scope.persona, cuentadesde, -cantidad);
    $scope.modificarTarjeta($scope.persona, tarjetahasta, +cantidad);
    $scope.nuevoMovimiento('Pago Tarjeta', cuentadesde + ' -> ' + tarjetahasta, cantidad);
    $scope.alternarPagarTarjeta();
  };

  $scope.nuevatarjeta = function(nombreTarjeta, saldoMax) {
    var nueva = {
      nombre: nombreTarjeta,
      saldoActual: 0,
      saldoMaximo: saldoMax
    };
    $scope.persona.tarjetas.push(nueva);
    $scope.nuevoMovimiento('Pidio Tarjeta', '', saldoMax);
    $scope.alternarNuevaTarjeta();
  };

  $scope.pagarPrestamo = function(cuentadesde, prestamohasta, cantidad) {

    $scope.modificarCuenta($scope.persona, cuentadesde, -cantidad);
    $scope.modificarPrestamo($scope.persona, prestamohasta, +cantidad);
    $scope.nuevoMovimiento('Pago Prestamo', cuentadesde + ' -> ' + prestamohasta, cantidad);
    $scope.alternarPagarPrestamos();
  };


  $scope.nuevoPrestamo = function(nombrePrestamo, saldoMax, cuotasMax) {
    var nueva = {
      nombre: nombrePrestamo,
      cuotas: cuotasMax,
      precio_cuota: saldoMax / cuotasMax,
      cuota_actual: 0
    };
    $scope.persona.prestamos.push(nueva);
    $scope.nuevoMovimiento('Pidio Prestamo', cuotasMax + ' Cuotas de ' + saldoMax / cuotasMax, saldoMax);
    $scope.alternarNuevaPrestamo();
  };


  $scope.cargarCelular = function(cuentadesde, celularhasta, cantidad) {
    $scope.modificarCuenta($scope.persona, cuentadesde, -cantidad);
    $scope.modificarCelular($scope.persona, celularhasta, +cantidad);
    $scope.nuevoMovimiento('Carga Virtual', cuentadesde + ' -> ' + celularhasta, cantidad);
    $scope.alternar($scope.ocultarCargaCelular);
  };
});
