// Install: npm install ethers

import { ethers } from "ethers";

// Contract configuration
const CONTRACT_ADDRESS = "0xD4270b6F0aBCAE9EEE50f04E7d10a7286c7DeD4F";

const CONTRACT_ABI = [
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "electionId",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "candidateId",
        type: "uint256",
      },
      { indexed: false, internalType: "string", name: "name", type: "string" },
    ],
    name: "CandidateAdded",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "electionId",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "address",
        name: "creator",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "startTime",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "endTime",
        type: "uint256",
      },
      { indexed: false, internalType: "string", name: "title", type: "string" },
      {
        indexed: false,
        internalType: "string",
        name: "description",
        type: "string",
      },
    ],
    name: "ElectionCreated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "electionId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "timestamp",
        type: "uint256",
      },
    ],
    name: "ElectionFinalized",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "electionId",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "address",
        name: "voter",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "candidateId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "timestamp",
        type: "uint256",
      },
    ],
    name: "VoteCast",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "voter",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "timestamp",
        type: "uint256",
      },
    ],
    name: "VoterRegistered",
    type: "event",
  },
  {
    inputs: [],
    name: "admin",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "_electionId", type: "uint256" },
      { internalType: "string", name: "_name", type: "string" },
    ],
    name: "addCandidate",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    name: "candidateCount",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "string", name: "_title", type: "string" },
      { internalType: "string", name: "_description", type: "string" },
      { internalType: "uint256", name: "_durationMinutes", type: "uint256" },
      { internalType: "uint256", name: "_startDelayMinutes", type: "uint256" },
    ],
    name: "createElection",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    name: "elections",
    outputs: [
      { internalType: "uint256", name: "startTime", type: "uint256" },
      { internalType: "uint256", name: "endTime", type: "uint256" },
      { internalType: "bool", name: "finalized", type: "bool" },
      { internalType: "bool", name: "exists", type: "bool" },
      { internalType: "address", name: "creator", type: "address" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "_electionId", type: "uint256" }],
    name: "finalizeElection",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "_electionId", type: "uint256" }],
    name: "getCandidateCount",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "_electionId", type: "uint256" }],
    name: "getElectionCreator",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "_electionId", type: "uint256" }],
    name: "getElectionStatus",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getTotalElections",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "", type: "uint256" },
      { internalType: "address", name: "", type: "address" },
    ],
    name: "hasVoted",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "_electionId", type: "uint256" },
      { internalType: "address", name: "_voter", type: "address" },
    ],
    name: "hasVoterVoted",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "", type: "address" }],
    name: "isRegistered",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "_voter", type: "address" }],
    name: "registerVoter",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "_newAdmin", type: "address" }],
    name: "transferAdmin",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "", type: "uint256" },
      { internalType: "uint256", name: "", type: "uint256" },
    ],
    name: "validCandidate",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "_electionId", type: "uint256" },
      { internalType: "uint256", name: "_candidateId", type: "uint256" },
    ],
    name: "vote",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

// Network configuration
const CAMP_NETWORK = {
  chainId: "0x1CBC67C35A",
  chainName: "Camp Network Basecamp",
  nativeCurrency: {
    name: "CAMP",
    symbol: "CAMP",
    decimals: 18,
  },
  rpcUrls: ["https://rpc.basecamp.t.raas.gelato.cloud"],
  blockExplorerUrls: ["https://basecamp.cloud.blockscout.com/"],
};

// Helper functions
const getProvider = () => {
  if (typeof window.ethereum !== "undefined") {
    return new ethers.BrowserProvider(window.ethereum);
  }
  throw new Error("Please install MetaMask!");
};

const getSigner = async () => {
  const provider = getProvider();
  return await provider.getSigner();
};

const getContract = async () => {
  const signer = await getSigner();
  return new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);
};

const getReadOnlyContract = () => {
  const provider = new ethers.JsonRpcProvider(CAMP_NETWORK.rpcUrls[0]);
  return new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, provider);
};

// ==================== EXPORTED FUNCTIONS ====================

/**
 * Connect wallet and switch to Camp Network
 */
export const connectWallet = async () => {
  try {
    // Check if MetaMask is installed
    if (typeof window.ethereum === "undefined") {
      throw new Error("Please install MetaMask to use this app!");
    }

    // Request account access
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });

    if (!accounts || accounts.length === 0) {
      throw new Error("No accounts found. Please unlock MetaMask.");
    }

    // Get current chain ID
    const currentChainId = await window.ethereum.request({
      method: "eth_chainId",
    });

    console.log("Current chain:", currentChainId);
    console.log("Target chain:", CAMP_NETWORK.chainId);

    // Compare chain IDs (case-insensitive)
    if (currentChainId.toLowerCase() !== CAMP_NETWORK.chainId.toLowerCase()) {
      console.log("Wrong network, switching...");

      try {
        // Try to switch to Camp Network
        await window.ethereum.request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: CAMP_NETWORK.chainId }],
        });
        console.log("Switched to Camp Network");
      } catch (switchError) {
        console.log("Switch error:", switchError);

        // If the network doesn't exist, add it
        if (switchError.code === 4902 || switchError.code === -32603) {
          console.log("Network not found, adding...");
          try {
            await window.ethereum.request({
              method: "wallet_addEthereumChain",
              params: [CAMP_NETWORK],
            });
            console.log("Camp Network added successfully");
          } catch (addError) {
            console.error("Error adding network:", addError);
            throw new Error(
              "Failed to add Camp Network. Please add it manually in MetaMask."
            );
          }
        } else {
          throw switchError;
        }
      }
    }

    // Verify we're on the correct network after switch
    const finalChainId = await window.ethereum.request({
      method: "eth_chainId",
    });

    if (finalChainId.toLowerCase() !== CAMP_NETWORK.chainId.toLowerCase()) {
      throw new Error("Please switch to Camp Network Basecamp in MetaMask");
    }

    console.log("Connected successfully:", accounts[0]);
    return accounts[0];
  } catch (error) {
    console.error("Connection error:", error);

    // User-friendly error messages
    if (error.code === 4001) {
      throw new Error(
        "Connection rejected. Please approve the connection in MetaMask."
      );
    } else if (error.code === -32002) {
      throw new Error("Connection request pending. Please check MetaMask.");
    } else {
      throw error;
    }
  }
};

/**
 * Get current connected account
 */
export const getCurrentAccount = async () => {
  try {
    const accounts = await window.ethereum.request({
      method: "eth_accounts",
    });
    return accounts[0] || null;
  } catch (error) {
    console.error("Error getting account:", error);
    return null;
  }
};

/**
 * Register a voter (admin only)
 */
export const registerVoter = async (voterAddress) => {
  try {
    const contract = await getContract();
    const tx = await contract.registerVoter(voterAddress);
    const receipt = await tx.wait();
    return receipt;
  } catch (error) {
    console.error("Error registering voter:", error);
    throw error;
  }
};

/**
 * Create a new election (ANYONE CAN CREATE)
 */
export const createElection = async (
  title,
  description,
  durationMinutes,
  startDelayMinutes = 0
) => {
  try {
    const contract = await getContract();
    const tx = await contract.createElection(
      title,
      description,
      durationMinutes,
      startDelayMinutes
    );
    const receipt = await tx.wait();

    // Extract election ID from events
    const event = receipt.logs.find((log) => {
      try {
        const parsed = contract.interface.parseLog(log);
        return parsed.name === "ElectionCreated";
      } catch {
        return false;
      }
    });

    if (event) {
      const parsed = contract.interface.parseLog(event);
      return {
        receipt,
        electionId: parsed.args.electionId.toString(),
        creator: parsed.args.creator,
      };
    }

    return { receipt };
  } catch (error) {
    console.error("Error creating election:", error);
    throw error;
  }
};

/**
 * Add a candidate to an election (election creator or admin only)
 */
export const addCandidate = async (electionId, candidateName) => {
  try {
    const contract = await getContract();
    const tx = await contract.addCandidate(electionId, candidateName);
    const receipt = await tx.wait();
    return receipt;
  } catch (error) {
    console.error("Error adding candidate:", error);
    throw error;
  }
};

/**
 * Cast a vote
 */
export const castVote = async (electionId, candidateId) => {
  try {
    const contract = await getContract();
    const tx = await contract.vote(electionId, candidateId);
    const receipt = await tx.wait();
    return receipt;
  } catch (error) {
    console.error("Error casting vote:", error);
    throw error;
  }
};

/**
 * Finalize an election (election creator or admin only)
 */
export const finalizeElection = async (electionId) => {
  try {
    const contract = await getContract();
    const tx = await contract.finalizeElection(electionId);
    const receipt = await tx.wait();
    return receipt;
  } catch (error) {
    console.error("Error finalizing election:", error);
    throw error;
  }
};

/**
 * Get election status
 */
export const getElectionStatus = async (electionId) => {
  try {
    const contract = getReadOnlyContract();
    const status = await contract.getElectionStatus(electionId);
    return status;
  } catch (error) {
    console.error("Error getting election status:", error);
    throw error;
  }
};

/**
 * Get election details (now includes creator address)
 */
export const getElectionDetails = async (electionId) => {
  try {
    const contract = getReadOnlyContract();
    const election = await contract.elections(electionId);
    return {
      startTime: election.startTime.toString(),
      endTime: election.endTime.toString(),
      finalized: election.finalized,
      exists: election.exists,
      creator: election.creator,
    };
  } catch (error) {
    console.error("Error getting election details:", error);
    throw error;
  }
};

/**
 * Get election creator address
 */
export const getElectionCreator = async (electionId) => {
  try {
    const contract = getReadOnlyContract();
    const creator = await contract.getElectionCreator(electionId);
    return creator;
  } catch (error) {
    console.error("Error getting election creator:", error);
    throw error;
  }
};

/**
 * Check if current user is the creator of an election
 */
export const isCurrentUserElectionCreator = async (electionId) => {
  try {
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const currentAddress = await signer.getAddress();

    const creator = await getElectionCreator(electionId);

    const isCreator = currentAddress.toLowerCase() === creator.toLowerCase();

    console.log("Current wallet:", currentAddress);
    console.log("Election creator:", creator);
    console.log("Is creator:", isCreator);

    return isCreator;
  } catch (error) {
    console.error("Error checking if current user is creator:", error);
    throw error;
  }
};

/**
 * Check if a voter has voted in an election
 */
export const hasVoterVoted = async (electionId, voterAddress) => {
  try {
    const contract = getReadOnlyContract();
    const voted = await contract.hasVoterVoted(electionId, voterAddress);
    return voted;
  } catch (error) {
    console.error("Error checking if voter has voted:", error);
    throw error;
  }
};

/**
 * Check if an address is registered
 */
export const isVoterRegistered = async (voterAddress) => {
  try {
    const contract = getReadOnlyContract();
    const registered = await contract.isRegistered(voterAddress);
    return registered;
  } catch (error) {
    console.error("Error checking registration:", error);
    throw error;
  }
};

/**
 * Get candidate count for an election
 */
export const getCandidateCount = async (electionId) => {
  try {
    const contract = getReadOnlyContract();
    const count = await contract.getCandidateCount(electionId);
    return count.toString();
  } catch (error) {
    console.error("Error getting candidate count:", error);
    throw error;
  }
};

/**
 * Get total number of elections
 */
export const getTotalElections = async () => {
  try {
    const contract = getReadOnlyContract();
    const total = await contract.getTotalElections();
    return total.toString();
  } catch (error) {
    console.error("Error getting total elections:", error);
    throw error;
  }
};

/**
 * Get admin address
 */
export const getAdmin = async () => {
  try {
    const contract = getReadOnlyContract();
    const admin = await contract.admin();
    return admin;
  } catch (error) {
    console.error("Error getting admin:", error);
    throw error;
  }
};

/**
 * Transfer admin role (admin only)
 */
export const transferAdmin = async (newAdminAddress) => {
  try {
    const contract = await getContract();
    const tx = await contract.transferAdmin(newAdminAddress);
    const receipt = await tx.wait();
    return receipt;
  } catch (error) {
    console.error("Error transferring admin:", error);
    throw error;
  }
};

/**
 * Listen to contract events
 */
export const listenToEvents = async (eventName, callback) => {
  try {
    const contract = await getContract();
    contract.on(eventName, (...args) => {
      callback(...args);
    });
    return contract;
  } catch (error) {
    console.error("Error setting up event listener:", error);
    throw error;
  }
};

/**
 * Remove event listeners
 */
export const removeEventListeners = async (contract, eventName) => {
  try {
    if (eventName) {
      contract.removeAllListeners(eventName);
    } else {
      contract.removeAllListeners();
    }
  } catch (error) {
    console.error("Error removing event listeners:", error);
    throw error;
  }
};

/**
 * Get past events (useful for getting vote tallies)
 */
export const getPastEvents = async (
  eventName,
  fromBlock = 0,
  toBlock = "latest"
) => {
  try {
    const provider = new ethers.JsonRpcProvider(CAMP_NETWORK.rpcUrls[0]);
    const contract = new ethers.Contract(
      CONTRACT_ADDRESS,
      CONTRACT_ABI,
      provider
    );

    const filter = contract.filters[eventName]();
    const events = await contract.queryFilter(filter, fromBlock, toBlock);

    return events.map((event) => ({
      ...event.args,
      blockNumber: event.blockNumber,
      transactionHash: event.transactionHash,
    }));
  } catch (error) {
    console.error("Error getting past events:", error);
    throw error;
  }
};

/**
 * Get all votes for an election (from events)
 */
export const getElectionVotes = async (electionId) => {
  try {
    const provider = new ethers.JsonRpcProvider(CAMP_NETWORK.rpcUrls[0]);
    const contract = new ethers.Contract(
      CONTRACT_ADDRESS,
      CONTRACT_ABI,
      provider
    );

    const filter = contract.filters.VoteCast(electionId);
    const events = await contract.queryFilter(filter, 0, "latest");

    return events.map((event) => ({
      voter: event.args.voter,
      candidateId: event.args.candidateId.toString(),
      timestamp: event.args.timestamp.toString(),
      transactionHash: event.transactionHash,
    }));
  } catch (error) {
    console.error("Error getting election votes:", error);
    throw error;
  }
};

/**
 * Get all candidates for an election (from events)
 */
export const getElectionCandidates = async (electionId) => {
  try {
    const provider = new ethers.JsonRpcProvider(CAMP_NETWORK.rpcUrls[0]);
    const contract = new ethers.Contract(
      CONTRACT_ADDRESS,
      CONTRACT_ABI,
      provider
    );

    const filter = contract.filters.CandidateAdded(electionId);
    const events = await contract.queryFilter(filter, 0, "latest");

    return events.map((event) => ({
      candidateId: event.args.candidateId.toString(),
      name: event.args.name,
      transactionHash: event.transactionHash,
    }));
  } catch (error) {
    console.error("Error getting candidates:", error);
    throw error;
  }
};

/**
 * Get vote tally for an election
 */
export const getVoteTally = async (electionId) => {
  try {
    const votes = await getElectionVotes(electionId);
    const tally = {};

    votes.forEach((vote) => {
      const candidateId = vote.candidateId;
      tally[candidateId] = (tally[candidateId] || 0) + 1;
    });

    return tally;
  } catch (error) {
    console.error("Error getting vote tally:", error);
    throw error;
  }
};

/**
 * Get all elections created by a specific address
 */
export const getElectionsByCreator = async (creatorAddress) => {
  try {
    const provider = new ethers.JsonRpcProvider(CAMP_NETWORK.rpcUrls[0]);
    const contract = new ethers.Contract(
      CONTRACT_ADDRESS,
      CONTRACT_ABI,
      provider
    );

    const filter = contract.filters.ElectionCreated(null, creatorAddress);
    const events = await contract.queryFilter(filter, 0, "latest");

    return events.map((event) => ({
      electionId: event.args.electionId.toString(),
      creator: event.args.creator,
      startTime: event.args.startTime.toString(),
      endTime: event.args.endTime.toString(),
      title: event.args.title,
      description: event.args.description,
      transactionHash: event.transactionHash,
    }));
  } catch (error) {
    console.error("Error getting elections by creator:", error);
    throw error;
  }
};

// Export contract details for reference
export const CONTRACT_INFO = {
  address: CONTRACT_ADDRESS,
  network: CAMP_NETWORK,
  blockExplorer: `https://basecamp.cloud.blockscout.com/address/${CONTRACT_ADDRESS}`,
};

export const checkAdmin = async () => {
  try {
    const contract = getReadOnlyContract();
    const adminAddress = await contract.admin();
    console.log("Current admin address:", adminAddress);
    return adminAddress;
  } catch (error) {
    console.error("Error checking admin:", error);
    throw error;
  }
};

/**
 * Check if current connected wallet is admin
 */
export const isCurrentUserAdmin = async () => {
  try {
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const currentAddress = await signer.getAddress();

    const contract = getReadOnlyContract();
    const adminAddress = await contract.admin();

    const isAdmin = currentAddress.toLowerCase() === adminAddress.toLowerCase();

    console.log("Current wallet:", currentAddress);
    console.log("Admin address:", adminAddress);
    console.log("Is admin:", isAdmin);

    return isAdmin;
  } catch (error) {
    console.error("Error checking if current user is admin:", error);
    throw error;
  }
};

/**
 * Transfer admin rights to a new address (must be called by current admin)
 */
export const transferAdminRights = async (newAdminAddress) => {
  try {
    const contract = await getContract();
    const tx = await contract.transferAdmin(newAdminAddress);
    const receipt = await tx.wait();
    console.log("Admin transferred to:", newAdminAddress);
    return receipt;
  } catch (error) {
    console.error("Error transferring admin:", error);
    throw error;
  }
};
