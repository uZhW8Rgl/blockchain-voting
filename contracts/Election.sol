// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.8.0;

contract Election {
    // Model a Candidate
    struct Candidate {
        uint id;
        string name;
        uint voteCount;
    }

    // Store accounts that have voted
    mapping(address => bool) public voters;
    // Store Candidates
    // Fetch Candidate
    mapping(uint => Candidate) public candidates;
    // Store Candidates Count
    uint public candidatesCount;

    // Store which candidate each voter voted for
    mapping(address => uint) public voterToCandidate;

    // Whitelist of addresses allowed to vote
    mapping(address => bool) public whitelist;

    // voted event
    event votedEvent (
        uint indexed _candidateId
    );

    // revocated event
    event revocatedEvent (
        uint indexed _candidateId
    );

    constructor() public {
        // Addcandiates
        addCandidate("Best Presentation Voting 1 (This one)");
        addCandidate("Best Presentation Voting 2 (The other one)");
        addCandidate("Self-Tallying Voting");
        addCandidate("Build your own Blockchain");
        addCandidate("Fair Leader Election");
        addCandidate("Smart contract verification");
        addCandidate("Avoiding Selfish Mining via Transaction Fee Optimization");
        addCandidate("Nullifiers");
        addCandidate("Wash Trading");
        addCandidate("Build your own Blockchain");
        addCandidate("Folding Relays");
        addCandidate("Policy Enforcement 1");
        addCandidate("Decentralized Renting (Choose your own)");
        addCandidate("Policy Enforcement 2");

        // Setup whitelist
        whitelist[0xfef203e53fb7a2749B83A9eFAf4DCE2A57c772Af] = true;
        whitelist[0x513f7Be9B9833bDa6D15De34f35943183FAc8aA1] = true;
        whitelist[0xb9C355ED6BAd837711C0c79532B555D6BA2A9AAD] = true;
        whitelist[0x0Eb8CbE6c352Cd62C711c26cC60b844E17903CF8] = true;
        whitelist[0xA9201bAE60091Da8C28A2cC97cA7896920D0B1f7] = true;
        whitelist[0xDB7Bc8707eEE499ff8c415a4ef543231210F1750] = true;
        whitelist[0x8776049D5a061b5b88477033E090Aae4d5a7C9b1] = true;
        whitelist[0x83c9e2f7ca8c2e09Cfec76754943F7F12B5D04E9] = true;
        whitelist[0x9Fc7E7aA1756F53C0edb8072C0c1117B5a7a2946] = true;
        //whitelist[0x2d73221bc78378686a6a9BAEa3E1bBC581311D56] = true;
    }

    function addCandidate (string memory _name) private {
        candidatesCount ++;
        candidates[candidatesCount] = Candidate(candidatesCount, _name, 0);
    }

    function vote (uint _candidateId) public {
        // require that they are in the whitelist
        require(whitelist[msg.sender], "Not authorized to vote");

        // require that they haven't voted before
        require(!voters[msg.sender]);

        // require a valid candidate
        require(_candidateId > 0 && _candidateId <= candidatesCount);

        // record that voter has voted
        voters[msg.sender] = true;

        // store the vote
        voterToCandidate[msg.sender] = _candidateId;

        // update candidate vote Count
        candidates[_candidateId].voteCount ++;

        // trigger voted event
        emit votedEvent(_candidateId);
    }

    function revokeVote () public {
        // require that they have voted before
        require(voters[msg.sender]);

        // update candidate vote Count
        candidates[voterToCandidate[msg.sender]].voteCount --;

        // record that voter has voted
        voters[msg.sender] = false;

        // trigger voted event
        emit revocatedEvent(voterToCandidate[msg.sender]);
    }
}