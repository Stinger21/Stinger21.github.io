

struct VSIn
{
    float4 Position;
    float3 Normal;
    float2 UV;
    float2 UV1;
    float4 Color;
};

struct VSToPS
{
    float4 Position;
    float4 Color;
    float3 Normal;
};

struct PSOut
{
    float4 Color;
};


float2 RotateVector(float2 i, float Angle)
{
    float x = i.x * cos(Angle) - i.y * sin(Angle);
    float y = i.x * sin(Angle) + i.y * cos(Angle);
    return float2(x, y);
}

VSToPS sVertexMain(VSIn In)
{
    VSToPS Out;

    Out.Position = In.Position;
    Out.Color = In.Color;
    Out.Normal = In.Normal;

    Out.Position.xy = RotateVector(Out.Position.xy, GameTime);
    Out.Position.yz = RotateVector(Out.Position.yz, GameTime);
    Out.Position.zx = RotateVector(Out.Position.zx, GameTime);
    Out.Position.xyz *= 0.5;
    Out.Position.z += 0.5;
    Out.Position.y *= AspectRatio;

    return Out;
}

PSOut sPixelMain(VSToPS In)
{
    PSOut Out;
    float Brightness = (dot(float3(1,0,0), In.Normal.xyz) + 1.0) * 0.5;
    Out.Color = In.Color * float4(Brightness, Brightness, Brightness, 1.0);
    return Out;
}
