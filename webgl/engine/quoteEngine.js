//var Job = function()
//{
//    this.pays = true;
//}
//Job.prototype.print = function()
//{
//    if(this.pays)
//        console.log("$$$");
//    else
//        console.log(":(");
//}
//
//var TechJob = function(title, pays)
//{
//    Job.call(this) // inherits constructor methods and properties
//
//    this.title = title;
//    this.pays = pays;
//}
//TechJob.prototype = Object.create(Job.prototype) // Inherits prototypes
//TechJob.prototype.constructor = TechJob; // sets constructor


/// <reference path="Math.js" />
/// <reference path="make_javascript_less_shit.js" />
/// <reference path="Vector3.js" />
/// <reference path="Matric.js" />
/// <reference path="Time.js" />

EntityList = []

var Transform = function()
{
    this.ctm = null;
    this.parent = null;
    this.position = new Vector3(0.0, 0.0, 0.0);
    this.rotation = new Quaternion(0.0, 0.0, 0.0, 1.0);
    this.scale = new Vector3(1.0, 1.0, 1.0);

    this.rotate = function (x, y, z)
    {
        this.rotation = Quaternion.RotateX(this.rotation, x);
        this.rotation = Quaternion.RotateY(this.rotation, y);
        this.rotation = Quaternion.RotateZ(this.rotation, z);
    }
    this.translate = function (x, y, z)
    {
        xVector = Vector3.multiplyFloat(Vector3.Rotate(Vector3.left(), this.rotation), x)
        yVextor = Vector3.multiplyFloat(Vector3.Rotate(Vector3.up(), this.rotation), y)
        zVector = Vector3.multiplyFloat(Vector3.Rotate(Vector3.forward(), this.rotation), z)

        vectorToTranslateBy = Vector3.addVector3(xVector, Vector3.addVector3(yVextor, zVector));
        this.position = Vector3.addVector3(this.position, vectorToTranslateBy)
    }
    this.back = function ()     { return Vector3.Rotate(Vector3.back(),     this.rotation) }
    this.down = function ()     { return Vector3.Rotate(Vector3.down(),     this.rotation) }
    this.forward = function ()  { return Vector3.Rotate(Vector3.forward(),  this.rotation) }
    this.left = function ()     { return Vector3.Rotate(Vector3.left(),     this.rotation) }
    this.right = function ()    { return Vector3.Rotate(Vector3.right(),    this.rotation) }
    this.up = function ()       { return Vector3.Rotate(Vector3.up(),       this.rotation) }
}

Transform.getNumberOfParents = function (transform)
{
    value = 0
    if (transform.parent != null)
    {
        value = Transform.getNumberOfParents(transform.parent)
        value += 1;
    }
    return value
}

var Entity = function ()
{
    this.title = "Name Of Entity!"

    this.transform = new Transform();

    this.Initialize = function () {}
    this.Update = function () {}

    EntityList.push(this)
    this.destroy = function ()
    {
        EntityList.remove(this);
    }
}
var planeEntity = function ()
{
    Entity.call(this);
    this.title = "a plane!"
    this.Initialize = function ()
    {
    }
    this.Update = function()
    {
    }
}

var Camera = function ()
{
    Entity.call(this);
    this.title = "a camera"
    this.Update = function ()
    {
        this.transform.translate(Input.GetAxis(AxisCode.LeftStickX) * Time.deltaTime, 0, Input.GetAxis(AxisCode.LeftStickY) * Time.deltaTime);
        this.transform.rotate(Math.pow(-Input.GetAxis(AxisCode.RightStickY), 3)*4, Math.pow(-Input.GetAxis(AxisCode.RightStickX), 3)*4, 0);
    }
}

var isActive;
window.onfocus = function () { isActive = true; }
window.onblur = function () { isActive = false; }

function Initialize()
{
    mainCamera = new Camera();
    mainCamera.transform.position = new Vector3(0, 3, -6);
    mainCamera.transform.rotation = Quaternion.Euler(0, 0, 30);
    console.log("Initialize");
    plane1 = new planeEntity();
    plane1.transform.position = new Vector3(0, 0, 0);

    plane2 = new planeEntity();
    plane2.transform.position = new Vector3(4, 0, 0);
    plane2.transform.scale = new Vector3(0.5, 0.5, 0.5)
    plane2.transform.parent = plane1.transform;


    plane3 = new planeEntity();
    plane3.transform.position = new Vector3(4, 0, 0);
    plane3.transform.scale = new Vector3(0.25, 0.25, 0.25)
    plane3.transform.parent = plane2.transform;

    plane4 = new planeEntity();
    plane4.transform.position = new Vector3(4, 0, 0);
    plane4.transform.scale = new Vector3(0.2, 0.2, 0.2)
    plane4.transform.parent = plane3.transform;
}

function Update()
{
    plane1.transform.rotate(0, 20 * Time.deltaTime, 0)
    plane2.transform.rotate(0, -20 * Time.deltaTime, 0)
    plane3.transform.rotate(0, 20 * Time.deltaTime, 0)
}