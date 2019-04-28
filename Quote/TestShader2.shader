struct VSIn
{
    float4 Position;
    float4 Normal;
    float2 UV;
    float2 UV1;
    float4 Color;
};

struct VSOut
{
    float4 Position;
    float4 Color;
    float4 Normal;
};

struct PSOut
{
    float4 Color;
};

VSOut VertexMain(VSIn In)
{
    VSOut Out;
    Out.Position = In.Position;
    Out.Color = In.Color;
    Out.Normal = In.Normal;
    return Out;
}

PSOut PixelMain(VSOut In)
{
    PSOut Out;
    Out.Color = float4(1.0, 0.0, 0.0, 1.0);
    return Out;
}
