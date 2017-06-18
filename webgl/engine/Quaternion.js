Quaternion = function(x, y, z, w)
{
    this.out = new Float32Array(4);
    this.out[0] = x,
    this.out[1] = y;
    this.out[2] = z;
    this.out[3] = w;
    return this.out
}
Quaternion.Euler = function (x, y, z)
{
    out = new Float32Array(4);
    c1 = Math.cos((x * Math.DegreesToRadians) / 2);
    s1 = Math.sin((x * Math.DegreesToRadians) / 2);
    c2 = Math.cos((y * Math.DegreesToRadians) / 2);
    s2 = Math.sin((y * Math.DegreesToRadians) / 2);
    c3 = Math.cos((z * Math.DegreesToRadians) / 2);
    s3 = Math.sin((z * Math.DegreesToRadians) / 2);
    c1c2 = c1*c2;
    s1s2 = s1*s2;
    w = c1c2*c3 - s1s2*s3;
    x = c1c2*s3 + s1s2*c3;
    y = s1*c2*c3 + c1*s2*s3;
    z = c1*s2*c3 - s1*c2*s3;
    out[0] = x,
    out[1] = y;
    out[2] = z;
    out[3] = w;
    return out;
}


Quaternion.RotateX = function (a, rad)
{
    out = new Float32Array(4);
    rad *= Math.DegreesToRadians;
    rad *= 0.5;

    var ax = a[0], ay = a[1], az = a[2], aw = a[3],
        bx = Math.sin(rad), bw = Math.cos(rad);

    out[0] = ax * bw + aw * bx;
    out[1] = ay * bw + az * bx;
    out[2] = az * bw - ay * bx;
    out[3] = aw * bw - ax * bx;
    return out;
}
Quaternion.RotateY = function (a, rad)
{
    out = new Float32Array(4);
    rad *= Math.DegreesToRadians;
    rad *= 0.5;

    var ax = a[0], ay = a[1], az = a[2], aw = a[3],
        by = Math.sin(rad), bw = Math.cos(rad);

    out[0] = ax * bw - az * by;
    out[1] = ay * bw + aw * by;
    out[2] = az * bw + ax * by;
    out[3] = aw * bw - ay * by;
    return out;
}

Quaternion.RotateZ = function (a, rad)
{
    out = new Float32Array(4);
    rad *= Math.DegreesToRadians;
    rad *= 0.5;

    var ax = a[0], ay = a[1], az = a[2], aw = a[3],
        bz = Math.sin(rad), bw = Math.cos(rad);

    out[0] = ax * bw + ay * bz;
    out[1] = ay * bw - ax * bz;
    out[2] = az * bw + aw * bz;
    out[3] = aw * bw - az * bz;
    return out;
}