ig.module(
  'game.entities.player_castle'
)
.requires(
  'game.entities.castle'
)
.defines ->
  tj.PlayerCastle = tj.Castle.extend
    name: "PlayerCastle"
    type: ig.Entity.TYPE.A
    checkAgainst: ig.Entity.TYPE.B
    init: (x,y,opts)->
      @addAnim('idle', 1,[0])
      @parent(x,y,opts)
