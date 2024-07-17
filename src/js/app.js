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
    Promise.all([
      $.getJSON("Election1.json", function(election) {
        App.contracts.Election1 = TruffleContract(election);
        App.contracts.Election1.setProvider(App.web3Provider);
        App.listenForEventsElection1();
      }),
      $.getJSON("Election2.json", function(election) {
        App.contracts.Election2 = TruffleContract(election);
        App.contracts.Election2.setProvider(App.web3Provider);
        App.listenForEventsElection2();
      }),
      $.getJSON("Election3.json", function(election) {
        App.contracts.Election3 = TruffleContract(election);
        App.contracts.Election3.setProvider(App.web3Provider);
        App.listenForEventsElection3();
      })
    ]).then(function() {
      App.render();
    }).catch(function(error) {
      console.error(error);
    });
  },

  listenForEventsElection1: function() {
    App.contracts.Election1.deployed().then(function(instance) {
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

  listenForEventsElection2: function() {
    App.contracts.Election2.deployed().then(function(instance) {
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

  listenForEventsElection3: function() {
    App.contracts.Election3.deployed().then(function(instance) {
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

    var electionInstance1;
    var loader1 = $("#loader1");
    var content1 = $("#content1");

    var electionInstance2;
    var loader2 = $("#loader2");
    var content2 = $("#content2");

    var electionInstance3;
    var loader3 = $("#loader3");
    var content3 = $("#content3");

    loader1.show();
    content1.hide();
    loader2.show();
    content2.hide();
    loader3.show();
    content3.hide();

    web3.eth.getCoinbase(function(err, account) {
      if (err === null) {
        App.account = account;
        $("#accountAddress").html("Your Account: " + account);
      }
    });

    App.contracts.Election1.deployed().then(function(instance) {
      var contractAddress1 = instance.address;
      console.log("Contract Address: " + contractAddress1);
      var etherscanLink = "https://sepolia.etherscan.io/address/" + contractAddress1;
      console.log("Etherscan Link: " + etherscanLink);
      $("#contractAddress1").html("Contract Address: <a href='" + etherscanLink + "' target='_blank'>" + contractAddress1 + "</a>");
    }).catch(function(error) {
      console.error("Could not fetch contract address:", error);
    });

    App.contracts.Election2.deployed().then(function(instance) {
      var contractAddress2 = instance.address;
      console.log("Contract Address: " + contractAddress2);
      var etherscanLink = "https://sepolia.etherscan.io/address/" + contractAddress2;
      console.log("Etherscan Link: " + etherscanLink);
      $("#contractAddress2").html("Contract Address: <a href='" + etherscanLink + "' target='_blank'>" + contractAddress2 + "</a>");
    }).catch(function(error) {
      console.error("Could not fetch contract address:", error);
    });

    App.contracts.Election3.deployed().then(function(instance) {
      var contractAddress3 = instance.address;
      console.log("Contract Address: " + contractAddress3);
      var etherscanLink = "https://sepolia.etherscan.io/address/" + contractAddress3;
      console.log("Etherscan Link: " + etherscanLink);
      $("#contractAddress3").html("Contract Address: <a href='" + etherscanLink + "' target='_blank'>" + contractAddress3 + "</a>");
    }).catch(function(error) {
      console.error("Could not fetch contract address:", error);
    });

    App.contracts.Election1.deployed().then(function(instance) {
      electionInstance1 = instance;
      return electionInstance1.candidatesCount1();
    }).then(function(candidatesCount1) {
      var candidatesResults1 = $("#candidatesResults1");
      candidatesResults1.empty();
      var candidatesSelect1 = $('#candidatesSelect1');
      candidatesSelect1.empty();
      var candidates1 = new Set();
      var promises1 = [];
      for (var i = 1; i <= candidatesCount1; i++) {
        promises1.push(electionInstance1.candidates1(i).then(function(candidate1) {
          var id1 = candidate1[0];
          var name1 = candidate1[1];
          var voteCount1 = candidate1[2];
          candidates1.add({
          id1: id1,
          name1: name1,
          voteCount1: voteCount1
        });
      }));
    }
    Promise.all(promises1).then(function() {
      var sortedCandidates1 = Array.from(candidates1).sort(function(a, b) {
      return a.id1.toNumber() - b.id1.toNumber();
    });
    candidatesResults1.empty();
    candidatesSelect1.empty();
    sortedCandidates1.forEach(function(candidate1) {
      var candidateTemplate1 = "<tr><td>" + candidate1.name1 + "</td><td>" + candidate1.voteCount1 + "</td></tr>"
      candidatesResults1.append(candidateTemplate1);
      var candidateOption1 = "<option value='" + candidate1.id1 + "' >" + candidate1.name1 + "</ option>"
      candidatesSelect1.append(candidateOption1);
    });
  });

      /*
      for (var i = 1; i <= candidatesCount1; i++) {
        electionInstance1.candidates1(i).then(function(candidate1) {
          var id1 = candidate1[0];
          var name1 = candidate1[1];
          var voteCount1 = candidate1[2];
          candidates1.add({
            id1: id1,
            name1: name1,
            voteCount1: voteCount1
          });
          var sortedCandidates1 = Array.from(candidates1).sort(function(a, b) {
            return a.id - b.id;
          });
          candidatesResults1.empty();
          candidatesSelect1.empty();
          sortedCandidates1.forEach(function(candidate1) {
            var candidateTemplate1 = "<tr><td>" + candidate1.name1 + "</td><td>" + candidate1.voteCount1 + "</td></tr>"
            candidatesResults1.append(candidateTemplate1);
            var candidateOption1 = "<option value='" + candidate1.id1 + "' >" + candidate1.name1 + "</ option>"
            candidatesSelect1.append(candidateOption1);
          });
        });
      }*/
      return electionInstance1.voters1(App.account);
    }).then(function(hasVoted1) {
      if (!hasVoted1) {
        $('#form2').hide();
        $('#form1').show();
      }
      if (hasVoted1) {
        $('#form1').hide();
        $('#form2').show();
      }
      loader1.hide();
      content1.show();
    }).catch(function(error) {
      console.warn(error);
    });
    
    App.contracts.Election2.deployed().then(function(instance) {
      electionInstance2 = instance;
      return electionInstance2.candidatesCount2();
    }).then(function(candidatesCount2) {
      var candidatesResults2 = $("#candidatesResults2");
      candidatesResults2.empty();
      var candidatesSelect2 = $('#candidatesSelect2');
      candidatesSelect2.empty();
      var candidates2 = new Set();
      var promises2 = [];
        for (var i = 1; i <= candidatesCount2; i++) {
          promises2.push(electionInstance2.candidates2(i).then(function(candidate2) {
            var id2 = candidate2[0];
            var name2 = candidate2[1];
            var voteCount2 = candidate2[2];
            candidates2.add({
            id2: id2,
            name2: name2,
            voteCount2: voteCount2
          });
        }));
      }
      Promise.all(promises2).then(function() {
        var sortedCandidates2 = Array.from(candidates2).sort(function(a, b) {
        return a.id2.toNumber() - b.id2.toNumber();
      });
      candidatesResults2.empty();
      candidatesSelect2.empty();
      sortedCandidates2.forEach(function(candidate2) {
        var candidateTemplate2 = "<tr><td>" + candidate2.name2 + "</td><td>" + candidate2.voteCount2 + "</td></tr>"
        candidatesResults2.append(candidateTemplate2);
        var candidateOption2 = "<option value='" + candidate2.id2 + "' >" + candidate2.name2 + "</ option>"
        candidatesSelect2.append(candidateOption2);
      });
    });

      /*for (var i = 1; i <= candidatesCount2; i++) {
        electionInstance2.candidates2(i).then(function(candidate2) {
          var id2 = candidate2[0];
          var name2 = candidate2[1];
          var voteCount2 = candidate2[2];
          candidates2.add({
            id2: id2,
            name2: name2,
            voteCount2: voteCount2
          });
          var sortedCandidates2 = Array.from(candidates2).sort(function(a, b) {
            return a.id - b.id;
          });
          candidatesResults2.empty();
          candidatesSelect2.empty();
          sortedCandidates2.forEach(function(candidate2) {
            var candidateTemplate2 = "<tr><td>" + candidate2.name2 + "</td><td>" + candidate2.voteCount2 + "</td></tr>"
            candidatesResults2.append(candidateTemplate2);
            var candidateOption2 = "<option value='" + candidate2.id2 + "' >" + candidate2.name2 + "</ option>"
            candidatesSelect2.append(candidateOption2);
          });
        });
      }*/
      return electionInstance2.voters2(App.account);
    }).then(function(hasVoted2) {
      if (!hasVoted2) {
        $('#form4').hide();
        $('#form3').show();
      }
      if (hasVoted2) {
        $('#form3').hide();
        $('#form4').show();
      }
      loader2.hide();
      content2.show();
    }).catch(function(error) {
      console.warn(error);
    });

    App.contracts.Election3.deployed().then(function(instance) {
      electionInstance3 = instance;
      return electionInstance3.candidatesCount3();
    }).then(function(candidatesCount3) {
      var candidatesResults3 = $("#candidatesResults3");
      candidatesResults3.empty();
      var candidatesSelect3 = $('#candidatesSelect3');
      candidatesSelect3.empty();
      var candidates3 = new Set();
      var promises3 = [];
      for (var i = 1; i <= candidatesCount3; i++) {
        promises3.push(electionInstance3.candidates3(i).then(function(candidate3) {
          var id3 = candidate3[0];
          var name3 = candidate3[1];
          var voteCount3 = candidate3[2];
          candidates3.add({
          id3: id3,
          name3: name3,
          voteCount3: voteCount3
        });
      }));
    }
    Promise.all(promises3).then(function() {
      var sortedCandidates3 = Array.from(candidates3).sort(function(a, b) {
      return a.id3.toNumber() - b.id3.toNumber();
    });
    candidatesResults3.empty();
    candidatesSelect3.empty();
    sortedCandidates3.forEach(function(candidate3) {
      var candidateTemplate3 = "<tr><td>" + candidate3.name3 + "</td><td>" + candidate3.voteCount3 + "</td></tr>"
      candidatesResults3.append(candidateTemplate3);
      var candidateOption3 = "<option value='" + candidate3.id3 + "' >" + candidate3.name3 + "</ option>"
      candidatesSelect3.append(candidateOption3);
    });
  });
//});
        /* 
        electionInstance3.candidates3(i).then(function(candidate3) {
          var id3 = candidate3[0];
          var name3 = candidate3[1];
          var voteCount3 = candidate3[2];
          candidates3.add({
            id3: id3,
            name3: name3,
            voteCount3: voteCount3
          });
          var sortedCandidates3 = Array.from(candidates3).sort(function(a, b) {
            return a.id - b.id;
          });
          candidatesResults3.empty();
          candidatesSelect3.empty();
          sortedCandidates3.forEach(function(candidate3) {
            var candidateTemplate3 = "<tr><td>" + candidate3.name3 + "</td><td>" + candidate3.voteCount3 + "</td></tr>"
            candidatesResults3.append(candidateTemplate3);
            var candidateOption3 = "<option value='" + candidate3.id3 + "' >" + candidate3.name3 + "</ option>"
            candidatesSelect3.append(candidateOption3);
          });
        });
      }*/
      return electionInstance3.voters3(App.account);
    }).then(function(hasVoted3) {
      if (!hasVoted3) {
        $('#form6').hide();
        $('#form5').show();
      }
      if (hasVoted3) {
        $('#form5').hide();
        $('#form6').show();
      }
      loader3.hide();
      content3.show();
    }).catch(function(error) {
      console.warn(error);
    });
  },

  castVote1: function() {
    var candidateId1 = $('#candidatesSelect1').val();
    App.contracts.Election1.deployed().then(function(instance) {
      return instance.vote1(candidateId1, {
        from: App.account
      });
    }).then(function(result1) {
      $("#content1").hide();
      $("#loader1").show();
    }).catch(function(err) {
      console.error(err);
    });
  },

  revokeVote1: function() {
    App.contracts.Election1.deployed().then(function(instance) {
      return instance.revokeVote1({
        from: App.account
      });
    }).then(function(result) {
      $("#content1").hide();
      $("#loader1").show();
    }).catch(function(err) {
      console.error(err);
    });
  },

  castVote2: function() {
    var candidateId2 = $('#candidatesSelect2').val();
    App.contracts.Election2.deployed().then(function(instance) {
      return instance.vote2(candidateId2, {
        from: App.account
      });
    }).then(function(result2) {
      $("#content2").hide();
      $("#loader2").show();
    }).catch(function(err) {
      console.error(err);
    });
  },

  revokeVote2: function() {
    App.contracts.Election2.deployed().then(function(instance) {
      return instance.revokeVote2({
        from: App.account
      });
    }).then(function(result2) {
      $("#content2").hide();
      $("#loader2").show();
    }).catch(function(err) {
      console.error(err);
    });
  },

  castVote3: function() {
    var candidateId3 = $('#candidatesSelect3').val();
    App.contracts.Election3.deployed().then(function(instance) {
      return instance.vote3(candidateId3, {
        from: App.account
      });
    }).then(function(result3) {
      $("#content3").hide();
      $("#loader3").show();
    }).catch(function(err) {
      console.error(err);
    });
  },

  revokeVote3: function() {
    App.contracts.Election3.deployed().then(function(instance) {
      return instance.revokeVote3({
        from: App.account
      });
    }).then(function(result3) {
      $("#content3").hide();
      $("#loader3").show();
    }).catch(function(err) {
      console.error(err);
    });
  },
};

$(function() {
  $(window).load(function() {
    App.init();
  });
});
