Vector3 = function (x, y, z)
{
    this.out = new Float32Array(3);
    this.out[0] = x,
    this.out[1] = y;
    this.out[2] = z;

    //this.magnitude = function () {
    //    return Math.sqrt((this[0] * this[0]) + (this[1] * this[1]) + (this[2] * this[2]));
    //}
    //this.normalize = function () {
    //    magnitude = Math.sqrt((this[0] * this[0]) + (this[1] * this[1]) + (this[2] * this[2]));
    //    return new Vector3(this[0] / magnitude, this[1] / magnitude, this[2] / magnitude)
    //}
    //this.getArray = function()
    //{
    //    data = new Float32Array(3)
    //    data[0] = this[0]
    //    data[1] = this[1]
    //    data[2] = this[2]
    //    return data
    //}
    return this.out
}

Vector3.back = function () {return new Vector3(0, 0, -1);}
Vector3.down = function () {return new Vector3(0, -1, 0);}
Vector3.forward = function () {return new Vector3(0, 0, 1);}
Vector3.left = function () {return new Vector3(-1, 0, 0);}
Vector3.one = function () {return new Vector3(1, 1, 1);}
Vector3.right = function () {return new Vector3(1, 0, 0);}
Vector3.up = function () {return new Vector3(0, 1, 0);}
Vector3.zero = function () {return new Vector3(0, 0, 0);}

Vector3.addVector3 = function (VectorA, VectorB) {
    return new Vector3(VectorA[0] + VectorB[0], VectorA[1] + VectorB[1], VectorA[2] + VectorB[2]);}
Vector3.subtractVector3 = function (VectorA, VectorB) {
    return new Vector3(VectorA[0] - VectorB[0], VectorA[1] - VectorB[1], VectorA[2] - VectorB[2]);}
Vector3.multiplyVector3 = function (VectorA, VectorB) {
    return new Vector3(VectorA[0] * VectorB[0], VectorA[1] * VectorB[1], VectorA[2] * VectorB[2]);}
Vector3.divideVector3 = function (VectorA, VectorB) {
    return new Vector3(VectorA[0] / VectorB[0], VectorA[1] / VectorB[1], VectorA[2] / VectorB[2]);}

Vector3.addFloat = function (VectorA, floatB) {
    return new Vector3(VectorA[0] + floatB, VectorA[1] + floatB, VectorA[2] + floatB);}
Vector3.subtractFloat = function (VectorA, floatB) {
    return new Vector3(VectorA[0] - floatB, VectorA[1] - floatB, VectorA[2] - floatB);}
Vector3.multiplyFloat = function (VectorA, floatB) {
    return new Vector3(VectorA[0] * floatB, VectorA[1] * floatB, VectorA[2] * floatB);}
Vector3.divideFloat = function (VectorA, floatB) {
    return new Vector3(VectorA[0] / floatB, VectorA[1] / floatB, VectorA[2] / floatB);}

Vector3.Magnitude = function (VectorA)
{
    return Math.sqrt((VectorA[0] * VectorA[0]) + (VectorA[1] * VectorA[1]) + (VectorA[2] * VectorA[2]));
}
Vector3.Normalize = function (VectorA)
{
    magnitude = Vector3.Magnitude(VectorA)
    return new Vector3(VectorA[0] / magnitude, VectorA[1] / magnitude, VectorA[2] / magnitude)
}

Vector3.Dot = function (VectorA, VectorB) {
    return (VectorA[0] * VectorB[0]) + (VectorA[1] * VectorB[1]) + (VectorA[2] * VectorB[2])
}

Vector3.Cross = function (VectorA, VectorB) {
    return new Vector3( VectorA[1] * VectorB[2] - VectorB[1] * VectorA[2], 
                        (VectorA[0] * VectorB[2] - VectorB[0] * VectorA[2]) * -1, 
                        VectorA[0] * VectorB[1] - VectorB[0] * VectorA[1]);
}
Vector3.Distance = function (VectorA, VectorB)
{
    return Vector3.Magnitude(Vector3.subtractVector3(VectorA, VectorB));
}
Vector3.Lerp = function (VectorA, VectorB, t)
{
    return new Vector3( Math.Lerp(VectorA[0], VectorB[0], t),
                        Math.Lerp(VectorA[1], VectorB[1], t),
                        Math.Lerp(VectorA[2], VectorB[2], t));
}
Vector3.MoveTowards = function (Current, Target, Distance)
{
    if (Vector3.Distance(Current, Target) <= Distance)
    {
        return Target
    }
    else
    {
        return Vector3.addVector3(Current, Vector3.multiplyFloat(Vector3.Normalize(Vector3.subtractVector3(Target, Current)), Distance))
    }
}
Vector3.Rotate = function (Vector, Quaternion)
{
    // t = 2 * cross(q.xyz, v)
    // v' = v + q.w * t + cross(q.xyz, t)
    quatXYZ = new Vector3(Quaternion[0], Quaternion[1], Quaternion[2]);
    t = Vector3.multiplyFloat(Vector3.Cross(quatXYZ, Vector), 2.0)

    return Vector3.addVector3(Vector3.addVector3(Vector3.multiplyFloat(t, Quaternion[3]), Vector), Vector3.Cross(quatXYZ, t))
    
}
//current = Vector3.MoveTowards(current, target, 0.1)