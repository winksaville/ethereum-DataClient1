pragma solidity ^0.4.7;

/* Simple contract with some data */
contract DataClient {
    address private owner;
    mapping(string => string) private data;

    event ReportLog(string info, string field, string value);

    /* Constructor */
    function DataClient() public {
        owner = msg.sender;
    }

    /* Kill this contract */
    function kill() {
        if (msg.sender == owner) {
            selfdestruct(owner);
            ReportLog("kill successful", "", "");
        } else {
            ReportLog("kill no owner", "", "");
        }
    }

    /* Return the greeting */
    function setField(string _field, string _value) {
        data[_field] = _value;
        ReportLog("setField", _field, _value);
    }

    /* Return a field */
    function getField(string _field) constant returns (string) {
        return data[_field];
    }
}
