// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;

/**
 * @title Storage
 * @dev Store & retrieve value in a variable
 */
contract hellowWord {

    string public storedData;

    event myEvenTest(string eventOutput);

    function set(string memory myText) public {
        storedData = myText;
        emit myEvenTest(myText);
    }
    function get() public view returns (string memory) {
        return storedData;
    }
}
