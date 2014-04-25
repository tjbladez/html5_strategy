
  ig.module('game.entities.enemy_castle').requires('game.entities.castle').defines(function() {
    return tj.EnemyCastle = tj.Castle.extend({
      name: "EnemyCastle",
      type: ig.Entity.TYPE.B,
      checkAgainst: ig.Entity.TYPE.A,
      init: function(x, y, opts) {
        this.addAnim('idle', 1, [2]);
        return this.parent(x, y, opts);
      }
    });
  });
