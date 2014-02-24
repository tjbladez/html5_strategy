ig.module(
  'game.entities.neutral_castle'
)
.requires(
  'game.entities.castle'
)
.defines ->
  tj.NeutralCastle = tj.Castle.extend
    name: "NeutralCastle"
    type: ig.Entity.TYPE.B
    checkAgainst: ig.Entity.TYPE.BOTH
    init: (x,y,opts)->
      @addAnim('idle', 1,[1])
      @parent(x,y,opts)