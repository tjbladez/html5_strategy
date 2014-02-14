ig.module(
  'game.main'
)
.requires(
  'impact.game',
  'impact.debug.debug',
  'game.levels.main',
  'game.entities.interface'
)
.defines ->
  width  = parseInt(document.documentElement.clientWidth/32)*32
  height = parseInt(document.documentElement.clientHeight/32)*32
  Main = ig.Game.extend
    init: ->
      ig.input.bind(ig.KEY.ENTER, 'ok')
      ig.input.bind(ig.KEY.MOUSE1, 'click')
      @w_width  = width
      @w_height = height
      @tile   = 32
      @loadLevel(LevelMain)
    update: ->
      @parent()
    draw: ->
      @parent()
  ig.main('#canvas', Main, 60, 768, 768, 1)
