ig.module(
  'game.main'
)
.requires(
  'impact.game',
  'game.levels.main',
  'game.entities.enemy',
  'game.entities.interface'
)
.defines ->
  Main = ig.Game.extend
    init: ->
      ig.input.bind( ig.KEY.ENTER, 'ok')
      ig.input.bind(ig.KEY.MOUSE1, 'click');
      this.loadLevel(LevelMain)
      this.spawnEntity(ig.Interface, 0, 0)
    update: ->
      this.parent()
      this.spawnEntity(ig.EntityEnemy, 352, 32) if ig.input.pressed('ok')
    draw: ->
      this.parent()
  ig.main('#canvas', Main, 60, 768, 768, 1)
