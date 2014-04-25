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
      @canvasH = tileSize * data.length
      @canvasW = tileSize * data[0].length
      @parent(tileSize, data, 'public/media/minimap_tileset.png');
      @castleImgs = new ig.Image('public/media/minimap_castles.png');
      @viewableH = Math.round(ig.game.playH/ig.game.tileSize*2)
      @viewableW = Math.round(ig.game.playW/ig.game.tileSize*2)

    generate: ()->
      return if !@tiles.loaded || @generated

      @preRenderMapToChunks()

      @$map = $('<div id="minimap"></div>')
      @$map.css({top:ig.game.tileSize, right: ig.game.rOffset})
      @$map.append(@preRenderedChunks[0][0])
      @$map.on 'click', (e)=>
        @moveTo(e.offsetX, e.offsetY)

      @$dynamic = $('<canvas class="dynamic"></canvas>')
      @$dynamic.prop('width',@canvasW)
      @$dynamic.prop('height',@canvasH)
      @$map.append(@$dynamic)

      $('body').append(@$map)
      @generated = true

    update: ()->
      if @generated
        ctx = @$dynamic[0].getContext('2d')
        ctx.clearRect(0, 0, @canvasW, @canvasH)
        @updateCurrentLocation(ctx)
        @updateCastles(ctx)
      else
        @generate()

    updateCurrentLocation: (ctx)->
      x = Math.round(ig.game.screen.x / ig.game.tileSize *2)
      y = Math.round(ig.game.screen.y / ig.game.tileSize *2)
      ctx.strokeRect(x,y,@viewableW,@viewableH)

    updateCastles: (ctx)->
      _(ig.game.castles.player).each (i)=>
        ctx.drawImage(@castleImgs.data,0,0,6,5,i.x*2,i.y*2,6,5)

      _(ig.game.castles.neutral).each (i)=>
        ctx.drawImage(@castleImgs.data,6,0,6,5,i.x*2,i.y*2,6,5)

      _(ig.game.castles.enemy).each (i)=>
        ctx.drawImage(@castleImgs.data,12,0,6,5,i.x*2,i.y*2,6,5)

    moveTo: (mouseX, mouseY)->
      # mid offset is used for centering
      targetX = mouseX - Math.round(@viewableW / 2)
      targetX = 0 if targetX < 0
      targetY = mouseY - Math.round(@viewableH / 2)
      targetY = 0 if targetY < 0

      x = Math.round(targetX * ig.game.tileSize/2)
      y = Math.round(targetY * ig.game.tileSize/2)

      ig.game.scrollToX(x)
      ig.game.scrollToY(y)