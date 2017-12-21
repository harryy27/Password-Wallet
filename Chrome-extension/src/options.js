jQuery(function($){
  var page = $('#options-page');
  var newQuery = page.find('.new');
  var tpl = page.find('.template');
  tpl.hide();
  var id = 0;

  function createQuery(id){
    if ($('#row-' + id).length > 0){
      return $('#row-' + id);
    }
    var c = tpl.clone();
    c.removeClass('template');
    tpl.parent().append(c);
    c.show();
    c.attr('id', 'row-' + id);
    c.find('.url').attr('name', 'url-' + id);
    c.find('.query').attr('name', 'query-' + id);
    c.find('.value').attr('name', 'value-' + id);

    c.find('.remove').click(function(){
      c.remove();
      var id = c.attr('id').replace(/row-/, '');
      localStorage.removeItem('url-' + id);
      localStorage.removeItem('query-' + id);
      localStorage.removeItem('value-' + id);
    });
    return c;
  }
  newQuery.click(function(){
    createQuery(++id);
    return false;
  });

  page.find('input[type=checkbox]').each(function(){
    var key = $(this).attr('name');
    localStorage[key] = localStorage[key] || '';
    if (localStorage[key]){
      $(this).attr('checked', 'checked');
    }
    $(this).change(function(){
      if ($(this).attr('checked')){
        localStorage[key] = 'checked';
      }else{
        localStorage[key] = '';
      }
    });
  });

  page.find('input[type=text]').live('keyup', function(){
    var key = $(this).attr('name');
    localStorage[key] = $(this).val();
  });

  for (var k in localStorage){
    if (k.match(/^(query|url|value)-(\d+)/)){
      var type = RegExp.$1;
      var id = RegExp.$2;
      var c = createQuery(id);
      c.find('.' + type).val(localStorage[k]);
    }
  };







  var config = {
    apiKey: "AIzaSyBc7zeNZjvJTBirL0km3zkvBIDXjGOzSYk",
    authDomain: "password-wallet-aut017.firebaseapp.com",
    databaseURL: "https://password-wallet-aut017.firebaseio.com",
    projectId: "password-wallet-aut017",
    storageBucket: "password-wallet-aut017.appspot.com",
    messagingSenderId: "15909908096"
  };
  firebase.initializeApp(config);
  function toggleSignIn() {

      var email = document.getElementById('email').value;
      var password = document.getElementById('password').value;
      if (email.length < 4) {
        alert('Please enter a valid email address.');
        return;
      }

      // Sign in with email and pass.
      // [START authwithemail]
      firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // [START_EXCLUDE]
        if (errorCode === 'auth/wrong-password') {
          alert('Wrong password.');
        } else {
          alert(errorMessage);
        }
        console.log(error);
        document.getElementById('quickstart-sign-in').disabled = false;
        // [END_EXCLUDE]
      });
      // [END authwithemail]


      firebase.auth().onAuthStateChanged(user =>{
       if(user)
       {
       console.log("logged-in");
       document.getElementById("login-form").style.display = 'none';
       document.getElementById("login-message").style.display = 'block';
       document.getElementById("logout").style.display = 'block';
      }
       else {
         console.log("not logged in");
         document.getElementById("login-form").style.display = 'block';
         document.getElementById("login-message").style.display = 'none';
         document.getElementById("logout").style.display = 'none';
       }
      });

  }
  function handleLogOut() {
    var n = 0;
    while(n<=id)
    {
      console.log(n);
      var c = createQuery(n);

    //  c.find('input').trigger('keyup');
    c.remove();
    c.attr('id').replace(/row-/, '');
    localStorage.removeItem('url-' + n);
    localStorage.removeItem('query-' + n);
    localStorage.removeItem('value-' + n);
    n++;
    }

    firebase.auth().signOut();



    firebase.auth().onAuthStateChanged(user =>{
     if(user)
     {
     console.log("logged-in");
     document.getElementById("login-form").style.display = 'none';
     document.getElementById("login-message").style.display = 'block';
     document.getElementById("logout").style.display = 'block';
    }
     else {
       console.log("not logged in");
       document.getElementById("login-form").style.display = 'block';
       document.getElementById("login-message").style.display = 'none';
       document.getElementById("logout").style.display = 'none';


     }
    });


  }

  function displayDetails()
  {

  //   var user = firebase.auth().currentUser;
  var usrId;

  firebase.auth().onAuthStateChanged(function(user) {
  usrId = user.uid;
  console.log(usrId);

  var userDataRef = firebase.database().ref("Users/" + usrId + "/data").orderByKey();

  userDataRef.once("value",function(snapshot) {

  snapshot.forEach(function(childSnapshot) {

   var key = childSnapshot.key;
   var childData = childSnapshot.val();

   var password_val = childSnapshot.val().password;
   var url_val = childSnapshot.val().url;
   var username_val = childSnapshot.val().username;
  console.log("yess");
  //var  password_val = "fuckme";
  //  var  url_val = "codechef.com";
  // var username_val = "danidaniels";

  //$("#data").append("<tr class='template'><td><input type='text' name='' value='" + url_val + "' class='url'/></td><td><input type='text' name='' value='input[type=text]' class='query' /></td><td><input type='text' name='' value='" + username_val + "' class='value' /></td><td><a href='#' class='remove'>×</a></td><tr>");
  //$("#data").append("<tr class='template'><td><input type='text' name='' value='" + url_val + "' class='url'/></td><td><input type='text' name='' value='input[type=name]' class='query' /></td><td><input type='text' name='' value='" + username_val + "' class='value' /></td><td><a href='#' class='remove'>×</a></td><tr>");
  //  $("#data").append("<tr class='template'><td><input type='text' name='' value='" + url_val + "' class='url'/></td><td><input type='text' name='' value='input[type=password]' class='query' /></td><td><input type='text' name='' value='" + password_val + "' class='value' /></td><td><a href='#' class='remove'>×</a></td><tr>");


  var c = createQuery(++id);
  c.find('.url').val(url_val);
  c.find('.query').val('input[type=text]');
  c.find('.value').val(username_val);
  c.find('input').trigger('keyup');

  c = createQuery(++id);
  c.find('.url').val(url_val);
  c.find('.query').val('input[type=email]');
  c.find('.value').val(username_val);
  c.find('input').trigger('keyup');

  c = createQuery(++id);
  c.find('.url').val(url_val);
  c.find('.query').val('input[type=name]');
  c.find('.value').val(username_val);
  c.find('input').trigger('keyup');

  c = createQuery(++id);
  c.find('.url').val(url_val);
  c.find('.query').val('input[type=password]');
  c.find('.value').val(password_val);
  c.find('input').trigger('keyup');


   });
  });
  });


  }

  function initApp(){
  document.getElementById('quickstart-sign-in').addEventListener('click', toggleSignIn, false);
  document.getElementById('logout').addEventListener('click', handleLogOut, false);
  }
  window.onload = function() {
    console.log("hi");
  initApp();


  console.log("hiii");
  firebase.auth().onAuthStateChanged(user =>{
   if(user)
   {
   console.log("logged-in");
   document.getElementById("login-form").style.display = 'none';
   document.getElementById("login-message").style.display = 'block';
   document.getElementById("logout").style.display = 'block';
   displayDetails(user);
  }
   else {
     console.log("not logged in");
     document.getElementById("login-form").style.display = 'block';
     document.getElementById("login-message").style.display = 'none';
     document.getElementById("logout").style.display = 'none';
   }
  });
  };





});
