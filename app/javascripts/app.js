var account;
var data_client;
var output_textarea;

function log(_text) {
  output_textarea.value += _text + "\n";
  output_textarea.scrollTop = output_textarea.scrollHeight;
  console.log(_text);
}

function initDataClient() {
  log("initDataClient:+");
  if (!data_client) {
    try {
      data_client = DataClient.deployed();
    } catch (err) {
      alert("initDataClient: unable to init, err=" + err);
      return;
    }

    data_client.ReportLog().watch(function(error, result) {
      if (!error) {
        log("ReportLog: " + result.args.info + " field=" + result.args.field + " value=" + result.args.value);
      } else {
        log("ReportLog: error=" + error);
      }
    });
    log("initDataClient:-");
  }
}

function getField() {
  log("getField:+");

  var get_field_name = document.getElementById("get_field_name").value;
  data_client.getField(get_field_name, {from: account}).then(function(value) {
    log("getField cb: value=" + value);
  }).catch(function(e) {
    log(e);
  });

  log("getField:-");
};

function setField() {
  log("setField:+");

  var set_field_name = document.getElementById("set_field_name").value;
  var set_field_value = document.getElementById("set_field_value").value;
  log("setField: name=" + set_field_name + " value=" + set_field_value);

  data_client.setField(set_field_name, set_field_value, {from: account}).then(function() {
    log("setField: cb successfully set '" + set_field_name + "' to '" + set_field_value + "'");
  }).catch(function(e) {
    log("setField: cb e=" + e);
  })

  log("setField:-");
};

window.onload = function() {
  output_textarea = document.getElementById("output_textarea");
  output_textarea.value += "hi\n";

  web3.eth.getAccounts(function(err, accs) {
    if (err != null) {
      alert("There was an error fetching your accounts.");
      return;
    }

    if (accs.length == 0) {
      alert("Couldn't get any accounts! Make sure your Ethereum client is configured correctly.");
      return;
    }

    account = accs[0];

    initDataClient();
  });
}
