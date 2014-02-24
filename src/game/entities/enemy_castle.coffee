ig.module(
  'game.entities.enemy_castle'
)
.requires(
  'game.entities.castle'
)
.defines ->
  tj.EnemyCastle = tj.Castle.extend
    name: "EnemyCastle"
    type: ig.Entity.TYPE.B
    checkAgainst: ig.Entity.TYPE.A
    init: (x,y,opts)->
      @addAnim('idle', 1,[2])
      @parent(x,y,opts)