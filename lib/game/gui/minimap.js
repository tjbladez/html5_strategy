
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
        if (!this.tiles.loaded || this.generated) return;
        this.preRenderMapToChunks();
        this.$map = $('<div id="minimap"></div>');
        this.$map.css({
          top: ig.game.tileSize,
          right: ig.game.rOffset
        });
        this.$map.append(this.preRenderedChunks[0][0]);
        $('body').append(this.$map);
        return this.generated = true;
      },
      update: function() {
        var ctx;
        if (this.generated) {
          ctx = this.$map.find('canvas')[0].getContext('2d');
          ctx.lineWidth = "1";
          ctx.rect(0, 0, 20, 20);
          return ctx.stroke();
        } else {
          return this.generate();
        }
      }
    });
  });
