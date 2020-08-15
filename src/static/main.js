// Function to get parameters by name from config file
function getParameterByName(name, defaults, location) {
  location = location || window.location.href;
  name = name.replace(/[\[]/,'\\\[').replace(/[\]]/,'\\\]');
  var result = new RegExp('[\\?&]' + name + '=([^&#]*)').exec(location);
  return result === null ? defaults : decodeURIComponent(result[1].replace(/\+/g, ' '));
}

// Get the config file "env.json" and extract the values
function getConfig() {
  // if you pass ?dev=true to your url address default config that will be used is `config-development`
  // otherwise - `config-production`
  var configName = getParameterByName('dev', false) ? 'env' : 'env';

  window._config || (window._config = {});

  // for production version you should concat your config with main script or put it above main script
  // inside global `_config` variable for example
  if (window._config[configName]) return window._config[configName];

  // for development version you can just make an ajax call to get the config
  $.ajax({
    url : '/static/' + configName + '.json',
    async : false,
    success : function(response) {
      window._config[configName] = response;
    }
  });
  return window._config[configName];
}

// Get configuration
var conf = getConfig();

// Send request when spacebar
function onKeyDown(e) {
    if (e.keyCode === 32) {
        sendRequest()
    }
    if (e.keyCode === 9) {
        e.preventDefault();
        sendRequest()
    }

    if (e.keyCode === 229) {
        sendRequest()
    }
}

// Colorize boxes
function displayPrediction(textGenerated) {
    if (textGenerated.generated == "lang_det_err"){
            document.getElementById("prediction").innerHTML = '<span style="font-weight: bold; color: #fda085;">Sorry, only supports english</span>'
    } else {
        generated = '<span style="font-weight: bold; color: #fda085;">' + textGenerated.generated + '</span>'
        document.getElementById("prediction").innerHTML = textGenerated.query + generated
    }
}

// Function to autogenerate
function autoGenerate(){
    var element = document.getElementById('prediction');
    var text = element.innerText || element.textContent;

    // Send to sendRequest
    sendRequest(text)
}

console.log(conf.APP_URL + conf.ROUTE)
// Function to send request to model
function sendRequest(input) {
    // Check if argument input passed
    if (input !== undefined) {
        // pass
    } else {
        // In case input no passed, we get the text from textarea
        var input = document.getElementById("textarea").value.trim();
    }

    if (input.length>1)
    {
        // Build data json
        var data = JSON.stringify({"input": input});
        var xhr = new XMLHttpRequest();
        xhr.withCredentials = true;

        xhr.addEventListener("readystatechange", function () {
        if (this.readyState === 4) {
            var data = JSON.parse(this.responseText)
                displayPrediction(data.body)
            }
        });

        // Request prediction
        xhr.open("POST", conf.APP_URL + conf.ROUTE);

        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.send(data);
    }

}

document.getElementById("textarea").addEventListener("keydown", onKeyDown);
