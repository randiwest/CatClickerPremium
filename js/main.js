$(function(){
  
  var model = {

    //archetypal Cat object
    Cat: function(name, img) {
      this.name = name;
      this.img = img;
      this.count = 0;
      model.cats.push(this);
    },
    init: function() {
      this.kitty = new model.Cat("Kitty", "images/cat1.jpg");
      this.tweety = new model.Cat("Tweety", "images/cat2.jpg");
      this.meow = new model.Cat("Meow", "images/cat3.jpg");
      this.sylvestor = new model.Cat("Sylvestor", "images/cat4.jpg");
      this.puddy = new model.Cat("Puddy", "images/cat5.jpg");
    },
    cats: [],
    currentCat: this.kitty
  };

  //list view
  var listView = {
    init: function() {
      this.catList = $('#catList');
      var htmlStr = '',
      cats = octopus.getCats();
      for (var i = 0; i < cats.length; i++) {
        htmlStr += '<li id="' + i + '">' + cats[i].name + '</li>';
      }
      this.catList.html(htmlStr);
    }
  };

  //cat view
  var catView = {
    init: function(cat) {
      this.chosenCat = $('#chosenCat');
      var htmlStr = '<h2>' + cat.name + '</h2>' +
      '<h3 id="' + cat.name + '">Count ' + cat.count + '</h3>' +
      '<img id="' + cat.name + 'img" src=' + cat.img + '>';
      this.chosenCat.html(htmlStr);
      this.catImg = $('#' + cat.name + 'img' );
      this.catImg.click(function () {
        octopus.clickCat(cat);
      });
    },
    updateCount: function(cat) {
      this.catImg = $('#' + cat.name );
      htmlStr = '<h3 id="' + cat.name + '">Count ' + cat.count + '</h3>';
      this.catImg.replaceWith(htmlStr);
    }
  };

  //admin
  var admin = {
    init: function() {
      this.button = $('#adminButton');
      $('#admin').hide();
      this.button.click(function () {
        admin.toggle();
      });
    },
    toggle: function() {
      $('#admin').toggle();
    },
    renderCatAdmin: function(cat) {
      this.admin = $('#admin');
      htmlStr = 'Cat Name: <input type="text" id = "adminCatName" value="' + cat.name + '"></input>' +
      'Url: <input type="text" id = "adminCatImg" value="' + cat.img + '"></input>' +
      'Number of Clicks: <input type="number" id = "adminCatCount" value="' + cat.count + '"></input>' +
      '<button type="button" id="adminCancel">Cancel</button>' + 
      '<button type="button" id="adminSave">Save</button>';
      this.admin.html(htmlStr);

      this.cancel = $('#adminCancel');
      this.cancel.click(function() {
        admin.toggle();
      });
      var cat = cat;
      this.save = $('#adminSave');
      this.save.click(function() {
        var newName = $('#adminCatName'),
          newImg = $('#adminCatImg'),
          newCount = $('#adminCatCount');
          console.log(cat);
        octopus.updateCat(newName,newImg,newCount);
        admin.toggle(cat);
      });
    }
  };

  //octopus
  var octopus = {
    getCats: function() {
      return model.cats;
    },
    clickCat: function(cat) {
      cat.count++;
      catView.updateCount(cat);
      admin.renderCatAdmin(cat);
    },
    init: function() {
      model.init();
      listView.init();
      admin.init();
      listView.catList.click(function (e) {
        var cat = model.cats[e.target.id];
        catView.init(cat);
        model.currentCat = cat;
        admin.renderCatAdmin(cat);
      });
    },
    updateCat: function(newName,newImg,newCount) {
      console.log(newName.val());
      model.currentCat.name = newName.val();
      model.currentCat.img = newImg.val();
      model.currentCat.count = newCount.val();
      listView.init();
      catView.init(model.currentCat);
    }
  };

  octopus.init();
});