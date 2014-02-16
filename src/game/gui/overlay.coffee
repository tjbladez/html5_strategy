ig.module(
  'game.gui.overlay'
)
.defines ->
  tj.Overlay = ig.Class.extend
    className: 'gui-overlay'
    $el: null
    init: (opts={})->
      classes = @className
      classes += " #{opts.className}" if opts.className
      width   = opts.width || ig.game.width
      height  = opts.height || ig.game.height
      @$el = $('<div></div>').addClass(classes).width(width).height(height)
      $('canvas').after(@$el)
