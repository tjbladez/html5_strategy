
  ig.module('game.entities.neutral_castle').requires('game.entities.castle').defines(function() {
    return tj.NeutralCastle = tj.Castle.extend({
      name: "NeutralCastle",
      type: ig.Entity.TYPE.B,
      checkAgainst: ig.Entity.TYPE.BOTH,
      init: function(x, y, opts) {
        this.addAnim('idle', 1, [1]);
        return this.parent(x, y, opts);
      }
    });
  });
