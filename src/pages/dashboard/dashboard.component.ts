import { Component, OnInit } from '@angular/core';

declare let google;

@Component({
  selector: 'dashboard-component',
  templateUrl: 'dashboard.component.html'
})

export class DashboardComponent implements OnInit {

  public title: string = "Dashboard";

  constructor() {
  }

  public yearwiseData = [
   ['Month', 'Marketing', 'Academic', 'Visits', 'Training', 'Affiliation', 'Vendor Support'],
   ['Jan', 80,70,20,60,15,90],
   ['Feb', 80,70,23,10,85,20],
   ['March', 80,70,80,20,25,50],
   ['April', 80,70,60,30,95,80],
   ['May', 80,70,90,40,45,30],
   ['June', 80,70,70,50,95,70],
   ['July', 80,70,60,60,25,10],
   ['Aug', 80,70,50,70,65,80],
   ['Sept', 80,70,40,80,35,30],
   ['Oct', 80,70,10,90,55,70],
   ['Nov', 80,70,20,60,15,30],
   ['Dec', 80,70,30,60,25,10]
 ];
 public yearWiseOptions ={
     title: "Request-Category Report",
     titleTextStyle : {
fontName : 'sans-serif',
fontSize : 14,
bold : true,
},
     hAxis:{
             title: "Time line",
titleTextStyle : {fontName : 'sans-serif',fontSize : 18,bold : true,italic:false,color:'red'},
textStyle : {fontName : 'sans-serif',fontSize : 18},
},
vAxis:{
titleTextStyle : {fontName : 'sans-serif',fontSize : 18,bold : true,italic:false,color:'red'},
textStyle : {fontName : 'sans-serif',fontSize : 18},
}
   }

 public categorywiseData = [
   ['Category','New', 'Assigned', 'InProgress', 'Reopen'],
   ['Marketing',80,70,20,60],
   ['Academic',80,70,23,10],
   ['Visits',80,70,80,20],
   ['Training',80,70,60,30],
   ['Affiliation',90,40,45,30],
   ['Vendor Support',60,50,95,70]
 ];

 public categorywiseOptions = {
    title: "Open Requests Categorywise",
    titleTextStyle : {
      fontName : 'sans-serif',
      fontSize : 14,
      bold : true,
    },
      colors: ['#4CAF50', '#2196f3', '#FFEB3B', '#F48FB1', '#EF5350', '#9C27B0'],
      isStacked: 'true',
      chartArea: { width: '50%' },
  };

 public franchisewiseData = [
   ['Franchise','Marketing', 'Academic', 'Visits', 'Training', 'Affiliation', 'Vendor Support'],
   ['Delhi', 89,10,20,60,15,90],
   ['Panipat', 67,20,23,10,85,20],
   ['Rohtak', 45,30,80,20,25,50],
   ['Surat', 60,40,60,30,95,80],
   ['Bhopal', 30,50,90,40,45,30],
   ['Rohini', 25,60,70,50,95,70],
   ['Gurgaon', 90,70,60,60,25,10],
   ['Tikri', 50,80,50,70,65,80],
   ['Noida', 60,20,40,80,35,30],
   ['Indore', 80,10,10,90,55,70],
   ['Lucknow', 90,100,20,60,15,30],
   ['Vasant Kunj', 20,70,30,60,25,10]
 ];

 public franchisewiseOptions = {
     title: "Open Requests Franchisewise",
     titleTextStyle : {
fontName : 'sans-serif',
fontSize : 14,
bold : true,
},
     colors: ['#4CAF50', '#2196f3', '#FFEB3B', '#F48FB1', '#EF5350', '#9C27B0'],
     isStacked: 'true',
     chartArea: { width: '50%' },
   };

 public statuswiseData = [
   ['Category','Request'],
   ['Marketing',80],
   ['Academic',65],
   ['Visits',84],
   ['Training',24],
   ['Affiliation',98],
   ['Vendor Support',52]
 ];

 public statuswiseOptions = {
     title: "Requests Past Due Date",
     titleTextStyle : {
fontName : 'sans-serif',
fontSize : 14,
bold : true,
},
     colors: ['#4CAF50', '#2196f3', '#FFEB3B', '#F48FB1', '#EF5350', '#9C27B0'],
     chartArea: { width: '50%' },
     is3D: true
   };

 public unresolvedRequestData = [
   ['Category','Request'],
   ['Marketing',10],
   ['Academic',25],
   ['Visits',48],
   ['Training',78],
   ['Affiliation',89],
   ['Vendor Support',35]
 ];

 public unresolvedRequestOptions = {
     title: "Unresolved Requests",
     titleTextStyle : {
fontName : 'sans-serif',
fontSize : 14,
bold : true,
},
     colors: ['#4CAF50', '#2196f3', '#FFEB3B', '#F48FB1', '#EF5350', '#9C27B0'],
     chartArea: { width: '50%' },
     is3D: true
   };

 public weeklyData = [
   ['Category','1 Week', '2 Week', '3 Week', '4 Week', '>4 Week'],
   ['Marketing',80,70,20,60,15],
   ['Academic',90,70,23,10,25],
   ['Visits',10,70,80,20,35],
   ['Training',20,70,60,30,45],
   ['Affiliation',90,40,45,30,55],
   ['Vendor Support',60,50,95,70,65]
 ];

 public weeklyOptions = {
     title: "Request Closed Past Due Date",
     titleTextStyle : {
fontName : 'sans-serif',
fontSize : 14,
bold : true,
},
     colors: ['#4CAF50', '#2196f3', '#FFEB3B', '#F48FB1', '#EF5350', '#9C27B0'],
     isStacked: 'true',
     chartArea: { width: '50%' },
   }; 

  ngOnInit() {
  }

}
