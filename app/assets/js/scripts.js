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
    },
    cartColumns: [
      { view: function(item, column){
        return"<img src='"+item.get('image')+"'>";
     },
    attr: 'image' },

           { attr: "name" , label: false },

           { attr: "quantity", label: false, view: "text"},

           { attr: "price", label: false, view: "currency"},

           { view:'remove', text: "", label: false},

         ],
     cartStyle: "div"

    });

//change currency
  simpleCart.currency({
    code: "GBP" ,
    symbol: "" ,
    name: "British Pound",
});


var addButton = $('.item_add');
var inCart = 'In cart';
var addCart = 'Add to cart';

//helper functions
simpleCart.bind( "afterAdd" , function( item  ) {
  if( item.get( 'quantity' ) === 0 ){

    // addButton.each(function(){
    //   $(this).parent().removeClass('added');
    //   $(this).text(addCart);
    // });

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


addButton.each(function(){

  $(this).on('click', function(e){
    var self = $(this);
    var quantity = $(this).parent().siblings('.item__data--number').val();

    e.preventDefault();

     if ( quantity > 0 ) {


       simpleCart.bind( "afterAdd" , function( item  ) {
          self.parent().addClass('added');
          self.text(inCart);

        });
     }
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
