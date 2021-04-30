$(function () { // Same as document.addEventListener("DOMContentLoaded"...


  $('.navbar-collapse a').click(function(){
      $(".navbar-collapse").collapse('hide');
  });

});

$(document).ready(function()
{
    $('#basic').change(function () {
        /*var selectedText = $(this).find("option:selected").text();*/
        var selectedValue = $(this).val();

        Sort_Products_GridView(selectedValue);
        Sort_Products_ListView(selectedValue);

            
    });
});

function Sort_Products_GridView(value)
{
	
/*alert("running grid view");*/
var xmlhttp = new XMLHttpRequest();
var i;
var j;
var temp;
var item_2='';
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

    for (i=0; i< myJson.Products.length; i++)
    {
        item_2 += '<div class="col-sm-6 col-md-6 col-lg-4 col-xl-4">'+
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
    document.querySelector("#dyn_1").innerHTML = item_2;
  }
};
xmlhttp.open("GET", "json/Product_json.txt", true);
xmlhttp.send();
                                         
} 


function Sort_Products_ListView(value)
{
var xmlhttp = new XMLHttpRequest();
var i;
var j;
var temp;
var item='';
xmlhttp.onreadystatechange = function() {
  if (this.readyState == 4 && this.status == 200) {
    var myJson = JSON.parse(this.responseText);

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
};
xmlhttp.open("GET", "json/Product_json.txt", true);
xmlhttp.send();   
}