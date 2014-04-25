
  ig.module('game.entities.player_castle').requires('game.entities.castle').defines(function() {
    return tj.PlayerCastle = tj.Castle.extend({
      name: "PlayerCastle",
      type: ig.Entity.TYPE.A,
      checkAgainst: ig.Entity.TYPE.B,
      init: function(x, y, opts) {
        this.addAnim('idle', 1, [0]);
        return this.parent(x, y, opts);
      }
    });
  });
