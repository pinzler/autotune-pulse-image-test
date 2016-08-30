var pymChild = new pym.Child();

window.onload = function() {
    


  if (/MSIE 8/i.test(navigator.userAgent))  {
    $('.tapbutton', '.cwpulse').removeClass('hide');
  }
  
  else {
        
    var $pulses = $( '.pulse' , '.pulse-container');
    
    $pulses.each( function () {
       var $this = $(this);
       if ( checkInt( $this.attr('data-top') ) && checkInt( $this.attr('data-left') ) ) {
         $this.toggleClass('hide');   
         $this.css('top', 'calc(' + $this.attr('data-top') + '% - 15px)');
         $this.css('left', 'calc(' + $this.attr('data-left') + '% - 15px)');
         }
    });
    
    $pulses.click( function() {
        var $this = $(this);
        
        if ($this.attr('image-url') !== '') {
          $this.parent().children('.popup').children('#popup_image').attr('src', $(this).attr('image-url'));
          $this.parent().children('#base_image').addClass('darken');
          $this.parent().children('.popup').fadeIn();     
        }
        else if ($this.attr('data-url') !== '') {
          window.open($this.attr('data-url'));
        }

        $this.addClass('active');
       
    });


    $('.close', '.pulse-container').click(function() {
      var $this = $(this);
      $this.parent().fadeOut();
      $this.parent().children('#popup_image').attr('src', 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7');
      $this.parent().parent().children('#base_image').removeClass('darken');
    });

    $('.pulse-container').removeClass('hide');

    }

    pymChild.sendHeight();

  $(window).on('load resize', function(){
    console.log('load/resize');
    pymChild.sendHeight();
  });

$(document).ready(function() {
  if(window.location.hash === '#new'){
    window.location.reload();
  }
  pymChild.sendMessage('childLoaded', 'ready');

  pymChild.onMessage('updateData', function(data) {
    console.log('----------- received message', data);
    window.location.reload();
  })

});

};

function checkInt(value) {
  if (isNaN(value)) {
      return false;
  }
  else if (!(value > 0 && value < 100)) {
      return false;
  }
  else {
      return true;
  }  
}
