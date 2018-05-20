pragma solidity ^0.4.18;


contract ERC721Abstract
{
	function implementsERC721() public pure returns (bool);
	function balanceOf(address _owner) public view returns (uint256 balance);
	function ownerOf(uint256 _tokenId) public view returns (address owner);
	function approve(address _to, uint256 _tokenId) public;
	function transferFrom(address _from, address _to, uint256 _tokenId) public;
	function transfer(address _to, uint256 _tokenId) public;
 
	event Transfer(address indexed from, address indexed to, uint256 indexed tokenId);
	event Approval(address indexed owner, address indexed approved, uint256 indexed tokenId);

	// Optional
	// function totalSupply() public view returns (uint256 total);
	// function name() public view returns (string name);
	// function symbol() public view returns (string symbol);
	// function tokenOfOwnerByIndex(address _owner, uint256 _index) external view returns (uint256 tokenId);
	// function tokenMetadata(uint256 _tokenId) public view returns (string infoUrl);
}

contract ERC721 is ERC721Abstract
{
	string constant public   name = "Duck";
	string constant public symbol = "DUCK";

	uint256 public totalSupply;
	struct Token
	{
		uint256 amount;			//  amount of option
    	uint ExpirationDate;
    	address minerAdr;
		//uint256	option;			//  [payout]96[id]64[Sum]32[ExpirationDate]0
		//uint8 betType;          //  1- bull 0 - bear
	}
	mapping (uint256 => Token) tokens;
	
	// A mapping from tokens IDs to the address that owns them. All tokens have some valid owner address
	mapping (uint256 => address) public tokenIndexToOwner;
	
	// A mapping from owner address to count of tokens that address owns.	
	mapping (address => uint256) ownershipTokenCount; 

	// A mapping from tokenIDs to an address that has been approved to call transferFrom().
	// Each token can only have one approved address for transfer at any time.
	// A zero value means no approval is outstanding.
	mapping (uint256 => address) public tokenIndexToApproved;
	
	function implementsERC721() public pure returns (bool)
	{
		return true;
	}

	function balanceOf(address _owner) public view returns (uint256 count) 
	{
		return ownershipTokenCount[_owner];
	}
	
	function ownerOf(uint256 _tokenId) public view returns (address owner)
	{
		owner = tokenIndexToOwner[_tokenId];
		require(owner != address(0));
	}
	
	// Marks an address as being approved for transferFrom(), overwriting any previous approval. 
	// Setting _approved to address(0) clears all transfer approval.
	function _approve(uint256 _tokenId, address _approved) internal 
	{
		tokenIndexToApproved[_tokenId] = _approved;
	}
	
	// Checks if a given address currently has transferApproval for a particular token.
	// param _claimant the address we are confirming token is approved for.
	// param _tokenId token id, only valid when > 0
	function _approvedFor(address _claimant, uint256 _tokenId) internal view returns (bool) {
		return tokenIndexToApproved[_tokenId] == _claimant;
	}
	
	function approve( address _to, uint256 _tokenId ) public
	{
		// Only an owner can grant transfer approval.
		require(_owns(msg.sender, _tokenId));

		// Register the approval (replacing any previous approval).
		_approve(_tokenId, _to);

		// Emit approval event.
		Approval(msg.sender, _to, _tokenId);
	}
	
	function transferFrom( address _from, address _to, uint256 _tokenId ) public
	{
		// Check for approval and valid ownership
		require(_approvedFor(msg.sender, _tokenId));
		require(_owns(_from, _tokenId));

		// Reassign ownership (also clears pending approvals and emits Transfer event).
		_transfer(_from, _to, _tokenId);
	}
	
	function _owns(address _claimant, uint256 _tokenId) internal view returns (bool) {
		return tokenIndexToOwner[_tokenId] == _claimant;
	}
	
	function _transfer(address _from, address _to, uint256 _tokenId) internal 
	{
		ownershipTokenCount[_to]++;
		tokenIndexToOwner[_tokenId] = _to;

		if (_from != address(0)) 
		{
			Transfer(_from, _to, _tokenId);
			ownershipTokenCount[_from]--;
			// clear any previously approved ownership exchange
			delete tokenIndexToApproved[_tokenId];
		}

	}
	
	function transfer(address _to, uint256 _tokenId) public
	{
		require(_to != address(0));
		require(_owns(msg.sender, _tokenId));
		_transfer(msg.sender, _to, _tokenId);
	}

}

contract Owned 
{
    address private candidate;
	address public owner;

	mapping(address => bool) public admins;
	
    function Owned() public 
	{
        owner = msg.sender;
    }

    function changeOwner(address newOwner) public 
	{
		require(msg.sender == owner);
        candidate = newOwner;
    }
	
	function confirmOwner() public 
	{
        require(candidate == msg.sender); // run by name=candidate
		owner = candidate;
    }
	
    function addAdmin(address addr) external 
	{
		require(msg.sender == owner);
        admins[addr] = true;
    }

    function removeAdmin(address addr) external
	{
		require(msg.sender == owner);
        admins[addr] = false;
    }
}

contract Functional
{
	// parseInt(parseFloat*10^_b)
	function parseInt(string _a, uint _b) internal pure returns (uint) 
	{
		bytes memory bresult = bytes(_a);
		uint mint = 0;
		bool decimals = false;
		for (uint i=0; i<bresult.length; i++){
			if ((bresult[i] >= 48)&&(bresult[i] <= 57)){
				if (decimals){
				   if (_b == 0) break;
					else _b--;
				}
				mint *= 10;
				mint += uint(bresult[i]) - 48;
			} else if (bresult[i] == 46) decimals = true;
		}
		if (_b > 0) mint *= 10**_b;
		return mint;
	}
	
	function uint2str(uint i) internal pure returns (string)
	{
		if (i == 0) return "0";
		uint j = i;
		uint len;
		while (j != 0){
			len++;
			j /= 10;
		}
		bytes memory bstr = new bytes(len);
		uint k = len - 1;
		while (i != 0){
			bstr[k--] = byte(48 + i % 10);
			i /= 10;
		}
		return string(bstr);
	}
	
	function strConcat(string _a, string _b, string _c) internal pure returns (string)
	{
		bytes memory _ba = bytes(_a);
		bytes memory _bb = bytes(_b);
		bytes memory _bc = bytes(_c);
		string memory abc;
		uint k = 0;
		uint i;
		bytes memory babc;
		if (_ba.length==0)
		{
			abc = new string(_bc.length);
			babc = bytes(abc);
		}
		else
		{
			abc = new string(_ba.length + _bb.length+ _bc.length);
			babc = bytes(abc);
			for (i = 0; i < _ba.length; i++) babc[k++] = _ba[i];
			for (i = 0; i < _bb.length; i++) babc[k++] = _bb[i];
		}
        for (i = 0; i < _bc.length; i++) babc[k++] = _bc[i];
		return string(babc);
	}
	
	function timenow() public view returns(uint32) { return uint32(block.timestamp); }
}

contract Ducks is ERC721, Functional, Owned
{
	
    address constant public oracleAddress = 0x1979C2A9D21F9f8FFB73F0a81CE9823c4F306eaF;

	event LogEvent(string _event, uint256 value);
	event LogToken(string _event, address user, uint32 idToken, uint256 date);
    event LogOracle(string _event, uint256 _ex1, uint256 _ex2, uint256 _ex3, uint256 _ex4, uint256 _ex5, uint256 _exD, uint256 _exAvg);
    
    modifier onlyOwner {
        require(msg.sender == owner);
        _;
    }
	
	modifier onlyAdmin {
        require(msg.sender == owner || admins[msg.sender]);
        _;
    }

	modifier onlyOracle {
        require (msg.sender == oracleAddress);
        _;
    }
    
    
    modifier onlyMiners {
        require (msg.sender == oracleAddress);
        _;
    }

    function executeContract(uint32 _id) public payable { // оплата токена майнером
        Token storage tkn = tokens[_id];
        require( now > tkn.ExpirationDate );
        address tokenHolder = tokenIndexToOwner[_id];
        tokenHolder.transfer(msg.value);
    }
    
    function buyContract() public payable { // купить фьюч у майнера
      //require( msg.value == 1 finney * 980 ); // 98% of 1 ether  
      address minerAdr = oracleAddress;
      Token memory _token = Token({
			amount: 1 ether, //msg.value * 100 / 98 , // any count
			ExpirationDate :  now + 90 days ,
			minerAdr :  minerAdr //todo : adding miner pools
			
		});
       uint256 newTokenId = totalSupply++;
       tokens[newTokenId] = _token;
       _transfer(0, msg.sender, newTokenId);
       LogToken( "Buy", msg.sender, uint32(newTokenId), _token.ExpirationDate );
       //minerAdr.transfer(msg.value);

    }
    
    function getContractById( uint32 _id) public view returns ( 
        uint256 amount,
        uint ExpirationDate,
        address minerAdr
    ) {
       Token storage tkn = tokens[_id];
       amount         = tkn.amount;
       ExpirationDate = tkn.ExpirationDate;
       minerAdr       = tkn.minerAdr;
       
    }
    
    function executeExpired(uint32 _id) public onlyMiners { // execution by fund ( if miner scammed )
        
    }
    
    function regMiner(uint32 _stake) payable { // registartion miner
        
    }
    

    function delMiner( address _miner) onlyOwner {
        
    }
    
    function getActiveContracts() view returns ( //active contracts (all)
        string conracts 
    ){
        for (uint256 i = totalSupply-1; i >= 0; i--)
		{
			if(i>totalSupply) break;
			conracts = strConcat( conracts, ",", uint2str(i) );
			//findCount++;
			//if (count!=0 && findCount>=count) break;
		}
    }
    
    function getMyTokens() returns (
        string conracts 
    ){
        for (uint256 i = totalSupply-1; i >= 0; i--)
		{
			if(i>totalSupply) break;
			if(tokenIndexToOwner[i] == msg.sender) conracts = strConcat( conracts, ",", uint2str(i) );
			//findCount++;
			//if (count!=0 && findCount>=count) break;
		}
		
          
    }

	function Ducks() public 
	{
	    //what too need for init  ??? todo
	}

}