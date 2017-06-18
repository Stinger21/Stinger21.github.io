// Constants
Math.Epsilon = 0.000001;
Math.DegreesToRadians = 0.01745329;
Math.RadiansToDegrees = 57.2957795;

// Functions
Math.lerp = function (start, end, t)
{
    return start + t*(end - start);
}
Math.moveTowards = function (current, target, distance)
{
    if (Math.abs(target - current) <= distance)
    {
        return target
    }
    else
    {
        return current + (Math.sign(target - current) * distance)
    }
}
Math.clamp = function(value, min, max)
{
    return Math.min(Math.max(value, min), max);
}
