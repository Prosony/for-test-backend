exports.byte_to_string = function byte_to_string(arr) {
    let uarr = new Uint8Array(arr.map(function(x){return parseInt(x,2)}));
    let strings = [], chunksize = 0xffff;
    // There is a maximum stack size. We cannot call String.fromCharCode with as many arguments as we want
    for (let i=0; i*chunksize < uarr.length; i++){
        strings.push(String.fromCharCode.apply(null, uarr.subarray(i*chunksize, (i+1)*chunksize)));
    }
    return strings.join('');
};