(function(global){    //IIFE

    var dc={};
    var mainHtml="snippets/mainContainer.html";
    var jsonFile="data/colleges.json";
//Convenience function for inserting innerhtml for 'select'

var insertHtml=function(selector,html){

var targetElem=document.querySelector(selector);
targetElem.innerHTML=html;
};

var insertProperty=function(string,propName,propValue){

    var propToReplace="{{"+propName+"}}";
    string =string.replace(new RegExp(propToReplace,"g"),propValue);
    return string;
    };

document.addEventListener("DOMContentLoaded",function(event){

    var gridelement=document.querySelector('.grid-container');
    dc.loadcollegedata=function(){
        
        $ajaxUtils.sendGetRequest(
        mainHtml,
        function(responseText)
        {            
            $ajaxUtils.sendGetRequest(jsonFile,function(collegesdata){
                
                var finalHTML='';
                var counter=0;
                if(sessionStorage.getItem("value"))
                {
                   
                    sessionStorage.clear();
                }
                for(var i=0;i<(collegesdata['colleges'].length-(collegesdata['colleges'].length-10));i++)
                {
                    var html=responseText;
                    html=insertProperty(html,"collegename",collegesdata['colleges'][i].college_name);
                    html=insertProperty(html,"ranking",collegesdata['colleges'][i].ranking);
                    html=insertProperty(html,"best_college",collegesdata['colleges'][i].tags[0]);
                    html=insertProperty(html,"distance",collegesdata['colleges'][i].tags[1]);
                    html=insertProperty(html,"amenties",collegesdata['colleges'][i].amenties[0]);
                    html=insertProperty(html,"amenties1",collegesdata['colleges'][i].amenties[1]);
                    html=insertProperty(html,"rating_val",collegesdata['colleges'][i].rating);
                    html=insertProperty(html,"rating_remarks",collegesdata['colleges'][i].rating_remarks);
                    html=insertProperty(html,"discount",collegesdata['colleges'][i].discount);
                    html=insertProperty(html,"nearest_place",collegesdata['colleges'][i].nearest_place[0]);
                    html=insertProperty(html,"nearest_place_distance",collegesdata['colleges'][i].nearest_place[1]);
                    html=insertProperty(html,"discounted_fees",collegesdata['colleges'][i].discounted_fees);
                    html=insertProperty(html,"fees_cycle",collegesdata['colleges'][i].fees_cycle);
                    finalHTML+=html;
                    counter=counter+1;
                }

                sessionStorage.setItem("value", counter);

                insertHtml(".grid-container",finalHTML);
            })
        },false);

    }



    dc.infinitescroll=function(){
        
        if($(window).scrollTop() + $(window).height() >= 2000) {
             
            $ajaxUtils.sendGetRequest(
                mainHtml,
                function(responseText)
                {  
                    $ajaxUtils.sendGetRequest(jsonFile,function(collegesdata){
                        
                        var newval=sessionStorage.getItem("value");
                        var newval1=parseInt(newval, 10);
                        if(newval1==collegesdata['colleges'].length)
                        {
                            newval1=0;
                        }
                        var newcounter=0;
                        for(var i=newval1;i<newval1+10;i++)
                        {
                            

                            var final=document.createElement('div');
                            var finalHTML=responseText;
                            finalHTML=insertProperty(finalHTML,"collegename",collegesdata['colleges'][i].college_name);
                            finalHTML=insertProperty(finalHTML,"ranking",collegesdata['colleges'][i].ranking);
                            finalHTML=insertProperty(finalHTML,"best_college",collegesdata['colleges'][i].tags[0]);
                            finalHTML=insertProperty(finalHTML,"distance",collegesdata['colleges'][i].tags[1]);
                            finalHTML=insertProperty(finalHTML,"amenties",collegesdata['colleges'][i].amenties[0]);
                            finalHTML=insertProperty(finalHTML,"amenties1",collegesdata['colleges'][i].amenties[1]);
                            finalHTML=insertProperty(finalHTML,"rating_val",collegesdata['colleges'][i].rating);
                            finalHTML=insertProperty(finalHTML,"rating_remarks",collegesdata['colleges'][i].rating_remarks);
                            finalHTML=insertProperty(finalHTML,"discount",collegesdata['colleges'][i].discount);
                            finalHTML=insertProperty(finalHTML,"nearest_place",collegesdata['colleges'][i].nearest_place[0]);
                            finalHTML=insertProperty(finalHTML,"nearest_place_distance",collegesdata['colleges'][i].nearest_place[1]);
                            finalHTML=insertProperty(finalHTML,"discounted_fees",collegesdata['colleges'][i].discounted_fees);
                            finalHTML=insertProperty(finalHTML,"fees_cycle",collegesdata['colleges'][i].fees_cycle);
                           
                            final.innerHTML=finalHTML;
                           document.querySelector(".grid-container").appendChild(final);
                           

                        }
                        sessionStorage.clear();
                        sessionStorage.setItem("value",newval1+10);
                    })
                },false);
        }
    }
});
   global.$dc=dc;
})(window);