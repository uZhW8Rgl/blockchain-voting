// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.8.0;

contract Election3 {
    // Model a Candidate
    struct Candidate3 {
        uint id3;
        string name3;
        uint voteCount3;
    }

    // Store accounts that have voted
    mapping(address => bool) public voters3;
    // Store Candidates
    // Fetch Candidate
    mapping(uint => Candidate3) public candidates3;
    // Store Candidates Count
    uint public candidatesCount3;

    // Store which candidate each voter voted for
    mapping(address => uint) public voterToCandidate3;

    // Whitelist of addresses allowed to vote
    mapping(address => bool) public whitelist;

    // voted event
    event votedEvent3 (
        uint indexed _candidateId3
    );

    // revocated event
    event revocatedEvent3 (
        uint indexed _candidateId3
    );

    constructor() public {
        // Addcandiates
        addCandidate("Group A1 - This Voting Dapp");
        addCandidate("Group A2 - Vatican Voting");
        addCandidate("Group B - Self-Tallying Voting");
        addCandidate("Group C - BYOB");
        addCandidate("Group E - Fair Leader Election");
        addCandidate("Group F - Smart Contract");
        addCandidate("Group G - Avoiding Selfish Mining via Transaction Fee Optimization");
        addCandidate("Group H - Nullifiers");
        addCandidate("Group I - Wash Trading");
        addCandidate("Group J - BYOB");
        addCandidate("Group K - Folding Relays");
        addCandidate("Group L");
        addCandidate("Group M - Policy Enforcement");
        addCandidate("Group P - Policy Enforcement");
        addCandidate("Group Q - Sport Subscription Dapp");


        // Setup whitelist
        whitelist[0x7B46ace25DCBfAE5A634FE0091c810b0F5142305] = true;
        whitelist[0x48E731732dC403B2B8d74FFb12bE90565186E688] = true;
        whitelist[0x818254FA09c116494fba746e6d2DA31E9652Fc20] = true;
        whitelist[0x05AcF2cB75B4Cb6e550A9bcedC39D45e867af499] = true;
        whitelist[0xD24a9aDaf18C1F75345A6f22A9CF57eCD9b460CD] = true;
        whitelist[0x3Bd8e52bA4c157cf765cb90151CfD0dD3dce8439] = true;
        whitelist[0xE2799E51870c327B9cFaDBF5faa19F240785f1C9] = true;
        whitelist[0xA8ae7D04271dE45E706c37aa2c2Ea1C38AdE62aA] = true;
        whitelist[0x6473C0e100B830723902D43b6b9AA8628C58b4E4] = true;
        whitelist[0x1A0a0959cB7782FD6E9a1F21294eC6fd689951C4] = true;
        whitelist[0xa3d4a87e6E685d4D6042B33EAc295338D1e1B64f] = true;
        whitelist[0x35D7C70211a2dbfe07f68b24fE5A1A75a69e2334] = true;
        whitelist[0x27382144bd98101B065044f7cB93e3d809066CF2] = true;
        whitelist[0x7D18E332604d6e307CeB3Be24Aa3D28438cb1459] = true;
        whitelist[0x324f99A4a5465a87DB6fbe0Cc7431174036FC93C] = true;
        whitelist[0x5Eab17CF56Fe6Ae21093fE793b7B39db5869AcD9] = true;
        whitelist[0x555e410EbB474fd3e49020e93e5a1Bc95c3c496b] = true;
        whitelist[0x3BCebDaBae6356f7018D41e442F799840242Df53] = true;
        whitelist[0xbc759561e06832fDC239c924f92ef919BE38aD19] = true;
        whitelist[0x7Ce929D2695D53dB3C7dAfb93e5455c8111FcB79] = true;
        whitelist[0x319DbE2b29591fdd4CABcFEF699ce438cdF1EB3e] = true;
        whitelist[0xa51a8FA9613E11Eca2a2B9d4E1AB32325A1d69fC] = true;
        whitelist[0xf05eB5588CaB1Cb86c60c30E71860E5969c88d0D] = true;
        whitelist[0x68347D674eeD20d68E91E1Dd7d757251f463Ab0e] = true;
        whitelist[0x10a15D942e5b14444143708FE0Bb336D53D539D7] = true;
        whitelist[0x7F201Eb09B8a393E5B88B10d1A85973caA265e80] = true;
        whitelist[0x5A5be0ABFE4F6213Edf722f1a21370Bde3ccd623] = true;
        whitelist[0x139f5f4875d3d6430342EA427AC06AB70fDc358B] = true;
        whitelist[0xAd6eE2cf80e145c90BBF6574f59879C887eA86dA] = true;
        whitelist[0x818f384F5665aB2339DcC5F3c408fE36928DEB97] = true;
        whitelist[0x27fC0726a44e93fEAbB1168FCf9A511111db502a] = true;
        whitelist[0x258fCcca835b2f2618FE76559f72FA1Ac25856f5] = true;
        whitelist[0x541375A9c72eBa83780B32bFDb261BB07bA20911] = true;
        whitelist[0x5881C2897d365D60AfCCCec19a3B27C474bB09db] = true;
        whitelist[0xfb145651542c239bC7b7c2D559c4255Ea3245c3f] = true;
        whitelist[0xC648CfBbE0031419703C3C0691B00DF15Dc04Ce1] = true;
        whitelist[0x4F35cBE7F49EA42C2A5bBBf5C338Dc032E5CaAfC] = true;
        whitelist[0x8c88c62b073E71ca55e575d21d302179Fae3855E] = true;
        whitelist[0x7a743cF29179E51AEd26253ABdcd680880142Fd5] = true;
        whitelist[0xC57Ad720211A387926bcE96baF67b8eb71340372] = true;
        whitelist[0xdbC48c88cC095c3246097f2d6346f31F94004A47] = true;
        whitelist[0x9324391c41916b34117B17f4a0646033429Ec762] = true;
        whitelist[0x691B3F000c40E7CE0a64A5B690A0728695a51048] = true;
        whitelist[0x3dc6935e43Aa324c019F631d4B787178d5D8F3C5] = true;
        whitelist[0x14471bAA25f4bAda569Eadf57688DE5CbBa73538] = true;
        whitelist[0xf0c86C8093CCD36D92B2087c0E770e8663234c67] = true;
        whitelist[0x1688Ce5B3D2d0599A5D6d069B80b210e1AbB9E63] = true;
        whitelist[0x94F15dE12D39D52281C06d8Aea7907B3182ae306] = true;
        whitelist[0x7abB45828166Ee4e38eC8603f50cb455b7397A66] = true;
        whitelist[0xc5Ed347a388A248A44E6B46aC310FAEBB5e86339] = true;
        whitelist[0x4E23edF964d7BDc5E7bcc8d06E99F749b6b316D6] = true;
        whitelist[0x399A8D43c0E7F99a00990B3755e1CeBF5e5AE6a5] = true;
        whitelist[0xb5990aadE53B368013190CE00A307FBb6b64Bc24] = true;
        whitelist[0x13EDB41A073C6D146665cb98B469c21038abB7F8] = true;
        whitelist[0x645793A1eB0a06971b2e7a64C34A23004A93D42c] = true;
        whitelist[0xDEf6a625deb6A2444772a3cb8fF26801D4A1bCd7] = true;
        whitelist[0x0B5911181a5C95f8DC8918C3969B2CCf1F2a903E] = true;
        whitelist[0xe673C710711a710Cef01a9877e7f9Fb972307f08] = true;
        whitelist[0x79a4B56D5CD40c55c1352EA06A98b8F88E9bA997] = true;
        whitelist[0x24b339e49Cad0E50222018B7D95933Df194D287b] = true;
    }

    function addCandidate (string memory _name3) private {
        candidatesCount3 ++;
        candidates3[candidatesCount3] = Candidate3(candidatesCount3, _name3, 0);
    }

    function vote3 (uint _candidateId3) public {
        // require that they are in the whitelist
        require(whitelist[msg.sender], "Not authorized to vote");

        // require that they haven't voted before
        require(!voters3[msg.sender]);

        // require a valid candidate
        require(_candidateId3 > 0 && _candidateId3 <= candidatesCount3);

        // record that voter has voted
        voters3[msg.sender] = true;

        // store the vote
        voterToCandidate3[msg.sender] = _candidateId3;

        // update candidate vote Count
        candidates3[_candidateId3].voteCount3 ++;

        // trigger voted event
        emit votedEvent3(_candidateId3);
    }

    function revokeVote3 () public {
        // require that they have voted before
        require(voters3[msg.sender]);

        // update candidate vote Count
        candidates3[voterToCandidate3[msg.sender]].voteCount3 --;

        // record that voter has voted
        voters3[msg.sender] = false;

        // trigger voted event
        emit revocatedEvent3(voterToCandidate3[msg.sender]);
    }
}
