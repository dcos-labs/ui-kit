// Mostly stolen from Jake Albaugh https://codepen.io/jakealbaugh/pen/OVrQXY
function gradientsToDefs(source) {
    // all gradients expression
    var gradientExp = /(<[a-zA-Z]+Gradient[\S\s]+?<\/[a-zA-Z]+Gradient>)/g;
    // finding all gradients  
    var gradientMatches = source.match(gradientExp);
    // gradients array to hold gradient objects for comparison
    var gradients = [];
    // if any gradients exist  
    if(gradientMatches) {
      // for each match
      for (var m = 0; m < gradientMatches.length;) {
        
        var gradient = gradientMatches[m++],
            tag = gradient.match(/<[a-zA-Z]+Gradient[\S\s]+?>/)[0],
            type = tag.match(/[a-z]+Gradient/)[0],
            id = tag.match(/id=".*?"/)[0].replace(/id="(.*)?"/, "$1"),
            attrs = tag.match(/[a-zA-Z0-9-_]+=".+?"/g),
            stops = "  " + gradient.match(/<stop.*(\/>|<\/stop>)/g).join("\n  "); 
        
        // add gradient to gradients
        gradients.push({
          type: type,
          id: id,
          attrs: attrs,
          stops: stops
        });
        
        // remove all gradients
        source = source.replace(gradient, "");
      }
      
      // defs
      var defs = "";
      // for each gradient
      for(var g = 0; g < gradients.length; g++) {
        var gradient = gradients[g];      
        defs += "\n<" + gradient.type + " " + gradient.attrs.join(" ");
        if (gradient.stops) {
          defs += ">\n" + gradient.stops + "\n</" + gradient.type + ">";
        } else {
          defs += " />";
        }
        defs += "\n";
      }
      
      if(source.indexOf("<defs>") > -1) {
        source = source.replace("<defs>", "<defs>\n"+defs);
      } else {;
        source = source.replace(/(<svg(.|\n)*?>)/g, "$1\n<defs>\n"+defs+"</defs>\n");
      }
      
    }
    return source;
  }
  
  module.exports = gradientsToDefs;
