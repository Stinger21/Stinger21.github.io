result = [];
length = 0;
with open(r"C:\Users\Stinger\Desktop\gryph.raw", "rb") as file:
    ba = bytearray(file.read())
    for byte in ba:
        result.append(int(byte))
        length += 1;

result = result[-7500:];

with open(r"C:\Users\Stinger\Desktop\image2_.txt", "w") as file:
    file.write(str(result))

#print result
print len(result)
print length
