def calcPPI(inches, resolution):
    inches = float(inches)
    resolution = [float(resolution[0]), float(resolution[1])]

    return resolution[0] / calcWH(inches, resolution)[0]

def calcWH(inches, resolution):
    inches = float(inches)
    resolution = [float(resolution[0]), float(resolution[1])]
    
    Width = (inches**2 /(((resolution[1]/resolution[0])**2) + 1)) ** 0.5
    Height = (inches**2 /(((resolution[0]/resolution[1])**2) + 1)) ** 0.5
    return Width, Height
    
print calcPPI(23, [1920, 1080])
#print calcPPI(27, [1920, 1080])

print calcPPI(32, [3840 , 2160])
print calcPPI(48, [3840 , 2160])

#print calcPPI(23.8, [2560 , 1440])


#print calcPPI(34, [3440 , 1440])

#32" = 71x40 cm
#40" = 88.5x50 cm
