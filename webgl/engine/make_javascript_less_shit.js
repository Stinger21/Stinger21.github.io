// Function to remove item from lists
Array.prototype.remove = function (item)
{
    var i = this.indexOf(item);
    if (i != -1)
    {
        this.splice(i, 1);
    }
}

// Function to rmeove index from list
Array.prototype.removeAt = function (i)
{
    this.splice(i, 1);
}

Array.prototype.sortByIndexList = function(order)
{
    var A = order;
    var B = this;
    var indices = A.map(function (elem, index) { return index; }); //an array of indices
    indices.sort(function (a, b) { return A[a] - A[b]; });
    for (var i = 0; i < A.length; i++)
    {
        this[i] = B[indices[i]]
    }
}


// Function to check if a string contains another.
String.prototype.contains = function (it)
{
    return this.indexOf(it) != -1;
}

//data = [ "bb", "aa", "cc", "ee", "dd"]
//order = [ 1, 0, 2, 4, 3]