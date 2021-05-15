
class node {
  constructor(name) {
    this.name = name;
  }
  getname() {
    return this.name;
  }
  equiv(other) {
    return Boolean(this.name == other.name);
  }
  indict(dict) {
    for (const key in dict) {
      if (this.name == key) {
        return true;
      }
    }
    return false;
  }

  inlist(list) {
    let length = list.length;
    for (var i = 0; i < length; i++) {
      if (this.equiv(list[i])) {
        return true
      }
    }
    return false
  }
}

node.prototype.toString = function nodetostring() {
  return this.name;
};







class edge {
  constructor(source,dest,weight=1,flavour="nth") {
    this.source = source;
    this.dest = dest;
    this.weight = weight;
    this.flavour = flavour;
  }

  getsource() {
    return this.source;
  }

  getdest() {
    return this.dest;
  }

  getweight() {
    return this.weight
  }

  getflavour() {
    return this.flavour
  }

}






class digraph {
  constructor(edges={}) {
    this.edges = {};
  }

  getedges() {
    return this.edges;
  }

  addnode(node) {
    this.edges[node] = [];
  }

  addedge(edge) {
    if (edge.getsource().indict(this.edges) && edge.getsource().indict(this.edges) ) {
      this.edges[edge.getsource()].push([edge.getdest(),edge.getweight(),edge.getflavour()]);
    }
  }

  getflavour(edge) {
    let a = this.edges[edge.getsource()];
    for (let i = 0; i < a.length; i++) {
      if (edge.getdest().inlist(a[i])) {
        return a[i][2];
      }
      
    }
  }

  getweight(edge) {
    let a = this.edges[edge.getsource()];
    for (let i = 0; i < a.length; i++) {
      if (edge.getdest().inlist(a[i])) {
        return a[i][1];
      }
      
    }
  }

  child(node) {
    let a = this.edges[node];
    let b = []
    for (let i = 0; i < a.length; i++) {
      b.push(a[i][0])
    }
    return b
  }

}




function weight_calculator(graph,path,flavour_switch_weight,weight=0) {
  for (let i = 0; i < path.length - 1; i++) {
    if (i != 0 && graph.getflavour(new edge(path[i],path[i+1])) != graph.getflavour(new edge(path[i-1],path[i]))) {
      weight += flavour_switch_weight;
    }

    weight += graph.getweight(new edge(path[i],path[i+1])); 
  }
  return weight
}



function buildshortestpath(start,end,graph,flavour_switch_weight,path=[],shortest=[]) {

  path = path.concat([start]);

  if (start.equiv(end)) {
    return path;
  }
  
  for (let i = 0; i < graph.child(start).length; i++) {
    if (! graph.child(start)[i].inlist(path)) {

      if (shortest.length == 0 || weight_calculator(graph,path,flavour_switch_weight) < weight_calculator(graph,shortest,flavour_switch_weight)) {

        let a = buildshortestpath(graph.child(start)[i],end,graph,flavour_switch_weight,path,shortest);

        if (shortest.length === 0 || (a.length != 0 && weight_calculator(graph,a,flavour_switch_weight) < weight_calculator(graph,shortest,flavour_switch_weight)) ) {
          shortest = a;
        }
      }
    }
  } 
  
  return shortest;  
}


all_nodes = ['bukit panjang', 'cashew', 'hillview', 'beauty world', 'king albert park', 'sixth avenue', 'tan kah kee', 'botanic gardens', 'stevens', 'newton', 'little india', 'rochor', 'bugis', 'promenade', 'bayfront', 'downtown', 'telok ayer', 'chinatown', 'fort canning', 'bencoolen', 'jalan besar', 'bendemeer', 'geylang bahru', 'mattar', 'macpherson', 'ubi', 'kaki bukit', 'bedok north', 'bedok reservoir', 'tampines west', 'tampines', 'tampines east', 'upper changi', 'expo', 'changi airport', 'expo', 'tanah merah', 'pasir ris', 'tampines', 'simei', 'tanah merah', 'bedok', 'kembangan', 'eunos', 'paya lebar', 'aljunied', 'kallang', 'lavender', 'bugis', 'city hall', 'raffles place', 'tanjong pagar', 'outram park', 'tiong bahru', 'redhill', 'queenstown', 'commonwealth', 'buona vista', 'dover', 'clementi', 'jurong east', 'chinese garden', 'lakeside', 'boon lay', 'pioneer', 'joo koon', 'gul circle', 'tuas crescent', 'tuas west road', 'tuas link', 'jurong east', 'bukit batok', 'bukit gombak', 'choa chu kang', 'yew tee', 'kranji', 'marsiling', 'woodlands', 'admiralty', 'sembawang', 'canberra', 'yishun', 'khatib', 'yio chu kang', 'ang mo kio', 'bishan', 'braddell', 'toa payoh', 'novena', 'newton', 'orchard', 'somerset', 'dhoby ghaut', 'city hall', 'marina bay', 'bayfront', 'promenade', 'dhoby ghaut', 'bras basah', 'esplanade', 'promenade', 'nicoll highway', 'stadium', 'mountbatten', 'dakota', 'paya lebar', 'macpherson', 'tai seng', 'bartley', 'serangoon', 'lorong chuan', 'bishan', 'marymount', 'caldecott', 'botanic gardens', 'farrer road', 'holland village', 'buona vista', 'one-north', 'kent ridge', 'haw par villa', 'pasir panjang', 'labrador park', 'telok blangah', 'harbourfront', 'raffles place', 'marina bay', 'marina south pier', 'harbourfront', 'outram park', 'chinatown', 'clarke quay', 'dhoby ghaut', 'little india', 'farrer park', 'boon keng', 'potong pasir', 'woodleigh', 'serangoon', 'kovan', 'hougang', 'buangkok', 'sengkang', 'punggol'];

timings = [0, 90, 120, 207, 113, 130, 120, 105, 133, 132, 148, 97, 94, 119, 136, 118, 93, 87, 130, 102, 99, 113, 122, 146, 101, 123, 117, 107, 136, 144, 123, 140, 188, 107, 0, 316, 188, 0, 233, 152, 196, 178, 198, 137, 137, 150, 151, 141, 120, 127, 131, 100, 138, 175, 158, 150, 144, 135, 167, 164, 294, 161, 154, 189, 136, 205, 200, 160, 150, 145, 0, 299, 145, 267, 155, 283, 167, 165, 110, 195, 158, 153, 174, 308, 154, 217, 135, 121, 147, 149, 146, 137, 118, 120, 0, 120, 120, 0, 88, 101, 136, 145, 132, 109, 99, 134, 153, 138, 130, 155, 148, 154, 178, 131, 270, 152, 147, 117, 144, 117, 159, 141, 158, 128, 173, 0, 91, 134, 0, 183, 120, 112, 136, 136, 112, 125, 150, 118, 128, 175, 151, 140, 119, 174];

index_start = [0,34,37,70,94,97,125,128];
index_end = [33,36,69,93,96,124,127,143];

colour = ["blue","green","green","red","yellow","yellow","red","purple"];

map = new digraph();

for (let i = 0; i < all_nodes.length; i++) {
  map.addnode(new node(all_nodes[i]));
}



for (let j = 0; j < 8; j++) {
  for (let i = index_start[j]; i < index_end[j]; i++) {
    map.addedge(new edge(new node(all_nodes[i]), new node(all_nodes[i+1]), timings[i+1], colour[j]));
    map.addedge(new edge(new node(all_nodes[i+1]), new node(all_nodes[i]), timings[i+1], colour[j]));

  }
}

function display_route(best_route) {
  let a = 0;
  let b = "";
  if (best_route.length == 2) {
    return best_route[0].getname() + " ---- " + map.getflavour(new edge(best_route[0],best_route[1])) + " ---> " + best_route[1].getname();
  }


  for (let i = 1; i < best_route.length - 1; i++) {
    if (map.getflavour(new edge(best_route[i-1], best_route[i])) != map.getflavour(new edge(best_route[i], best_route[i+1]))) {
      b += best_route[a].getname();
      b += " ---- ";
      b += map.getflavour(new edge(best_route[i-1],best_route[i]));
      b += " ---> ";
      a = i;
    }
    if (i == best_route.length-2) {
      b += best_route[a].getname();
      b += " ---- ";
      b += map.getflavour(new edge(best_route[best_route.length -2],best_route[best_route.length -1]));
      b += " ---> ";
      b += best_route[best_route.length -1].getname();
      }
  }
  return b
}


/* Test cases
var node1 = new node("yeet1");
var node2 = new node("yeet2");
var node3 = new node("yeet3");

var edge1 = new edge(node1,node2,10,"blue");
var edge2 = new edge(node1,node3,15,"red");
var edge3 = new edge(node2,node3,20,"red");

var graph = new digraph();
graph.addnode(node1);
graph.addnode(node2);
graph.addnode(node3);

graph.addedge(edge1);
graph.addedge(edge2);
graph.addedge(edge3);

var path1 = [];

path1.push(node1);



city = new digraph();   
 
city_list=['Boston', 'Providence', 'New York', 'Chicago', 'Denver', 'Phoenix', 'Los Angeles'];

for (let i = 0; i < city_list.length; i++) {
  city.addnode(new node(city_list[i]));
}


city.addedge(new edge(new node('Boston'), new node('Providence')));
city.addedge(new edge(new node('Boston'), new node('New York')));

city.addedge(new edge(new node('Providence'), new node('Boston')));
city.addedge(new edge(new node('Providence'), new node('New York')));

city.addedge(new edge(new node('New York'), new node('Chicago')));

city.addedge(new edge(new node('Chicago'), new node('Denver')));
city.addedge(new edge(new node('Chicago'), new node('Phoenix')));

city.addedge(new edge(new node('Denver'), new node('Phoenix')));
city.addedge(new edge(new node('Denver'), new node('New York')));

city.addedge(new edge(new node('Los Angeles'), new node('Boston')));
*/





/*var ppath = buildshortestpath(new node(source),new node(dest),map,120);

console.log(ppath)*/
function autocomplete(inp, arr) {
  /*the autocomplete function takes two arguments,
  the text field element and an array of possible autocompleted values:*/
  var currentFocus;
  /*execute a function when someone writes in the text field:*/
  inp.addEventListener("input", function(e) {
      var a, b, i, val = this.value;
      /*close any already open lists of autocompleted values*/
      closeAllLists();
      if (!val) { return false;}
      currentFocus = -1;
      /*create a DIV element that will contain the items (values):*/
      a = document.createElement("DIV");
      a.setAttribute("id", this.id + "autocomplete-list");
      a.setAttribute("class", "autocomplete-items");
      /*append the DIV element as a child of the autocomplete container:*/
      this.parentNode.appendChild(a);
      /*for each item in the array...*/
      for (i = 0; i < arr.length; i++) {
        /*check if the item starts with the same letters as the text field value:*/
        if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
          /*create a DIV element for each matching element:*/
          b = document.createElement("DIV");
          /*make the matching letters bold:*/
          b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
          b.innerHTML += arr[i].substr(val.length);
          /*insert a input field that will hold the current array item's value:*/
          b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
          /*execute a function when someone clicks on the item value (DIV element):*/
          b.addEventListener("click", function(e) {
              /*insert the value for the autocomplete text field:*/
              inp.value = this.getElementsByTagName("input")[0].value;
              /*close the list of autocompleted values,
              (or any other open lists of autocompleted values:*/
              closeAllLists();
          });
          a.appendChild(b);
        }
      }
  });
  /*execute a function presses a key on the keyboard:*/
  inp.addEventListener("keydown", function(e) {
      var x = document.getElementById(this.id + "autocomplete-list");
      if (x) x = x.getElementsByTagName("div");
      if (e.keyCode == 40) {
        /*If the arrow DOWN key is pressed,
        increase the currentFocus variable:*/
        currentFocus++;
        /*and and make the current item more visible:*/
        addActive(x);
      } else if (e.keyCode == 38) { //up
        /*If the arrow UP key is pressed,
        decrease the currentFocus variable:*/
        currentFocus--;
        /*and and make the current item more visible:*/
        addActive(x);
      } else if (e.keyCode == 13) {
        /*If the ENTER key is pressed, prevent the form from being submitted,*/
        e.preventDefault();
        if (currentFocus > -1) {
          /*and simulate a click on the "active" item:*/
          if (x) x[currentFocus].click();
        }
      }
  });
  function addActive(x) {
    /*a function to classify an item as "active":*/
    if (!x) return false;
    /*start by removing the "active" class on all items:*/
    removeActive(x);
    if (currentFocus >= x.length) currentFocus = 0;
    if (currentFocus < 0) currentFocus = (x.length - 1);
    /*add class "autocomplete-active":*/
    x[currentFocus].classList.add("autocomplete-active");
  }
  function removeActive(x) {
    /*a function to remove the "active" class from all autocomplete items:*/
    for (var i = 0; i < x.length; i++) {
      x[i].classList.remove("autocomplete-active");
    }
  }
  function closeAllLists(elmnt) {
    /*close all autocomplete lists in the document,
    except the one passed as an argument:*/
    var x = document.getElementsByClassName("autocomplete-items");
    for (var i = 0; i < x.length; i++) {
      if (elmnt != x[i] && elmnt != inp) {
        x[i].parentNode.removeChild(x[i]);
      }
    }
  }
  /*execute a function when someone clicks in the document:*/
  document.addEventListener("click", function (e) {
      closeAllLists(e.target);
  });
}

/*An array containing all the country names in the world:*/
var countries = ['bukit panjang', 'cashew', 'hillview', 'beauty world', 'king albert park', 'sixth avenue', 'tan kah kee', 'botanic gardens', 'stevens', 'newton', 'little india', 'rochor', 'bugis', 'promenade', 'bayfront', 'downtown', 'telok ayer', 'chinatown', 'fort canning', 'bencoolen', 'jalan besar', 'bendemeer', 'geylang bahru', 'mattar', 'macpherson', 'ubi', 'kaki bukit', 'bedok north', 'bedok reservoir', 'tampines west', 'tampines', 'tampines east', 'upper changi', 'expo', 'changi airport', 'tanah merah', 'pasir ris', 'simei', 'bedok', 'kembangan', 'eunos', 'paya lebar', 'aljunied', 'kallang', 'lavender', 'city hall', 'raffles place', 'tanjong pagar', 'outram park', 'tiong bahru', 'redhill', 'queenstown', 'commonwealth', 'buona vista', 'dover', 'clementi', 'jurong east', 'chinese garden', 'lakeside', 'boon lay', 'pioneer', 'joo koon', 'gul circle', 'tuas crescent', 'tuas west road', 'tuas link', 'bukit batok', 'bukit gombak', 'choa chu kang', 'yew tee', 'kranji', 'marsiling', 'woodlands', 'admiralty', 'sembawang', 'canberra', 'yishun', 'khatib', 'yio chu kang', 'ang mo kio', 'bishan', 'braddell', 'toa payoh', 'novena', 'orchard', 'somerset', 'dhoby ghaut', 'marina bay', 'bras basah', 'esplanade', 'nicoll highway', 'stadium', 'mountbatten', 'dakota', 'tai seng', 'bartley', 'serangoon', 'lorong chuan', 'marymount', 'caldecott', 'farrer road', 'holland village', 'one-north', 'kent ridge', 'haw par villa', 'pasir panjang', 'labrador park', 'telok blangah', 'harbourfront', 'marina south pier', 'clarke quay', 'farrer park', 'boon keng', 'potong pasir', 'woodleigh', 'kovan', 'hougang', 'buangkok', 'sengkang', 'punggol'];

/*initiate the autocomplete function on the "myInput" element, and pass along the countries array as possible autocomplete values:*/
autocomplete(document.getElementById("fname"), countries);
autocomplete(document.getElementById("lname"), countries);


function f() {
  var source = document.getElementById("fname").value.toLowerCase();
  var dest = document.getElementById("lname").value.toLowerCase();
  var ppath = buildshortestpath(new node(source),new node(dest),map,120);
  document.getElementById("best_route_simplified").innerHTML = display_route(ppath);

  var weight = weight_calculator(map,ppath,120);
  var sec = weight % 60;
  var min = Math.floor(weight / 60);
  var time_taken = min.toString() + " min " + sec.toString() + " seconds";


  document.getElementById("time_taken").innerHTML = time_taken;
  document.getElementById("heading").innerHTML = "Expanded Route";
  document.getElementById("best_route_expanded").innerHTML = ppath;

}



