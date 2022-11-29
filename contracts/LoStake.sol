// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;
import "./LokeyERC20.sol";

contract LoStake {
    /* Variables //////////////////////////////////////////////////////////////////////////////////////////////////////*/
    LokeyERC20 private lo_key_erc20; // Lokey ERC20 contract
    // Uniswap V3: Positions NFT (UNI-V3-POS)
    address private uniswap_contract = 0xC36442b4a4522E871399CD717aBDD847Ab11FE88; 
    address private admin; // Admin
    bool private stake_flag; // Allows stake/unstake to occur
    address[] private all_pair_addresses; // contains all pairs. pair = other token;
    address private current_pair_address; // selected address
    uint256[] private all_token_ids; // contains all token ids for uniswap;
    uint256 private current_token_id; // selected token id
    /* End of Variables ////////////////////////////////////////////////////////////////////////////////////////////////////*/

    /* Structs & Mappings ////////////////////////////////////////////////////////////////////////////////////////////////////*/
    // staker's form per city
    struct StakeForm {
        address staker;
        string loCity;
        uint256 value;
        bool exists;
    }
    // Uniswap token ID info
    struct TokenIdInfo {
        uint256 token_id;
        address pair_address;
        string pair_name;
    }
    mapping(address => mapping(string => StakeForm)) private stakeForm;
    mapping(uint256 => TokenIdInfo) private token_id_info;

    /* End of Structs & Mappings //////////////////////////////////////////////////////////////////////////////////////////////*/

    event Staked(address indexed staker, uint256 amount, address current_pair, uint256 timestamp);
    constructor() {
        admin = msg.sender;
        current_pair_address = 0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48; // selected USDC coin
        all_pair_addresses.push(current_pair_address); // USDC contract address
        all_token_ids.push(349713); // USDC/LOKEY
        current_token_id = all_token_ids[0]; // selected usdc/lokey
        TokenIdInfo memory usdc_info = TokenIdInfo({
            token_id: current_token_id,
            pair_address: current_pair_address,
            pair_name: "USDC"
        });
        token_id_info[current_token_id] = usdc_info;
    }

    /* Modifiers / ////////////////////////////////////////////////////////////////////////////////////////// */

    modifier onlyAdmin() {
        require(msg.sender == admin, "Unauthorized");
        _;
    }
    modifier stakeSession() {
        require(stake_flag == true, "Non staking session");
        _;
    }
    modifier pairSelection() {
        require(current_pair_address != address(0), "Current Pair not set");
        _;
    }

    /* End of Modifiers ////////////////////////////////////////////////////////////////////////////////////////////////////  */

    /*  Admin only / ////////////////////////////////////////////////////////////////////////////////////////  */

    // sets lokey erc20 address
    function setLoKeyERC20(address erc20) public onlyAdmin returns (bool) {
        lo_key_erc20 = LokeyERC20(erc20);
        return true;
    }

    // sets current/active pair address
    function setCurrentPairAddress(uint256 index, uint256 id)
        public
        onlyAdmin
        returns (bool)
    {
        address[] memory pairs = all_pair_addresses;
        require(pairs.length >= index + 1, "Out of bounds");
        current_pair_address = pairs[index];
        current_token_id = id;
        return true;
    }

    // have contract send balance to admin
    function withdraw() public onlyAdmin returns (bool) {
        uint256 total_amount = lo_key_erc20.balanceOf(address(this));
        try lo_key_erc20.transfer(admin, total_amount) {
            return true;
        } catch Error(string memory reason) {
            // catch failing revert() and require()
            revert(reason);
        } catch (bytes memory _reason) {
            // catch failing assert()
            revert(string(abi.encodePacked(_reason)));
        }
    }

    // !PRIVATE! add new pair address
    function addPairAddress(address new_pair) private onlyAdmin returns (bool) {
        address[] memory _all_pair_addresses = all_pair_addresses;
        for (uint256 index; index < all_pair_addresses.length; index++) {
            require(_all_pair_addresses[index] != new_pair, "Pair exists");
        }
        all_pair_addresses.push(new_pair);
        return true;
    }

    // control staking
    function startStopStake(bool mode)
        public
        onlyAdmin
        returns (string memory response)
    {
        require(
            stake_flag != mode,
            string(abi.encodePacked("Mode is set to", mode))
        );
        if (mode == true) {
            require(current_pair_address != address(0), "Current pair not set");
        } else {
            current_pair_address = address(0);
        }
        stake_flag = mode;
        response = string.concat(
            "Stake enabled:",
            string(abi.encodePacked(mode))
        );
    }

    // add new uniswap pool token id
    function addTokenId(
        uint256 id,
        address pair_address,
        string memory pair_name
    ) public onlyAdmin returns (bool) {
        TokenIdInfo memory info = token_id_info[id];
        require(info.pair_address == address(0), "Token ID already added");
        require(pair_address != address(0), "Invalid pair address");
        TokenIdInfo memory new_info = TokenIdInfo({
            token_id: id,
            pair_address: pair_address,
            pair_name: pair_name
        });
        all_token_ids.push(id);
        token_id_info[id] = new_info;
        addPairAddress(pair_address);
        return true;
    }

    /* End of Admin Only ////////////////////////////////////////////////////////////////////////////////////////////////////  */

    /* Views ////////////////////////////////////////////////////////////////////////////////////////////////  */
    function viewAllPairAddresses() public view returns (address[] memory all) {
        all = all_pair_addresses;
    }

    function viewCurrentPairAddress() public view returns (address current) {
        current = current_pair_address;
    }

    function viewTokenIdInfo() public view returns (TokenIdInfo memory) {
        TokenIdInfo memory info = token_id_info[current_token_id];
        return info;
    }

    function viewAllTokenIds() public view returns (uint256[] memory all) {
        all = all_token_ids;
    }

    function viewAdmin() public view returns (address) {
        return admin;
    }

    function viewStakeState() public view returns (bool) {
        return stake_flag;
    }

    function viewERC20Address() public view returns (address) {
        return address(lo_key_erc20);
    }

    /* End of views ////////////////////////////////////////////////////////////////////////////////////////////////////  */

    /* Gen Use //////////////////////////////////////////////////////////////////////////////////////////////////////////////*/
    function stake(
        uint256 amount_lokey_desired,
        uint256 amount_pair_desired,
        uint256 amount_lokey_min,
        uint256 amount_pair_min,
        uint256 deadline,
        string memory city
    ) public payable pairSelection stakeSession returns (bool, string memory) {
        (bool _success, ) = current_pair_address.call(
            abi.encodeWithSignature(
                "approve(address,uint256)",
                uniswap_contract,
                msg.value
            )
        );
        if (_success == false) {
            revert(string(abi.encodePacked("Approve Failed, try again")));
        } else {
            try lo_key_erc20.mint(msg.value * 2) returns (bool) {
                lo_key_erc20.approve(uniswap_contract, msg.value);
                (bool success, bytes memory result) = uniswap_contract.call(
                    abi.encodeWithSignature(
                        "increaseLiquidity(uint256,uint256,uint256,uint256,uint256,uint256)",
                        current_token_id,
                        amount_lokey_desired,
                        amount_pair_desired,
                        amount_lokey_min,
                        amount_pair_min,
                        deadline
                    )
                );
                if (success == false) {
                    revert(
                        string(
                            abi.encodePacked(
                                "Increase Liquidity fail: ",
                                result
                            )
                        )
                    );
                } else {
                    // todo : Handle events after liquidity increase
                    StakeForm memory form = stakeForm[msg.sender][city];
                    if(form.exists == true) {
                        form.value += msg.value;
                        stakeForm[msg.sender][city] = form;
                    } else {
                        StakeForm memory _stakeForm = StakeForm({
                            staker: msg.sender,
                            loCity: city,
                            value: msg.value,
                            exists: true
                        });
                        stakeForm[msg.sender][city] = _stakeForm;
                    }
                    emit Staked(msg.sender,  msg.value, current_pair_address, block.timestamp);
                    return (success, string(abi.encodePacked(result)));
                }
            } catch Error(string memory reason) {
                // catch failing revert() and require()
                revert(reason);
            } catch (bytes memory _reason) {
                // catch failing assert()
                revert(string(abi.encodePacked(_reason)));
            }
        }
    }

    function unstake(
        uint256 liquidity,
        uint256 amount_lokey_min,
        uint256 amount_pair_min,
        uint256 deadline
    ) public pairSelection stakeSession returns (bool, string memory) {
        (bool success, bytes memory result) = uniswap_contract.call(
            abi.encodeWithSignature(
                "decreaseLiquidity((uint256,uint128,uint256,uint256,uint256)",
                current_token_id,
                liquidity,
                amount_lokey_min,
                amount_pair_min,
                deadline
            )
        );
        if (success == false) {
            revert(string(abi.encodePacked(result)));
        } else {
            // todo : Handle events after liquidity decrease
            return (success, string(abi.encodePacked(result)));
        }
    }
    /* End of Gen Use //////////////////////////////////////////////////////////////////////////////////////////////////////////////*/
}
