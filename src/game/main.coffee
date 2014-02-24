window.tj = {}
ig.module(
  'game.main'
)
.requires(
  'impact.game',
  # 'impact.debug.debug',
  'game.entities.player_castle',
  'game.entities.neutral_castle',
  'game.entities.enemy_castle',
  'game.gui.frame',
  'game.gui.minimap',
  'game.levels.main'
)
.defines ->
  width  = parseInt($(document).width()/32)*32
  height = parseInt($(document).height()/32)*32
  tj.Main = ig.Game.extend
    init: ->
      ig.input.bind(ig.KEY.UP_ARROW, 'up')
      ig.input.bind(ig.KEY.RIGHT_ARROW, 'right')
      ig.input.bind(ig.KEY.DOWN_ARROW, 'down')
      ig.input.bind(ig.KEY.LEFT_ARROW, 'left')
      ig.input.bind(ig.KEY.MOUSE1, 'click')
      @getDimensions()
      @loadRandomizedLevel(LevelMain)
      @rBorder = @backgroundMaps[0].pxWidth - @play_w
      @bBorder = @backgroundMaps[0].pxHeight - @play_h
      @frame   = new tj.Frame(@)
      @minimap = new tj.Minimap(@)
      @placeCastles()

    loadRandomizedLevel: (level)->
      level.layer[0].data.forEach (row,r_i)->
        row.forEach (column,c_i)->
          idx = parseInt((column-1)/ 4)
          newData = (idx*4)+[1,2,3,4].random()
          level.layer[0].data[r_i][c_i] = newData
      @loadLevel(level)

    update: ->
      @scrollLeft()  if ig.input.state('left')
      @scrollRight() if ig.input.state('right')
      @scrollUp()    if ig.input.state('up')
      @scrollDown()  if ig.input.state('down')

      @minimap.update()
      @parent()

      if ig.input.pressed('click')
        x = ig.input.mouse.x
        y = ig.input.mouse.y
        c_x = parseInt((@screen.x+x)/32)
        c_y = parseInt((@screen.y+y)/32)
        console.log("Mouse #{x},#{y}","Cell #{c_x},#{c_y}")

    draw: ->
      @parent()

    getDimensions: ->
      @width    = width
      @height   = height
      @tileSize = 32
      @rOffset = $(document).width() % 32
      @bOffset = $(document).height() % 32
      @play_w  = @width - @tileSize - 256 - 10
      @play_h  = @height - @tileSize

    scrollLeft: ()->
      if @screen.x > 0
        @screen.x -= 20
      else
        @screen.x = -@tileSize

    scrollRight: ()->
      if @screen.x < @rBorder
        @screen.x += 20
      else
        @screen.x = @rBorder

    scrollDown: ()->
      if @screen.y < @bBorder
        @screen.y += 20
      else
        @screen.y = @bBorder

    scrollUp: ()->
      if @screen.y > 0
        @screen.y -= 20
      else
        @screen.y = -@tileSize

    placeCastles: ()->
      playerCell = {x:12,y:12}
      neutralCells= [
        {x:33,y:10},
        {x:33,y:30},
        {x:47,y:54},
        {x:79,y:53},
        {x:81,y:76},

        {x:46,y:77},
        {x:21,y:83},
        {x:29,y:117},
        {x:68,y:98},
        {x:115,y:117},
        {x:117,y:86},
        {x:61,y:7},
        {x:83,y:38},
        {x:114,y:19},
      ]
      enemyCell = {x:114,y:59}
      @spawnEntity(tj.PlayerCastle, playerCell.x*@tileSize,playerCell.y*@tileSize-8)
      _(neutralCells).each (i)=>
        @spawnEntity(tj.NeutralCastle, i.x*@tileSize, i.y*@tileSize-8)
      @spawnEntity(tj.EnemyCastle, enemyCell.x*@tileSize,enemyCell.y*@tileSize-8)

  ig.main('#canvas', tj.Main, 60, width, height, 1)