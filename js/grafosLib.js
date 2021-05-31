/*########################################################################################################        RETORNAR LIGAÇÕES - Samuel Brati Favarin

            FUNÇÕES DE AÇÃO E CRIAÇÃO
#######################################################################################################*/

function Grafo(_direcionado,_ponderado){
    this.vertices = [];
    this.ligacao  = [];
    this.direcionado = _direcionado;
    this.ponderado = _ponderado;
}

Grafo.prototype.addVertice = function (vertice){
    this.vertices.push(vertice);
    this.ligacao[vertice] = [];
    return true;
};

Grafo.prototype.addArcoPonderado = function (vertice1,vertice2,_peso){
    if (this.direcionado) {
        this.ligacao[vertice1].push([vertice2, _peso]);  
        //imprimeNotificacao("Aresta adicionada com sucesso!", "success");
        //console.log('Aresta adicionada');
        return true;
    }
};

Grafo.prototype.removerVertice = function (vertice) {
    var index_vertice = this.vertices.indexOf(vertice);
    if (index_vertice == -1){
        //console.log("Vértice não existe");
        //imprimeNotificacao("Vértice não existe!", "warn");
        return null;
    }

    this.vertices.splice(index_vertice, 1);
    for(var pos=0; pos < this.vertices.length; pos++) {
        this.removerLigacao(this.vertices[pos], vertice);
    }
    delete this.ligacao[vertice];
    //imprimeNotificacao("Vértice removido com sucesso!", "success");
    return true;
};

Grafo.prototype.removerLigacao = function (origem,destino) {
    if(this.direcionado){
        for(var i =0; i<this.ligacao[origem].length; i++ ) {
            if (this.ligacao[origem][i][0] === destino) {
                //DELETA PESO
                this.ligacao[origem][i].pop();
                //DELETA VERTICE
                this.ligacao[origem][i].pop();
                this.ligacao[origem].splice(i, 1);
                return true;
            }
        }
    }
};

/*########################################################################################################        RETORNAR LIGAÇÕES - Samuel Brati Favarin

            FUNÇÕES DE CHECAGEM
#######################################################################################################*/

Grafo.prototype.existeGrafo = function (){
    if (this.direcionado === true && this.ponderado === true) {
        return true;
    } else {
        return false;
    }
};

Grafo.prototype.existeLigacao = function (origem,destino) {
    if(this.direcionado){
        for(var i =0; i<this.ligacao[origem].length; i++ ) {
            if (this.ligacao[origem][i][0] === destino) {
                //console.log('Existe aresta');
                //imprimeNotificacao("Existe aresta", "success");
                return true;
            }
        }
        //console.log('Aresta não encontrada');
        //imprimeNotificacao("Aresta não encontrada", "error");
        return false;
    }
};

Grafo.prototype.existeVertice = function (vertice) {
    var logger = document.getElementById('log');
    for(var i=0; i<this.vertices.length; i++){
        if(this.vertices[i] === vertice){
            //console.log(this.vertices[i]);
            //console.log('Existe vértice');        
            //logger.innerHTML += this.vertices[i] + '<br />';  
            return true;
        } 
    }
    //console.log('Não existe vértice');
    //logger.innerHTML = '<br />';  
    return false;
};

Grafo.prototype.retornarLigacoes = function (vertice) {
    //var logger = document.getElementById('log');  
    //for(var i=0;i < this.ligacao[vertice].length; i++) {
    //    logger.innerHTML += ' [ ' + this.ligacao[vertice][i][0] + ' ] ';     
    //}
    return this.ligacao[vertice];
};


/*####################################################################################################################################/
        DESENHA MATRIZ DE ADJACENCIA 

    CRIA UMA MATRIZ COM TODOS OS VERTICES E BUSCA NO CONJUNTO DE LIGAÇÕES DE DETERMINADO VERTICE DE
    DETERMINADO PESO
    PRINTA A MATRIZ DE ADJACENCIA E A LISTA DE ADJACENCIA

/*##################################################################################################################################*/
Grafo.prototype.imprimirGrafo = function () {
    this.matriz = new Array();
    for(i=0;i < this.vertices.length; i++) {
        this.matriz[i] = new Array();
        for(j=0; j < this.vertices.length; j++){
            this.matriz[i][j] = 0;
            for(k=0; k< this.ligacao[this.vertices[i]].length; k++){
                if(this.ligacao[this.vertices[i]][k][0] === this.vertices[j]) {
                    this.matriz[i][j] = this.ligacao[this.vertices[i]][k][1];
                }
            }
        }
    }
    //console.log('Matriz de Adjacencia: ');
    //console.log(this.matriz);
    //console.log('Lista de Adjacencia: ');
    //console.log(this.ligacao);
};


/*####################################################################################################################################/
     WELSH and POWELL E SUAS FUNÇÕES AUXILIARES 

/*##################################################################################################################################*/
Grafo.prototype.desenhaCanvasLigacoes = function (){

    //Config do canvas
    canvas  = document.getElementById('myCanvas');
    ctx     = canvas.getContext('2d');
    canvas.width  = 1330;
    canvas.height = 650;

    //Variáveis do vértice
    var vertices = [];
    var auxVertices = [];

    //Variaveis das ligações - Atualizado por Vinícius A.M 30/10/2017
    var ligacoes = this.iniciaControle(this.ligacao, this.vertices);
    var auxLigacoes = [];

    //Percorre todos os vertice - Atualizado por Vinícius A.M 30/10/2017
    for (i = 0; i < this.vertices.length; i++){

        //Insere no vertices um array com a vertice + cor
        auxVertices = new Array();
        auxVertices[0] = this.vertices[i];
        auxVertices[1] = 'red';

        vertices.push(auxVertices);
    }

    //console.log(vertices);
    //console.log(ligacoes);

    start(canvas, this.welshAndPowell(), ligacoes, grafo);
};

Grafo.prototype.welshAndPowell = function (){

    var grauEmOrdem = [];
    var verticePeso;
    var troca;
    //var temp;

    for(var i=0;i < this.vertices.length; i++) {
        verticePeso = new Array();
        verticePeso[0] = this.vertices[i]; //Vértice
        verticePeso[1] = this.retornarLigacoes(this.vertices[i]).length; //Grau
        verticePeso[2] = "Sem Cor"; //Cor inicial como "Sem cor"

        grauEmOrdem.push(verticePeso); //Inserindo para poder ver vertice e seus graus!
    } 

    troca = 1;
    
    // 1 . Ordenação pelos graus de cada vértice, verificar área do console
    while (troca == 1){
        troca = 0;        
        for (i = 0; i <= grauEmOrdem.length-2; i++){ 
            if (grauEmOrdem[i][1] < grauEmOrdem[i+1][1]){
                troca = 1;
                aux = grauEmOrdem[i];
                grauEmOrdem[i] = grauEmOrdem[i + 1];
                grauEmOrdem[i + 1] = aux;
            }
        }
    }

    // 2. Criando vetor de cores https://gist.github.com/bobspace/2712980#file-css_colors-js
    var CSS_COLOR_NAMES = this.retornaCssColors();

    //Caso seja um grafo nulo, sem ligações, aplicar cor g= 1;
    var g = 1;
    for(i = 0; i < this.vertices.length; i++){
        if(this.ligacao[this.vertices[i]].length != 0){
            g = 0;
        }
    }

    //Grafo nulo, cor única!
    if(g == 1){
        for(i = 0; i < grauEmOrdem.length; i++){
            grauEmOrdem[i][2] = CSS_COLOR_NAMES[ Math.floor(Math.random() * CSS_COLOR_NAMES.length) ];
        }
    }else{
        //Grafo não nulo, verificar cada vértice vizinho e aplicar cor ou não
        var countSemCor = grauEmOrdem.length;
        var corAtual = CSS_COLOR_NAMES[g];
        var flag;

        while(countSemCor > 0){
            
            g = g + 1;
            corAtual = CSS_COLOR_NAMES[g];
            
            //Percorre todos os vertices + grau
            for(i = 0; i < grauEmOrdem.length; i++){  

                if(grauEmOrdem[i][2] == "Sem Cor"){   
                    flag = true;              
                    //Percorro todas as ligações do vertice grauEmOrdem[i][2]
                    for(j = 0; j < this.ligacao[grauEmOrdem[i][0]].length; j ++){                                          
                        /*
                            Percorres entao as cores desses vertices vizinhos
                            e verifico se o vizinho do vertice do indece "i" tem a mesma cor,
                            caso tenha o flag recebe = false 
                        */
                        for(k = 0; k < grauEmOrdem.length; k++ ){                                
                            if(grauEmOrdem[k][0] == this.ligacao[grauEmOrdem[i][0]][j][0]){
                                if(grauEmOrdem[k][2] == corAtual) {
                                    flag = false;
                                }
                            }                   
                        }
                    }
                    //Caso nenhum vizinho tenha a cor, atribuo a cor ao vertice atual de "I"
                    if(flag == true){
                        grauEmOrdem[i][2] = corAtual;
                    }
                }else{
                    countSemCor = countSemCor - 1;
                }
            }
        }
    }

    return grauEmOrdem;
};

Grafo.prototype.iniciaControle = function (conjuntoArestas, conjuntoVertices){

    var conjuntoControle = new Array();
    var temp = [];
    var verticeAtual;
    var ligacaoAtual;
    var pesoAtual;
    var flag;

    //Monta um array com ligações e peso
    for(var i = 0; i < conjuntoVertices.length; i++){
        for(var j = 0; j < conjuntoArestas[conjuntoVertices[i]].length; j++){

            flag = true;
            temp = [];
            verticeAtual = conjuntoVertices[i];
            ligacaoAtual = conjuntoArestas[conjuntoVertices[i]][j][0];
            pesoAtual = conjuntoArestas[conjuntoVertices[i]][j][1];

            //Veritico se existe duplicidade de ligação, exemplo AD e DA
            for(var k = 0; k < conjuntoControle.length; k++){

                if( (conjuntoControle[k][0] == ligacaoAtual) &&
                    (conjuntoControle[k][1] == verticeAtual) &&
                    (conjuntoControle[k][2] == pesoAtual) ){
                    flag = false;
                }
            }

            //Se não encontrou duplicidade...
            if(flag == true){
                temp[0] = verticeAtual;
                temp[1] = ligacaoAtual;
                temp[2] = pesoAtual;
                conjuntoControle.push(temp); //Irei juntar tudo em um vetor mais organizado
            }
        }
    }

    return conjuntoControle;
};

/*########################################################################################################        RETORNAR LIGAÇÕES - Samuel Brati Favarin

            FUNÇÃO É CICLO DE PESO ZERO

#######################################################################################################*/

Grafo.prototype.cicloPesoZero = function () {
    var origem = document.getElementById('inputCalculaCiclo');
    if (grafo.dfscomDestino(origem.value, origem.value)) {
        return true;
    } else {
        return false;
    }
};

/*########################################################################################################        RETORNAR LIGAÇÕES - Samuel Brati Favarin

            FUNÇÃO DFS COM DESTINO (ORIGEM E DESTINO IGUAL POIS É CICLO)

#######################################################################################################*/


Grafo.prototype.dfscomDestino = function (origem,destino){
    var visitados   = [];
    var pilha       = [];
    pilha.push(origem);
    var peso = 0;
    var flag = 0;
    //visita a partir da origem
    while (pilha.length > 0){
        var nodo = pilha.pop();
        //SE O VERTICE NÃO FOI VISITADO
        if (visitados.indexOf(nodo) == -1){
            flag = 0;
            visitados.push(nodo);
            for (var i = 0; i < this.ligacao[nodo].length; i++){
                pilha.push(this.ligacao[nodo][i][0]);
                peso+= parseInt(this.ligacao[nodo][i][1]);
                if (this.ligacao[nodo][i][0] === destino) {
                    if (peso === 0) {
                        visitados.push(this.ligacao[nodo][i][0]);
                        console.log(peso);
                        var logger = document.getElementById('log');
                        logger.innerHTML += visitados + '<br />';
                        return true;
                    }
                    flag = 1;
                    break;
                }
                if (flag === 1) break;
            }

        }
    }

    return false;

};

Grafo.prototype.retornaCssColors = function (){
    var css = ["PaleGreen","Magenta","Aqua","Moccasin","Azure","Beige","Bisque","Black","BlanchedAlmond","Blue","BlueViolet",
        "Brown","BurlyWood","CadetBlue","Chartreuse","Chocolate","Coral","CornflowerBlue","Cornsilk","Crimson","Cyan","DarkBlue","DarkCyan",
        "DarkGoldenRod","DarkGray","DarkGrey","DarkGreen","DarkKhaki","DarkMagenta","DarkOliveGreen","Darkorange","DarkOrchid","DarkRed","DarkSalmon",
        "DarkSeaGreen","DarkSlateBlue","DarkSlateGray","DarkSlateGrey","DarkTurquoise","DarkViolet","DeepPink","DeepSkyBlue","DimGray","DimGrey",
        "DodgerBlue","FireBrick","FloralWhite","ForestGreen","Fuchsia","Gainsboro","GhostWhite","Gold","GoldenRod","Gray","Grey","Green","GreenYellow",
        "HoneyDew","HotPink","IndianRed","Indigo","Ivory","Khaki","Lavender","LavenderBlush","LawnGreen","LemonChiffon","LightBlue","LightCoral",
        "LightCyan","LightGoldenRodYellow","LightGray","LightGrey","LightGreen","LightPink","LightSalmon","LightSeaGreen","LightSkyBlue","LightSlateGray",
        "LightSlateGrey","LightSteelBlue","LightYellow","Lime","LimeGreen","Linen","Maroon","MediumAquaMarine","MediumBlue","MediumOrchid",
        "MediumPurple","MediumSeaGreen","MediumSlateBlue","MediumSpringGreen","MediumTurquoise","MediumVioletRed","MidnightBlue","MintCream","MistyRose",
        "NavajoWhite","Navy","OldLace","Olive","OliveDrab","Orange","OrangeRed","Orchid","PaleGoldenRod","PaleTurquoise",
        "PaleVioletRed","PapayaWhip","PeachPuff","Peru","Pink","Plum","PowderBlue","Purple","Red","RosyBrown","RoyalBlue","SaddleBrown","Salmon",
        "SandyBrown","SeaGreen","SeaShell","Sienna","Silver","SkyBlue","SlateBlue","SlateGray","SlateGrey","Snow","SpringGreen","SteelBlue","Tan",
        "Teal","Thistle","Tomato","Turquoise","Violet","Wheat","White","WhiteSmoke","Yellow","YellowGreen"];

    return css;
};





