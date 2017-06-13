# data
with open(r"C:\Users\Stinger\Desktop\wat.txt", "r") as file:
    data = file.read()
    
# clean up
data = data.replace(" ", "")
data = data.replace("[", "")
data = data.replace("]", "")
data = data.replace("\n", "")
data = data.replace("\r", "")
data = data.split(",")

# turn it into ints
data = [int(i) for i in data]

print len(data)

# write it to file
with open(r"C:\Users\Stinger\Desktop\wat.raw", "wb") as file:
    file.write(bytearray(data))
    
