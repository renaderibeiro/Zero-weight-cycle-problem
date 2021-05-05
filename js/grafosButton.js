function adicionaGrafo(){
    grafo =  new Grafo(true,true);
    if (grafo) {
        imprimeNotificacao("Grafo criado com sucesso!", "success");
    } else {
        imprimeNotificacao("Erro ao criar grafo!", "error");
    }
}

function adicionaVertice(){  
    var vertice = document.getElementById('inputAddVertice');
    if(vertice.value != ''){
        grafo.addVertice(vertice.value);
        imprimeNotificacao("Vertice adicionado com sucesso", "success");
        vertice.value = '';
    }else{
        imprimeNotificacao("Valores não podem ser vazios!", "error");
    }
}



