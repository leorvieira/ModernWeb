"use strict";

var _createClass = function () {
    function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
        }
    }return function (Constructor, protoProps, staticProps) {
        if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
    };
}();

function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}

var ServiceDB = function () {
    function ServiceDB() {
        _classCallCheck(this, ServiceDB);
    }

    _createClass(ServiceDB, [{
        key: "conectaDB",
        value: function conectaDB() {

            var connection;
            var openRequest = window.indexedDB.open("aluraframe", 4);

            openRequest.onupgradeneeded = function (e) {
                console.log("Cria ou altera um banco já existente");
                var minhaConnection = e.target.result;
                if (minhaConnection.objectStoreNames.contains("negociacoes")) {
                    minhaConnection.deleteObjectStore("negociacoes");
                }
                minhaConnection.createObjectStore("negociacoes", { autoIncrement: true });
            };

            openRequest.onsuccess = function (e) {
                console.log("Conexão obtida com sucesso");
                connection = e.target.result;
            };

            openRequest.onerror = function (e) {
                console.log(e.target.error);
            };
        }
    }, {
        key: "gravabanco",
        value: function gravabanco(negociacao) {

            var connection;
            var openRequest = window.indexedDB.open("aluraframe", 4);

            openRequest.onupgradeneeded = function (e) {
                console.log("Cria ou altera um banco já existente");
                var minhaConnection = e.target.result;
                if (minhaConnection.objectStoreNames.contains("negociacoes")) {
                    minhaConnection.deleteObjectStore("negociacoes");
                }
                minhaConnection.createObjectStore("negociacoes", { autoIncrement: true });
            };

            openRequest.onsuccess = function (e) {
                console.log("Conexão obtida com sucesso");
                connection = e.target.result;
            };

            openRequest.onerror = function (e) {
                console.log(e.target.error);
            };

            var transaction = connection.transaction(["negociacoes"], "readwrite");
            var store = transaction.objectStore("negociacoes");
            var request = store.add(negociacao);
            request.onsuccess = function (e) {
                console.log("Negociação incluida com sucesso");
            };
            request.onerror = function (e) {
                console.log("Não foi possível incluir a negociação");
            };
        }
    }, {
        key: "listaTodos",
        value: function listaTodos() {
            var transaction = connection.transaction(["negociacoes"], "readwrite");
            var store = transaction.objectStore("negociacoes");
            var cursor = store.openCursor();
            var negociacoes = [];
            cursor.onsuccess = function (e) {
                var atual = e.target.result;
                if (atual) {
                    var dado = atual.value;
                    negociacoes.push(new Negociacao(dado._data, dado._quantidade, dado._valor));
                    atual.continue();
                } else {
                    console.log(negociacoes);
                }
            };
            cursor.onerror = function (e) {
                console.log(e.target.error.name);
            };
        }
    }]);

    return ServiceDB;
}();
//# sourceMappingURL=ServiceDB.js.map