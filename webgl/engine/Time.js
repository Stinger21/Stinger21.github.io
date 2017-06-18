Time = function (time) {
    return Time.Now();
}

Time.Now = function ()
{
    return performance.now() / 1000.0;
}

Time._lastTime = Time.Now()
Time._tick = function()
{
    Time.deltaTime = Math.clamp((Time.Now() - Time._lastTime), 0.0, 0.1);
    Time.ms = Math.round(Time.deltaTime * 1000)
    Time.fps = Math.round(1.0 / Time.deltaTime)
    Time._lastTime = Time.Now();
}
Time.ms = 0.0;
Time.fps = 0.0
Time.deltaTime = 0.0