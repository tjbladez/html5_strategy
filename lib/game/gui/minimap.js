
  ig.module('game.gui.minimap').requires('impact.background-map').defines(function() {
    return tj.Minimap = ig.BackgroundMap.extend({
      chunkSize: 256,
      preRender: true,
      enabled: false,
      foreground: true,
      generated: false,
      scaleRatio: 16,
      init: function(game) {
        var tileSize;
        tileSize = game.tileSize / this.scaleRatio;
        return this.parent(tileSize, game.backgroundMaps[0].data, 'public/media/minimap_tileset.png');
      },
      generate: function() {
        var $container;
        if (!this.tiles.loaded || this.generated) return;
        this.preRenderMapToChunks();
        $container = $('<div id="minimap"></div>');
        $container.css({
          top: ig.game.tileSize,
          right: ig.game.rOffset
        });
        $container.append(this.preRenderedChunks[0][0]);
        $('body').append($container);
        return this.generated = true;
      },
      update: function() {
        if (this.generated) {} else {
          return this.generate();
        }
      }
    });
  });
