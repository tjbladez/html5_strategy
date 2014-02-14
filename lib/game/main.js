
  ig.module('game.main').requires('impact.game', 'impact.debug.debug', 'game.levels.main', 'game.entities.interface').defines(function() {
    var Main, height, width;
    width = parseInt(document.documentElement.clientWidth / 32) * 32;
    height = parseInt(document.documentElement.clientHeight / 32) * 32;
    Main = ig.Game.extend({
      init: function() {
        ig.input.bind(ig.KEY.ENTER, 'ok');
        ig.input.bind(ig.KEY.MOUSE1, 'click');
        this.w_width = width;
        this.w_height = height;
        this.tile = 32;
        return this.loadLevel(LevelMain);
      },
      update: function() {
        return this.parent();
      },
      draw: function() {
        return this.parent();
      }
    });
    return ig.main('#canvas', Main, 60, 768, 768, 1);
  });
