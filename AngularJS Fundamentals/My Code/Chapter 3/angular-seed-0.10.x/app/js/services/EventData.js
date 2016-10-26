/**
 * Created by Alison on 22/08/2014.
 */

// returns a service with name eventData
eventsApp.factory('eventData', function(){
     return{
         event:{
             name:"Angular Boot Camp",
             date:"1/1/2014",
             time: "10:30 am",
             location: {
                 address: "Dar Il Bahar",
                 city: "San Lawrenz",
                 province: "Malta"
             },
             imageURL: "img/angularjs-logo.png" ,
             sessions:[
                 {
                     name: 'Scopes for fun and profit',
                     creatorName: 'John Doe',
                     duration: 2,
                     level: 'Introductory',
                     abstract: 'This session will take a closer look at scopes.  Learn what they do, how they do it, and how to get them to do it for you.',
                     upVoteCount: 0
                 },
                 {
                     name: 'Directives Masterclass',
                     creatorName: 'Bob Smith',
                     duration: 1,
                     level: 'Advanced',
                     abstract: 'In this session you will learn the ins and outs of directives!',
                     upVoteCount: 0
                 },
                 {
                     name: 'Well Behaved Controllers',
                     creatorName: 'Jane Doe',
                     duration: 4,
                     level: 'Intermediate',
                     abstract: 'Controllers are the beginning of everything Angular does.  Learn how to craft controllers that will win the respect of your friends and neighbors.',
                     upVoteCount: 0
                 }
             ]
         }

     };
})  ;