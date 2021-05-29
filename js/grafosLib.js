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
        console.log('aresta adicionada');
        return true;
    }
};

Grafo.prototype.removerVertice = function (vertice) {
    var index_vertice = this.vertices.indexOf(vertice);
    if (index_vertice == -1){
        console.log("Vértice não existe");
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
                console.log('Existe aresta');
                //imprimeNotificacao("Existe aresta", "success");
                return true;
            }
        }
        console.log('Aresta não encontrada');
        //imprimeNotificacao("Aresta não encontrada", "error");
        return false;
    }
};

Grafo.prototype.existeVertice = function (vertice) {
    var logger = document.getElementById('log');
    for(var i=0; i<this.vertices.length; i++){
        if(this.vertices[i] === vertice){
            console.log(this.vertices[i]);
            console.log('Existe vértice');        
            //logger.innerHTML += this.vertices[i] + '<br />';  
            return true;
        } 
    }
    console.log('Não existe vértice');
    //logger.innerHTML = '<br />';  
    return false;
};

Grafo.prototype.retornarLigacoes = function (vertice) {
    var logger = document.getElementById('log');  
    for(var i=0;i < this.ligacao[vertice].length; i++) {
        logger.innerHTML += ' [ ' + this.ligacao[vertice][i][0] + ' ] ';     
    }
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
    console.log('Matriz de Adjacencia: ');
    console.log(this.matriz);
    console.log('Lista de Adjacencia: ');
    console.log(this.ligacao);
};

function imprimeLista() {
    var logger = document.getElementById('log');
    logger.innerHTML += '<br />';

    console.log(grafo.ligacao);
    for(var i=0;i<grafo.vertices.length;i++){
        logger.innerHTML += grafo.vertices[i] + ' -> ';
        for(var j=0; j<grafo.ligacao[grafo.vertices[i]].length; j++){
            logger.innerHTML += ' | ' + grafo.ligacao[grafo.vertices[i]][j][0]
        }
        logger.innerHTML += '<br>';
    }
}

/*########################################################################################################        RETORNAR LIGAÇÕES - Samuel Brati Favarin

            FUNÇÕES DE DESENHO CANVAS

#######################################################################################################*/
Grafo.prototype.desenhaCanvasLigacoes = function (tipo){

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

    console.log(vertices);
    console.log(ligacoes);

    if(tipo == "welshAndPowell"){
        start(canvas, this.welshAndPowell(), ligacoes, grafo);
    }
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
