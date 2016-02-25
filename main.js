Tasks = new Mongo.Collection("tasks");

if (Meteor.isClient){

  Template.body.helpers({
    listNames: [
      { Name: "To Do" },
      { Name: "In Progress" },
      { Name: "QA" },
      { Name: "AT"},
      { Name: "Done" }
    ],
  });

  Template.tasks.helpers({
/*  
    task: [
      { text: "Task 1", listName: "To Do" },
      { text: "Task 2", listName: "In Progress" },
      { text: "Task 3", listName: "QA" },
      { text: "Task 4", listName: "AT" },
      { text: "Task 5", listName: "Done" },
      { text: "Task 6", listName: "QA" },
      { text: "Task 7", listName: "To Do" },
      { text: "Task 8", listName: "In Progress" },
      { text: "Task 9", listName: "AT" }
    ],
*/
    task: function (list) {
      return Tasks.find({"listName":list});
    }, 
  });

  Template.addTask.events({
    "submit #taskForm": function (event) {
       event.preventDefault();

       var text = event.target.text.value;

       Tasks.insert({
         text: text,
         listName: "To Do", // always insert in To Do list
         owner: Meteor.userId(),
         username: Meteor.user().username, 
         createdAt: new Date ()
       });

       event.target.text.value = "";
     }
   });

  Accounts.ui.config({
    passwordSignupFields: "USERNAME_ONLY"
  });
}
