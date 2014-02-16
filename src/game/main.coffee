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
      ig.input.bind(ig.KEY.UP_ARROW, 'up')
      ig.input.bind(ig.KEY.RIGHT_ARROW, 'right')
      ig.input.bind(ig.KEY.DOWN_ARROW, 'down')
      ig.input.bind(ig.KEY.LEFT_ARROW, 'left')
      @width  = width
      @height = height
      @tile   = 32
      @loadRandomizedLevel(LevelMain)
      @rightBorder = ig.game.backgroundMaps[0].pxWidth - ig.system.width
      @bottomBorder = ig.game.backgroundMaps[0].pxHeight - ig.system.height
    loadRandomizedLevel: (level)->
      level.layer[0].data.forEach (row,r_i)->
        row.forEach (column,c_i)->
          idx = parseInt((column-1)/ 4)
          newData = (idx*4)+[1,2,3,4].random()
          level.layer[0].data[r_i][c_i] = newData
      @loadLevel(level)

    update: ->
      if ig.input.state('left') && !@screen.x <=0
        @screen.x -= 20

      if ig.input.state('right')
        @screen.x += 20

      if ig.input.state('down')
        @screen.y += 20

      if ig.input.state('up') && !@screen.y <=0
        @screen.y -= 20

      @parent()
    draw: ->
      @parent()
  ig.main('#canvas', Main, 60, width, height, 1)