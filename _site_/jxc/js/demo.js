$(function(){
  $('input').focus();
  $('body').on('touchstart', 'input',  function(){
    $('input').focus();
  }); 
  
});