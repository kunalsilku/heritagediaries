$(function () { // Same as document.addEventListener("DOMContentLoaded"...


  $('.navbar-collapse a').click(function(){
      $(".navbar-collapse").collapse('hide');
  });

});


(function (global) {

var dc = {};

var homeHtml = "snippets/HomeSnippet.html";
var projectsHtml = "snippets/ProjectsSnippet.html";
var aboutHtml = "snippets/AboutSnippet.html";
var awardsHtml = "snippets/AwardsSnippet.html";


// Convenience function for inserting innerHTML for 'select'
var insertHtml = function (selector, html) {
  var targetElem = document.querySelector(selector);
  targetElem.innerHTML = html;
};

// Show loading icon inside element identified by 'selector'.
var showLoading = function (selector) {
  var html = "<div class='text-center'>";
  html += "<img src='images/loading.gif'></div>";
  insertHtml(selector, html);
};

/*
// Remove the class 'active' from home/About/Awards and switch to Projects button
var switchProjectsToActive = function () {
  // Remove 'active' from home button
  var classes = document.querySelector("#navHomeButton").className;
  classes = classes.replace(new RegExp("active", "g"), "");
  document.querySelector("#navHomeButton").className = classes;

  // Remove 'active' from About button
  classes = document.querySelector("#navAboutButton").className;
  classes = classes.replace(new RegExp("active", "g"), "");
  document.querySelector("#navAboutButton").className = classes;

  // Remove 'active' from Awards button
  classes = document.querySelector("#navAwardsButton").className;
  classes = classes.replace(new RegExp("active", "g"), "");
  document.querySelector("#navAwardsButton").className = classes;

  // Add 'active' to Projects button if not already there
  classes = document.querySelector("#navProjectsButton").className;
  if (classes.indexOf("active") == -1) {
    classes += " active";
    document.querySelector("#navProjectsButton").className = classes;
  }
};


  // Remove the class 'active' from home/Projects/Awards and switch to About button
var switchAboutToActive = function () {
  // Remove 'active' from home button
  var classes = document.querySelector("#navHomeButton").className;
  classes = classes.replace(new RegExp("active", "g"), "");
  document.querySelector("#navHomeButton").className = classes;

  // Remove 'active' from Projects button
  classes = document.querySelector("#navProjectsButton").className;
  classes = classes.replace(new RegExp("active", "g"), "");
  document.querySelector("#navProjectsButton").className = classes;

  // Remove 'active' from Awards button
  classes = document.querySelector("#navAwardsButton").className;
  classes = classes.replace(new RegExp("active", "g"), "");
  document.querySelector("#navAwardsButton").className = classes;

  // Add 'active' to About button if not already there
  classes = document.querySelector("#navAboutButton").className;
  if (classes.indexOf("active") == -1) {
    classes += " active";
    document.querySelector("#navAboutButton").className = classes;
  }
};


  // Remove the class 'active' from home/Projects/About and switch to Awards button
var switchAwardsToActive = function () {
  // Remove 'active' from home button
  var classes = document.querySelector("#navHomeButton").className;
  classes = classes.replace(new RegExp("active", "g"), "");
  document.querySelector("#navHomeButton").className = classes;

  // Remove 'active' from Projects button
  classes = document.querySelector("#navProjectsButton").className;
  classes = classes.replace(new RegExp("active", "g"), "");
  document.querySelector("#navProjectsButton").className = classes;

  // Remove 'active' from About button
  classes = document.querySelector("#navAboutButton").className;
  classes = classes.replace(new RegExp("active", "g"), "");
  document.querySelector("#navAboutButton").className = classes;

  // Add 'active' to Awards button if not already there
  classes = document.querySelector("#navAwardsButton").className;
  if (classes.indexOf("active") == -1) {
    classes += " active";
    document.querySelector("#navAwardsButton").className = classes;
  }
};

*/

/*
// On page load (before images or CSS)
document.addEventListener("DOMContentLoaded", function (event) {

// On first load, show home view
showLoading("#dynamic-content-1");
$ajaxUtils.sendGetRequest(
  homeHtml,
  function (responseText) {
  	
    document.querySelector("#dynamic-content")
      .innerHTML = responseText;
      
  },
  false);
});

*/
var myJson;
document.addEventListener("DOMContentLoaded", function (event) {

// On first load, show home view
alert("hello");
var xmlhttp = new XMLHttpRequest();
var i;
var item='';
xmlhttp.onreadystatechange = function() {
  if (this.readyState == 4 && this.status == 200) {
  	console.log("down")
    myJson = JSON.parse(this.responseText);
    console.log(myJson);
    global.$gJson = myJson;
    console.log("up");
}}

xmlhttp.open("GET", "Product_json.txt", true);
xmlhttp.send();

});

/*
// Load the Projects view
dc.loadProjectsView = function () {
switchProjectsToActive();
showLoading("#dynamic-content");
$ajaxUtils.sendGetRequest(
  projectsHtml,
  function (responseText) {
    document.querySelector("#dynamic-content")
      .innerHTML = responseText;
  },
  false);
};


// Load the About view
dc.loadAboutView = function () {
switchAboutToActive();
showLoading("#dynamic-content");
$ajaxUtils.sendGetRequest(
  aboutHtml,
  function (responseText) {
    document.querySelector("#dynamic-content")
      .innerHTML = responseText;
  },
  false);
};


// Load the Awards view
dc.loadAwardsView = function () {
switchAwardsToActive();
showLoading("#dynamic-content"); 
$ajaxUtils.sendGetRequest(
  awardsHtml,
  function (responseText) {
    document.querySelector("#dynamic-content")
      .innerHTML = responseText;
  },
  false);
};
  
*/

global.$dc = dc;
console.log("hello");
console.log(global.$gJson);

})(window);