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
      tileSize = game.tileSize / @scaleRatio
      @parent(tileSize, game.backgroundMaps[0].data, 'public/media/minimap_tileset.png');

    generate: ()->
      return if !@tiles.loaded || @generated

      @preRenderMapToChunks()
      @$map = $('<div id="minimap"></div>')
      @$map.css({top:ig.game.tileSize, right: ig.game.rOffset})
      @$map.append(@preRenderedChunks[0][0])
      $('body').append(@$map)
      @generated = true

    update: ()->
      if @generated
        ctx = @$map.find('canvas')[0].getContext('2d')
        ctx.lineWidth = "1"
        ctx.rect(0,0,20,20)
        ctx.stroke()
        # ctx.fillRect(0, 0, 20, 20)
      else
        @generate()