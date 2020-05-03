'use strict';

var _NegociacaoController = require('./controllers/NegociacaoController');

var negociacaoController = new _NegociacaoController.NegociacaoController();

document.querySelector('.form').onsubmit = negociacaoController.adiciona.bind(negociacaoController);
document.querySelector('#apaga-negociacoes-btn').onclick = negociacaoController.apaga.bind(negociacaoController);
document.querySelector('#importa-negociacoes-btn').onclick = negociacaoController.importaNegociacoes.bind(negociacaoController);
//# sourceMappingURL=_boot.js.map