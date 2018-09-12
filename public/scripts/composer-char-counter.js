function addAllEvents(){
    
  $('textarea').keyup(function(event){
    const length = this.value.length;
    const count = 140 - length;
    $('textarea').parent().find(".counter").text(count);
    if(count < 0 ){
        $('textarea').parent().find(".counter").addClass("red");
    } 
    });

}

document.addEventListener("DOMContentLoaded", function(event){
  addAllEvents();
})
