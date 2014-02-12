(function() {
  ig.module('game.main').requires('impact.game', 'game.levels.main', 'game.entities.interface').defines(function() {
    var Main;
    Main = ig.Game.extend({
      init: function() {
        ig.input.bind(ig.KEY.ENTER, 'ok');
        ig.input.bind(ig.KEY.MOUSE1, 'click');
        this.loadLevel(LevelMain);
        return this.spawnEntity(ig.Interface, 0, 0);
      },
      update: function() {
        this.parent();
        if (ig.input.pressed('ok')) {
          return this.spawnEntity(ig.EntityEnemy, 352, 32);
        }
      },
      draw: function() {
        return this.parent();
      }
    });
    return ig.main('#canvas', Main, 60, 768, 768, 1);
  });
}).call(this);
