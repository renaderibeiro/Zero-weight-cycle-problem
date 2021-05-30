/*########################################################################################################        RETORNAR LIGAÇÕES - Samuel Brati Favarin

            FUNÇÕES DE INSERÇÃO
#######################################################################################################*/

contador = 0;

function adicionaGrafo(){
    if (contador == 1) {
        imprimeNotificacao("Já existe um grafo, adicione ou remova vértices e/ou arestas", "error");
    } else {
        grafo =  new Grafo(true,true);
        if (grafo.existeGrafo()) {
            imprimeNotificacao("Grafo criado com sucesso", "success");
            //console.log("criei");
            contador = 1;
        } else {
            imprimeNotificacao("Erro ao criar grafo", "error");
        }
    }
}

function adicionaVertice(){
    var vertice = document.getElementById('inputAddVertice');
    if (!grafo.existeVertice(vertice.value) && true) { // se não existe vértice pode adicionar
        if(vertice.value != ''){
            if (grafo.addVertice(vertice.value)) {
                imprimeNotificacao("Vertice adicionado com sucesso", "success");
            } else {
                imprimeNotificacao("Erro ao adicionar vértice", "error");
            }
            vertice.value = '';
        }
    }
}

function adicionaArcoPonderado(){
    var vertice1 = document.getElementById('inputAddArestaPond1');
    var vertice2 = document.getElementById('inputAddArestaPond2');
    var peso = document.getElementById('inputAddPesoPond');
    if(vertice1.value != '' && vertice2.value != '' && peso.value != ''){
        if (grafo.existeVertice(vertice1.value) && grafo.existeVertice(vertice2.value) && true) {
            if (!grafo.existeLigacao(vertice1.value, vertice2.value) && true){ // verifica se já existe ligacao e se n existir adidiona
                if (grafo.addArcoPonderado(vertice1.value, vertice2.value, peso.value)) {
                    imprimeNotificacao("Aresta adicionada com sucesso", "success");
                } else {
                    imprimeNotificacao("Erro ao adicionar aresta", "error");
                }
                vertice1.value = '';
                vertice2.value = '';
                peso.value = '';
            }
        }
    }
}

/*########################################################################################################        RETORNAR LIGAÇÕES - Samuel Brati Favarin

            FUNÇÕES DE REMOÇÃO
#######################################################################################################*/


function removeVertice(){
    var vertice = document.getElementById('inputDelVertice');
    if (grafo.existeVertice(vertice.value) && true) {
        if(vertice.value != ''){ 
            if (grafo.removerVertice(vertice.value)) {
                imprimeNotificacao("Vértice removido com sucesso", "success");
            } else {
                imprimeNotificacao("Erro ao remover vértice", "error");
            }
            vertice.value = '';
        }
    } else {
        imprimeNotificacao("Vértice não existe!", "warn");
    }
}

function removeLigacao(){
    var origem = document.getElementById('inputDelLigacao1');
    var destino = document.getElementById('inputDelLigacao2');
    if(origem.value != '' && destino.value){
        if (grafo.existeVertice(origem.value) && grafo.existeVertice(destino.value) && true) {
            if (grafo.existeLigacao(origem.value, destino.value) && true){ // verifica se já existe ligacao e se n existir adidiona
                if (grafo.removerLigacao(origem.value, destino.value)){
                    imprimeNotificacao("Aresta removida com sucesso", "success");
                } else {
                    imprimeNotificacao("Erro ao remover aresta", "error");
                }
                origem.value = '';
                destino.value = ''; 
            }
        }
    }
}

/*########################################################################################################        RETORNAR LIGAÇÕES - Samuel Brati Favarin

            FUNÇÕES DE OPERAÇÕES
#######################################################################################################*/

function retornaLigacoes(){
    limparConsole()
    var vertice = document.getElementById('inputRetornarLigacoes');
    if(vertice.value != ''){
        grafo.retornarLigacoes(vertice.value);
        imprimeNotificacao("Ligações retornadas! Verifique o console", "success");
        vertice.value = '';
    }
}

function existeLigacao(){
    var origem = document.getElementById('inputExisteLigacaoOrigem');
    var destino = document.getElementById('inputExisteLigacaoDestino');
    if(origem.value != '' && destino.value != ''){  
        if (grafo.existeLigacao(origem.value, destino.value) && true){
            imprimeNotificacao("Existe aresta", "success");  
            origem.value = '';
            destino.value = '';
        } else {
            imprimeNotificacao("Não existe aresta", "error");
        }
    }
}

function existeVertice(){
    var vertice = document.getElementById('inputExisteVertice');
    if(vertice.value != ''){
        if (grafo.existeVertice(vertice.value)) {
            imprimeNotificacao("Existe vértice", "success");
            vertice.value = '';
        } else {
            imprimeNotificacao("Não existe vértice", "error");
        }
    }
}

function limparConsole(){
    var logger = document.getElementById('log');  
    logger.innerHTML = '<br />';
}


/*########################################################################################################        RETORNAR LIGAÇÕES - Samuel Brati Favarin

            FUNÇÕES DE IMPRESSÕES
#######################################################################################################*/
function imprimeVertices() {
    limparConsole()
    var logger = document.getElementById('log'); 
    logger.innerHTML += '<br />'; 
    logger.innerHTML += grafo.vertices + '<br />'; 
}

function imprimeMatriz() {
    limparConsole()
    var logger = document.getElementById('log');  
    logger.innerHTML += '<br />';

    this.matriz = new Array();
    for(i=0;i < grafo.vertices.length; i++) {
        this.matriz[i] = new Array();
        for(j=0; j < grafo.vertices.length; j++){
            this.matriz[i][j] = 0;
            for(k=0; k< grafo.ligacao[grafo.vertices[i]].length; k++){
                if(grafo.ligacao[grafo.vertices[i]][k][0] === grafo.vertices[j]) {
                    this.matriz[i][j] = grafo.ligacao[grafo.vertices[i]][k][1];   
                }   
            }
        }
    }

    logger.innerHTML += '  [ ## ]  ';

    for(i=0;i < grafo.vertices.length; i++) {
        logger.innerHTML += '  [' + grafo.vertices[i] + ']  '; 
    }
    
    logger.innerHTML += '<br />'; 

    for(i=0;i < this.matriz.length; i++) {
      
        logger.innerHTML += '  [ ' + grafo.vertices[i] + ' ]  ';   
       
        for(j=0; j < this.matriz.length; j++){
           logger.innerHTML += '  [  ' + this.matriz[i][j] + ' ]  '; 
        }
        logger.innerHTML += '<br />'; 
    }  
}

function imprimeLista() {
    limparConsole()
    var logger = document.getElementById('log');
    logger.innerHTML += '<br />';

    //console.log(grafo.ligacao);
    for(var i=0;i<grafo.vertices.length;i++){
        logger.innerHTML += grafo.vertices[i] + ' -> ';
        for(var j=0; j<grafo.ligacao[grafo.vertices[i]].length; j++){
            logger.innerHTML += ' | ' + grafo.ligacao[grafo.vertices[i]][j][0]
        }
        logger.innerHTML += '<br>';
    }
}

/*########################################################################################################        RETORNAR LIGAÇÕES - Samuel Brati Favarin

            FUNÇÕES DE COLORAÇÃO CANVAS
#######################################################################################################*/

function coloreWelshAndPowell(){
    if(grafo.vertices.length > 0){
         grafo.desenhaCanvasLigacoes();
    } else{
        imprimeNotificacao("Não existem Vértices!", "warn"); 
    }
}

/*########################################################################################################        RETORNAR LIGAÇÕES - Samuel Brati Favarin

            FUNÇÕES DE CICLO DE PESO ZERO
#######################################################################################################*/

function calculaCiclo(){
    limparConsole();
    if (grafo.vertices.length > 0) {
        if(grafo.cicloPesoZero()){
            imprimeNotificacao("Existe (pelo menos) um ciclo de peso zero. Veja em CONSOLE", "sucess");
        } else{
            imprimeNotificacao("Não existe ciclo de peso zero", "error"); 
        }
    } else {
        imprimeNotificacao("Não existem Vértices!", "warn");
    }
    coloreWelshAndPowell();
    imprimeNotificacao("Verifique o grafo construído em CANVAS", "sucess");
}

