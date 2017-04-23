$(document).ready(function() {
  //empty on page refresh
  simpleCart.empty();


var value = $('.item__data--number');
value.each(function(index, el) {
  $(this).keydown(function (e) {
       if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110, 190]) !== -1 ||
           (e.keyCode == 65 && (e.ctrlKey === true || e.metaKey === true)) ||
           (e.keyCode == 67 && (e.ctrlKey === true || e.metaKey === true)) ||
           (e.keyCode == 88 && (e.ctrlKey === true || e.metaKey === true)) ||
           (e.keyCode >= 35 && e.keyCode <= 39)) {
                return;
       }
       // Ensure that it is a number and stop the keypress
       if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
           e.preventDefault();
       }
   });
});


  //Simple Cart
  simpleCart({
    checkout: {
      type: "PayPal",
      email: "you@yours.com"
    }
  });

//change currency
  simpleCart.currency({
    code: "GBP" ,
    symbol: "" ,
    name: "British Pound"
});

//helper functions
simpleCart.bind( "afterAdd" , function( item  ) {
  if( item.get( 'quantity' ) === 0 ){
    return false;
  }
 });

 simpleCart.bind('beforeAdd', function (item) {
    var requestedQuantity = item.get('quantity');
    if (requestedQuantity === 0) {
        return false;
    }
});

//ADD LOGIC
var addButton = $('.item_add');

addButton.each(function(){
  var title = $(this).parent().siblings('.item__data--title').attr("data-title");
  var src = $(this).parent().parent().siblings('.item__image').attr("data-src");
  var price = $(this).parent().siblings().children('.regular').attr("data-price");
  var inCart = 'In cart';

  $(this).on('click', function(e){
    var self = $(this);
     var quantity = $(this).parent().siblings('.item__data--number').val();
     var html_cart = '<li class="li"><img src="'+src+'"><div class="details"><h6>'+title+'</h6></div><span class="number" data-number="'+quantity+'">'+quantity+'</span> x <span class="price" data-price="'+price+'">'+price+'</span><span class="remove__cart">&times;</span></li>';
     e.preventDefault();

     if ( quantity > 0 ) {
       $(document).find(".cart__list").append(html_cart);

       simpleCart.bind( "afterAdd" , function( item  ) {
          self.parent().addClass('added');
          self.text(inCart);
        });
     }
  });
});

//REMOVE LOGIC
var removeCart = $(document).find('.remove__cart');
$('#cartModal').on('show.bs.modal', function (e) {
  $('.cart__list').on('click', '.remove__cart', function(){
    var sef = $(this);
    sef.each(function(){
      $(this).parent().remove();
    });
  });

});

//Favorites
var fav = $('.star');

 fav.each(function(){
  $(this).on('click', function(){
    $(this).finish().toggleClass('selected');
    if($(this).hasClass('selected')){
      $('.fav').text( parseInt($('.fav').text()) + 1 );
    }
    else{
      $('.fav').text( parseInt($('.fav').text()) - 1 );
    }
  });
});


});
