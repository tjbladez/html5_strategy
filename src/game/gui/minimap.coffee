ig.module(
  'game.gui.minimap'
)
.requires(
  'impact.background-map'
)
.defines ->
  tj.Minimap = ig.BackgroundMap.extend
    chunkSize: 256
    preRender: true
    enabled: false
    foreground: true
    generated: false
    scaleRatio: 16

    init: (game)->
      data = game.backgroundMaps[0].data
      tileSize  = game.tileSize / @scaleRatio
      @canvas_h = tileSize * data.length
      @canvas_w = tileSize * data[0].length
      @parent(tileSize, data, 'public/media/minimap_tileset.png');

    generate: ()->
      return if !@tiles.loaded || @generated

      @preRenderMapToChunks()

      @$map = $('<div id="minimap"></div>')
      @$map.css({top:ig.game.tileSize, right: ig.game.rOffset})
      @$map.append(@preRenderedChunks[0][0])

      @$dynamic = $('<canvas class="dynamic"></canvas>')
      @$dynamic.prop('width',@canvas_w)
      @$dynamic.prop('height',@canvas_h)
      @$map.append(@$dynamic)

      $('body').append(@$map)
      @generated = true

    update: ()->
      if @generated
        ctx = @$dynamic[0].getContext('2d')
        ctx.clearRect(0, 0, @canvas_w, @canvas_h)
        h = ig.game.play_h/ig.game.tileSize*2
        w = ig.game.play_w/ig.game.tileSize*2
        x = Math.round(ig.game.screen.x / ig.game.tileSize *2)
        y = Math.round(ig.game.screen.y / ig.game.tileSize *2)
        ctx.strokeRect(x,y,w,h)
      else
        @generate()