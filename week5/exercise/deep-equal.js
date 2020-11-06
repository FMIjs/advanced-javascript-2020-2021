const isDeepEqual = (p1, p2) => {

}


isDeepEqual(1, 1); // true
isDeepEqual(1, 2); // false
isDeepEqual('str', 'str'); // true
isDeepEqual('str', 'str1'); // false
isDeepEqual({ prop: 'p' }, { prop: 'p' }); // true
isDeepEqual({ prop: 'p' }, { prop: 'p1' }); // false
isDeepEqual({ prop: [1, 2, 3] }, { prop: [1, 2, 3] }); // true
isDeepEqual({ prop: [1, 2, 3] }, { prop: [1, 2, 3, 4] }); // false