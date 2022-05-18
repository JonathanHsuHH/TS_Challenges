extends 
keyof
1. mapped type
[x in X], iterate union type X, X should be union, if X is Object, you can use [x in keysof X]
2. lookup
keyof Object, return type union if keys of Object
interface X{
    a: string;
    b: string;
}
tpye x = keyof X; // "a" | "b"
3. generic constraint
extends, A extends B, filter type A, keep only type in B
