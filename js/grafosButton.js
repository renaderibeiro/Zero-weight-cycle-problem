function adicionaGrafo(){
    grafo =  new Grafo(true,true);
    if (grafo.existeGrafo()) {
        imprimeNotificacao("Grafo criado com sucesso!", "success");
        console.log("criei");
    } else {
        imprimeNotificacao("Erro ao criar grafo!", "error");
    }
}

function adicionaVertice(){ 
    if (grafo.existeGrafo()) {
        console.log("existe grafo");
        var vertice = document.getElementById('inputAddVertice');
        if(vertice.value != ''){
            grafo.addVertice(vertice.value);
            imprimeNotificacao("Vertice adicionado com sucesso", "success");
            vertice.value = '';
        }else{
            imprimeNotificacao("Valores não podem ser vazios!", "error");
        }
    } else {
        console.log("nao existe grafo");
        imprimeNotificacao("É preciso criar um grafo antes de adicionar um vértice", "error");
    }
}

function adicionaAresta(){
    if (grafo.existeGrafo()) {
        var vertice1 = document.getElementById('inputAddArestaPond1');
        var vertice2 = document.getElementById('inputAddArestaPond2');
        var peso = document.getElementById('inputAddPesoPond');
        if (!grafo.existeVertice(vertice1) || !grafo.existeVertice(vertice2)) {
            imprimeNotificacao("É preciso criar os vértices antes de adicionar uma aresta", "error");
        }
        if (vertice1.value != '' && vertice2.value != '' && peso.value != ''){
            grafo.addAresta(vertice1.value, vertice2.value, peso.value);
            vertice1.value = '';
            vertice2.value = '';
            peso.value = '';
        }else{
            imprimeNotificacao("Valores não podem ser vazios!", "error");
        }
    } else {
        imprimeNotificacao("É preciso criar um grafo antes de adicionar uma aresta", "error");
    }
}



