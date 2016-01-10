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
      this.cat = new model.Cat("Cat", "images/cat2.jpg");
      this.meow = new model.Cat("Meow", "images/cat3.jpg");
      this.sylvestor = new model.Cat("Sylvestor", "images/cat4.jpg");
      this.puddy = new model.Cat("Puddy", "images/cat5.jpg");
    },
    cats: []
  }

  //list view
  var listView = {
    init: function() {
      this.catList = $('#catList');
      var htmlStr = '',
      cats = octopus.getCats();
      for (var i = 0; i < cats.length; i++) {
        htmlStr += '<li id="' + i + '">' + cats[i].name + '</li>';
      };
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
      console.log(this.catImg);
      this.catImg.click(function () {
        octopus.clickCat(cat);
        console.log(cat);
      })
    },
    updateCount: function(cat) {
      this.catImg = $('#' + cat.name );
      htmlStr = '<h3 id="' + cat.name + '">Count ' + cat.count + '</h3>';
      console.log(cat.count);
      this.catImg.replaceWith(htmlStr);
    }
  }

  //octopus
  var octopus = {
    getCats: function() {
      return model.cats;
    },
    clickCat: function(cat) {
      cat.count++;
      catView.updateCount(cat);
    },
    init: function() {
      model.init();
      listView.init();
      listView.catList.click(function (e) {
        var cat = model.cats[e.target.id];
        catView.init(cat);
      });
    }
  }

  octopus.init();
});