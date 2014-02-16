window.tj = {}
ig.module(
  'game.main'
)
.requires(
  'impact.game',
  # 'impact.debug.debug',
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
      @getDimensions()
      @loadRandomizedLevel(LevelMain)
      @rBorder = @backgroundMaps[0].pxWidth - ig.system.width
      @bBorder = @backgroundMaps[0].pxHeight - ig.system.height
      frame = new tj.Frame(@)
      @minimap = new tj.Minimap(LevelMain.layer[0].data);
      @minimap.generate()

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
        if @screen.x < @rBorder
          @screen.x += 20
        else
          @screen.x = @rBorder

      if ig.input.state('down')
        if @screen.y < @bBorder
          @screen.y += 20
        else
          @screen.y = @bBorder

      if ig.input.state('up') && !@screen.y <=0
        @screen.y -= 20

      @parent()

    draw: ->
      @parent()

    getDimensions: ->
      @width    = width
      @height   = height
      @tileSize = 32
      @rOffset = $(document).width() % 32
      @bOffset = $(document).height() % 32

  ig.main('#canvas', tj.Main, 60, width, height, 1)
