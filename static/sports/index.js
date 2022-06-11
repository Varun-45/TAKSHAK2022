document.querySelector('.first-button').addEventListener('click', function () {
    document.querySelector('.animated-icon1').classList.toggle('open');
});

// Class Selector
var $Texts = document.querySelectorAll(".FadeText");

// Global variables
$delayMultiplier = 0.03;

// Loop all Texts
for($i in $Texts){

    // clear $conext
    $htmlTag = false;
    $content = "";

    for($x in $Texts[$i].innerHTML){

        delay = ($delayMultiplier * $x).toFixed(2);
        char = ($Texts[$i].innerHTML.charAt($x));

        // check if HTML tag opens
        if(char == "<"){
            $htmlTag = true;
        }

        // Check Status of HTML Tag and fill wrapped char into Context    
        if($htmlTag == false){
            $content += "<span style='animation-delay:"+delay+"s'>"+char+"</span>";
        }else{
            $content += char;
        }

        // check if HTML tag closes
        if(char == ">"){
            $htmlTag = false;
        }
    }

    // Change Text into wrapped text
    $Texts[$i].innerHTML = $content;
}   

document.getElementsByClassName("challonge-button").onclick = (e) => {
    window.location.replace("#")
}