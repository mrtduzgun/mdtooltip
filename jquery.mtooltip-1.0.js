
/* tooltip */

(function($){
    
    $.mdTooltip = {
        defaults: {
            position: {
                top: 0,
                left: 0
            },
            side: "left",
            hasClose: false,
            closeBtnClicked: function() {
                return true;
            },
            style: "black"
        }
    };
    
    $.fn.extend({
        mdTooltip: function(options) {

            options = $.extend({}, $.mdTooltip.defaults, options);

            return this.each(function(i){
          
                var $this = $(this);
                var tooltipText = $this.attr('mdTooltip-content');

                var tooltipBox = 
                    $('<div class="mdTooltipContainer" mdTooltip-data-id="'+(i+1)+'">'+
                        '<div class="mdTooltipWrapper">'+
                            '<div class="mdTooltipText">'+tooltipText+'</div>'+
                        '</div>'+
                    '</div>').appendTo("body").attr("mdTooltip-data-id", i+1);
                
                if (options.side == "up")
                    tooltipBox.prepend('<div class="mdTooltipUpArrow" role="arrow"></div>');
                else if (options.side == "right")
                    tooltipBox.prepend('<div class="mdTooltipRightArrow" role="arrow"></div>');
                else if (options.side == "down")
                    tooltipBox.prepend('<div class="mdTooltipDownArrow" role="arrow"></div>');
                else if (options.side == "left")
                    tooltipBox.prepend('<div class="mdTooltipLeftArrow" role="arrow"></div>');
                        
                if (options.hasClose)
                    tooltipBox.append('<div class="mdTooltipCloseBtn" title="Kapat"></div>');
   
                var parentWidth = $this.width();
                var parentHeight = $this.height();
                var arrowHeight = tooltipBox.find("div[role=arrow]").height();
                var arrowWidth = tooltipBox.find("div[role=arrow]").width();
                var arrowLeftPos = 0, arrowTopPos = 0;
                var tooltipBoxWrapper = tooltipBox.children(".mdTooltipWrapper");
                
                var tooltipSize = {
                    width: tooltipBox.width(),
                    height: tooltipBox.height(),
                    top: $this.offset().top,
                    left: $this.offset().left
                };
                
                if (options.side == "left") {
                    
                    tooltipSize.left = tooltipSize.left + parentWidth + arrowWidth;
                    tooltipSize.top = tooltipSize.top - tooltipSize.height/2;
                    
                    if (options.position.left)
                        tooltipSize.left += options.position.left;
                    if (options.position.top)
                        tooltipSize.top += options.position.top;
                    
                    arrowLeftPos = -1 * arrowWidth + parseInt(tooltipBoxWrapper.css("border-left-width"));
                    arrowTopPos = tooltipSize.height/2;
                }
                else if (options.side == "down") {
                    tooltipSize.left = tooltipSize.left - parentWidth / 2;
                    tooltipSize.top = tooltipSize.top - tooltipSize.height - arrowHeight;
                    
                    if (options.position.left)
                        tooltipSize.left += options.position.left;
                    if (options.position.top)
                        tooltipSize.top += options.position.top;

                    arrowLeftPos = tooltipSize.width / 2 - arrowWidth;
                    arrowTopPos = tooltipSize.height - parseInt(tooltipBoxWrapper.css("border-bottom-width"));
                }
                else if (options.side == "up") {
                    tooltipSize.left = tooltipSize.left - parentWidth / 2;
                    tooltipSize.top = tooltipSize.top + parentHeight + arrowHeight;
                    
                    if (options.position.left)
                        tooltipSize.left += options.position.left;
                    if (options.position.top)
                        tooltipSize.top += options.position.top;
                    
                    arrowLeftPos = tooltipSize.width / 2 - arrowWidth;
                    arrowTopPos = parseInt(tooltipBoxWrapper.css("border-top-width"));
                }
                else if (options.side == "right") {
                    tooltipSize.left = tooltipSize.left - tooltipSize.width - arrowWidth;
                    tooltipSize.top = tooltipSize.top - tooltipSize.height/2;
                    
                    if (options.position.left)
                        tooltipSize.left += options.position.left;
                    if (options.position.top)
                        tooltipSize.top += options.position.top;
                    
                    arrowLeftPos = tooltipSize.width - parseInt(tooltipBoxWrapper.css("border-left-width"));
                    arrowTopPos = tooltipSize.height/2;
                }
                
                //TODO add a automatic positioned option
                    
                tooltipBox.css({
                    top: tooltipSize.top,
                    left: tooltipSize.left
                });
                
                tooltipBox.find("div[role=arrow]").css({
                    top: arrowTopPos,
                    left: arrowLeftPos
                });
                
                setInterval(function(){
                    tooltipBox.fadeOut(300).fadeIn(300);
                }, 2000);
                
                if (options.hasClose) {
                    tooltipBox.children(".mdTooltipCloseBtn").click(function(){

                        options.closeBtnClicked.call();
                        clearInterval(0);
                        tooltipBox.fadeOut(300, function(){
                            tooltipBox.remove();
                        });
                    });
                }
            });
        }})
})(jQuery);