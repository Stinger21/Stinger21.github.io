/// <reference path="Math.js" />
/// <reference path="make_javascript_less_shit.js" />
/// <reference path="Vector3.js" />
/// <reference path="Matric.js" />
/// <reference path="Time.js" />

function include(destination)
{
    var e = window.document.createElement('script');
    e.setAttribute('src', destination);
    window.document.body.appendChild(e);
}
include('engine/make_javascript_less_shit.js');

include('engine/Math.js');
include('engine/Vector3.js');
include('engine/Matrix.js');
include('engine/Quaternion.js');

include('engine/Time.js');

include('engine/Input.js');
include('engine/loader.js');

include('engine/quoteEngine.js');
var model
var index0
var weight0
var BoneMatrecies
var modelVertices
function InitDemo()
{
    loadTextResource('/scripts/shader.glsl.html', function (shaderErr, shaderText)
    {
        if(shaderErr)
        {
            alert('Fatal error getting shader');
            console.error(shaderErr);
            return
        }
        else
        {
            var el = document.createElement('html');
            el.innerHTML = shaderText;
            elements = el.getElementsByTagName('script');

            vsText = "";
            fsText = "";
            for (var i = 0; i < elements.length; i++)
            {
                shaderType = elements[i].getAttribute("shader");
                if (shaderType == "vertex")
                {
                    vsText = elements[i].innerHTML;
                }
                else if (shaderType == "fragment")
                {
                    fsText = elements[i].innerHTML;
                }
            }
            if (vsText == "" || fsText == "")
            {
                alert('Fatal error reading shader');
                console.error(shaderErr);
                return
            }
            loadJSONResource('/scripts/hurricane.json', function (modelErr, modelObj)
            {
                if(modelErr)
                {
                    alert('Fatal error getting model');
                    console.error(fsErr);
                    return
                }
                else
                {
                    model = modelObj
                    loadImage("/scripts/hurricane.png", function (imageErr, imageObj)
                    {
                        if (imageErr)
                        {
                            alert('Fatal error getting texture');
                            console.error(imageErr);
                            return
                        }
                        else
                        {
                            RunDemo(vsText, fsText, modelObj, imageObj);
                        }
                    })

                }
            });
                
        }
    })
}
function makeAttribute(program, data, elementsPerAttribute, attributeName)
{
    console.log(attributeName)
    console.log(elementsPerAttribute)
    BufferObject = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, BufferObject);
    gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW);
    AttribLocation = gl.getAttribLocation(program, attributeName)
    gl.vertexAttribPointer(
        AttribLocation, // Attribute location
        elementsPerAttribute, // Number of elements per attribute
        gl.FLOAT, // Type of elements
        gl.FALSE,
        elementsPerAttribute * Float32Array.BYTES_PER_ELEMENT, // Size of an individual vertex
        0 // Offset from the beginning of a single vertex to this attribute
    );
    gl.enableVertexAttribArray(AttribLocation);
}

function RunDemo(vertexShaderText, fragmentShaderText, model, Texture)
{
    canvas = document.getElementById("GameCanvas");
    gl = canvas.getContext('webgl')
    if (!gl)
        console.error("webgl not supported, falling back on experimental");
        gl = canvas.getContext('experimental-webgl')
    if (!gl)
        alert("no webgl. old browser?")

    //canvas.width = window.innerWidth;
    //canvas.height = window.innerHeight;
    //gl.viewport(0, 0, canvas.width, canvas.height);



    // Create Shader program
    vertexShader = gl.createShader(gl.VERTEX_SHADER);
    fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);

    gl.shaderSource(vertexShader, vertexShaderText)
    gl.shaderSource(fragmentShader, fragmentShaderText)
    gl.enable(gl.DEPTH_TEST)
    gl.enable(gl.CULL_FACE)
    //gl.cullFace(gl.FRONT)

    gl.compileShader(vertexShader);
    if (!gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS))
    {
        console.error('ERROR compiling vertex shader!', gl.getShaderInfoLog(vertexShader));
        return;
    }
    gl.compileShader(fragmentShader);
    if (!gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS))
    {
        console.error('ERROR compiling fragment shader!', gl.getShaderInfoLog(fragmentShader));
        return;
    }

    program = gl.createProgram();
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS))
    {
        console.error('ERROR linking program!', gl.getProgramInfoLog(program));
        return;
    }
    gl.validateProgram(program);
    if (!gl.getProgramParameter(program, gl.VALIDATE_STATUS))
    {
        console.error('ERROR validating program!', gl.getProgramInfoLog(program));
        return;
    }


    // Create Buffers
    modelVertices = model.meshes[0].vertices;
    var modelNormals = model.meshes[0].normals;
    var modelTexCoords = model.meshes[0].texturecoords[0];
    var modelColors = [].concat.apply([], model.meshes[0].colors);
    var modelIndices = [].concat.apply([], model.meshes[0].faces);
    
    if (model.meshes[0].bones) {
        // which bone
        var index = []
        var weight = []
        //// loop through all the verticies
        for (var i = 0; i < modelVertices.length / 3; i++) {
            weightsToDoWithThisVertex = []
            // loop through all bones
            for (var ii = 0; ii < model.meshes[0].bones.length; ii++) {
                currentBone = model.meshes[0].bones[ii]
                for (var iii = 0; iii < currentBone.weights.length; iii++) {
                    currentWeight = currentBone.weights[iii]
                    if (currentWeight[0] == i) {
                        weightsToDoWithThisVertex.push([ii, currentWeight[1]])
                    }
                }
            }
            for (var ii = 0; ii < 4; ii++) {
                if (weightsToDoWithThisVertex[ii] == undefined) {
                    //weightsToDoWithThisVertex.push([0.0, 0.0])
                    index.push(0.0)
                    weight.push(0.0)
                }
                else {
                    index.push(weightsToDoWithThisVertex[ii][0])
                    weight.push(weightsToDoWithThisVertex[ii][1])
                }
            }
        }

    

        makeAttribute(program, new Float32Array(index), 4, 'vertBoneIndex');
        makeAttribute(program, new Float32Array(weight), 4, 'vertBoneWeight');
    }

    modelIndexBufferObject = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, modelIndexBufferObject);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(modelIndices), gl.STATIC_DRAW);


    makeAttribute(program, new Float32Array(modelVertices), 3, 'vertPosition');
    
    makeAttribute(program, new Float32Array(modelNormals), 3, 'vertNormal');
    
    makeAttribute(program, new Float32Array(modelTexCoords), 2, 'vertTexCoord');
    
    if (modelColors.length > 0)
    {
        makeAttribute(program, new Float32Array(modelColors), 4, 'vertColor');

        //modelVertexColorBufferObject = gl.createBuffer();
        //gl.bindBuffer(gl.ARRAY_BUFFER, modelVertexColorBufferObject);
        //gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(modelColors), gl.STATIC_DRAW);
        //colorAttribLocation = gl.getAttribLocation(program, 'vertColor')
        //gl.vertexAttribPointer(
        //    colorAttribLocation, // Attribute location
        //    4, // number of elements per attribute (2 fore vec2)
        //    gl.FLOAT, // Type of the elements
        //    gl.FALSE, // Normalized??
        //    4 * Float32Array.BYTES_PER_ELEMENT, // Size of an individual vertex
        //    0 * Float32Array.BYTES_PER_ELEMENT// Offset from the beginning of a single vertex to  this attribute
        //    );
        //gl.enableVertexAttribArray(colorAttribLocation);
    }

    //Create Texture
    modeTexture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, modeTexture);
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texImage2D(
        gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA,
        gl.UNSIGNED_BYTE,
        Texture);
    gl.bindTexture(gl.TEXTURE_2D, null);


    // Tell OpenGL state mahcine which program should be active.
    gl.useProgram(program);

    BoneMatrecies = []//[-0.5,0,0.5,   -0.5,0,-0.5,   0.5,0,-0.5,   0.5,0,0.5];
    //Load bones ~
    BoneMatrecies = BoneMatrecies.concat(Array.prototype.slice.call(Matrix4x4.fromTranslation([-1.5, 0,  0.5])));
    BoneMatrecies = BoneMatrecies.concat(Array.prototype.slice.call(Matrix4x4.fromTranslation([-0.5, 0, -0.5])));
    BoneMatrecies = BoneMatrecies.concat(Array.prototype.slice.call(Matrix4x4.fromTranslation([0.5,  0, -0.5])));
    BoneMatrecies = BoneMatrecies.concat(Array.prototype.slice.call(Matrix4x4.fromTranslation([0.5,  0,  0.5])));
    
    matBonesArrayLocation = gl.getUniformLocation(program, "Bones");
    gl.uniformMatrix4fv(matBonesArrayLocation, gl.FALSE, new Float32Array(BoneMatrecies));

    // set up uniforms
    matWorldUniformLocation = gl.getUniformLocation(program, "mWorld");
    matViewUniformLocation = gl.getUniformLocation(program, "mView");
    matProjUniformLocation = gl.getUniformLocation(program, "mProj");


    // Main render loop
    //mode, tris to skip, tris to draw.
    angleX = 0
    angleY = 0

    Initialize();

    for (var i = 0; i < EntityList.length; i++)
    {
        currentEntity = EntityList[i]
        console.log(currentEntity);
        currentEntity.Initialize();
    }
    var frameTime = 0.0;
    loop = function()
    {
        Time._tick();
        Update();
        _gamepads = navigator.getGamepads ? navigator.getGamepads() : (navigator.webkitGetGamepads ? navigator.webkitGetGamepads : []);

        frameTime += Time.deltaTime;
        frameTime %= 5.0;


        cameraTransform = new Transform();
        for (var i = 0; i < EntityList.length; i++)
        {
            currentEntity = EntityList[i]
            if (currentEntity.constructor == Camera)
            {
                cameraTransform = currentEntity.transform;
            }
        }
        
        viewMatrix = Matrix4x4.LookAt(cameraTransform.position, Vector3.addVector3(cameraTransform.position, cameraTransform.forward()), cameraTransform.up());//Matrix4x4.Multiply(cameraRotationMatrix, cameraTranslationMatrix)
        projMatrix = Matrix4x4.Perspective(80, canvas.width / canvas.height, 0.1, 1000.0)

        gl.uniformMatrix4fv(matViewUniformLocation, gl.FALSE, viewMatrix);
        gl.uniformMatrix4fv(matProjUniformLocation, gl.FALSE, projMatrix);



        gl.clearColor(0.390625, 0.58203125, 0.92578125, 1.0);
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

        gl.bindTexture(gl.TEXTURE_2D, modeTexture);
        gl.activeTexture(gl.TEXTURE0);

        // Sort entities by how many parents they have, so that we multiply the matrecies in the right order ie:
        // parent -> child1 -> child2 -> child3 etc and we only need to do one of these matrix multiplications per child.
        entityOrder = [];
        for (var i = 0; i < EntityList.length; i++)
        {
            entityOrder.push(Transform.getNumberOfParents(EntityList[i].transform))
        }
        EntityList.sortByIndexList(entityOrder)

        // Draws whatever buffer we bound last.
        for (var i = 0; i < EntityList.length; i++)
        {
            currentEntity = EntityList[i]
            currentEntity.Update();

            if (currentEntity.constructor == planeEntity)
            {
                currentEntity.transform.ctm = Matrix4x4.fromRotationTranslationScale( currentEntity.transform.rotation,
                                                                            currentEntity.transform.position,
                                                                            currentEntity.transform.scale)

                if (currentEntity.transform.parent != null)
                {
                    parentObjectMatrix = currentEntity.transform.parent.ctm
                
                    currentEntity.transform.ctm = Matrix4x4.Multiply(parentObjectMatrix, currentEntity.transform.ctm)
                }

                gl.uniformMatrix4fv(matWorldUniformLocation, gl.FALSE, currentEntity.transform.ctm);
                gl.drawElements(gl.TRIANGLES, modelIndices.length, gl.UNSIGNED_SHORT, 0);// Oh this is a draw call? :o!
            }

        }
        
        input = "" + _gamepads[0] + "<br/>"
        input += "Is Active: " +  isActive+ "<br/>"
        input += "Time: " + Math.round(Time.Now()) + "<br/>"
        input += "MS: " + Time.ms + "<br/>"
        input += "Frames per second: " + Time.fps + "<br/>"
        input += "LeftStick X: " + Input.GetAxis(AxisCode.LeftStickX).toFixed(1) + ",     ";
        input += "Y: " + Input.GetAxis(AxisCode.LeftStickY).toFixed(1) + "<br/>";
        input += "RightStick X: " + Input.GetAxis(AxisCode.RightStickX).toFixed(1) + ",     ";
        input += "Y: " + Input.GetAxis(AxisCode.RightStickY).toFixed(1) + "<br/>";
        input += "LeftTrigger: " + Input.GetAxis(AxisCode.LeftTrigger).toFixed(1) + "<br/>";
        input += "RightTrigger: " + Input.GetAxis(AxisCode.RightTrigger).toFixed(1) + "<br/>";
        
        input += "Face Buttons: " + Input.GetKey(KeyCode.FaceButton1) + ", " + Input.GetKey(KeyCode.FaceButton2) + ", " + Input.GetKey(KeyCode.FaceButton3) + ", " + Input.GetKey(KeyCode.FaceButton4) + "<br/>";
        input += "D-pad: " + Input.GetKey(KeyCode.dPadUp) + ", " + Input.GetKey(KeyCode.dPadDown) + ", " + Input.GetKey(KeyCode.dPadLeft) + ", " + Input.GetKey(KeyCode.dPadRight) + "<br/>";
        input += "Start: " + Input.GetKey(KeyCode.Start) + "<br/>"
        input += "Stop: " + Input.GetKey(KeyCode.Back) + "<br/>"
        
        input += "Left Bumper: " + Input.GetKey(KeyCode.LeftBumper) + "<br/>"
        input += "Right Bumper: " + Input.GetKey(KeyCode.RightBumper) + "<br/>"
        input += "Left Trigger: " + Input.GetKey(KeyCode.LeftTrigger) + "<br/>"
        input += "Right Trigger: " + Input.GetKey(KeyCode.RightTrigger) + "<br/>"
        input += "Left Stick: " + Input.GetKey(KeyCode.LeftStick) + "<br/>"
        input += "Right Stick: " + Input.GetKey(KeyCode.RightStick) + "<br/>"
        
        document.getElementById("debugString").innerHTML = input
        requestAnimationFrame(loop);
    }
    requestAnimationFrame(loop);
}