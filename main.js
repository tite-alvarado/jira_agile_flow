Tasks = new Mongo.Collection("tasks");

if (Meteor.isClient){

  Template.body.helpers({
    listNames: [
      { Name: "To Do" },
      { Name: "In Progress" },
      { Name: "QA" },
      { Name: "AT" },
      { Name: "Done" }
    ]
  });

  Template.article.helpers({
    articles: [
      { title: "Welcome", paragraph: "Welcome to the jira workflow helper app. Signup/Signin in order to create new tasks." },
      { title: "Introduction", paragraph: "Jira workflow app helps you keep track of your tasks and states by providing a flexible categories list, the ability of creating new tasks and moving them between the states until they are finally in the Done list." },
      { title: "Support", paragraph: "Please contact sysadmin if you need help." }
    ]
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
      return Tasks.find({"listName":list, "owner":Meteor.userId()});
    }
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

  Tracker.autorun(
    function(){      
      var Todo = document.getElementById("To Do");
      Sortable.create(Todo, { group: "T" });
      var InProgress = document.getElementById("In Progress");
      Sortable.create(InProgress, { group: "T" });
      var QA = document.getElementById("QA");
      Sortable.create(QA, { group: "T" });
      var AT = document.getElementById("AT");
      Sortable.create(AT, { group: "T" });
      var Done = document.getElementById("Done");
      Sortable.create(Done, { group: "T" });
    }
  );

/*
      var Todo = document.getElementById("To Do");
      Sortable.create(Todo, { group: "T" });
      var InProgress = document.getElementById("In Progress");
      Sortable.create(InProgress, { group: "T" });
      var QA = document.getElementById("QA");
      Sortable.create(QA, { group: "T" });
      var AT = document.getElementById("AT");
      Sortable.create(AT, { group: "T" });
      var Done = document.getElementById("Done");
      Sortable.create(Done, { group: "T" });
*/

}
