$(function () { // Same as document.addEventListener("DOMContentLoaded"...


  $('.navbar-collapse a').click(function(){
      $(".navbar-collapse").collapse('hide');
  });

 window.display=0;
});

$(document).ready(function()
{

    $('#basic').change(function () {
        /*var selectedText = $(this).find("option:selected").text();*/
        var selectedValue = $(this).val();

        /*Sort_Products_copy(selectedValue);*/
        Sort_Products(selectedValue);
        /*Sort_Products_ListView(selectedValue);*/

            
    });

});



function Sort_Products(value)
{
	
/*alert("running grid view");*/
var i;
var j;
var temp;
var myJson;

/*alert("Display value ="+window.display);*/

if(window.display == 0)
    Sort_Products_By_All_States(value);
else
	Sort_Products_By_Product_Type(value);

                      
} 

function Sort_Products_By_All_States(value)
{
/*alert("Display status in sort function ="+window.display);*/
var xmlhttp = new XMLHttpRequest();
var i;
var j;
var temp;
var myJson;
xmlhttp.onreadystatechange = function() { 
  if (this.readyState == 4 && this.status == 200) {
    myJson = JSON.parse(this.responseText);

    /*************** Sorting Routine ******************************/
    for (i=0; i< myJson.Products.length; i++)
        for (j=0; j< myJson.Products.length; j++)
    {
        var i_num = parseInt(myJson.Products[i].new_cost);
        var j_num = parseInt(myJson.Products[j].new_cost);
        
        if(value=='2')
        {
	        if(i_num > j_num)
	        {
	            
	            temp = myJson.Products[i];
	            myJson.Products[i] = myJson.Products[j];
	            myJson.Products[j] = temp;
	        }
    	}
    	if(value=='3')
        {
	        if(i_num < j_num)
	        {
	            
	            temp = myJson.Products[i];
	            myJson.Products[i] = myJson.Products[j];
	            myJson.Products[j] = temp;
	        }
    	}

        
    }
    /*****************************************************************/
    Display_Products_GridView(myJson);    
    Display_Products_ListView(myJson);  
  }
};
xmlhttp.open("GET", "json/Product_json.txt", true);
xmlhttp.send();

}


function Sort_Products_By_Product_Type(value)
{
/*alert("Display status ="+window.display);*/

var xmlhttp = new XMLHttpRequest();
var i;
var j;
var temp;
var myJson;
xmlhttp.onreadystatechange = function() { 
  if (this.readyState == 4 && this.status == 200) {
    myJson = JSON.parse(this.responseText);

var myNewJson = {"Products":[] };
var counter =0;
    for(i=0; i<myJson.Products.length; i++)
    {
    	if(parseInt(myJson.Products[i].Product_Type_Code) == parseInt(window.display))
    	{
    		myNewJson.Products[counter] = myJson.Products[i];
    		counter++;
    	}
    }
    
    /*************** Sorting Routine ******************************/
    for (i=0; i< myNewJson.Products.length; i++)
        for (j=0; j< myNewJson.Products.length; j++)
    {
        var i_num = parseInt(myNewJson.Products[i].new_cost);
        var j_num = parseInt(myNewJson.Products[j].new_cost);
        
        if(value=='2')
        {
	        if(i_num > j_num)
	        {
	            
	            temp = myNewJson.Products[i];
	            myNewJson.Products[i] = myNewJson.Products[j];
	            myNewJson.Products[j] = temp;
	        }
    	}
    	if(value=='3')
        {
	        if(i_num < j_num)
	        {
	            
	            temp = myNewJson.Products[i];
	            myNewJson.Products[i] = myNewJson.Products[j];
	            myNewJson.Products[j] = temp;
	        }
    	}

        
    }
    /*****************************************************************/
    Display_Products_GridView(myNewJson);    
    Display_Products_ListView(myNewJson);  

  }
};
xmlhttp.open("GET", "json/Product_json.txt", true);
xmlhttp.send();

}


function Sort_Products_copy(value)
{
	
/*alert("running grid view");*/
var xmlhttp = new XMLHttpRequest();
var i;
var j;
var temp;
var myJson;
xmlhttp.onreadystatechange = function() {
  if (this.readyState == 4 && this.status == 200) {
    myJson = JSON.parse(this.responseText);

    /*************** Sorting Routine ******************************/
    for (i=0; i< myJson.Products.length; i++)
        for (j=0; j< myJson.Products.length; j++)
    {
        var i_num = parseInt(myJson.Products[i].new_cost);
        var j_num = parseInt(myJson.Products[j].new_cost);
        
        if(value=='2')
        {
	        if(i_num > j_num)
	        {
	            
	            temp = myJson.Products[i];
	            myJson.Products[i] = myJson.Products[j];
	            myJson.Products[j] = temp;
	        }
    	}
    	if(value=='3')
        {
	        if(i_num < j_num)
	        {
	            
	            temp = myJson.Products[i];
	            myJson.Products[i] = myJson.Products[j];
	            myJson.Products[j] = temp;
	        }
    	}

        
    }
    /*****************************************************************/
    Display_Products_GridView(myJson);    
    Display_Products_ListView(myJson);    
  }
};
xmlhttp.open("GET", "json/Product_json.txt", true);
xmlhttp.send();
                                         
} 


function Display_Products_GridView(myJson)
{
	var i=0;
	var item='';
	for (i=0; i< myJson.Products.length; i++)
    {
        item += '<div class="col-sm-6 col-md-6 col-lg-4 col-xl-4">'+
                '<div class="products-single fix">'+
                    '<div class="box-img-hover">'+
                        '<div class="type-lb">'+
                            '<p class="'+ myJson.Products[i].sale_new +'">'+myJson.Products[i].sale_new+'</p>'+
                        '</div>'+
                    '<img src="'+ myJson.Products[i].image_url +'" class="img-fluid" alt="Image">'+
                    '<div class="mask-icon">'+
                        '<ul>'+
                            '<li><a href="shop-detail.html" data-toggle="tooltip" data-placement="right" title="View"><i class="fas fa-eye"></i></a></li>'+
                            '<li><a href="#" data-toggle="tooltip" data-placement="right" title="Compare"><i class="fas fa-sync-alt"></i></a></li>'+
                            '<li><a href="#" data-toggle="tooltip" data-placement="right" title="Add to Wishlist"><i class="far fa-heart"></i></a></li>'+
                        '</ul>'+
                        '<a class="cart" href="#">Add to Cart</a>'+
                    '</div>'+
                    '</div>'+
                    '<div class="why-text cost-cut">'+
                        '<h4>'+myJson.Products[i].Product+'</h4>'+
                        '<h5> <del>&#8377 '+myJson.Products[i].old_cost+'</del> &#8377 '+ myJson.Products[i].new_cost+'</h5>'+
                    '</div>'+
                '</div>'+
            '</div>';
    }                                            
    document.querySelector("#dyn_1").innerHTML = item;
}


function Display_Products_ListView(myJson)
{
	var i=0;
	var item='';
	for (i=0; i< myJson.Products.length; i++)
    {
        item += '<div class="list-view-box">'+
            '<div class="row" >'+                               
                '<div class="col-sm-6 col-md-6 col-lg-4 col-xl-4">'+
                    '<div class="products-single fix">'+
                        '<div class="box-img-hover">'+
                            '<div class="type-lb">'+
                                '<p class="'+myJson.Products[i].sale_new+'">'+myJson.Products[i].sale_new+'</p>'+
                            '</div>'+
                        '<img src="'+myJson.Products[i].image_url+'" class="img-fluid" alt="Image">'+
                        '<div class="mask-icon">'+
                            '<ul>'+
                                '<li><a href="shop-detail.html" data-toggle="tooltip" data-placement="right" title="View"><i class="fas fa-eye"></i></a></li>'+
                                '<li><a href="#" data-toggle="tooltip" data-placement="right" title="Compare"><i class="fas fa-sync-alt"></i></a></li>'+
                                '<li><a href="#" data-toggle="tooltip" data-placement="right" title="Add to Wishlist"><i class="far fa-heart"></i></a></li>'+
                            '</ul>'+
                        '</div>'+
                        '</div>'+
                    '</div>'+
                '</div>'+
                '<div class="col-sm-6 col-md-6 col-lg-8 col-xl-8">'+
                    '<div class="why-text full-width ">'+
                        '<h4 class="text-center">'+myJson.Products[i].Product+'</h4>'+
                        '<h5> <del>&#8377 '+myJson.Products[i].old_cost+'</del> &#8377 '+ myJson.Products[i].new_cost+'</h5>'+
                        '<p>'+myJson.Products[i].small_brief+'</p>'+
                        '<a class="btn hvr-hover" href="#">Add to Cart</a>'+
                        '<a class="btn hvr-hover" href="blog.html">Read Blog</a>'+
                    '</div>'+
                '</div>'+
            '</div>'+
        '</div>';
    }                                            
    document.querySelector("#list-view").innerHTML = item;
}

function Display_Product_Type_TreeView(myJson)
{
	var i=0;
	var j=0;
	var a=0;
	var b=0;
	var item='';
	var counter;
	var TypeCounter;
	var StateProduct = [];
	var StateProductType = [];
	var StateArray = InitializeState();	

	for(i=0; i<StateArray.length; i++)
	{
		/* Finding objects belonging to that specific state*/
		var ObjArray = convertJsonObjectToArray(myJson);
		var StateProduct = SelectObjectsBy_State_Code(ObjArray,i);
		if(StateProduct == null)
			counter =0;
		else
			counter = StateProduct.length;

		/* Displaying specific state in tree view*/
		if(i>0) /* Specific State*/
		{
		item += '<div class="list-group-collapse sub-men">'+
		                '<a class="list-group-item list-group-item-action" href="#sub-men'+
		                i+'" data-toggle="collapse" aria-expanded="true" aria-controls="sub-men'+i+'">'+
		                StateArray[i]+'<small class="text-muted">('+ counter +')</small>'+
					'</a>'+
		                '<div class="collapse " id="sub-men'+i+'" data-parent="#list-group-men">'+ /*show goes after collapse*/
		                    '<div class="list-group">';


		}
		if(i==0) /*All State*/
		{
			item += '<div class="list-group-collapse sub-men" onclick="Filter_Products_By_All_States()">'+
		                '<a class="list-group-item list-group-item-action" href="#sub-men'+
		                i+'" data-toggle="collapse" aria-expanded="true" aria-controls="sub-men'+i+'">'+
		                StateArray[i]+'<small class="text-muted">('+ myJson.Products.length +')</small>'+
					'</a>'+
		                '<div class="collapse " id="sub-men'+i+'" data-parent="#list-group-men">'+ /*show goes after collapse*/
		                    '<div class="list-group">';
		}
		

		/* Finding Unique Product Type from all the objects of the state*/		
	    TypeCounter =0;
	    if(counter > 0)
	    {
	    	for(a=0; a<counter; a++)
	    	{ 
	    		found =0;
	    		for (b=0; b<TypeCounter; b++)
	    		{
	    			if(parseInt(StateProductType[b].Product_Type_Code) == parseInt(StateProduct[a].Product_Type_Code))
	    			{
	    				found =1;
	    				break;
	    			}
	    		}
	    		if(found == 0)
	    		{
	    			StateProductType[TypeCounter] = StateProduct[a];
	    			TypeCounter ++;
	    		}
	   		}
	    } 
	    
	    /* Finding Counter for specific Product Type*/
	    for(a=0; a<TypeCounter; a++)
	    {
	    	var newArray = SelectObjectsBy_Product_Type_Code(StateProduct, StateProductType[a].Product_Type_Code);
	    	if(newArray == null)
	    		StateProductType[a].Product_Number = 0;
	    	else
	    		StateProductType[a].Product_Number = newArray.length;
	    }

	    /* Displaying specific product type of the state along with its counters.*/
	    for(a=0; a<TypeCounter; a++)
	    { 
	    item += '<a href="#" onclick="Filter_Products_By_Product_Type('+StateProductType[a].Product_Type_Code+')" class="list-group-item list-group-item-action">'+ /* active goes in this class*/
	        StateProductType[a].Product_Type+'<small class="text-muted">('+StateProductType[a].Product_Number+')</small></a>';  
	    }      

	    item +='</div></div></div>';    
    }                                 
    document.querySelector("#list-group-men").innerHTML = item;
} 

function Filter_Products_By_All_States()
{
window.display=0;
/*alert("Display status ="+window.display);*/
var xmlhttp = new XMLHttpRequest();
var i;
var j;
var temp;
var myJson;
xmlhttp.onreadystatechange = function() { 
  if (this.readyState == 4 && this.status == 200) {
    myJson = JSON.parse(this.responseText);

    Display_Products_GridView(myJson); 
    Display_Products_ListView(myJson);    
  }
};
xmlhttp.open("GET", "json/Product_json.txt", true);
xmlhttp.send();

}

function Return_Products_By_All_States()
{
window.display=0;
/*alert("Display status ="+window.display);*/
var xmlhttp = new XMLHttpRequest();
var i;
var j;
var temp;
var myJson;
xmlhttp.onreadystatechange = function() { 
  if (this.readyState == 4 && this.status == 200) {
    myJson = JSON.parse(this.responseText);

    console.log("sending Json");
    console.log(myJson);
    return(myJson);  
  }
};
xmlhttp.open("GET", "json/Product_json.txt", true);
xmlhttp.send();

}


function Filter_Products_By_state_code(value)
{
var xmlhttp = new XMLHttpRequest();
var i;
var j;
var temp;
var myJson;

xmlhttp.onreadystatechange = function() { 
  if (this.readyState == 4 && this.status == 200) {
    myJson = JSON.parse(this.responseText);

var myNewJson = {"Products":[] };
var counter =0;
    for(i=0; i<myJson.Products.length; i++)
    {
    	if(parseInt(myJson.Products[i].state_code) == parseInt(value))
    	{
    		myNewJson.Products[counter] = myJson.Products[i];
    		counter++;
    	}
    }
    Display_Products_GridView(myNewJson); 
    Display_Products_ListView(myNewJson);    
  }
};
xmlhttp.open("GET", "json/Product_json.txt", true);
xmlhttp.send();

}


function Filter_Products_By_Product_Type(value)
{
window.display = parseInt(value);
/*alert("Display status ="+window.display);*/

var xmlhttp = new XMLHttpRequest();
var i;
var j;
var temp;
var myJson;
xmlhttp.onreadystatechange = function() { 
  if (this.readyState == 4 && this.status == 200) {
    myJson = JSON.parse(this.responseText);

var myNewJson = {"Products":[] };
var counter =0;
    for(i=0; i<myJson.Products.length; i++)
    {
    	if(parseInt(myJson.Products[i].Product_Type_Code) == parseInt(value))
    	{
    		myNewJson.Products[counter] = myJson.Products[i];
    		counter++;
    	}
    }
    Display_Products_GridView(myNewJson); 
    Display_Products_ListView(myNewJson);    
  }
};
xmlhttp.open("GET", "json/Product_json.txt", true);
xmlhttp.send();

}




function InitializeState()
{
	var StateArray = [];

	StateArray[0]="All States";
	StateArray[1]="Andhra Pradesh";
	StateArray[2]="Arunachal Pradesh";
	StateArray[3]="Assam";
	StateArray[4]="Bihar";
	StateArray[5]="Chattisgarh";
	StateArray[6]="Goa";
	StateArray[7]="Gujarat";
	StateArray[8]="Haryana";
	StateArray[9]="Himachal Pradesh";
	StateArray[10]="Jammu Kashmir";
	StateArray[11]="Jharkhand";
	StateArray[12]="Karnataka";
	StateArray[13]="Kerala";
	StateArray[14]="Madhya Pradesh";
	StateArray[15]="Manipur";
	StateArray[16]="Meghalaya";
	StateArray[17]="Mizoram";
	StateArray[18]="Nagaland";
	StateArray[19]="Odisha";
	StateArray[20]="Punjab";
	StateArray[21]="Rajasthan";
	StateArray[22]="Sikkim";
	StateArray[23]="Tamil Nadu";
	StateArray[24]="Telangana";
	StateArray[25]="Tripura";
	StateArray[26]="Uttar Pradesh";
	StateArray[27]="Uttrakhand";
	StateArray[28]="West Bengal";

	return StateArray;
}

function convertJsonObjectToArray(myJson)
{
	var i;
	var newObjectArray = [];
	var counter;
	for (i=0; i<myJson.Products.length; i++)
	{	
		newObjectArray[i]=myJson.Products[i];
	}

	if(i>0)
		return newObjectArray;
	else
		return null;
}

function SelectObjectsBy_State_Code(myObjectArray,value)
{
	var i;
	var newArray = [];
	var counter =0;
	for (i=0; i<myObjectArray.length; i++)
	{	
		if(parseInt(myObjectArray[i].state_code) == value)
		{
			newArray[counter] = myObjectArray[i];
			counter ++;
		}
	}

	if(counter >0)
		return newArray;
	else
		return null;
}

function SelectObjectsBy_Product_Type_Code(myObjectArray,value)
{
	var i;
	var newArray = [];
	var counter=0;
	for (i=0; i<myObjectArray.length; i++)
	{	
		if(myObjectArray[i].Product_Type_Code == value)
		{
			newArray[counter] = myObjectArray[i];
			counter ++;
		}
	}

	if(counter >0)
		return newArray;
	else
		return null;
}