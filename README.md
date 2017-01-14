# A simple contract that stores data in a mapping

Dependencies: testrpc and truffle

To build and run:
```
testrpc -d debugger
rm -rf build
truffle migrate
truffle build
```

Then use chrome to view build/index.html. You can do two operations
`Get Field` and `Set Field`. Ater initialization there are no fields
so you should generally do a `Set Field` first. You can then use
`Get Field` to retrieve the information.
