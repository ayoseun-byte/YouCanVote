// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "forge-std/Test.sol";
import "../src/DecentralisedVoting.sol";

contract DecentralizedVotingTest is Test {
    DecentralizedVoting public voting;
    
    address public admin;
    address public voter1;
    address public voter2;
    address public voter3;
    address public nonVoter;
    
    // Events to test
    event ElectionCreated(
        uint256 indexed electionId,
        uint256 startTime,
        uint256 endTime,
        string title,
        string description
    );
    
    event CandidateAdded(
        uint256 indexed electionId,
        uint256 indexed candidateId,
        string name
    );
    
    event VoteCast(
        uint256 indexed electionId,
        address indexed voter,
        uint256 indexed candidateId,
        uint256 timestamp
    );
    
    event VoterRegistered(
        address indexed voter,
        uint256 timestamp
    );
    
    event ElectionFinalized(
        uint256 indexed electionId,
        uint256 timestamp
    );
    
    function setUp() public {
        admin = address(this);
        voter1 = makeAddr("voter1");
        voter2 = makeAddr("voter2");
        voter3 = makeAddr("voter3");
        nonVoter = makeAddr("nonVoter");
        
        voting = new DecentralizedVoting();
    }
    
    /*//////////////////////////////////////////////////////////////
                        CONSTRUCTOR TESTS
    //////////////////////////////////////////////////////////////*/
    
    function test_Constructor() public {
        assertEq(voting.admin(), admin);
        assertEq(voting.getTotalElections(), 0);
    }
    
    /*//////////////////////////////////////////////////////////////
                      VOTER REGISTRATION TESTS
    //////////////////////////////////////////////////////////////*/
    
    function test_RegisterVoter() public {
        vm.expectEmit(true, false, false, true);
        emit VoterRegistered(voter1, block.timestamp);
        
        voting.registerVoter(voter1);
        
        assertTrue(voting.isRegistered(voter1));
    }
    
    function test_RegisterMultipleVoters() public {
        voting.registerVoter(voter1);
        voting.registerVoter(voter2);
        voting.registerVoter(voter3);
        
        assertTrue(voting.isRegistered(voter1));
        assertTrue(voting.isRegistered(voter2));
        assertTrue(voting.isRegistered(voter3));
    }
    
    function test_RevertWhen_RegisteringAlreadyRegisteredVoter() public {
        voting.registerVoter(voter1);
        
        vm.expectRevert("Voter already registered");
        voting.registerVoter(voter1);
    }
    
    function test_RevertWhen_RegisteringZeroAddress() public {
        vm.expectRevert("Invalid address");
        voting.registerVoter(address(0));
    }
    
    function test_RevertWhen_NonAdminRegistersVoter() public {
        vm.prank(voter1);
        vm.expectRevert("Only admin can perform this action");
        voting.registerVoter(voter2);
    }
    
    /*//////////////////////////////////////////////////////////////
                      ELECTION CREATION TESTS
    //////////////////////////////////////////////////////////////*/
    
    function test_CreateElection() public {
        uint256 startTime = block.timestamp + 1 minutes;
        uint256 endTime = startTime + 60 minutes;
        
        vm.expectEmit(true, false, false, true);
        emit ElectionCreated(
            1,
            startTime,
            endTime,
            "Test Election",
            "This is a test"
        );
        
        uint256 electionId = voting.createElection(
            "Test Election",
            "This is a test",
            60, // duration
            1   // start delay
        );
        
        assertEq(electionId, 1);
        assertEq(voting.getTotalElections(), 1);
        
        (uint256 start, uint256 end, bool finalized, bool exists) = voting.elections(1);
        assertEq(start, startTime);
        assertEq(end, endTime);
        assertFalse(finalized);
        assertTrue(exists);
    }
    
    function test_CreateMultipleElections() public {
        voting.createElection("Election 1", "First", 60, 0);
        voting.createElection("Election 2", "Second", 30, 0);
        voting.createElection("Election 3", "Third", 45, 0);
        
        assertEq(voting.getTotalElections(), 3);
    }
    
    function test_RevertWhen_CreatingElectionWithZeroDuration() public {
        vm.expectRevert("Duration must be positive");
        voting.createElection("Test", "Test", 0, 0);
    }
    
    function test_RevertWhen_NonAdminCreatesElection() public {
        vm.prank(voter1);
        vm.expectRevert("Only admin can perform this action");
        voting.createElection("Test", "Test", 60, 0);
    }
    
    /*//////////////////////////////////////////////////////////////
                      CANDIDATE ADDITION TESTS
    //////////////////////////////////////////////////////////////*/
    
    function test_AddCandidate() public {
        uint256 electionId = voting.createElection("Test", "Test", 60, 1);
        
        vm.expectEmit(true, true, false, true);
        emit CandidateAdded(electionId, 1, "Alice");
        
        voting.addCandidate(electionId, "Alice");
        
        assertEq(voting.getCandidateCount(electionId), 1);
        assertTrue(voting.validCandidate(electionId, 1));
    }
    
    function test_AddMultipleCandidates() public {
        uint256 electionId = voting.createElection("Test", "Test", 60, 1);
        
        voting.addCandidate(electionId, "Alice");
        voting.addCandidate(electionId, "Bob");
        voting.addCandidate(electionId, "Charlie");
        
        assertEq(voting.getCandidateCount(electionId), 3);
        assertTrue(voting.validCandidate(electionId, 1));
        assertTrue(voting.validCandidate(electionId, 2));
        assertTrue(voting.validCandidate(electionId, 3));
    }
    
    function test_RevertWhen_AddingCandidateToNonexistentElection() public {
        vm.expectRevert("Election does not exist");
        voting.addCandidate(999, "Alice");
    }
    
    function test_RevertWhen_AddingCandidateAfterElectionStarts() public {
        uint256 electionId = voting.createElection("Test", "Test", 60, 0);
        
        vm.warp(block.timestamp + 1);
        
        vm.expectRevert("Election already started");
        voting.addCandidate(electionId, "Alice");
    }
    
    function test_RevertWhen_NonAdminAddsCandidate() public {
        uint256 electionId = voting.createElection("Test", "Test", 60, 1);
        
        vm.prank(voter1);
        vm.expectRevert("Only admin can perform this action");
        voting.addCandidate(electionId, "Alice");
    }
    
    /*//////////////////////////////////////////////////////////////
                          VOTING TESTS
    //////////////////////////////////////////////////////////////*/
    
    function test_Vote() public {
        // Setup
        voting.registerVoter(voter1);
        uint256 electionId = voting.createElection("Test", "Test", 60, 0);
        voting.addCandidate(electionId, "Alice");
        
        // Warp to election start
        vm.warp(block.timestamp + 1);
        
        vm.expectEmit(true, true, true, true);
        emit VoteCast(electionId, voter1, 1, block.timestamp);
        
        vm.prank(voter1);
        voting.vote(electionId, 1);
        
        assertTrue(voting.hasVoterVoted(electionId, voter1));
    }
    
    function test_MultipleVotersVote() public {
        // Setup
        voting.registerVoter(voter1);
        voting.registerVoter(voter2);
        voting.registerVoter(voter3);
        
        uint256 electionId = voting.createElection("Test", "Test", 60, 0);
        voting.addCandidate(electionId, "Alice");
        voting.addCandidate(electionId, "Bob");
        
        vm.warp(block.timestamp + 1);
        
        vm.prank(voter1);
        voting.vote(electionId, 1);
        
        vm.prank(voter2);
        voting.vote(electionId, 2);
        
        vm.prank(voter3);
        voting.vote(electionId, 1);
        
        assertTrue(voting.hasVoterVoted(electionId, voter1));
        assertTrue(voting.hasVoterVoted(electionId, voter2));
        assertTrue(voting.hasVoterVoted(electionId, voter3));
    }
    
    function test_RevertWhen_UnregisteredVoterVotes() public {
        uint256 electionId = voting.createElection("Test", "Test", 60, 0);
        voting.addCandidate(electionId, "Alice");
        
        vm.warp(block.timestamp + 1);
        
        vm.prank(nonVoter);
        vm.expectRevert("You are not a registered voter");
        voting.vote(electionId, 1);
    }
    
    function test_RevertWhen_VotingBeforeElectionStarts() public {
        voting.registerVoter(voter1);
        uint256 electionId = voting.createElection("Test", "Test", 60, 10);
        voting.addCandidate(electionId, "Alice");
        
        vm.prank(voter1);
        vm.expectRevert("Election not started");
        voting.vote(electionId, 1);
    }
    
    function test_RevertWhen_VotingAfterElectionEnds() public {
        voting.registerVoter(voter1);
        uint256 electionId = voting.createElection("Test", "Test", 1, 0);
        voting.addCandidate(electionId, "Alice");
        
        // Warp past election end
        vm.warp(block.timestamp + 2 minutes);
        
        vm.prank(voter1);
        vm.expectRevert("Election ended");
        voting.vote(electionId, 1);
    }
    
    function test_RevertWhen_VotingTwice() public {
        voting.registerVoter(voter1);
        uint256 electionId = voting.createElection("Test", "Test", 60, 0);
        voting.addCandidate(electionId, "Alice");
        
        vm.warp(block.timestamp + 1);
        
        vm.startPrank(voter1);
        voting.vote(electionId, 1);
        
        vm.expectRevert("You have already voted in this election");
        voting.vote(electionId, 1);
        vm.stopPrank();
    }
    
    function test_RevertWhen_VotingForInvalidCandidate() public {
        voting.registerVoter(voter1);
        uint256 electionId = voting.createElection("Test", "Test", 60, 0);
        voting.addCandidate(electionId, "Alice");
        
        vm.warp(block.timestamp + 1);
        
        vm.prank(voter1);
        vm.expectRevert("Invalid candidate");
        voting.vote(electionId, 999);
    }
    
    function test_RevertWhen_VotingInNonexistentElection() public {
        voting.registerVoter(voter1);
        
        vm.prank(voter1);
        vm.expectRevert("Election does not exist");
        voting.vote(999, 1);
    }
    
    /*//////////////////////////////////////////////////////////////
                    ELECTION FINALIZATION TESTS
    //////////////////////////////////////////////////////////////*/
    
    function test_FinalizeElection() public {
        uint256 electionId = voting.createElection("Test", "Test", 1, 0);
        
        // Warp past election end
        vm.warp(block.timestamp + 2 minutes);
        
        vm.expectEmit(true, false, false, true);
        emit ElectionFinalized(electionId, block.timestamp);
        
        voting.finalizeElection(electionId);
        
        (, , bool finalized, ) = voting.elections(electionId);
        assertTrue(finalized);
    }
    
    function test_RevertWhen_FinalizingBeforeElectionEnds() public {
        uint256 electionId = voting.createElection("Test", "Test", 60, 0);
        
        vm.expectRevert("Election is still ongoing");
        voting.finalizeElection(electionId);
    }
    
    function test_RevertWhen_FinalizingAlreadyFinalizedElection() public {
        uint256 electionId = voting.createElection("Test", "Test", 1, 0);
        
        vm.warp(block.timestamp + 2 minutes);
        voting.finalizeElection(electionId);
        
        vm.expectRevert("Election already finalized");
        voting.finalizeElection(electionId);
    }
    
    function test_RevertWhen_NonAdminFinalizesElection() public {
        uint256 electionId = voting.createElection("Test", "Test", 1, 0);
        vm.warp(block.timestamp + 2 minutes);
        
        vm.prank(voter1);
        vm.expectRevert("Only admin can perform this action");
        voting.finalizeElection(electionId);
    }
    
    function test_RevertWhen_VotingAfterFinalization() public {
        voting.registerVoter(voter1);
        uint256 electionId = voting.createElection("Test", "Test", 1, 0);
        voting.addCandidate(electionId, "Alice");
        
        vm.warp(block.timestamp + 2 minutes);
        voting.finalizeElection(electionId);
        
        vm.prank(voter1);
        vm.expectRevert("Election already finalized");
        voting.vote(electionId, 1);
    }
    
    /*//////////////////////////////////////////////////////////////
                      ELECTION STATUS TESTS
    //////////////////////////////////////////////////////////////*/
    
    function test_GetElectionStatus_Pending() public {
        uint256 electionId = voting.createElection("Test", "Test", 60, 10);
        
        string memory status = voting.getElectionStatus(electionId);
        assertEq(status, "Pending");
    }
    
    function test_GetElectionStatus_Active() public {
        uint256 electionId = voting.createElection("Test", "Test", 60, 0);
        
        vm.warp(block.timestamp + 1);
        
        string memory status = voting.getElectionStatus(electionId);
        assertEq(status, "Active");
    }
    
    function test_GetElectionStatus_Ended() public {
        uint256 electionId = voting.createElection("Test", "Test", 1, 0);
        
        vm.warp(block.timestamp + 2 minutes);
        
        string memory status = voting.getElectionStatus(electionId);
        assertEq(status, "Ended");
    }
    
    function test_GetElectionStatus_Finalized() public {
        uint256 electionId = voting.createElection("Test", "Test", 1, 0);
        
        vm.warp(block.timestamp + 2 minutes);
        voting.finalizeElection(electionId);
        
        string memory status = voting.getElectionStatus(electionId);
        assertEq(status, "Finalized");
    }
    
    /*//////////////////////////////////////////////////////////////
                      ADMIN TRANSFER TESTS
    //////////////////////////////////////////////////////////////*/
    
    function test_TransferAdmin() public {
        address newAdmin = makeAddr("newAdmin");
        
        voting.transferAdmin(newAdmin);
        
        assertEq(voting.admin(), newAdmin);
    }
    
    function test_RevertWhen_TransferringToZeroAddress() public {
        vm.expectRevert("Invalid address");
        voting.transferAdmin(address(0));
    }
    
    function test_RevertWhen_NonAdminTransfersAdmin() public {
        address newAdmin = makeAddr("newAdmin");
        
        vm.prank(voter1);
        vm.expectRevert("Only admin can perform this action");
        voting.transferAdmin(newAdmin);
    }
    
    function test_NewAdminCanPerformAdminActions() public {
        address newAdmin = makeAddr("newAdmin");
        
        voting.transferAdmin(newAdmin);
        
        vm.prank(newAdmin);
        voting.registerVoter(voter1);
        
        assertTrue(voting.isRegistered(voter1));
    }
    
    /*//////////////////////////////////////////////////////////////
                        VIEW FUNCTION TESTS
    //////////////////////////////////////////////////////////////*/
    
    function test_HasVoterVoted_False() public {
        voting.registerVoter(voter1);
        uint256 electionId = voting.createElection("Test", "Test", 60, 0);
        
        assertFalse(voting.hasVoterVoted(electionId, voter1));
    }
    
    function test_HasVoterVoted_True() public {
        voting.registerVoter(voter1);
        uint256 electionId = voting.createElection("Test", "Test", 60, 0);
        voting.addCandidate(electionId, "Alice");
        
        vm.warp(block.timestamp + 1);
        
        vm.prank(voter1);
        voting.vote(electionId, 1);
        
        assertTrue(voting.hasVoterVoted(electionId, voter1));
    }
    
    function test_GetCandidateCount() public {
        uint256 electionId = voting.createElection("Test", "Test", 60, 1);
        
        assertEq(voting.getCandidateCount(electionId), 0);
        
        voting.addCandidate(electionId, "Alice");
        assertEq(voting.getCandidateCount(electionId), 1);
        
        voting.addCandidate(electionId, "Bob");
        assertEq(voting.getCandidateCount(electionId), 2);
    }
    
    /*//////////////////////////////////////////////////////////////
                        INTEGRATION TESTS
    //////////////////////////////////////////////////////////////*/
    
    function test_FullElectionCycle() public {
        // Register voters
        voting.registerVoter(voter1);
        voting.registerVoter(voter2);
        voting.registerVoter(voter3);
        
        // Create election
        uint256 electionId = voting.createElection(
            "Best Developer",
            "Vote for the best developer",
            60,
            1
        );
        
        // Add candidates
        voting.addCandidate(electionId, "Alice");
        voting.addCandidate(electionId, "Bob");
        voting.addCandidate(electionId, "Charlie");
        
        assertEq(voting.getElectionStatus(electionId), "Pending");
        
        // Start election
        vm.warp(block.timestamp + 1 minutes);
        assertEq(voting.getElectionStatus(electionId), "Active");
        
        // Cast votes
        vm.prank(voter1);
        voting.vote(electionId, 1);
        
        vm.prank(voter2);
        voting.vote(electionId, 1);
        
        vm.prank(voter3);
        voting.vote(electionId, 2);
        
        // End election
        vm.warp(block.timestamp + 60 minutes);
        assertEq(voting.getElectionStatus(electionId), "Ended");
        
        // Finalize
        voting.finalizeElection(electionId);
        assertEq(voting.getElectionStatus(electionId), "Finalized");
        
        // Verify votes were cast
        assertTrue(voting.hasVoterVoted(electionId, voter1));
        assertTrue(voting.hasVoterVoted(electionId, voter2));
        assertTrue(voting.hasVoterVoted(electionId, voter3));
    }
    
    function test_MultipleElectionsSimultaneously() public {
        voting.registerVoter(voter1);
        
        uint256 election1 = voting.createElection("Election 1", "First", 60, 0);
        uint256 election2 = voting.createElection("Election 2", "Second", 60, 0);
        
        voting.addCandidate(election1, "Alice");
        voting.addCandidate(election2, "Bob");
        
        vm.warp(block.timestamp + 1);
        
        vm.startPrank(voter1);
        voting.vote(election1, 1);
        voting.vote(election2, 1);
        vm.stopPrank();
        
        assertTrue(voting.hasVoterVoted(election1, voter1));
        assertTrue(voting.hasVoterVoted(election2, voter1));
    }
    
    /*//////////////////////////////////////////////////////////////
                          FUZZ TESTS
    //////////////////////////////////////////////////////////////*/
    
    function testFuzz_CreateElection(
        uint256 duration,
        uint256 startDelay
    ) public {
        vm.assume(duration > 0 && duration < 365 days);
        vm.assume(startDelay < 365 days);
        
        uint256 electionId = voting.createElection(
            "Test",
            "Test",
            duration,
            startDelay
        );
        
        assertEq(electionId, 1);
        assertEq(voting.getTotalElections(), 1);
    }
    
    function testFuzz_RegisterVoters(address voter) public {
        vm.assume(voter != address(0));
        vm.assume(!voting.isRegistered(voter));
        
        voting.registerVoter(voter);
        assertTrue(voting.isRegistered(voter));
    }
}