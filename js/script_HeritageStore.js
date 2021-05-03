$(function () { // Same as document.addEventListener("DOMContentLoaded"...


  $('.navbar-collapse a').click(function(){
      $(".navbar-collapse").collapse('hide');
  });

 window.display=0;
 window.global_min_price;
 window.global_max_price;
 window.myJson;
});

$(document).ready(function()
{

    $('#basic').change(function () {
        var selectedValue = $(this).val();        
        Handle_Selectpicker(selectedValue);           
    });

});

/////////////////////// Functions for Selectpicker applications ///////////////////////////////////////////


function Handle_Selectpicker(value)
{
	if(value==0)
		Handle_Nothing();
	if(value==1)
		Handle_Popularity();
	if(value==2)
		Handle_High2Low();
	if(value==3)
		Handle_Low2High();
}

function Handle_Nothing()
{

}

function Handle_Popularity()
{

}

function Handle_High2Low()
{
	var i,j,i_num,j_num;
	var temp;
	var myJson=window.myJson;
	/*************** Sorting Routine ******************************/
    for (i=0; i< myJson.Products.length; i++)
        for (j=0; j< myJson.Products.length; j++)
    {
        var i_num = parseInt(myJson.Products[i].new_cost);
        var j_num = parseInt(myJson.Products[j].new_cost);
               
        if(i_num > j_num)
        {
            
            temp = myJson.Products[i];
            myJson.Products[i] = myJson.Products[j];
            myJson.Products[j] = temp;
        }    	
    	        
    }
    /*****************************************************************/
    window.myJson=myJson;
    Display_Products(myJson);
}

function Handle_Low2High()
{
	var i,j,i_num,j_num;
	var temp;
	var myJson = window.myJson;
	/*************** Sorting Routine ******************************/
    for (i=0; i< myJson.Products.length; i++)
        for (j=0; j< myJson.Products.length; j++)
    {
        var i_num = parseInt(myJson.Products[i].new_cost);
        var j_num = parseInt(myJson.Products[j].new_cost);
           	
        if(i_num < j_num)
        {
            
            temp = myJson.Products[i];
            myJson.Products[i] = myJson.Products[j];
            myJson.Products[j] = temp;
        }
    }
    /*****************************************************************/
    window.myJson=myJson;
    Display_Products(myJson);
}
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


/////////////////////// Functions for displaying view //////////////////////////////////////////////////////////////////////

function Display_Products(myJson)
{
	set_pagination(myJson.Products.length);
    Display_Products_GridView(myJson); 
    Display_Products_ListView(myJson); 
}

function set_pagination(value)
{
	var i;
	var item='';
	var PRODUCTS_PER_PAGE = window.PRODUCTS_PER_PAGE;
	var no_pages = Math.ceil((value/PRODUCTS_PER_PAGE));
	
	item += '<a href="#" id=HeritageStorePaginationPage_First onclick="change_pagination_First()">&laquo;</a>';

	for(i=1; i<=no_pages; i++)
	{
		item += '<a class="" href="#" id=HeritageStorePaginationPage_'+i+' onclick="change_pagination('+i+')">'+i+'</a>';
	}
	item += '<a href="#" id=HeritageStorePaginationPage_Last onclick="change_pagination_Last()">&raquo;</a>';

	document.querySelector("#pagination_1").innerHTML = item;

	make_active_pagination(1);

}

function Display_Products_GridView(myJson)
{
	var i=0;
	var item='';
	var min_price = Number.POSITIVE_INFINITY;
	var max_price = 0;
	var PRODUCTS_PER_PAGE = window.PRODUCTS_PER_PAGE;
	
	var active_page = Find_Active_Page();

	var start = (active_page-1)*PRODUCTS_PER_PAGE;
	var end = active_page*PRODUCTS_PER_PAGE;

	if(myJson.Products.length < end)
		end = myJson.Products.length;

	for (i=start; i< end; i++)
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
    document.querySelector("#list_no").innerHTML = 'Showing all <strong>'+ myJson.Products.length +'</strong> results';
    
}


function Display_Products_ListView(myJson)
{
	var i=0;
	var item='';
	var min_price = Number.POSITIVE_INFINITY;
	var max_price = 0;
	var PRODUCTS_PER_PAGE = window.PRODUCTS_PER_PAGE;
	
	var active_page = Find_Active_Page();

	var start = (active_page-1)*PRODUCTS_PER_PAGE;
	var end = active_page*PRODUCTS_PER_PAGE;

	if(myJson.Products.length < end)
		end = myJson.Products.length;

	for (i=start; i< end; i++)
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
    document.querySelector("#list_no").innerHTML = 'Showing all <strong>'+ myJson.Products.length +'</strong> results'; 
    
}


function make_active_pagination(value)
{
	var i,j;
	var Base_element = document.querySelector("#pagination_1")
	var Base_Children_Count = Base_element.children.length;
	var First_Level_Children = Base_element.children;

	// Making all Items Inactive
	for(i=0; i<Base_Children_Count; i++)
	{		
	var Our_Element = First_Level_Children[i];
	Our_Element.className="";
		
	}

	// Setting value id active
	var id ="#HeritageStorePaginationPage_"+value;
	document.querySelector(id).className = "active";

}


function change_pagination(value)
{
	make_active_pagination(value);
	Display_Products_GridView(window.myJson);
	Display_Products_ListView(window.myJson); 
}

function change_pagination_First()
{
	var First_Page = 1;
	make_active_pagination(First_Page);
	Display_Products_GridView(window.myJson);
	Display_Products_ListView(window.myJson); 
}

function change_pagination_Last()
{
	var Last_Page = Math.ceil((window.myJson.Products.length/window.PRODUCTS_PER_PAGE));
	make_active_pagination(Last_Page);
	Display_Products_GridView(window.myJson);
	Display_Products_ListView(window.myJson); 
}

function Find_Active_Page()
{
	var i,j;
	var Base_element = document.querySelector("#pagination_1")
	var Base_Children_Count = Base_element.children.length;
	var First_Level_Children = Base_element.children;

	// Searching Active Page
	for(i=0; i<Base_Children_Count; i++)
	{		
	var Our_Element = First_Level_Children[i];

	if(Our_Element.classList.contains('active') == true)
		{
			return(i);
		} 
	}
	return(1);
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////



/////////////////////// Functions for Tree View of States and Products Types ////////////////////////////////////////////
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
	    item += '<a href="#" id="sub-men-child'+StateProductType[a].Product_Type_Code+'" class="list-group-item list-group-item-action" onclick="Filter_Products_By_Product_Type('+StateProductType[a].Product_Type_Code+')">'+ /* active goes in this class*/
	        StateProductType[a].Product_Type+'<small class="text-muted">('+StateProductType[a].Product_Number+')</small></a>';  
	    }      

	    item +='</div></div></div>';    
    }                                 
    document.querySelector("#list-group-men").innerHTML = item;
    
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

function Filter_Products_By_All_States()
{
	window.display=0;
	Category_Tree_Traverser_Make_Inactive();
	var xmlhttp = new XMLHttpRequest();
	var i;
	var j;
	var temp;
	var myJson;
	xmlhttp.onreadystatechange = function() { 
	  if (this.readyState == 4 && this.status == 200) {
	    myJson = JSON.parse(this.responseText);

	    window.myJson = myJson;
	    Display_Products(myJson);     
	  }
	};
	xmlhttp.open("GET", "json/Product_json.txt", true);
	xmlhttp.send();

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

function Filter_Products_By_Product_Type(value)
{
	var i;
	var j;
	var temp;
	var myJson;
	window.display = parseInt(value);
	var xmlhttp = new XMLHttpRequest();

	Category_Tree_Traverser_Make_Inactive();

	var element_id = "#sub-men-child"+value;
	document.querySelector(element_id).className = "list-group-item list-group-item-action active";


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

	    window.myJson = myNewJson;
	    Display_Products(myNewJson);    
	  }
	};
	xmlhttp.open("GET", "json/Product_json.txt", true);
	xmlhttp.send();
}

function Category_Tree_Traverser_Make_Inactive()
{
	var i,j;
	var Base_element = document.querySelector("#list-group-men")
	var Base_Children_Count = Base_element.children.length;
	var First_Level_Children = Base_element.children;
	for(i=0; i<Base_Children_Count; i++)
	{
		
		var Second_Level_Children = First_Level_Children[i].children;

		var Third_Level_Children = Second_Level_Children[1].children;

		var Fourth_Level_Children = Third_Level_Children[0].children;

		
		if(Fourth_Level_Children[0] != undefined)
		{
			var Our_Element = Fourth_Level_Children[0];

			var id='#'+Our_Element.id;

			if(document.querySelector(id).classList.contains('active') == true)
			{
				document.querySelector(id).className = "list-group-item list-group-item-action"; 
			} 
			

			
		}
				
	}
	
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


/////////////////////// Functions for Cost Filter application over selected view ///////////////////////////////////////////

function filter_low2high()
{
	var high_value = document.getElementById("slider-range-new").value;
	var options = document.getElementById("basic").value;
	var Product_Type_Id = String(Category_Tree_Traverser_Find_Active_Id());

	var Selected_Product_type_Code = Product_Type_Id.slice(14);
	var xmlhttp = new XMLHttpRequest();
	var i;
	var j;
	var temp;
	var myJson;
	xmlhttp.onreadystatechange = function() { 
	  if (this.readyState == 4 && this.status == 200) {
	    myJson = JSON.parse(this.responseText);

	    /************************CATEGORY WISE FILTER **********************************************/
	    if(parseInt(Product_Type_Id) != 0)
	    {
		    var myNewJson = {"Products":[] };
			var counter =0;
			    for(i=0; i<myJson.Products.length; i++)
			    {
			    	if(parseInt(myJson.Products[i].Product_Type_Code) == parseInt(Selected_Product_type_Code))
			    	{
			    		myNewJson.Products[counter] = myJson.Products[i];
			    		counter++;
			    	}
			    }
			myJson = myNewJson;
		}		    

		/******************************************************************************/

		/************************COST WISE FILTER **********************************************/
	    
	    var mySecondJson = {"Products":[] };
		var counter =0;
		    for(i=0; i<myJson.Products.length; i++)
		    {
		    	if(parseInt(myJson.Products[i].new_cost) <= parseInt(high_value))
		    	{
		    		mySecondJson.Products[counter] = myJson.Products[i];
		    		counter++;
		    	}
		    }
		myJson = mySecondJson;
				    

		/******************************************************************************/
		/*************** Sorting Routine ******************************/
	    for (i=0; i< myJson.Products.length; i++)
	        for (j=0; j< myJson.Products.length; j++)
		    {
		        var i_num = parseInt(myJson.Products[i].new_cost);
		        var j_num = parseInt(myJson.Products[j].new_cost);
		        
		        if(parseInt(options)=='2')
		        {
			        if(i_num > j_num)
			        {
			            
			            temp = myJson.Products[i];
			            myJson.Products[i] = myJson.Products[j];
			            myJson.Products[j] = temp;
			        }
		    	}
		    	if(parseInt(options)=='3')
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
		window.myJson = myJson;
		set_pagination(myJson.Products.length);    
	    Display_Products_GridView(myJson); 
	    Display_Products_ListView(myJson); 
	  }
	};
	xmlhttp.open("GET", "json/Product_json.txt", true);
	xmlhttp.send();


}


function filter_high2low()
{
	var low_value = document.getElementById("slider-range-new").value;
	var options = document.getElementById("basic").value;
	var Product_Type_Id = String(Category_Tree_Traverser_Find_Active_Id());

	var Selected_Product_type_Code = Product_Type_Id.slice(14);
	var xmlhttp = new XMLHttpRequest();
	var i;
	var j;
	var temp;
	var myJson;
	xmlhttp.onreadystatechange = function() { 
	  if (this.readyState == 4 && this.status == 200) {
	    myJson = JSON.parse(this.responseText);

	    /************************CATEGORY WISE FILTER **********************************************/
	    if(parseInt(Product_Type_Id) != 0)
	    {
		    var myNewJson = {"Products":[] };
			var counter =0;
			    for(i=0; i<myJson.Products.length; i++)
			    {
			    	if(parseInt(myJson.Products[i].Product_Type_Code) == parseInt(Selected_Product_type_Code))
			    	{
			    		myNewJson.Products[counter] = myJson.Products[i];
			    		counter++;
			    	}
			    }
			myJson = myNewJson;
		}		    

		/******************************************************************************/

		/************************COST WISE FILTER **********************************************/
	    
	    var mySecondJson = {"Products":[] };
		var counter =0;
		    for(i=0; i<myJson.Products.length; i++)
		    {
		    	if(parseInt(myJson.Products[i].new_cost) >= parseInt(low_value))
		    	{
		    		mySecondJson.Products[counter] = myJson.Products[i];
		    		counter++;
		    	}
		    }
		myJson = mySecondJson;
				    

		/******************************************************************************/
		/*************** Sorting Routine ******************************/
	    for (i=0; i< myJson.Products.length; i++)
	        for (j=0; j< myJson.Products.length; j++)
		    {
		        var i_num = parseInt(myJson.Products[i].new_cost);
		        var j_num = parseInt(myJson.Products[j].new_cost);
		        
		        if(parseInt(options)=='2')
		        {
			        if(i_num > j_num)
			        {
			            
			            temp = myJson.Products[i];
			            myJson.Products[i] = myJson.Products[j];
			            myJson.Products[j] = temp;
			        }
		    	}
		    	if(parseInt(options)=='3')
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
		window.myJson = myJson;
		set_pagination(myJson.Products.length);    
	    Display_Products_GridView(myJson); 
	    Display_Products_ListView(myJson);  
	  }
	};
	xmlhttp.open("GET", "json/Product_json.txt", true);
	xmlhttp.send();


}

function Category_Tree_Traverser_Find_Active_Id()
{
	var i,j;
	var id=0;
	var Base_element = document.querySelector("#list-group-men")
	var Base_Children_Count = Base_element.children.length;
	var First_Level_Children = Base_element.children;
	for(i=0; i<Base_Children_Count; i++)
	{
		
		var Second_Level_Children = First_Level_Children[i].children;

		var Third_Level_Children = Second_Level_Children[1].children;

		var Fourth_Level_Children = Third_Level_Children[0].children;

		
		if(Fourth_Level_Children[0] != undefined)
		{
			var Our_Element = Fourth_Level_Children[0];

			var elem_id='#'+Our_Element.id;

			if(document.querySelector(elem_id).classList.contains('active') == true)
			{
				id=elem_id;
			}
		}
				
	}
	return(id);
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/////////////////////// Functions for Searching Products Name in the view  ////////////////////////////////////////////


function search_product()
{
	var search_value = String(document.getElementById("search_bar").value).toLowerCase();
	var xmlhttp = new XMLHttpRequest();
	var i;
	var myJson;
	xmlhttp.onreadystatechange = function() { 
	  if (this.readyState == 4 && this.status == 200) {
	    myJson = JSON.parse(this.responseText);

	    
		///////////////////////////////////// PRODUCT NAME WISE FILTER /////////////////////////////////////////////////
	    
	    var mySecondJson = {"Products":[] };
		var counter =0;
		    for(i=0; i<myJson.Products.length; i++)
		    {
		    	var prod_string= String(myJson.Products[i].Product).toLowerCase();
		    	if(prod_string.search(search_value) != -1) 
		    	{
		    		mySecondJson.Products[counter] = myJson.Products[i];
		    		counter++;
		    	}
		    }
		myJson = mySecondJson;
				    

		///////////////////////////////////////////////////////////////////////////////////////////////////////////////
		window.myJson = myJson;
		Display_Products(myJson);		
	  }
	};
	xmlhttp.open("GET", "json/Product_json.txt", true);
	xmlhttp.send();

}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


