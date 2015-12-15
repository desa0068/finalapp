//Variables used

//Items used for storing list items into array
var items=new Array();

//Listofitems used to stringify the items array
var listofitems;

//Newarray used to make an array of removed items
var newarray;

//Newstatus used to store the status of the checkbox
var newstatus=new Array();

//Statuslist used to stringify the newstatus array
var statuslist;

//Tempcheckbox used to maintain styling of the checkbox
var tempcheckbox;

//Newindex used to maintain which item's status is checked or unchecked  
var newindex;

//Used to style text when item is checked with a strikethrough effect
var displayitem;

//Used to store status of removed items from items array
var newarraystatus;
//Loaded as soon as the app launches
var str;
var str1;
var lastIndex;
$(document).ready(function(){
    
    addItems();
    deleteItems();
    displayItems();
    checkStatus();
    console.log(items);
    console.log(newstatus);
//   localStorage.removeItem("grocery-desa0068");
//    localStorage.removeItem("grocery-status");
//    newstatus.empty();
//    items.empty();
    
});

//Adding items to Listview and LocalStorage

function addItems()
{
                
                    //Check for key 
                    if(localStorage.getItem("grocery-desa0068")!=null)
                    {
                            //Updating items to items array
                            $('#addContribution').click(function() {
                            items=JSON.parse(localStorage.getItem("grocery-desa0068"));
                            items.push($('#contributionAmount').val().trim());
                            listofitems=JSON.stringify(items);
                            
                            //Updating the localStorage key    
                            localStorage.setItem("grocery-desa0068",listofitems);
                            console.log("LocalStorage Items If Key Exists",localStorage.getItem("grocery-desa0068"));

                            //Adding status checked or unchecked to localStorage    
                            newstatus=JSON.parse(localStorage.getItem("grocery-status"));
                            newstatus.push("unchecked");
                            statuslist=JSON.stringify(newstatus);
                            localStorage.setItem("grocery-status",statuslist);

                        //Checking for the validation of input item                
                      if($('#contributionAmount').val() != null) {

                            $('#contributionList').append('<li><input type="checkbox" id="checkMe"></input>' + $('#contributionAmount').val().trim() + ' <button class= "ui-btn ui-corner-all ui-icon-delete ui-btn-icon-notext" id="deleteMe" style="display:inline"> Remove</button></li>').listview('refresh');

                            $('#contributionAmount').val('');
                            $('#contributionAmount').focus();
                           
                        }   
                        else 
                        {
                            alert('Nothing to add');   
                        }

                        });
                    }
                    
                    //If key does not exists
                    else
                    {
                           
                        
                           $('#addContribution').click(function() {
                           //Adding item to localStorage by creating a key
                           items.push($('#contributionAmount').val().trim());
                           listofitems=JSON.stringify(items);
                           localStorage.setItem("grocery-desa0068",listofitems);
                               
                           //Adding status to localStorage
                           newstatus.push("unchecked");
                           statuslist=JSON.stringify(newstatus);
                           localStorage.setItem("grocery-status",statuslist);
                               
                           //Output the localStorage Items
                           console.log("The status array is:",localStorage.getItem("grocery-status"));
                           console.log("Intial LocalStorage" ,localStorage.getItem("grocery-desa0068"));
                               
                            //Checking for validations of input 
                            if($('#contributionAmount').val() != '') {

                            $('#contributionList').append('<li><input type="checkbox" id="checkMe"></input>' + $('#contributionAmount').val().trim() + ' <button class= "ui-btn ui-corner-all ui-icon-delete ui-btn-icon-notext" id="deleteMe" style="display:inline"> Remove</button></li>').listview('refresh'); 

                            $('#contributionAmount').val('');
                            $('#contributionAmount').focus();
                               
                        }   
                        else 
                        {
                            alert('Nothing to add');   
                        }
                    });
                        
                    
                }
                //Refreshing the listview
                $('#contributionList').listview('refresh');
                    
    
}

//Deleting items from listview
function deleteItems()
{
                    
    //Delete function using the button id from the created list
     $('#contributionList').on('click', "#deleteMe", function(){
                    str1=($(this).parent().text());
                    lastIndex = str1.lastIndexOf(" ");
                     str = str1.substring(0, lastIndex);
                    console.log("Original String",str);
                    str=str.trim();
                    //Removing the current selected item from list
                    $(this).parent().remove();
                    
                    //Displaying the removed item
                    

                    //Loop for iterating items through the items array and finding the match for deleting it from the array and localStorage        str1=($(this).parent().text());
                    
                    for(var i=0;i<items.length;i++)
                      {
                          //If match found
                          
                          console.log("We got:" + str + "to comapre with ");
                          if(str==items[i])
                          {
                              console.log(items[i]);
                              //Consoling the item in comparisong with the item compared
                              console.log("Deleting item from list:",str);
                              console.log("Deleting item from Array",items[i]);
                              
                              //Removing item from original array
                              newarray=items.splice(i,1);
                              newarraystatus=newstatus.splice(i,1);
                         }

                        }
                      //Removing from the old key from localStorage
                        localStorage.removeItem("grocery-desa0068");
                        
                        //Consoling two arrays 1st is removed items array and 2nd is remaining items in array 
                        console.log("Spliced Array:",newarray);
                        console.log("Original Array:",items);
                        
                        //Adding the key to localStorage with remaining items array. 
                        listofitems=JSON.stringify(items);
                        
                        //Consoling stringified array 
                        console.log("Stringified Items:",listofitems);
                        
                        //Adding the key with listofitems 
                        localStorage.setItem("grocery-desa0068",listofitems);
         
                        //Removing status array element
                        localStorage.removeItem("grocery-status");
         
                        //Consoling two arrays 1st is removed status array and 2nd is remaining item's status in array 
                        console.log("Spliced Array:",newarraystatus);
                        console.log("Original Array:",newstatus);
         
                        //Adding the key to localStorage with remaining item's status array. 
                        statuslist=JSON.stringify(newstatus);
                        
                         //Consoling stringified array 
                        console.log("Stringified Items:",statuslist);
                        
                        //Adding the key with listofitems 
                        localStorage.setItem("grocery-status",statuslist);
          
                });
                //Refreshing the listview
                $('#contributionList').listview('refresh');
               
                    
}

//Checking the status of items (whether checked or unchecked)
function checkStatus()
{
    //Check function using the checkbox id from the created list
     $('#contributionList').on('click', "#checkMe", function(){
                
                    str1=($(this).parent().text());
                    lastIndex = str1.lastIndexOf(" ");
                    str = str1.substring(0, lastIndex);
                    str=str.trim();
                    console.log("Original String",str);
         
                //Checking if the current checkbox is checked 
                if(this.checked)
                {
                    
                    
                    $(this).parent().css('color','red');
                    $(this).siblings().css('color','red');
                    $(this).parent().css('background-color','#CDC9CC');
                    $(this).parent().css('text-decoration','line-through');
                    $(this).siblings().css('text-decoration','line-through');
                   
                    
                    //Retrieving element from items array and comparing it with the selected item
                     for(var i=0;i<items.length;i++)
                     {
                       //Comparing whether the selected item exists in items array 
                          
                       if(str==items[i])
                       {
                           //Setting the index of newstatus equal to the items array index  
                           newindex=i;
                       }
                     }
                    //Updating the value of newstatus array to checked at the retrieved index   
                    newstatus[newindex]="checked";
                   
                    //Consoling the current index of items
                    console.log("The item index is:",newindex);
              
                }
                else
                {
                    $(this).parent().css('color','black');
                    $(this).siblings().css('color','black');
                    $(this).parent().css('background-color','white');
                     $(this).parent().css('text-decoration','none');
                    $(this).siblings().css('text-decoration','none');
                    
                //Else part is if the user unchecks the checked element
                 //Retrieving elements from the items array    
                    for(var i=0;i<items.length;i++)
                     {
                         //Comparing items
                         
                       if(str==items[i])
                       {
                           //Setting index
                           newindex=i;
                       }
                     }
                    //Updating the value of newstatus array to checked at the retrieved index   
                    newstatus[newindex]="unchecked";
                    
                   //Consoling the current index of items
                    console.log("The item index is:",newindex);
                    
                     
                }
                
                    //now removing the current key from localstorage
                    localStorage.removeItem("grocery-status");                    
                    //consoling the newstatus array containg updated status
                    console.log(newstatus);
         
                    //stringifying the newstatus array
                    statuslist=JSON.stringify(newstatus);
         
                    //setting the key with modified status
                    localStorage.setItem("grocery-status",statuslist);
                    
                   
                
            });
   
    
 }

//Function to display list items
function displayItems()
{
        //Code for displaying items in list view
        
      //Checking for localStorage key for its existence
      if (localStorage.getItem("grocery-desa0068") !=null)
        {
                //If key exists parse the strigified items into array of items and status
                items=JSON.parse(localStorage.getItem("grocery-desa0068"));
                newstatus=JSON.parse(localStorage.getItem("grocery-status"));
            
                //Retrieving items from array
                for(var i=0;i<items.length;i++)
                {
                    //Checking for the status of checkbox and styling the checkbox accordingly
                    if(newstatus[i]=="checked")
                    {
                        liststyle='<li id="list" style="background-color:#CDC9CC">';
                        tempcheckbox="<input type='checkbox' id='checkMe'  checked='checked' style='display:inline;text-decoration:line-through'></input>"; 
                        displayitem="<span style='color:red;text-decoration:line-through'>"+items[i]+"</span>";
                        
                    }
                    else
                    {
                        liststyle='<li id="list" style="background-color:white">';
                        tempcheckbox="<input type='checkbox' id='checkMe' style='display:inline;'></input>";
                        displayitem="<span style='color:black;'>"+items[i]+"</span>";

                    }
                    
                    //Displaying elements in a listview
                    $('#contributionList').append(liststyle + tempcheckbox + displayitem + ' <button class= "ui-btn ui-corner-all ui-icon-delete ui-btn-icon-notext" id="deleteMe" style="display:inline;">Remove</button></li>').listview('refresh');                       
                }
             
            
        }
    
}


    