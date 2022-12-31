      Cryptocurrency mining has traditionally required specialized hardware and high energy consumption. In this paper, we propose a new crypto mining device that utilizes proof of space-time to secure the network and earn tokens by verifying transactions. The device uses long range radio to transmit and sign transactions, making it a decentralized and energy-efficient option for mining. By utilizing this innovative approach, the device can provide a steady stream of income for its owners while also contributing to the security and stability of the network. In this paper, we will discuss the technical details and potential benefits of this unique mining device.

    Lokey is a network of devices that only communicate using Bluetooth and long-range radio frequencies. Devices called 'nodes' validate transaction without the need for expensive and energy intensive computers and could potentially serve as an alternative to Bitcoin. The network relies on distributed ledger technology, similar to a Bitcoin's blockchain, to record and verify transactions.

    The advantage of this network is that it operates in a decentralized and distributed manner, with devices communicating directly with each other rather than relying on a central server or authority. This makes the network more resilient to attacks and outages, as there is no single point of failure.

    By not having to rely on ever expanding computing reasources, Lokey is more energy efficient than traditional cryptocurrencies like Bitcoin, which rely on proof-of-work (PoW) to secure the network. The devices in the network only need to communicate with each other using Bluetooth and long-range radio frequencies, rather than using energy-intensive mining hardware to solve complex mathematical problems.

    Lokey uses Proof of Space Time to create a unique alpha numeric code called a hash based on the location in time and space of a user. The Space Time hash is linked to a public address which is accessable with a private key. 

Ethereum address using the Keccak-256 hashing algorithm:

pragma solidity ^0.7.0;

import "https://github.com/OpenZeppelin/openzeppelin-solidity/contracts/math/SafeMath.sol";

contract CoordinateHash {
    using SafeMath for uint256;

    // Coordinates are stored as two uint256 values (latitude and longitude)
    uint256 public latitude;
    uint256 public longitude;

    // The address generated from the coordinates
    address public coordinateAddress;

    constructor(uint256 _latitude, uint256 _longitude) public {
        latitude = _latitude;
        longitude = _longitude;

        // Concatenate the latitude and longitude values and hash them to create the coordinate address
        bytes32 hash = keccak256(abi.encodePacked(latitude, longitude));
        coordinateAddress = address(hash);
    }
}

    This contract has two public variables, latitude and longitude, which store the user's location coordinates as unsigned 256-bit integers. It also has a public variable, coordinateAddress, which is the Ethereum address generated from the coordinates using the Keccak-256 hashing algorithm.

    The contract's constructor function takes in the latitude and longitude values as arguments and assigns them to the latitude and longitude variables. It then concatenates the two values and hashes them using the keccak256() function to create the coordinateAddress. The abi.encodePacked() function is used to pack the values into a single byte array before hashing.

    Proof of a unique point in space and time, also known as Proof of Location (PoL), is a type of cryptographic technique that can be used to verify the ownership of a crypto wallet. In this system, the owner of a wallet must prove that they are physically present at a specific location at a specific time in order to prove their ownership of the wallet.


    The wallet owner initiates a proof of location request: The wallet owner initiates a request to prove their ownership of the wallet by providing a specific location and time at which they will perform the proof.

    The wallet owner performs the proof: At the specified time, the wallet owner must physically go to the specified location and perform some action to prove their presence there. This might involve taking a photo or video at the location, or using a special device or app to send a message or data from the location.

    The proof is verified: The proof is then sent to a verification server, which checks that the proof is genuine and that the wallet owner was indeed present at the specified location at the specified time. If the proof is valid, the wallet owner's ownership of the wallet is verified.

PoL can be an effective way to verify ownership of a crypto wallet because it requires the wallet owner to physically be present at a specific location in order to perform the proof. This makes it difficult for anyone else to impersonate the wallet owner and gain access to the wallet. However, PoL systems can be complex and may require specialized hardware or software to perform the proof, and they may not be suitable for all types of wallet or use cases.

    As an added layer of security, users have the option to utilize a Delegated Proof of Stake (DPoS) system. Stakers of Lokey's KEY token can vote on network proposals and earn additional KEY token by locking up for a period of time. The process of reaching consensus and validating transactions is carried out by a group of elected "delegates" who are responsible for representing the interests of the wider network. These delegates are chosen through a voting process, in which network participants can vote for the delegates they believe will best represent their interests.

    Network participants nominate and vote for delegates: Network participants can nominate themselves or others as delegates, and other participants can then vote for the nominees they believe will be the most effective at representing their interests. The delegates with the most votes are elected to represent the network.

    Delegates produce blocks and validate transactions: The elected delegates are responsible for producing new blocks and validating transactions in the network. They do this by listening for transactions on the network, adding them to a block, and then broadcasting the block to the rest of the network for validation.

    Network participants validate and confirm blocks: Once a block has been broadcast to the network, other nodes can validate the transactions contained within it and confirm that they are valid. If a sufficient number of nodes agree that the block is valid, it can be added to the blockchain.

    Delegates are rewarded for their efforts: As a reward for their efforts in producing and validating blocks, delegates may receive a portion of the transaction fees or other rewards earned by the network.




  
