function TestModule()
{
    this.sqrt = Math.sqrt;
    this.square = function (x)
    {
        return x * x;
    }
    this.diag = function (x, y)
    {
        return this.sqrt(this.square(x) + this.square(y));
    }

}
testModule = new TestModule();
