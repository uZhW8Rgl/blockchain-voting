App = {
  web3Provider: null,
  contracts: {},
  account: '0x0',
  hasVoted: false,

  init: async function() {
    return await App.initWeb3();
  },

  initWeb3: async function() {
    // TODO: refactor conditional
    if (typeof web3 !== 'undefined') {
      // If a web3 instance is already provided by Meta Mask.
      App.web3Provider = web3.currentProvider;
      web3 = new Web3(web3.currentProvider);
      ethereum.enable().catch(console.error);
    } else {
      // Specify default instance if no web3 instance provided
      App.web3Provider = new Web3.providers.HttpProvider('http://localhost:7545');
      web3 = new Web3(App.web3Provider);
    }
    return App.initContract();
  },

  initContract: function() {
    $.getJSON("Election.json", function(election) {
      // Instantiate a new truffle contract from the artifact
      App.contracts.Election = TruffleContract(election);
      // Connect provider to interact with contract
      App.contracts.Election.setProvider(App.web3Provider);
      App.listenForEvents();
      //App.listenForEvents2();
      return App.render();
    });
  },

  listenForEvents: function() {
    App.contracts.Election.deployed().then(function(instance) {
      web3.eth.getBlockNumber(function(error, latestBlockNumber) {
        if (error) {
          console.error("Could not fetch latest block number:", error);
          return;
        }
        instance.allEvents({
          fromBlock: 'latest',
          toBlock: 'latest'
        }).watch(function(error, event) {
          if (!error) {
            console.log("Event triggered", event);
            App.render();
          } else {
            console.error(error);
          }
        });
      });
    });
  },

  render: function() {

    var electionInstance;
    var loader = $("#loader");
    var content = $("#content");

    loader.show();
    content.hide();

    web3.eth.getCoinbase(function(err, account) {
      if (err === null) {
        App.account = account;
        $("#accountAddress").html("Your Account: " + account);
      }
    });

    App.contracts.Election.deployed().then(function(instance) {
      var contractAddress = instance.address;
      console.log("Contract Address: " + contractAddress);
      var etherscanLink = "https://sepolia.etherscan.io/address/" + contractAddress;
      console.log("Etherscan Link: " + etherscanLink);
      $("#contractAddress").html("Contract Address: <a href='" + etherscanLink + "' target='_blank'>" + contractAddress + "</a>");
    }).catch(function(error) {
      console.error("Could not fetch contract address:", error);
    });

    App.contracts.Election.deployed().then(function(instance) {
      electionInstance = instance;
      return electionInstance.candidatesCount();
    }).then(function(candidatesCount) {
      var candidatesResults = $("#candidatesResults");
      candidatesResults.empty();
      var candidatesSelect = $('#candidatesSelect');
      candidatesSelect.empty();
      candidates = new Set();
      for (var i = 1; i <= candidatesCount; i++) {
        electionInstance.candidates(i).then(function(candidate) {
          var id = candidate[0];
          var name = candidate[1];
          var voteCount = candidate[2];
          candidates.add({
            id: id,
            name: name,
            voteCount: voteCount
          });
          var sortedCandidates = Array.from(candidates).sort(function(a, b) {
            return a.id - b.id;
          });
          candidatesResults.empty();
          candidatesSelect.empty();
          sortedCandidates.forEach(function(candidate) {
            var candidateTemplate = "<tr><td>" + candidate.name + "</td><td>" + candidate.voteCount + "</td></tr>"
            candidatesResults.append(candidateTemplate);
            var candidateOption = "<option value='" + candidate.id + "' >" + candidate.name + "</ option>"
            candidatesSelect.append(candidateOption);
          });
        });
      }
      return electionInstance.voters(App.account);
    }).then(function(hasVoted) {
      if (!hasVoted) {
        $('#form2').hide();
        $('#form1').show();
      }
      if (hasVoted) {
        $('#form1').hide();
        $('#form2').show();
      }
      loader.hide();
      content.show();
    }).catch(function(error) {
      console.warn(error);
    });
  },

  castVote: function() {
    var candidateId = $('#candidatesSelect').val();
    App.contracts.Election.deployed().then(function(instance) {
      return instance.vote(candidateId, {
        from: App.account
      });
    }).then(function(result) {
      $("#content").hide();
      $("#loader").show();
    }).catch(function(err) {
      console.error(err);
    });
  },

  revokeVote: function() {
    App.contracts.Election.deployed().then(function(instance) {
      return instance.revokeVote({
        from: App.account
      });
    }).then(function(result) {
      $("#content").hide();
      $("#loader").show();
    }).catch(function(err) {
      console.error(err);
    });
  }
};
$(function() {
  $(window).load(function() {
    App.init();
  });
});
