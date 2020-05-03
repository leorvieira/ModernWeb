class ServiceDB {
   
    conectaDB () {
    
        var connection;
        var openRequest = window .indexedDB.open( "aluraframe" , 4 );

        openRequest.onupgradeneeded = e => {
        console .log( "Cria ou altera um banco já existente" );
        let minhaConnection = e.target.result;
            if (minhaConnection.objectStoreNames.contains( "negociacoes" )) {
                minhaConnection.deleteObjectStore( "negociacoes" );
            }
        minhaConnection.createObjectStore( "negociacoes" , { autoIncrement : true });
        };

        openRequest.onsuccess = e => {
            console .log( "Conexão obtida com sucesso" );
            connection = e.target.result; 
        };

        openRequest.onerror = e => {
            console .log(e.target.error);
        };

    };

    gravabanco (negociacao) { 

        var connection;
        var openRequest = window .indexedDB.open( "aluraframe" , 4 );

        openRequest.onupgradeneeded = e => {
        console .log( "Cria ou altera um banco já existente" );
        let minhaConnection = e.target.result;
            if (minhaConnection.objectStoreNames.contains( "negociacoes" )) {
                minhaConnection.deleteObjectStore( "negociacoes" );
            }
        minhaConnection.createObjectStore( "negociacoes" , { autoIncrement : true });
        };

        openRequest.onsuccess = e => {
            console .log( "Conexão obtida com sucesso" );
            connection = e.target.result; 
        };

        openRequest.onerror = e => {
            console .log(e.target.error);
        };

        

        let transaction = connection.transaction([ "negociacoes" ], "readwrite" );
        let store = transaction.objectStore( "negociacoes" );
        let request = store.add(negociacao);
        request.onsuccess = e => {
            console .log( "Negociação incluida com sucesso" );
        };
        request.onerror = e => {
            console .log( "Não foi possível incluir a negociação" );
        };
    };

    listaTodos () { 
        let transaction =
        connection.transaction([ "negociacoes" ], "readwrite" );
        let store = transaction.objectStore( "negociacoes" );
        let cursor = store.openCursor();
        let negociacoes = [];
        cursor.onsuccess = e => {
            let atual = e.target.result;
            if (atual) {
                let dado = atual.value;
                negociacoes.push(new Negociacao(dado._data, dado._quantidade, dado._valor));
                atual.continue();
            } else {
                console .log(negociacoes);
            }
        };
        cursor.onerror = e => {
        console .log(e.target.error.name);};
    };



}