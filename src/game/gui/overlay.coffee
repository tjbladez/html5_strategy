ig.module(
  'game.gui.overlay'
)
.defines ->
 ig.Overlay = ig.Class.extend
  className: 'overlay'
  defaultVisible:  false
  init: ()->
    $canvas = $(ig.system.canvas)
    @$el = $('div')
      .addClass(@className)
      .css({position: 'absolute', display: 'none'})
      .width($canvas.width())
      .height($canvas.height())
    $('body').append(@$el)
    @$el.toggle(@defaultVisible)
