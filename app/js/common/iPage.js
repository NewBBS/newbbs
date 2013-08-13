define(function(require, exports, module) {
 /* iPage PUBLIC CLASS DEFINITION
  * ================================== */
  var iPage = function (element) {
    this.init(element);
  }

  iPage.prototype = {
    constructor: iPage,
    init: function (element) {
        var self = this;
        this.$element = element;
        this.backArray = [];
        this.$activePanel = $(element).children('.active-panel');
        //console.log(self.$activePanel)

        this.$element.on('click.go', '.ipage-panel .go-btn', function (event) {
          var $thisBtn = $(this)
            , targetId = $thisBtn.attr('href') || $thisBtn.data('target')
            , $target = $(targetId)

          self.$activePanel.addClass('back-panel');
          $target.addClass('active-panel');
          self.$activePanel.removeClass('active-panel');
          self.backArray.push(self.$activePanel);
          self.$activePanel = $target;
          //console.log('activePanel:')
          //console.log(self.$activePanel)
          event.preventDefault();
        });

        this.$element.on('click.back', '.ipage-panel .back-btn', function (event) {
          var $thisBtn = $(this)
            , $backPanel = self.backArray.pop()

          $backPanel.addClass('active-panel');
          self.$activePanel.removeClass('active-panel');
          $backPanel.removeClass('back-panel');
          self.$activePanel = $backPanel;
          event.preventDefault();
        });
    }
  }

  $.fn.ipage = function (options) {
    return this.each(function () {
      var newIpage = new iPage($(this));
    });
  }
});