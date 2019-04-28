/**
 * @version 1.0.0.0
 * @copyright Copyright ©  2019
 * @compiler Bridge.NET 17.7.0
 */
Bridge.assembly("Quote_webgl", function ($asm, globals) {
    "use strict";

    Bridge.define("App", {
        main: function Main () {
            Quote.Quote.Start();
        }
    });

    Bridge.define("Debug", {
        statics: {
            methods: {
                Log: function (o) {
                    System.Console.WriteLine(o);
                }
            }
        }
    });

    Bridge.define("File", {
        statics: {
            methods: {
                ReadAllText: function (Path) {
                    var Request = new XMLHttpRequest();
                    Request.open("GET", Path, false);
                    Request.overrideMimeType("text/plain");
                    Request.send();
                    return Request.responseText;
                },
                ReadAllBytes: function (Path) {
                    var Request = new XMLHttpRequest();
                    Request.responseType = "arraybuffer";
                    Request.open("GET", Path, false);
                    Request.send();
                    return Bridge.cast(Request.response, System.Array.type(System.Byte));

                },
                ReadAllFloatsFormString: function (data) {

                    return System.Array.convertAll(System.String.split(data, [44].map(function (i) {{ return String.fromCharCode(i); }})), function (s) { return System.Single.parse(s); });
                }
            }
        }
    });

    Bridge.define("Graphics", {
        statics: {
            fields: {
                GlobalShader: null,
                TriangleVertices: null,
                Canvas: null,
                gl: null,
                CurrentProgram: null,
                CurrentMesh: null
            },
            ctors: {
                init: function () {
                    this.GlobalShader = "\r\n// hlsl things\r\nprecision mediump float;\r\n#define float2 vec2\r\n#define float3 vec3\r\n#define float4 vec4\r\n#define frac fract\r\n#define lerp mix\r\n#define saturate(X) clamp(X, 0.0, 1.0)\r\nfloat4 temp1234;\r\n\r\nattribute float3 VertexPosition;\r\nattribute float3 VertexNormal;\r\nattribute float2 VertexUV;\r\nattribute float2 VertexUV1;\r\nattribute float4 VertexColor;\r\n\r\nvarying float3 Normal;\r\nvarying float4 Color;\r\n\r\nuniform float GameTime;\r\nuniform float AspectRatio;\r\nuniform float2 Location;\r\n\r\n\r\n#INJECTED_CODE\r\n\r\n\r\n#ifdef VertexMain\r\nvoid VertexMain()\r\n{\r\n\r\n    // In\r\n    VSIn Input;\r\n    Input.Position = float4(VertexPosition, 1.0);\r\n    Input.Normal = VertexNormal;\r\n    Input.UV = VertexUV;\r\n    Input.UV1 = VertexUV1;\r\n    Input.Color = VertexColor;\r\n    \r\n    // Execute\r\n    VSToPS Result = sVertexMain(Input);\r\n\r\n    // Out\r\n    gl_Position = Result.Position;\r\n    Normal = Result.Normal.xyz;\r\n    Color = Result.Color;\r\n}\r\n#endif\r\n\r\n#ifdef PixelMain\r\nvoid PixelMain()\r\n{\r\n    // In\r\n    VSToPS Input;\r\n    Input.Position = float4(0,0,0,0);\r\n    Input.Color = Color;\r\n    Input.Normal = Normal;\r\n    \r\n    // Execute\r\n    PSOut Result = sPixelMain(Input);\r\n\r\n    // Out\r\n    gl_FragColor = Result.Color;\r\n\r\n}\r\n#endif\r\n";
                }
            },
            methods: {
                Initialize: function (Width, Height) {
                    var $t;
                    Width = (window.innerWidth - 10) | 0;
                    Height = (window.innerHeight - 10) | 0;
                    document.title = "WebGL";
                    Graphics.Canvas = ($t = document.createElement("canvas"), $t.width = Width, $t.height = Height, $t);

                    Graphics.gl = Graphics.Canvas.getContext("webgl");
                    Graphics.gl.enable(Graphics.gl.DEPTH_TEST);
                    Graphics.gl.enable(Graphics.gl.CULL_FACE);

                    Graphics.gl.viewport(0, 0, Graphics.Canvas.width, Graphics.Canvas.height);
                    document.body.appendChild(Graphics.Canvas);
                    document.body.style.margin = "0";
                    document.body.bgColor = "#242424";

                    window.requestAnimationFrame(Graphics.RenderCallback);
                    window.onresize = function (e) {
                        Graphics.Canvas.width = (window.innerWidth - 10) | 0;
                        Graphics.Canvas.height = (window.innerHeight - 10) | 0;
                        Graphics.gl.viewport(0, 0, ((window.innerWidth - 10) | 0), ((window.innerHeight - 10) | 0));
                    };

                    Graphics.CurrentProgram = Graphics.UploadShader(File.ReadAllText("TestShader1.shader"));

                    Graphics.TriangleVertices = System.Array.init([-0.5, -0.5, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 1.0, 0.0, 0.5, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.5, -0.5, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 1.0, -0.1, -0.4, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 1.0, 0.4, 0.5, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.9, -0.1, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 1.0], System.Single);
                    Graphics.TriangleVertices = File.ReadAllFloatsFormString(File.ReadAllText("TorusTest.vbo"));

                    Graphics.CurrentMesh = Graphics.UploadMesh(Graphics.TriangleVertices);

                },
                UploadMesh: function (Triangles) {
                    var VBO = Graphics.gl.createBuffer();
                    Graphics.gl.bindBuffer(Graphics.gl.ARRAY_BUFFER, VBO);
                    Graphics.gl.bufferData(Graphics.gl.ARRAY_BUFFER, new Float32Array(Triangles), Graphics.gl.STATIC_DRAW);
                    return VBO;
                },
                UploadShader: function (Shader) {
                    var VertexShader = Graphics.gl.createShader(Graphics.gl.VERTEX_SHADER);
                    var FragmentShader = Graphics.gl.createShader(Graphics.gl.FRAGMENT_SHADER);


                    var ShaderText = System.String.replaceAll(Graphics.GlobalShader, "#INJECTED_CODE", Shader);
                    var VertexShaderText = "#define VertexMain main\n" + (System.String.replaceAll(ShaderText, "gl_FragColor", "temp1234") || "");
                    var PixelShaderText = "#define PixelMain main\n" + (System.String.replaceAll(System.String.replaceAll(ShaderText, "attribute", ""), "gl_Position", "temp1234") || "");
                    Graphics.gl.shaderSource(VertexShader, VertexShaderText);
                    Graphics.gl.shaderSource(FragmentShader, PixelShaderText);

                    Graphics.gl.compileShader(VertexShader);
                    if (!Graphics.gl.getShaderParameter(VertexShader, Graphics.gl.COMPILE_STATUS)) {

                        System.Console.WriteLine(System.String.format("Error compiling Vertex Shader! {0}", [Graphics.gl.getShaderInfoLog(VertexShader)]));
                    }

                    Graphics.gl.compileShader(FragmentShader);
                    if (!Graphics.gl.getShaderParameter(FragmentShader, Graphics.gl.COMPILE_STATUS)) {
                        System.Console.WriteLine(System.String.format("Error compiling Fragment Shader! {0}", [Graphics.gl.getShaderInfoLog(FragmentShader)]));
                    }

                    var program = Graphics.gl.createProgram();
                    Graphics.gl.attachShader(program, VertexShader);
                    Graphics.gl.attachShader(program, FragmentShader);
                    Graphics.gl.linkProgram(program);
                    if (!Graphics.gl.getProgramParameter(program, Graphics.gl.LINK_STATUS)) {
                        System.Console.WriteLine(System.String.format("Error linking Program! {0}", [Graphics.gl.getProgramInfoLog(program)]));
                    }
                    return program;
                },
                RenderCallback: function () {
                    Quote.Quote.Update();

                    Graphics.DrawMesh(Graphics.CurrentProgram, Graphics.CurrentMesh, ((Bridge.Int.div(Graphics.TriangleVertices.length, 14)) | 0));

                    Graphics.DrawMesh(Graphics.CurrentProgram, Graphics.CurrentMesh, ((Bridge.Int.div(Graphics.TriangleVertices.length, 14)) | 0), 0.5);

                    window.requestAnimationFrame(Graphics.RenderCallback);
                },
                DrawMesh: function (program, buffer, verts, x) {
                    if (x === void 0) { x = 0.0; }
                    Graphics.gl.cullFace(Graphics.gl.FRONT);
                    var VertexSize = 14;
                    Graphics.SetVertexAttribute(program, "VertexPosition", 3, VertexSize, 0);
                    Graphics.SetVertexAttribute(program, "VertexNormal", 3, VertexSize, 3);
                    Graphics.SetVertexAttribute(program, "VertexUV", 2, VertexSize, 6);
                    Graphics.SetVertexAttribute(program, "VertexUV1", 2, VertexSize, 8);
                    Graphics.SetVertexAttribute(program, "VertexColor", 4, VertexSize, 10);

                    Graphics.gl.useProgram(program);

                    Graphics.gl.uniform1f(Graphics.gl.getUniformLocation(program, "GameTime"), Quote.Time.GameTime * 0.5);

                    Graphics.gl.uniform1f(Graphics.gl.getUniformLocation(program, "AspectRatio"), Graphics.Canvas.width / Graphics.Canvas.height);

                    Graphics.gl.uniform2f(Graphics.gl.getUniformLocation(program, "Location"), x, 0.0);

                    Graphics.gl.drawArrays(Graphics.gl.TRIANGLES, 0, verts);
                },
                SetVertexAttribute: function (program, AttributeName, ElementsPerAttribute, SizeOfVertex, OffsetWithinVertex) {
                    var AttributeLocation = Graphics.gl.getAttribLocation(program, AttributeName);
                    if (AttributeLocation === -1) {
                        return;
                    }

                    Graphics.gl.vertexAttribPointer(AttributeLocation, ElementsPerAttribute, Graphics.gl.FLOAT, false, Bridge.Int.mul(SizeOfVertex, Float32Array.BYTES_PER_ELEMENT), Bridge.Int.mul(OffsetWithinVertex, Float32Array.BYTES_PER_ELEMENT));

                    Graphics.gl.enableVertexAttribArray(AttributeLocation);
                },
                Clear: function (Color) {
                    Graphics.gl.clearColor(Color.R, Color.G, Color.B, 1);
                    Graphics.gl.clear(Graphics.gl.DEPTH_BUFFER_BIT | Graphics.gl.COLOR_BUFFER_BIT);
                }
            }
        }
    });

    Bridge.define("math", {
        statics: {
            fields: {
                E: 0,
                PI: 0,
                TAU: 0
            },
            ctors: {
                init: function () {
                    this.E = 2.71828175;
                    this.PI = 3.14159274;
                    this.TAU = 6.28318548;
                }
            },
            methods: {
                abs: function (x) {
                    return Math.abs(x);
                },
                max: function (val1, val2) {
                    return Math.max(val1, val2);
                },
                min: function (val1, val2) {
                    return Math.min(val1, val2);
                },
                sign: function (value) {
                    return Bridge.Int.sign(value);
                },
                round: function (x) {
                    return Bridge.Math.round(x, 0, 6);
                },
                ceil: function (x) {
                    return Math.ceil(x);
                },
                floor: function (x) {
                    return Math.floor(x);
                },
                ToDegrees: function (x) {
                    return x * 57.2958;
                },
                ToRadians: function (x) {
                    return x * 0.0174533;
                },
                clamp$4: function (x, Max, Min) {
                    return math.min(math.max(x, Max), Min);
                },
                clamp$1: function (x, Max, Min) {
                    return new Quote.float2.$ctor1(math.clamp$4(x.x, Min, Max), math.clamp$4(x.y, Min, Max));
                },
                clamp$2: function (x, Max, Min) {
                    return new Quote.float3.$ctor3(math.clamp$4(x.x, Min, Max), math.clamp$4(x.y, Min, Max), math.clamp$4(x.z, Min, Max));
                },
                clamp: function (x, Max, Min) {
                    return new Quote.Color.$ctor2(math.clamp$4(x.R, Min, Max), math.clamp$4(x.G, Min, Max), math.clamp$4(x.B, Min, Max), math.clamp$4(x.A, Min, Max));
                },
                clamp$3: function (x, Max, Min) {
                    return new Quote.Quaternion.$ctor1(math.clamp$4(x.x, Min, Max), math.clamp$4(x.y, Min, Max), math.clamp$4(x.z, Min, Max), math.clamp$4(x.w, Min, Max));
                },
                clamp01: function (x) {
                    return math.clamp$4(x, 0, 1);
                },
                saturate: function (x) {
                    return math.clamp$4(x, 0, 1);
                },
                dot$1: function (A, B) {
                    return A.x * B.x + A.y * B.y;
                },
                dot$2: function (A, B) {
                    return A.x * B.x + A.y * B.y + A.z * B.z;
                },
                dot: function (A, B) {
                    return A.R * B.R + A.G * B.G + A.B * B.B + A.A * B.A;
                },
                dot$3: function (A, B) {
                    return A.x * B.x + A.y * B.y + A.z * B.z + A.w * B.w;
                },
                length$1: function (A) {
                    return math.sqrt(math.dot$1(A.$clone(), A.$clone()));
                },
                length$2: function (A) {
                    return math.sqrt(math.dot$2(A.$clone(), A.$clone()));
                },
                $length: function (A) {
                    return math.sqrt(math.dot(A.$clone(), A.$clone()));
                },
                length$3: function (A) {
                    return math.sqrt(math.dot$3(A.$clone(), A.$clone()));
                },
                distance$4: function (A, B) {
                    return math.abs(A - B);
                },
                distance$1: function (A, B) {
                    return math.sqrt(math.dot$1(A.$clone(), A.$clone()));
                },
                distance$2: function (A, B) {
                    return math.sqrt(math.dot$2(A.$clone(), A.$clone()));
                },
                distance: function (A, B) {
                    return math.sqrt(math.dot(A.$clone(), A.$clone()));
                },
                distance$3: function (A, B) {
                    return math.sqrt(math.dot$3(A.$clone(), A.$clone()));
                },
                normalize$1: function (A) {
                    return Quote.float2.op_Division$1(A.$clone(), math.length$1(A.$clone()));
                },
                normalize$2: function (A) {
                    return Quote.float3.op_Division$1(A.$clone(), math.length$2(A.$clone()));
                },
                normalize: function (A) {
                    return Quote.Color.op_Division$1(A.$clone(), math.$length(A.$clone()));
                },
                normalize$3: function (A) {
                    return Quote.Quaternion.op_Division$1(A.$clone(), math.length$3(A.$clone()));
                },
                cross: function (A, B) {
                    return new Quote.float3.$ctor3(A.y * B.z - A.z * B.y, A.z * B.x - A.x * B.z, A.x * B.y - A.y * B.x);
                },
                rotate90cw: function (A) {
                    return new Quote.float2.$ctor1(-A.y, A.x);
                },
                rotate90ccw: function (A) {
                    return new Quote.float2.$ctor1(A.y, -A.x);
                },
                VectorToAngle: function (vector) {
                    return math.ToDegrees(math.atan2(vector.$clone()));
                },
                AngleBetween: function (A, B) {
                    return math.ToDegrees(math.atan2(B.$clone()) - math.atan2(A.$clone()));
                },
                Remap: function (startMin, startMax, value, targetMin, targetMax) {
                    var iDist = startMin - startMax;
                    var jDist = targetMin - targetMax;

                    value -= startMin;
                    var p = (value / iDist);
                    value = jDist * p;
                    value += targetMin;
                    return value;
                },
                ClosestRayApproach: function (l1Pos, l1Dir, l2Pos, l2dir) {
                    return Quote.float3.op_Addition(l2Pos.$clone(), (Quote.float3.op_Multiply$1(l2dir.$clone(), math.ClosestRayDistance(l1Pos.$clone(), l1Dir.$clone(), l2Pos.$clone(), l2dir.$clone()))));
                },
                ClosestRayDistance: function (l1Pos, l1Dir, l2Pos, l2dir) {
                    var rightVector = math.normalize$2(math.cross(l1Dir.$clone(), math.cross(l1Dir.$clone(), l2dir.$clone())));

                    var alignment = 1 / math.dot$2(rightVector.$clone(), l2dir.$clone());

                    var s1 = Quote.float3.op_Subtraction(l1Pos.$clone(), l2Pos.$clone());
                    var leftRightDistance = math.dot$2(rightVector.$clone(), s1.$clone());
                    return alignment * leftRightDistance;
                },
                lerp$4: function (A, B, T) {
                    return (A * T + B * (1 - T));
                },
                lerp$1: function (A, B, T) {
                    return new Quote.float2.$ctor1(math.lerp$4(A.x, B.x, T), math.lerp$4(A.y, B.y, T));
                },
                lerp$2: function (A, B, T) {
                    return new Quote.float3.$ctor3(math.lerp$4(A.x, B.x, T), math.lerp$4(A.y, B.y, T), math.lerp$4(A.z, B.z, T));
                },
                lerp$3: function (A, B, T) {
                    return new Quote.Quaternion.$ctor1(math.lerp$4(A.x, B.x, T), math.lerp$4(A.y, B.y, T), math.lerp$4(A.z, B.z, T), math.lerp$4(A.w, B.w, T));
                },
                lerp: function (a, b, T) {
                    return new Quote.Color.$ctor2(math.lerp$4(a.R, b.R, T), math.lerp$4(a.G, b.G, T), math.lerp$4(a.B, b.B, T), math.lerp$4(a.A, b.A, T));
                },
                MoveTowards$1: function (value, target, maxDistance) {
                    return value - math.clamp$4(value - target, -maxDistance, maxDistance);
                },
                MoveTowards: function (value, target, maxDistance) {
                    return Quote.float2.op_Subtraction(value.$clone(), math.clamp$1(Quote.float2.op_Subtraction(value.$clone(), target.$clone()), -maxDistance, maxDistance));
                },
                log$1: function (x, logBase) {
                    return Bridge.Math.logWithBase(x, logBase);
                },
                log: function (x) {
                    return Bridge.Math.log(x);
                },
                log10: function (x) {
                    return Bridge.Math.logWithBase(x, 10.0);
                },
                exp: function (x) {
                    return Math.exp(x);
                },
                sqrt: function (x) {
                    return Math.sqrt(x);
                },
                pow: function (x, y) {
                    return Math.pow(x, y);
                },
                acos: function (x) {
                    return Math.acos(x);
                },
                asin: function (x) {
                    return Math.asin(x);
                },
                atan: function (x) {
                    return Math.atan(x);
                },
                atan2$1: function (y, x) {
                    return Math.atan2(y, x);
                },
                atan2: function (A) {
                    return Math.atan2(A.y, A.x);
                },
                cos: function (x) {
                    return Math.cos(x);
                },
                sin: function (x) {
                    return Math.sin(x);
                },
                tan: function (x) {
                    return Math.tan(x);
                }
            }
        }
    });

    Bridge.define("Quote.Color", {
        $kind: "struct",
        statics: {
            fields: {
                Red: null,
                Green: null,
                Blue: null
            },
            ctors: {
                init: function () {
                    this.Red = new Quote.Color();
                    this.Green = new Quote.Color();
                    this.Blue = new Quote.Color();
                    this.Red = new Quote.Color.$ctor1(1, 0, 0);
                    this.Green = new Quote.Color.$ctor1(0, 1, 0);
                    this.Blue = new Quote.Color.$ctor1(0, 0, 1);
                }
            },
            methods: {
                op_Addition: function (a, b) {
                    return new Quote.Color.$ctor2(a.R + b.R, a.G + b.G, a.B + b.B, a.A + b.A);
                },
                op_Addition$1: function (a, b) {
                    return new Quote.Color.$ctor2(a.R + b, a.G + b, a.B + b, a.A + b);
                },
                op_Subtraction: function (a, b) {
                    return new Quote.Color.$ctor2(a.R - b.R, a.G - b.G, a.B - b.B, a.A - b.A);
                },
                op_Subtraction$1: function (a, b) {
                    return new Quote.Color.$ctor2(a.R - b, a.G - b, a.B - b, a.A - b);
                },
                op_Multiply: function (a, b) {
                    return new Quote.Color.$ctor2(a.R * b.R, a.G * b.G, a.B * b.B, a.A * b.A);
                },
                op_Multiply$1: function (a, b) {
                    return new Quote.Color.$ctor2(a.R * b, a.G * b, a.B * b, a.A * b);
                },
                op_Division: function (a, b) {
                    return new Quote.Color.$ctor2(a.R / b.R, a.G / b.G, a.B / b.B, a.A / b.A);
                },
                op_Division$1: function (a, b) {
                    return new Quote.Color.$ctor2(a.R / b, a.G / b, a.B / b, a.A / b);
                },
                getDefaultValue: function () { return new Quote.Color(); }
            }
        },
        fields: {
            R: 0,
            G: 0,
            B: 0,
            A: 0
        },
        ctors: {
            $ctor2: function (R, G, B, A) {
                this.$initialize();
                this.R = R;
                this.G = G;
                this.B = B;
                this.A = A;
            },
            $ctor1: function (R, G, B) {
                this.$initialize();
                this.R = R;
                this.G = G;
                this.B = B;
                this.A = 1.0;
            },
            ctor: function () {
                this.$initialize();
            }
        },
        methods: {
            toString: function () {
                return System.String.format("({0:0.00000}, {1:0.00000}, {2:0.00000}), {3:0.00000})", Bridge.box(this.R, System.Single, System.Single.format, System.Single.getHashCode), Bridge.box(this.G, System.Single, System.Single.format, System.Single.getHashCode), Bridge.box(this.B, System.Single, System.Single.format, System.Single.getHashCode), Bridge.box(this.A, System.Single, System.Single.format, System.Single.getHashCode));
            },
            getHashCode: function () {
                var h = Bridge.addHash([1869377461, this.R, this.G, this.B, this.A]);
                return h;
            },
            equals: function (o) {
                if (!Bridge.is(o, Quote.Color)) {
                    return false;
                }
                return Bridge.equals(this.R, o.R) && Bridge.equals(this.G, o.G) && Bridge.equals(this.B, o.B) && Bridge.equals(this.A, o.A);
            },
            $clone: function (to) {
                var s = to || new Quote.Color();
                s.R = this.R;
                s.G = this.G;
                s.B = this.B;
                s.A = this.A;
                return s;
            }
        }
    });

    Bridge.define("Quote.Debug");

    Bridge.define("Quote.float2", {
        $kind: "struct",
        statics: {
            methods: {
                op_Addition: function (A, B) {
                    return new Quote.float2.$ctor1(A.x + B.x, A.y + B.y);
                },
                op_Addition$1: function (A, B) {
                    return new Quote.float2.$ctor1(A.x + B, A.y + B);
                },
                op_Subtraction: function (A, B) {
                    return new Quote.float2.$ctor1(A.x - B.x, A.y - B.y);
                },
                op_Subtraction$1: function (A, B) {
                    return new Quote.float2.$ctor1(A.x - B, A.y - B);
                },
                op_Multiply: function (A, b) {
                    return new Quote.float2.$ctor1(A.x * b.x, A.y + b.y);
                },
                op_Multiply$1: function (A, b) {
                    return new Quote.float2.$ctor1(A.x * b, A.y * b);
                },
                op_Division: function (A, B) {
                    return new Quote.float2.$ctor1(A.x / B.x, A.y + B.y);
                },
                op_Division$1: function (A, B) {
                    return new Quote.float2.$ctor1(A.x / B, A.y / B);
                },
                getDefaultValue: function () { return new Quote.float2(); }
            }
        },
        fields: {
            x: 0,
            y: 0
        },
        props: {
            xy: {
                get: function () {
                    return new Quote.float2.$ctor1(this.x, this.y);
                },
                set: function (value) {
                    this.x = value.x;
                    this.y = value.y;
                }
            },
            yx: {
                get: function () {
                    return new Quote.float2.$ctor1(this.y, this.x);
                },
                set: function (value) {
                    this.x = value.y;
                    this.y = value.x;
                }
            },
            xx: {
                get: function () {
                    return new Quote.float2.$ctor1(this.x, this.x);
                },
                set: function (value) {
                    this.x = value.y;
                }
            },
            yy: {
                get: function () {
                    return new Quote.float2.$ctor1(this.y, this.y);
                },
                set: function (value) {
                    this.y = value.y;
                }
            }
        },
        ctors: {
            $ctor1: function (x, y) {
                this.$initialize();
                this.x = x;
                this.y = y;
            },
            ctor: function () {
                this.$initialize();
            }
        },
        methods: {
            toString: function () {
                return System.String.format("({0:0.00000}, {1:0.00000})", Bridge.box(this.x, System.Single, System.Single.format, System.Single.getHashCode), Bridge.box(this.y, System.Single, System.Single.format, System.Single.getHashCode));
            },
            getHashCode: function () {
                var h = Bridge.addHash([1634705114, this.x, this.y]);
                return h;
            },
            equals: function (o) {
                if (!Bridge.is(o, Quote.float2)) {
                    return false;
                }
                return Bridge.equals(this.x, o.x) && Bridge.equals(this.y, o.y);
            },
            $clone: function (to) {
                var s = to || new Quote.float2();
                s.x = this.x;
                s.y = this.y;
                return s;
            }
        }
    });

    Bridge.define("Quote.float3", {
        $kind: "struct",
        statics: {
            fields: {
                up: null,
                down: null,
                left: null,
                right: null,
                forward: null,
                back: null,
                one: null,
                zero: null
            },
            ctors: {
                init: function () {
                    this.up = new Quote.float3();
                    this.down = new Quote.float3();
                    this.left = new Quote.float3();
                    this.right = new Quote.float3();
                    this.forward = new Quote.float3();
                    this.back = new Quote.float3();
                    this.one = new Quote.float3();
                    this.zero = new Quote.float3();
                    this.up = new Quote.float3.$ctor3(0, 0, 1);
                    this.down = new Quote.float3.$ctor3(0, 0, -1);
                    this.left = new Quote.float3.$ctor3(0, 1, 0);
                    this.right = new Quote.float3.$ctor3(0, -1, 0);
                    this.forward = new Quote.float3.$ctor3(1, 0, 0);
                    this.back = new Quote.float3.$ctor3(-1, 0, 0);
                    this.one = new Quote.float3.$ctor3(1, 1, 1);
                    this.zero = new Quote.float3.$ctor3(0, 0, 0);
                }
            },
            methods: {
                op_Addition: function (A, B) {
                    return new Quote.float3.$ctor3(A.x + B.x, A.y + B.y, A.z + B.z);
                },
                op_Addition$1: function (A, B) {
                    return new Quote.float3.$ctor3(A.x + B, A.y + B, A.z + B);
                },
                op_Subtraction: function (A, B) {
                    return new Quote.float3.$ctor3(A.x - B.x, A.y - B.y, A.z - B.z);
                },
                op_Subtraction$1: function (A, B) {
                    return new Quote.float3.$ctor3(A.x - B, A.y - B, A.z - B);
                },
                op_Multiply: function (A, B) {
                    return new Quote.float3.$ctor3(A.x * B.x, A.y * B.y, A.z * B.z);
                },
                op_Multiply$1: function (A, B) {
                    return new Quote.float3.$ctor3(A.x * B, A.y * B, A.z * B);
                },
                op_Division: function (A, B) {
                    return new Quote.float3.$ctor3(A.x / B.x, A.y + B.y, A.z + B.z);
                },
                op_Division$1: function (A, B) {
                    return new Quote.float3.$ctor3(A.x / B, A.y / B, A.z / B);
                },
                getDefaultValue: function () { return new Quote.float3(); }
            }
        },
        fields: {
            x: 0,
            y: 0,
            z: 0
        },
        ctors: {
            $ctor3: function (x, y, z) {
                this.$initialize();
                this.x = x;
                this.y = y;
                this.z = z;
            },
            $ctor1: function (xy, z) {
                this.$initialize();
                this.x = xy.x;
                this.y = xy.y;
                this.z = z;
            },
            $ctor2: function (x, yz) {
                this.$initialize();
                this.x = x;
                this.y = yz.x;
                this.z = yz.y;
            },
            ctor: function () {
                this.$initialize();
            }
        },
        methods: {
            toString: function () {
                return System.String.format("({0:0.00000}, {1:0.00000}, {2:0.00000})", Bridge.box(this.x, System.Single, System.Single.format, System.Single.getHashCode), Bridge.box(this.y, System.Single, System.Single.format, System.Single.getHashCode), Bridge.box(this.z, System.Single, System.Single.format, System.Single.getHashCode));
            },
            getHashCode: function () {
                var h = Bridge.addHash([1634705370, this.x, this.y, this.z]);
                return h;
            },
            equals: function (o) {
                if (!Bridge.is(o, Quote.float3)) {
                    return false;
                }
                return Bridge.equals(this.x, o.x) && Bridge.equals(this.y, o.y) && Bridge.equals(this.z, o.z);
            },
            $clone: function (to) {
                var s = to || new Quote.float3();
                s.x = this.x;
                s.y = this.y;
                s.z = this.z;
                return s;
            }
        }
    });

    Bridge.define("Quote.Input", {
        statics: {
            fields: {
                ScrollWheel: 0,
                MouseDelta: null
            },
            ctors: {
                init: function () {
                    this.MouseDelta = new Quote.float2();
                    this.ScrollWheel = 0;
                    this.MouseDelta = new Quote.float2.$ctor1(0, 0);
                }
            },
            methods: {
                GetKeyDown$1: function (key) {
                    return false;
                },
                GetKeyDown: function (button) {
                    return false;
                },
                GetMouseButtonDown: function (button) {
                    return false;
                },
                GetKey$1: function (key) {
                    return false;
                },
                GetKey: function (button) {
                    return false;
                },
                GetMouseButton: function (button) {
                    return false;
                },
                GetKeyUp$1: function (key) {
                    return false;
                },
                GetKeyUp: function (button) {
                    return false;
                },
                GetMouseButtonUp: function (button) {
                    return false;
                }
            }
        }
    });

    Bridge.define("Quote.Input.Button", {
        $kind: "nested enum",
        statics: {
            fields: {
                Left: 0,
                Right: 1,
                Middle: 2
            }
        }
    });

    Bridge.define("Quote.Input.Buttons", {
        $kind: "nested enum",
        statics: {
            fields: {
                lTrigger: 0,
                rTrigger: 1,
                lBumper: 2,
                rBumper: 3,
                Y: 4,
                lStick: 5,
                X: 6,
                B: 7,
                Up: 8,
                A: 9,
                Left: 10,
                Right: 11,
                rStick: 12,
                Down: 13
            }
        }
    });

    Bridge.define("Quote.Input.Keys", {
        $kind: "nested enum",
        statics: {
            fields: {
                F1: 0,
                F2: 1,
                F3: 2,
                F4: 3,
                F5: 4,
                F6: 5,
                F7: 6,
                F8: 7,
                F9: 8,
                F10: 9,
                F11: 10,
                F12: 11,
                PrintScreen: 12,
                Insert: 13,
                Delete: 14,
                D1: 15,
                D2: 16,
                D3: 17,
                D4: 18,
                D5: 19,
                D6: 20,
                D7: 21,
                D8: 22,
                D9: 23,
                D0: 24,
                Backspace: 25,
                Tab: 26,
                Q: 27,
                W: 28,
                E: 29,
                R: 30,
                T: 31,
                Y: 32,
                U: 33,
                I: 34,
                O: 35,
                P: 36,
                A: 37,
                S: 38,
                D: 39,
                F: 40,
                G: 41,
                H: 42,
                J: 43,
                K: 44,
                L: 45,
                Enter: 46,
                lShift: 47,
                Z: 48,
                X: 49,
                C: 50,
                V: 51,
                B: 52,
                N: 53,
                M: 54,
                rShift: 55,
                lCtrl: 56,
                lAlt: 57,
                Space: 58,
                rAlt: 59,
                rCtrl: 60
            }
        }
    });

    Bridge.define("Quote.Material", {
        ctors: {
            ctor: function (shader) {
                this.$initialize();

            }
        },
        methods: {
            SetFloat: function (name, value) { },
            GetFloat: function (name) {
                return 0;
            },
            SetFloat2: function (name, value) { },
            GetFloat2: function (name) {
                return new Quote.float2.$ctor1(0, 0);
            },
            SetFloat3: function (name, value) { },
            GetFloat3: function (name) {
                return new Quote.float3.$ctor3(0, 0, 0);
            },
            SetFloat4: function (name, value) { },
            GetFloat4: function (name) {
                return new Quote.Color.$ctor2(0, 0, 0, 1);
            }
        }
    });

    Bridge.define("Quote.Mesh", {
        fields: {
            VBO: null,
            material: null
        },
        ctors: {
            ctor: function (model, material) {
                this.$initialize();
                this.material = material;
                this.VBO = File.ReadAllFloatsFormString(File.ReadAllText(model));
            }
        }
    });

    Bridge.define("Quote.Quaternion", {
        $kind: "struct",
        statics: {
            methods: {
                op_Addition: function (a, b) {
                    return new Quote.Quaternion.$ctor1(a.x + b.x, a.y + b.y, a.z + b.z, a.w + b.w);
                },
                op_Addition$1: function (a, b) {
                    return new Quote.Quaternion.$ctor1(a.x + b, a.y + b, a.z + b, a.w + b);
                },
                op_Subtraction: function (a, b) {
                    return new Quote.Quaternion.$ctor1(a.x - b.x, a.y - b.y, a.z - b.z, a.w - b.w);
                },
                op_Subtraction$1: function (a, b) {
                    return new Quote.Quaternion.$ctor1(a.x - b, a.y - b, a.z - b, a.w - b);
                },
                op_Multiply: function (a, b) {
                    return new Quote.Quaternion.$ctor1(a.x * b.x, a.y * b.y, a.z * b.z, a.w * b.w);
                },
                op_Multiply$1: function (a, b) {
                    return new Quote.Quaternion.$ctor1(a.x * b, a.y * b, a.z * b, a.w * b);
                },
                op_Division: function (a, b) {
                    return new Quote.Quaternion.$ctor1(a.x / b.x, a.y / b.y, a.z / b.z, a.w / b.w);
                },
                op_Division$1: function (a, b) {
                    return new Quote.Quaternion.$ctor1(a.x / b, a.y / b, a.z / b, a.w / b);
                },
                getDefaultValue: function () { return new Quote.Quaternion(); }
            }
        },
        fields: {
            x: 0,
            y: 0,
            z: 0,
            w: 0
        },
        ctors: {
            $ctor1: function (x, y, z, w) {
                this.$initialize();
                this.x = x;
                this.y = y;
                this.z = z;
                this.w = w;
            },
            ctor: function () {
                this.$initialize();
            }
        },
        methods: {
            toString: function () {
                return System.String.format("({0:0.00000}, {1:0.00000}, {2:0.00000}), {3:0.00000})", Bridge.box(this.x, System.Single, System.Single.format, System.Single.getHashCode), Bridge.box(this.y, System.Single, System.Single.format, System.Single.getHashCode), Bridge.box(this.z, System.Single, System.Single.format, System.Single.getHashCode), Bridge.box(this.w, System.Single, System.Single.format, System.Single.getHashCode));
            },
            getHashCode: function () {
                var h = Bridge.addHash([3721418277, this.x, this.y, this.z, this.w]);
                return h;
            },
            equals: function (o) {
                if (!Bridge.is(o, Quote.Quaternion)) {
                    return false;
                }
                return Bridge.equals(this.x, o.x) && Bridge.equals(this.y, o.y) && Bridge.equals(this.z, o.z) && Bridge.equals(this.w, o.w);
            },
            $clone: function (to) {
                var s = to || new Quote.Quaternion();
                s.x = this.x;
                s.y = this.y;
                s.z = this.z;
                s.w = this.w;
                return s;
            }
        }
    });

    Bridge.define("Quote.Quote", {
        statics: {
            fields: {
                mesh: null,
                material: null
            },
            methods: {
                Start: function () {
                    Graphics.Initialize(480, 270);
                    Quote.Time.Start();


                },
                Update: function () {
                    Quote.Time.Update();
                    var color = math.sin(System.DateTime.getMillisecond(System.DateTime.getNow()) / 1000.0);
                    Graphics.Clear(new Quote.Color.$ctor1(0.141, 0.141, 0.141));
                }
            }
        }
    });

    Bridge.define("Quote.Time", {
        statics: {
            fields: {
                DeltaTimeInMilliseconds: 0,
                DeltaTime: 0,
                GameTime: 0,
                Ticks: System.Int64(0),
                LastTicks: System.Int64(0),
                StartTicks: System.Int64(0)
            },
            methods: {
                TicksToSeconds: function (Ticks) {
                    var milliseconds = Ticks / 10000.0;
                    var seconds = milliseconds / 1000.0;
                    return seconds;
                },
                Start: function () {
                    Quote.Time.StartTicks = System.DateTime.getTicks(System.DateTime.getNow());
                },
                Update: function () {
                    Quote.Time.LastTicks = Quote.Time.Ticks;
                    Quote.Time.Ticks = System.DateTime.getTicks(System.DateTime.getNow());
                    var DeltaTicks = Quote.Time.Ticks.sub(Quote.Time.LastTicks);

                    Quote.Time.DeltaTime = Quote.Time.TicksToSeconds(DeltaTicks);
                    Quote.Time.GameTime = Quote.Time.TicksToSeconds(Quote.Time.Ticks.sub(Quote.Time.StartTicks));
                    Quote.Time.DeltaTimeInMilliseconds = Bridge.Int.clip32(Quote.Time.DeltaTime * 1000.0);
                }
            }
        }
    });
});
