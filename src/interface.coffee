ig.module(
  'game.entities.interface'
)
.requires(
  'impact.entity'
)
.defines ->
  ig.Interface = ig.Entity.extend
    size: {x:768, y: 768}
    animSheet: new ig.AnimationSheet('media/interface.png', 768, 768)
    init: (x, y, opts) ->
      this.addAnim('idle', 1, [0])
      this.parent(x, y, opts)

    update: ->
      if ig.input.pressed('click')
        console.log('mouse x', ig.input.mouse.x, 'y', ig.input.mouse.y)
      this.parent()
    draw: ->
      this.parent()

