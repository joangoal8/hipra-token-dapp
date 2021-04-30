pragma solidity ^0.5.0;

import "./DappSampleExtractionToken.sol";
import "./DappSampleTransportToken.sol";
import "./DappSampleUnboxingToken.sol";
import "./DappAnalysisSampleToken.sol";
import "./DappSampleReadyToken.sol";

contract SampleTokenFarm {
    string public name = "Dapp Sample Token Farm";
    address public owner;

    DappSampleExtractionToken public dappSampleExtractionToken;
    DappSampleTransportToken public dappSampleTransportToken;
    DappSampleUnboxingToken public dappSampleUnboxingToken;
    DappAnalysisSampleToken public dappAnalysisSampleToken;
    DappSampleReadyToken public dappSampleReadyToken;

    address[] public stakers;
    mapping(address => uint) public stakingBalance;
    mapping(address => bool) public hasStaked;
    mapping(address => bool) public isStaking;

    constructor(DappSampleExtractionToken _dappExtToken, DappSampleTransportToken _dappTransToken,
        DappSampleUnboxingToken _dappUnboxingToken, DappAnalysisSampleToken _dappAnaToken, DappSampleReadyToken _dappSampleReadyToken) public {
        dappSampleExtractionToken = _dappExtToken;
        dappSampleTransportToken = _dappTransToken;
        dappSampleUnboxingToken =_dappUnboxingToken;
        dappAnalysisSampleToken = _dappAnaToken;
        dappSampleReadyToken = _dappSampleReadyToken;
        owner = msg.sender;
    }

    function stakeTokens(uint tokenId) public {

        require(tokenId >= 0 && tokenId < 5);

        // Transfer Mock Dai tokens to this contract for staking
        if (tokenId == 0) {
            dappSampleExtractionToken.transferFrom(msg.sender, address(this), 1000000000000000000);
        } else if (tokenId == 1) {
            dappSampleTransportToken.transferFrom(msg.sender, address(this), 1000000000000000000);
        } else if (tokenId == 2) {
            dappSampleUnboxingToken.transferFrom(msg.sender, address(this), 1000000000000000000);
        } else if (tokenId == 3) {
            dappAnalysisSampleToken.transferFrom(msg.sender, address(this), 1000000000000000000);
        } else if (tokenId == 4) {
            dappSampleReadyToken.transferFrom(msg.sender, address(this), 1000000000000000000);
        }

        // Update staking balance
        stakingBalance[msg.sender] = stakingBalance[msg.sender] + 1;

        // Add user to stakers array *only* if they haven't staked already
        if(!hasStaked[msg.sender]) {
            stakers.push(msg.sender);
        }

        // Update staking status
        isStaking[msg.sender] = true;
        hasStaked[msg.sender] = true;
    }

}
