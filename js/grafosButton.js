contador = 0;

function adicionaGrafo(){
    if (contador == 1) {
        imprimeNotificacao("Já existe um grafo, adicione ou remova vértices e/ou arestas", "error");
    } else {
        grafo =  new Grafo(true,true);
        if (grafo.existeGrafo()) {
            imprimeNotificacao("Grafo criado com sucesso", "success");
            console.log("criei");
            contador = 1;
        } else {
            imprimeNotificacao("Erro ao criar grafo", "error");
        }
    }
}

function adicionaVertice(){
    var vertice = document.getElementById('inputAddVertice');
    if (contador == 1) {
        if (!grafo.existeVertice(vertice.value)) { // se não existe vértice pode adicionar
            if(vertice.value != ''){
                grafo.addVertice(vertice.value);
                imprimeNotificacao("Vertice adicionado com sucesso", "success");
                vertice.value = '';
            }else{
                imprimeNotificacao("Valores não podem ser vazios", "error");
            }
        } else {
            imprimeNotificacao("O vértice já existe", "error");
        }
    } else {
        imprimeNotificacao("É necessário criar um grafo para adicionar o vértice", "error");
    }
}





