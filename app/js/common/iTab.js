define(function(require, exports, module) {
 /* iTab PUBLIC CLASS DEFINITION
  * ====================== */
  $.fn.tab = function (options) {
    return this.each(function () {
      var $this = $(this)
        , $tabNav = $this.children('.tab-nav')
        , $tabContent = $this.find('.tab-content').first()
      $tabNav.on('click', '.nav-btn', function () {
        var target = $(this).attr('href') || $(this).data('tab');
        $tabNav.find('.btn-active').removeClass('btn-active');
        $(this).addClass('btn-active');
        $tabContent.children('.tab-item').removeClass('item-active');
        $(target).addClass('item-active');
      });
    });
  }
});