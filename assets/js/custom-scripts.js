(function($) {
  "use strict";

    $.fn.andSelf = function() {
      return this.addBack.apply(this, arguments);
    }
    /*
    |====================
    | Mobile NAv trigger
    |=====================
    */
    
    $('.navbar-nav>li>a').on('click', function(){
        $('.navbar-collapse').collapse('hide');
    });
  
    

    /*
    |=================
    | Onepage Nav
    |================
    */
        
      $('#zb-header').onePageNav({
          currentClass: 'active', 
          changeHash: false,
          scrollSpeed: 750,
          scrollThreshold: 0.5,
      });
    
    //  Cursor
//     var mouseTagName = [
//       'A',
//       'BUTTON'
//   ]

//   var bodyArea = document.querySelector('body')
//   var mouseCursor = document.querySelector('.mouse-cursor')
  
//   var enterMouse = function() {
//       TweenMax.to(mouseCursor, 0, {
//           autoAlpha: 1,
//           ease: Power4.easeIn
//       });
//   }

//   var mouseMove = function(e) {
//       var mousePosition = {
//           x: e.clientX,
//           y: e.clientY
//       }
//       TweenMax.to(mouseCursor, 0.3, {
//           x: mousePosition.x,
//           y: mousePosition.y,
//           ease: Power1.easeOut
//       });
//   }

//   var mouseOver = function(e) {
//       var { tagName } = e.target
//       if(mouseTagName.includes(tagName)){
//           document.querySelector('body').classList.toggle('tag-mouse-over')
//       }
//   }

//   bodyArea.addEventListener('mouseenter', enterMouse)
//   bodyArea.addEventListener('mousemove', mouseMove)
//   bodyArea.addEventListener('mouseover', mouseOver)
//   bodyArea.addEventListener('mouseout', mouseOver)


//   var mouseCursorO = document.querySelector('.mouse-cursor-dot')
  
//   var enterMouseO = function() {
//       TweenMax.to(mouseCursorO, 0, {
//           autoAlpha: 0.8,
//           ease: Power4.easeIn
//       });
//   }
//   var mouseMoveO = function(e) {

//       var mousePosition = {
//           x: e.clientX,
//           y: e.clientY
//       }
//       TweenMax.to(mouseCursorO, 0, {
//           x: mousePosition.x,
//           y: mousePosition.y,
//           ease: Power1.easeOut
//       });
//   }

//   bodyArea.addEventListener('mouseenter', enterMouseO)
//   bodyArea.addEventListener('mousemove', mouseMoveO)

    /*
    |=====================
    | package tab
    |=====================
    */

    $('#zbTab a').on('click', function (e) {
      e.preventDefault()
      $(this).tab('show')
    });
      
    /*
    | ==========================
    | NAV FIXED ON SCROLL
    | ==========================
    */
    $(window).on('scroll', function() {
        var scroll = $(window).scrollTop();
        if (scroll >= 50) {
            $(".nav-scroll").addClass("nav-strict");
        } else {
            $(".nav-scroll").removeClass("nav-strict");
        }
    });

    $(window).on('scroll', function() {
        var scroll = $(window).scrollTop();
        if (scroll >= 50) {
            $(".nav-scroll").addClass("nav-strict");
        } else {
            $(".nav-scroll").removeClass("nav-strict");
        }
    });
 

    /*
    |=================
    | Client review
    |================
    */   
   
   $('#mh-client-review').owlCarousel({
        loop: true,
        responsiveClass: true,
        nav: false,
        autoplay: false,
        smartSpeed: 450,
        // navText: ["<i class='fa fa-angle-left'></i>", "<i class='fa fa-angle-right'></i>"],
        margin: 10,
        stopOnHover : true,
        animateIn: 'slideInRight',
        animateOut: 'slideOutLeft',
        autoplayHoverPause: true,
        responsive: {
        0: {
            items: 1,
        },
        768: {
            items: 1,
        },
        1170: {
            items: 1,
        }
        }
    }); 


    $('#advice_section').owlCarousel({
      loop: true,
      responsiveClass: true,
      nav: false,
      autoplay: true,
      smartSpeed: 2500,
      margin: 30,
      autoplayTimeout:100,
      autoWidth: true,
      stopOnHover : true,
      autoplayHoverPause: true,
      // responsive: {
      // 0: {
      //     items: 1,
      // },
      // 768: {
      //     items: 2,
      // },
      // 1170: {
      //     items: 3,
      // }
      // }
  }); 

        // Fake loading.
        setTimeout(init, 1);

        function init() {
            
            var scrollElemToWatch = document.getElementById('rev-6'),
                watcher = scrollMonitor.create(scrollElemToWatch, -300), 
                rev2 = new RevealFx(scrollElemToWatch, {
                    revealSettings : {
                        bgcolor: '#0d2658',
                        duration: 700,
                        easing: 'easeInOutCirc',
                        coverArea: 0,
                        onCover: function(contentEl, revealerEl) {
                            contentEl.style.opacity = 1;
                            // mediaToolbar.classList.add('media__toolbar--show');
                        }
                    }
                });

            watcher.enterViewport(function() {
                rev2.reveal();
                watcher.destroy();
            });
        }; 

                // Fake loading.
                setTimeout(init1, 1);

                function init1() {
                    
                    var scrollElemToWatch = document.getElementById('rev'),
                        watcher = scrollMonitor.create(scrollElemToWatch, -200), 
                        rev2 = new RevealFx(scrollElemToWatch, {
                            revealSettings : {
                                bgcolor: '#0d2658',
                                duration: 500,
                                easing: 'easeInOutCirc',
                                coverArea: 0,
                                onCover: function(contentEl, revealerEl) {
                                    contentEl.style.opacity = 1;
                                    // mediaToolbar.classList.add('media__toolbar--show');
                                }
                            }
                        });
        
                    watcher.enterViewport(function() {
                        rev2.reveal();
                        watcher.destroy();
                    });
                }; 

                // Fake loading.
                setTimeout(init2, 100);

                function init2() {
                    
                    var scrollElemToWatch = document.getElementById('rev-1'),
                        watcher = scrollMonitor.create(scrollElemToWatch, -200), 
                        rev2 = new RevealFx(scrollElemToWatch, {
                            revealSettings : {
                                bgcolor: '#0d2658',
                                duration: 500,
                                easing: 'easeInOutCirc',
                                coverArea: 0,
                                onCover: function(contentEl, revealerEl) {
                                    contentEl.style.opacity = 1;
                                    // mediaToolbar.classList.add('media__toolbar--show');
                                }
                            }
                        });
        
                    watcher.enterViewport(function() {
                        rev2.reveal();
                        watcher.destroy();
                    });
                }; 

                // Fake loading.
                setTimeout(init3, 100);

                function init3() {
                    
                    var scrollElemToWatch = document.getElementById('rev-2'),
                        watcher = scrollMonitor.create(scrollElemToWatch, -200), 
                        rev2 = new RevealFx(scrollElemToWatch, {
                            revealSettings : {
                                bgcolor: '#0d2658',
                                duration: 500,
                                easing: 'easeInOutCirc',
                                coverArea: 0,
                                onCover: function(contentEl, revealerEl) {
                                    contentEl.style.opacity = 1;
                                    // mediaToolbar.classList.add('media__toolbar--show');
                                }
                            }
                        });
        
                    watcher.enterViewport(function() {
                        rev2.reveal();
                        watcher.destroy();
                    });
                }; 
                // Fake loading.
                setTimeout(init4, 100);

                function init4() {
                    
                    var scrollElemToWatch = document.getElementById('rev-3'),
                        watcher = scrollMonitor.create(scrollElemToWatch, -200), 
                        rev2 = new RevealFx(scrollElemToWatch, {
                            revealSettings : {
                                bgcolor: '#0d2658',
                                duration: 500,
                                easing: 'easeInOutCirc',
                                coverArea: 0,
                                onCover: function(contentEl, revealerEl) {
                                    contentEl.style.opacity = 1;
                                    // mediaToolbar.classList.add('media__toolbar--show');
                                }
                            }
                        });
        
                    watcher.enterViewport(function() {
                        rev2.reveal();
                        watcher.destroy();
                    });
                };                                 
    //testtimonial


    /*
    |=================
    | CONTACT FORM
    |=================
    */
        
      $("#contactForm").validator().on("submit", function (event) {
          if (event.isDefaultPrevented()) {
            // handle the invalid form...
            formError();
            submitMSG(false, "Did you fill in the form properly?");
          } else {
            // everything looks good!
            event.preventDefault();
            submitForm();
          }
       });
    
        function submitForm(){
            var name = $("#name").val();
            var email = $("#email").val();
            var message = $("#message").val();
            $.ajax({
                type: "POST",
                url: "process.php",
                data: "name=" + name + "&email=" + email + "&message=" + message,
                success : function(text){
                    if (text == "success"){
                      formSuccess();
                    } else {
                      formError();
                      submitMSG(false,text);
                    }
                }
            });
        }
        function formSuccess(){
            $("#contactForm")[0].reset();
            submitMSG(true, "Message Sent!")
        }
    	function formError(){   
    	    $("#contactForm").removeClass().addClass('shake animated').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
    	        $(this).removeClass();
    	    });
    	}
        function submitMSG(valid, msg){
          if(valid){
            var msgClasses = "h3 text-center fadeInUp animated text-success";
          } else {
            var msgClasses = "h3 text-center shake animated text-danger";
          }
          $("#msgSubmit").removeClass().addClass(msgClasses).text(msg);
        } 



        setTimeout(init22, 3000);

        function init22() {
            document.body.classList.remove('loading');
        };
        
        //parallax
        var image = document.getElementsByClassName('ione');
        new simpleParallax(image, {
          overflow: true,
          scale: 1.5,
        });
        
        var image = document.getElementsByClassName('itwo');
        new simpleParallax(image, {
          overflow: true,
          scale: 1.8,
        });

        //aos init
        // AOS.init();

}(jQuery));

