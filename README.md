# Zero-weight Cycle Problem


## 📃 Descrição


A aplicação busca implementar por meio de um algoritmo baseado no algoritmo de Busca em Profundidade ([DFS](https://en.wikipedia.org/wiki/Depth-first_search)), uma solução para o [Problema do Ciclo de Peso Zero](https://en.wikipedia.org/wiki/Zero-weight_cycle_problem).


## ✏️ Apresentação


Aplicação desenvolvida por [Renata Lima Ribeiro de Sena](https://github.com/renaderibeiro) com fork de [GRAFOS-GUI](https://github.com/SamuelBFavarin/Grafos-GUI) para o componente curricular MATA53 - Teoria dos Grafos do curso de Ciência da Computação na Universidade Federal da Bahia, pelo semestre 2021.1. O componente curricular em questão é ministrada pelo [Prof. Dr. Tiago Januário](https://www.linkedin.com/in/januarioccp/).

Matrícula: 219115203


## 🖱️ Acesso


A Interface Web pode ser acessada [aqui](https://renaderibeiro.github.io/problema-do-ciclo-de-peso-zero/).

O vídeo descritivo pode ser acessado [aqui](https://youtu.be/2t0E3ofHOUs).


## 💻 Tecnologias Utilizadas


Foram utilizadas as seguintes tecnologias para o desenvolvimento:

- HTML 5
- CSS 3
- JavaScript

Não é necessária a instalação de nenhuma dependência para a utilização do projeto ou sua reprodução. Para facilitar a visualização do código é recomendada a utilização de uma IDE.


## 🦮 Instruções Gerais para utilização da Interface Web


- Para criar um grafo deve-se usar a opção do botão `CRIAR GRAFO` na aba `CRIAÇÃO`
  * Não é possível criar vértices, arestas, realizar impressões ou saber se um grafo tem ciclo de peso zero se o grafo não foi criado
  * Todo grafo criado é direcionado e ponderado
- Vértices devem ser criados na aba `AÇÕES` após a criação do grafo
  * Não é possível adicionar vértices iguais
- Arestas devem ser criadas na aba `AÇÕES` após a criação dos vértices do grafo
  * Arestas não podem ser criadas sem antes criar seus vértices
  * Não é possível criar arestas iguais
- É possível visualizar todos os vértices, arestas, a matriz de adjacência e o grafo usando as opções da aba `IMPRESSÕES`.
  * A visualização será feita na aba `CONSOLE` para vértices, arestas e matriz de adjacência
  * A visualização será feita na aba `CANVAS` para o grafo
- É possível visualizar a existência de ligações e vértices
- É possível verificar a existência de um `CICLO DE PESO ZERO` na aba `AÇÕES` informando um vértice


## ℹ️ Algoritmo de Resolução


O algoritmo de resolução é um algoritmo de busca baseado no algoritmo de busca em profundidade tradicional. A função recebe como parâmetros o vértice informado como `origem` e `destino` (já que procura-se um ciclo).

O algoritmo se dá como se segue:


```js
Grafo.prototype.dfscomDestino = function (origem,destino){
  var visitados   = [];
  var pilha       = [];
  pilha.push(origem);
  var acumulador;
  var peso = 0;
  //...
};
```


Criam-se duas pilhas: um para os vértices `visitados` e outro para a `pilha` por meio da qual vamos contar as arestas possíveis.
\
Alimenta-se a pilha com o vértice de origem.
\
Criam-se duas variáveis: `acumulador` que guarda o valor de cada peso; e `peso` para guardar o valor de todos os pesos do ciclo e comparar depois se o valor do ciclo é igual a zero.


```js
  //...
while (pilha.length > 0){
  var nodo = pilha.pop();
  if (visitados.indexOf(nodo) == -1){
    visitados.push(nodo);
    for (var i = 0; i < this.ligacao[nodo].length; i++){
      acumulador=parseInt(this.ligacao[nodo][i][1]);
      peso+=acumulador;
      pilha.push(this.ligacao[nodo][i][0]);
      //...
```

Com o laço `while` visita-se os vértices a partir da origem. Com o `if` verifica-se se o vértice já foi visitado. Caso afirmativo, coloca o vértice atual na lista de `visitados`. No laço `for` percorre-se todas as arestas do vértice e as consequentes para formar um caminho.



```js
if (this.ligacao[nodo][i][0] === destino && peso === 0) {
  visitados.push(this.ligacao[nodo][i][0]);
  var logger = document.getElementById('log');
  logger.innerHTML += visitados + '<br />';
  return true;
//...
}
  return false;
};
```

Com o `if` verifica-se se o vértice atual é o vértice de destino (que é o mesmo de origem por ser um ciclo) e se o peso acumulado é igual a 0. Caso a afirmação anterior seja verdadeira, a lista `visitados` recebe o último vértice, que é o mesmo de origem. O `logger` imprime os `visitados` na aba `CONSOLE` e retorna true. Caso contrário, continuam-se as buscas. Em caso de ciclo de peso zero não encontrado, retorna-se falso.


### 📚 Referências e Para saber mais


- [Como detectar um ciclo em um grafo](https://www.geeksforgeeks.org/detect-cycle-in-a-graph/)
- [Algoritmos em JavaScript](https://github.com/trekhleb/javascript-algorithms/blob/master/README.es-ES.md)
- [Algoritmos de Grafos em JavaScript](https://github.com/dexcodeinc/graph_algorithm.js)
- [Como determinar ciclos em grafo direcionado](https://www.docow.com/2642/melhor-algoritmo-para-detectar-ciclos-em-um-grafo-direcionado.html)
- [Algoritmo de Dijkstra e algoritmo Bellman-ford (Python)](https://github.com/dedeco/dijkstra-bellman-ford)
