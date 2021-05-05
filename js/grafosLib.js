function Grafo(_direcionado,_ponderado){
    this.vertices = [];
    this.ligacao  = [];
    this.direcionado = _direcionado;
    this.ponderado = _ponderado;
}

Grafo.prototype.existeGrafo = function (){
    if (this.vertices && this.ligacao && this.direcionado && this.ponderado) {
        return true;
    } else {
        return false;
    }
};

Grafo.prototype.addVertice = function (vertice){
    this.vertices.push(vertice);
    this.ligacao[vertice] = [];
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
            
            imprimeNotificacao("Existe Vértice! Verifique o console", "success");
            
            //logger.innerHTML += this.vertices[i] + '<br />';  

            return true;
        }
    }
    console.log('Vértice não encontrado');
    
    imprimeNotificacao("Vértice não encontrado!", "warn");

    //logger.innerHTML = '<br />';  
    return false;
};