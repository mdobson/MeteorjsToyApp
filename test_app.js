Messages = new Meteor.Collection("messages");

if (Meteor.is_client) {
  Template.hello.greeting = function () {
    return "Welcome to test_app.";
  };

  Template.hello.events = {
    'click input.btn' : function () {
      // template data, if any, is available in 'this'
      var test = document.getElementById("test");
      Messages.insert({value: test.value, score:0});
    }
  };

  Template.dataentry.content = function(){
    return "Content Area";
  };

  Template.dataentry.listofstuff = function(){
    return Messages.find({},{sort:{score:-1}});
  };

  Template.item.events = {
    'click .up' : function(){
      Messages.update({_id:this._id}, {$inc: {score:1}});
    },
    'click .down' : function(){
      Messages.update({_id:this._id}, {$inc: {score:-1}});
      Messages.remove({score: {$lt:0}});
    }

  };
}

if (Meteor.is_server) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}