// Load a text resource from a file over the network.
function loadTextResource(url, callback)
{
    if (window.location.href.indexOf("dropbox") !== -1)
    {
        url = "/u/5329391/Website/root" + url
    }
    request = new XMLHttpRequest();
    request.onload = function()
    {
        if (request.status < 200 || request.status > 299)
        {
            callback("Error: HTTP Status " + request.status + " on resource " + url);
        }
        else
        {
            callback(null, request.responseText);
        }
    }

    request.open("GET", url + "?please-dont-cache="+Math.random(), true);
    request.send();
}

function loadImage(url, callback)
{
    if (window.location.href.indexOf("dropbox") !== -1)
    {
        url = "/u/5329391/Website/root" + url
    }
    image = new Image();
    image.onload = function()
    {
        callback(null, image);
    }
    image.src = url;
}

function loadJSONResource(url, callback)
{
    loadTextResource(url, function (err, result)
    {
        if(err)
        {

        }
        else
        {
            try
            {
                callback(null, JSON.parse(result));
            }
            catch(e)
            {
                callback(e);
            }
        }
    });
}