function Grafo(_direcionado,_ponderado){
    this.vertices = [];
    this.ligacao  = [];
    this.direcionado = _direcionado;
    this.ponderado = _ponderado;
}

Grafo.prototype.existeGrafo = function (){
    if (this.direcionado === true && this.ponderado === true) {
        return true;
    } else {
        return false;
    }
};

Grafo.prototype.addVertice = function (vertice){
    this.vertices.push(vertice);
    this.ligacao[vertice] = [];
    return true;
};

Grafo.prototype.addAresta = function (vertice1,vertice2,_peso){
    if (this.direcionado) {
        console.log(this.ligacao[vertice1].push([vertice2, _peso]));  
        imprimeNotificacao("Aresta adicionada com sucesso!", "success");
    } else {
        imprimeNotificacao("Erro ao adicionar aresta, verifique se os vértices foram inseridos corretamente!", "error");
    }
};

Grafo.prototype.existeVertice = function (vertice) {
    //var logger = document.getElementById('log');
    for(var i=0; i<this.vertices.length; i++){
        if(this.vertices[i] === vertice){
            console.log(this.vertices[i]);
            console.log('Existe vértice');        
            //logger.innerHTML += this.vertices[i] + '<br />';  
            return true;
        } 
    }
    console.log('Nao Existe vértice');
    //logger.innerHTML = '<br />';  
    return false;
};