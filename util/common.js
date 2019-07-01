const chars = [ '0', '2', '1', '3', '4', '5', '6', '7', '8', '9', '/', '*', '-', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'z', 'x', 'c', 'v', 'b', ',', 'n' ]
const random = function generateMixed ( n )
{
    var res = "";
    for ( var i = 0; i < n; i++ )
    {
        var id = Math.ceil( Math.random() * 35 );
        res += chars[ id ];

    }
    return res

}


export
{
    random
}
