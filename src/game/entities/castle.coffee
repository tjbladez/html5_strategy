ig.module(
  'game.entities.castle'
)
.requires(
  'impact.entity'
)
.defines ->
  tj.Castle = ig.Entity.extend
    size: {x: 64, y: 64}
    collides: ig.Entity.COLLIDES.NONE
    type: ig.Entity.TYPE.A
    checkAgainst: ig.Entity.TYPE.B
    animSheet: new ig.AnimationSheet('public/media/castles.png', 64, 72)
    name: "Castle"
    init: (x,y, opts) ->
      @addAnim('idle', 1,[0])
      @parent(x, y, opts)