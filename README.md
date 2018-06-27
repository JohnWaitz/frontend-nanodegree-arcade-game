# Frontend Nanodegree Arcade Game

## Instruções
Students should use this [rubric](https://review.udacity.com/#!/projects/2696458597/rubric) for self-checking their submission. Make sure the functions you write are **object-oriented** - either class functions (like Player and Enemy) or class prototype functions such as Enemy.prototype.checkCollisions, and that the keyword 'this' is used appropriately within your class and class prototype functions to refer to the object the function is called upon. Also be sure that the **readme.md** file is updated with your instructions on both how to 1. Run and 2. Play your arcade game.

For detailed instructions on how to get started, check out this [guide](https://docs.google.com/document/d/1v01aScPjSWCCWQLIpFqvg3-vXLH2e8_SZQKC8jNO0Dc/pub?embedded=true).

### Iniciando o Jogo
Para dar início ao jogo, abra o arquivo index.html em seu navegador.

### Mecânicas do Jogo
 - Para movimentar o personagem, utilize as teclas de seta do teclado.
 - Para vencer o jogo, atravesse o cenário até a água sem colidir com os inimigos.

## Notas de Revisão

#### #1 Revisão
> Ao acessar uma instância da classe **Player** dentro de um método da classe **Enemy** ocorre a violação do princípio de encapsulamento, que deve ser evitada.

```
Enemy.prototype.checkCollision = function() {
  var player = window.player;
  var playerPositionRange = player.getPositionRange();
...
	if (collisionOnX && collisionOnY) {
		player.reset();
	}
}
```

Para corrigir a situação acima, uma instância do objeto **Player** agora é passada diretamente para o construtor da classe **Enemy**, assim o jogador poderá ser referenciado dentro do método *checkCollison* de **Enemy**.

```
var Enemy = function(x, y, speed, player) {
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
    this.speed = speed;
	this.player = player;
};
```
```
Enemy.prototype.checkCollision = function() {
  var playerPositionRange = this.player.getPositionRange();
...
	if (collisionOnX && collisionOnY) {
		this.player.reset();
	}
}
```

Esta é uma das soluções mais "elegantes" dentro do OOP em ES5, pois evita que o escopo global seja poluído. Uma segunda alternativa seria atribuir o método *checkCollision* de **Enemy** ao escopo global, chamando a função na estrutura da **engine.js** e passando os objetos *player* e *allEnemies* como argumentos.
