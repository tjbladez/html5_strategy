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
      $container = $('<div id="minimap"></div>')
      $container.css({top:ig.game.tileSize, right: ig.game.rOffset})
      $container.append(@preRenderedChunks[0][0])
      $('body').append($container)
      @generated = true

    update: ()->
      if @generated
        #do something
      else
        @generate()